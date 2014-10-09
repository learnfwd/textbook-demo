define(['backbone', './net', 'app'], function(Backbone, Net, App) {
  var net = Net.singleton();

  function NavigationLock() {
    this.navLocked = false;
    this.teacherNavigationLocked = App.storage.getItem('teacherNavigationLocked') === 'true';

    App.on('classroom:registerClients', this.registerClients.bind(this));
    App.on('classroom:unregisterClients', this.unregisterClients.bind(this));
    App.on('classroom:disconnected', this.onDisconnect.bind(this));
    App.on('classroom:recv:navigation', this.onRemoteNavigation.bind(this));
    App.on('classroom:navigation:scroll', this.sendTeacherScroll.bind(this));
    App.on('classroom:navigation:scrollTo', this.scrollInPage.bind(this));
    App.on('classroom:navigation:setLock', this.teacherSetNavigationLocked.bind(this));
    App.book.on('render', this.uriChanged.bind(this));
  }

  NavigationLock.singleton = function () {
    if (!window.NavigationLockSingletonInstance) {
      window.NavigationLockSingletonInstance = new NavigationLock();
    }
    return window.NavigationLockSingletonInstance;
  };

  // Network stuff
  
  NavigationLock.prototype.teacherGetNavigationLocked = function () {
    return this.teacherNavigationLocked;
  };

  NavigationLock.prototype.sendTeacherNavLock = function (to, scroll) {
    App.trigger('classroom:send', {
      action: 'navigation', 
      lockState: this.teacherNavigationLocked,
      lockUri: this.currentUri(),
      to: to,
      scroll: scroll,
    });
  };

  NavigationLock.prototype.registerClients = function (clients) {
    var self = this;
    if (!net.isTeacher()) { return; }
    _.each(clients, function (client) {
      self.sendTeacherNavLock(client.id, self.currentScroll());
    });
  };

  NavigationLock.prototype.unregisterClients = function (clients) {
    var teacherId = net.getClassroom().teacher;
    var self = this;
    _.each(clients, function (client) {
      if (client.id === teacherId) {
        self.onDisconnect();
      }
    });
  };

  NavigationLock.prototype.onDisconnect = function () {
    this.setNavigationLocked(false, null, function () {});
  };

  NavigationLock.prototype.sendTeacherScroll = function (scroll) {
    if (!net.isTeacher()) { return; }
    if (scroll === undefined) {
      scroll = this.currentScroll();
    }
    this.sendTeacherNavLock(null, scroll);
  };

  NavigationLock.prototype.onRemoteNavigation = function (msg) {
    if (msg.from.id !== net.getClassroom().teacher) { return; }
    var self = this;
    self.setNavigationLocked(msg.lockState, msg.lockUri, function () {
      if (msg.scroll !== undefined) {
        if (msg.lockUri) {
          self.jumpAndScroll(msg.lockUri, msg.scroll);
        } else {
          self.scrollInPage(msg.scroll);
        }
      }
    });
  };
  
  NavigationLock.prototype.teacherSetNavigationLocked = function (val) {
    if (val === this.teacherNavigationLocked) { return; }
    this.teacherNavigationLocked = val;
    App.storage.setItem('teacherNavigationLocked', val);
    App.trigger('classroom:navigation:navLock:changed', val);
    if (!net.isTeacher()) { return; }
    this.sendTeacherNavLock();
  };


  // Current state
  
  NavigationLock.prototype.uriChanged = function (obj) {
    this._currentUri = obj.chapter;
    if (net.isTeacher() && this.teacherGetNavigationLocked()) {
      this.sendTeacherNavLock();
    }
  };

  NavigationLock.prototype.currentUri = function () {
    return this._currentUri;
  };
  
  NavigationLock.prototype.currentScroll = function () {
    var sv = $('#scrollview');
    var svh = sv.height();
    var s = sv.scrollTop();
    var h = sv.children('section').outerHeight();
    if (h < svh) { return 0; }
    var r = s / (h - svh);
    if (!isFinite(r)) { r = 0; }
    if (r < 0) { r = 0; }
    if (r > 1) { r = 1; }
    return r;
  };


  // Navigation jump and lock

  NavigationLock.prototype.jumpToPage = function (uri, cb) {
    if (this.currentUri() === uri) {
      cb();
      return;
    }

    function changeUri(uri) {
      if (window.location.replace) {
        window.location.replace(uri);
      } else {
        window.location.href = uri;
      }
    }
    changeUri('/#/book/' + uri);
    setTimeout(cb, 500);
  };

  NavigationLock.prototype.setNavigationLocked = function (val, uri, cb) {
    if (typeof(uri) === 'function') {
      cb = uri;
      uri = this.currentUri();
    }

    if (this.navLocked !== val) {
      this.navLocked = val;
      App.book.setKeyNavigationEnabled(!val);
      if (val) {
        $('html').addClass('navigation-locked');
        App.book.closeSidebars();
      } else {
        $('html').removeClass('navigation-locked');
      }
    }

    if (val) {
      this.jumpToPage(uri, cb);
    } else {
      cb();
    }
  };


  // Scroll jump

  NavigationLock.prototype.jumpAndScroll = function(uri, scroll) {
    var self = this;
    self.jumpToPage(uri, function() {
      self.scrollInPage(scroll);
    });
  };

  NavigationLock.prototype.scrollInPage = function (scroll) {
    var sv = $('#scrollview');
    var svh = sv.height();
    var h = sv.children('section').outerHeight();
    if (h < svh) { return; }
    var target = scroll * (h - svh);
    var start = sv.scrollTop();
    var startTime = null;
    var duration = 500;
    var running = true;
    if (start === target) { return; }

    function easing(x) {
      return 1 - (1 - x) * (1 - x);
    }

    function step() {
      var time = Date.now();
      if (!startTime) {
        startTime = time;
      }
      var pos = (time - startTime) / duration;
      if (pos >= 1) {
        pos = 1;
        cancelAnimation();
      }

      sv.scrollTop(start + (target - start) * easing(pos));

      if (running) {
        window.requestAnimationFrame(step);
      }
    }

    var cancelEvents = 'touchdown mousewheel keyup pointerdown MSPointerDown';

    function cancelAnimation() {
      running = false;
      sv.off(cancelEvents, cancelAnimation);
    }

    sv.on(cancelEvents, cancelAnimation);

    window.requestAnimationFrame(step);
  };

  return NavigationLock;
});
