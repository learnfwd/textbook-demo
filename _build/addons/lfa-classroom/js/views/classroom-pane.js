define([
  'backbone', 
  '../net/net', 
  '../net/navigation-lock', 
  'app', 
  './classmate-list',
  './name-input',
  './nearby-classrooms',
  './teacher-control-panel',
  './alert-sound',
  '../translations',
], function (Backbone, Net, NavLock, App, ClassmateList, NameInput, NearbyClassrooms, TeacherControlPanel, alertUri, T) {
  var net = Net.singleton();
  var navLock = NavLock.singleton();

  var ClassroomPane = Backbone.View.extend({
    initialize: function (opts) {
      opts = opts || {};
      this.$tabEl = opts.tabEl;
      this.renderTab();
      this.render();
      this.awayStatus = false;
      this.autoconnect = App.storage.getItem('classroomAutoconnect') === 'true';
      this.setGroup(this.getGroup());

      this.listenTo(App, 'classroom:connectionStateChanged', this.connectionStateChanged.bind(this));
      this.listenTo(App, 'classroom:setAway', this.setAwayStatus.bind(this));
      this.listenTo(App, 'classroom:registerClients', this.registerClients.bind(this));
      this.listenTo(App, 'classroom:alert', this.ringAlert.bind(this));
      this.listenTo(App, 'classroom:alert:send', this.sendAlert.bind(this));
      this.listenTo(App, 'classroom:recv:alert', this.recieveAlert.bind(this));
      this.listenTo(App, 'classroom:join', this.joinClassroom.bind(this));
      this.listenTo(App.book, 'sidebar:open', function (sidebar) {
        if (sidebar === 'rightbar-active') {
          net.startLocationLookup();
        }
      });

      this.listenTo(App, 'classroom:navigation:navLock:changed', function (val) {
        App.trigger('notify', 'You have ' + (val ? 'locked' : 'unlocked') + ' navigation', { persistent: false });
      });

      this.listenTo(App, 'classroom:navigation:scroll', function () {
        App.trigger('notify', 'You brought everybody here', { persistent: false });
      });

      function setAway(val) {
        App.trigger('classroom:setAway', val);
      }
      $(window).on('blur', setAway.bind(this, true));
      $(window).on('focus', setAway.bind(this, false));

      if (this.autoconnect) {
        var code = App.storage.getItem('classroomCode');
        this.joinClassroom(code);
      }
    },

    tabTemplate: function () {
      return window.getMixin('classroom-pane-tab')();
    },

    renderTab: function () {
      this.$tabEl.html(this.tabTemplate());
    },


    connectionStateChanged: function () {
      this.autoconnect = net.getConnectionState() === 'connected';
      App.storage.setItem('classroomAutoconnect', this.autoconnect);
      this.render();
    },

    render: function () {
      var state = net.getConnectionState();
      this.destroyRendered();
      switch (state) {
        case 'disconnected':
          this.renderDisconnected();
          break;
        case 'connecting':
          this.renderConnecting();
          break;
        case 'connected':
          this.renderConnected();
          break;
      }
      var html = $('html');
      html.toggleClass('classroom-teacher', net.isTeacher());
      html.toggleClass('classroom-connected', state === 'connected');
      html.toggleClass('classroom-disconnected', state === 'disconnected');
      html.toggleClass('classroom-connecting', state === 'connecting');
      T.translateElement(this.$el);
    },

    destroyRendered: function () {
      if (this.classmateList) {
        this.classmateList.remove();
        this.classmateList = null;
      }
      if (this.nearbyList) {
        this.nearbyList.remove();
        this.nearbyList = null;
      }
      if (this.controlPanel) {
        this.controlPanel.remove();
        this.controlPanel = null;
      }
      if (this.nameInput) {
        this.nameInput.remove();
        this.nameInput = null;
      }
    },

    renderDisconnected: function () {
      var self = this;
      self.$el.html(window.getMixin('classroom-pane-disconnected')());

      function joinClassroom() {
        self.joinClassroom(joinTextbox.val());
      }

      var joinTextbox = self.$('#classroom-join-code');
      joinTextbox.keydown(function (event) {
        if ((event.keyCode || event.which) === 13) {
          joinClassroom();
        }
      });

      var oldCode = App.storage.getItem('classroomCode');
      if (oldCode) {
        joinTextbox.val(oldCode);
      }

      this.nearbyList = new NearbyClassrooms({
        el: self.$('.nearby'),
      });

      self.$('.backstage-button#classroom-join').click(joinClassroom);
      self.$('.backstage-button#classroom-create').click(this.makeClassroom.bind(this));
    },

    renderConnecting: function () {
      var self = this;
      self.$el.html(window.getMixin('classroom-pane-connecting')());

      self.$('.backstage-button#classroom-disconnect').click(function() {
        net.disconnect();
      });
    },

    getGroup: function () {
      if (typeof(App.workGroup) === 'undefined') {
        var r = parseInt(App.storage.getItem('workGroup'));
        if (isNaN(r)) {
          r = null;
        }
        return r;
      } else {
        return App.workGroup;
      }
    },

    setGroup: function (group) {
      App.workGroup = group;
      App.storage.setItem('workGroup', group);
      net.setCookie('group', group);
    },

    renderGroupSelector: function () {
      var tabs = this.$('.group-tabs');
      var currentGroup = (this.getGroup() || 0).toString();

      tabs.find('li').each(function (idx, el) {
        var $el = $(el);
        var group = $el.data('group').toString();
        $el.toggleClass('active', group === currentGroup);
      });
    },

    renderConnected: function () {
      var self = this;
      self.$el.html(window.getMixin('classroom-pane-connected')({
        classroom: net.getClassroom()
      }));

      self.$('.backstage-button#classroom-disconnect').click(function() {
        net.disconnect();
      });

      self.$('.classroom-info, #classroom-fullscreen').click(this.showClassroomInfo.bind(this));

      self.renderGroupSelector();
      var tabs = this.$('.group-tabs');
      tabs.find('li').each(function (idx, el) {
        var $el = $(el);
        var group = parseInt($el.data('group'));
        if (!group || isNaN(group)) {
          group = null;
        }
        $el.find('a').click(function () {
          var old = self.getGroup();
          if (old !== group) {
            self.setGroup(group);
            self.renderGroupSelector();
          }
        });
      });

      if (net.isTeacher()) {
        self.controlPanel = new TeacherControlPanel();
        $('.navigation-menu').append(self.controlPanel.$el);
      }

      self.nameInput = new NameInput({
        el: self.$('.name-input')
      });

      self.classmateList = new ClassmateList({
        el: self.$('.classroom-clients')
      });
    },

    showClassroomInfo: function () {
      var info = $(window.getMixin('classroom-fullscreen-info')({
        classroom: net.getClassroom()
      }));
      $('html').append(info);

      info.on('click', function () {
        info.remove();
      });
    },

    recieveAlert: function (msg) {
      if (msg.from.id !== net.getClassroom().teacher) { return; }
      this.ringAlert();
    },

    sendAlert: function (id) {
      if (!net.isTeacher()) { return; }
      App.trigger('classroom:send', {
        to: id,
        action: 'alert',
      });
    },

    ringAlert: function () {
      var audio = new window.Audio(alertUri);
      audio.play();
      var pane = $('<div id="classroom-alert-panel"></div>');
      $('body').append(pane);
      pane.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
        pane.remove();
      });
    },

    setAwayStatus: function (val) {
      this.awayStatus = val;
      App.trigger('classroom:broadcast', {
        action: 'setAway',
        state: this.awayStatus,
      });
    },

    registerClients: function (clients) {
      var self = this;
      _.each(clients, function(client) {
        App.trigger('classroom:send', {
          to: client.id,
          action: 'setAway',
          state: self.awayStatus,
        });
      });
    },

    handleError: function (string, err) {
      console.error(string, err);
      if (!err.abort) {
        var errorText = string + err.message;
        alert(errorText);
      }
    },

    joinClassroom: function (code) {
      var self = this;

      if (!code) { return; }
      net.joinClassroom(code, function(err, data) {
        if (!err) {
          App.storage.setItem('classroomCode', code);
          console.log('Joined classroom: ', code, data);
        } else {
          self.handleError('Can\'t join classroom ' + code + ': ', err);
        }
      });
    },

    makeClassroom: function () {
      var self = this;

      net.createClassroom(function(err, data) {
        if (!err) {
          App.storage.setItem('classroomCode', data.address);
          console.log('Joined classroom: ', data);
        } else {
          self.handleError('Can\'t create a classroom: ', err);
        }
      });
    },
  });

  ClassroomPane.order = 5;
  ClassroomPane.activePriority = 20;
  ClassroomPane.paneName = 'classroom';

  window.backstagePanes = window.backstagePanes || [];
  window.backstagePanes.push(ClassroomPane);
  return ClassroomPane;
});
