define(['backbone', 'app', '../net/net'], function (Backbone, App, Net) {
  var net = Net.singleton();

  var ClassmateList = Backbone.View.extend({
    initialize: function () {
      this.clients = {};
      this.render();

      this.listenTo(App, 'classroom:registerClients', this.registerClients.bind(this));
      this.listenTo(App, 'classroom:updateClients', this.updateClients.bind(this));
      this.listenTo(App, 'classroom:unregisterClients', this.unregisterClients.bind(this));
      this.listenTo(App, 'classroom:recv:setAway', this.setClientAway.bind(this));
    },

    render: function () {
    },

    renderClient: function (client) {
      var isTeacher = net.getClassroom().teacher === client.id;
      var el = $(window.getMixin('classroom-client')(this.clients[client.id], {
        isTeacher: isTeacher
      }));
      el.find('.ring-bell').click(function () {
        App.trigger('classroom:alert:send', client.id);
      });
      return el;
    },

    setClientAway: function (msg) {
      var self = this;
      var client = self.clients[msg.from.id];
      if (client) {
        client.away = msg.state;
        var container = self.$el;
        var el = container.find('[data-id="' + client.id + '"]');
        if (el.length) {
          el.after(self.renderClient(client));
          el.remove();
        }
      }
    },

    registerClients: function (clients) {
      var self = this;
      var container = self.$el;
      _.each(clients, function(client) {
        self.clients[client.id] = _.clone(client);

        var el = container.find('[data-id="' + client.id + '"]');
        if (el.length) {
          _.each(el[0].className.split(/\s+/), function (className) {
            if (/^remove-token-/.test(className)) {
              el.removeClass(className);
            }
          });
          el.removeClass('classroom-client-offline');
        } else {
          el = self.renderClient(client);
          container.append(el);
        }
      });
    },

    updateClients: function (clients) {
      var self = this;
      var container = self.$el;
      _.each(clients, function(client) {
        var el = container.find('[data-id="' + client.id + '"]');
        if (el.length) {
          self.clients[client.id] = _.extend(self.clients[client.id], client);
          el.after(self.renderClient(client));
          el.remove();
        }
      });
    },

    unregisterClients: function (clients) {
      var self = this;
      var container = self.$el;
      _.each(clients, function(client) {
        var el = container.find('[data-id="' + client.id + '"]');
        if (el.length) {
          delete self.clients[client.id];
          var token = _.uniqueId('remove-token-');
          el.addClass(token);
          el.addClass('classroom-client-offline');
          setTimeout(function() {
            if (el.hasClass(token)) {
              el.remove();
            }
          }, 6000);
        }
      });
    },


  });

  return ClassmateList;
});
