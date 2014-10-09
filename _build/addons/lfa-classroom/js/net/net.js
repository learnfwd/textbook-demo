define(function (require) {
  var App = require('app');
  var SearchJSON = require('searchjson');
  var $ = require('jquery');
  var io = require('../lib/socket.io.js');

  //Manual reconnection socket.io
  function makeSocket() {
    var socket = io.apply(io, arguments);
    socket.listenersToUnbind = [];
    socket.manualDisconnect = function () {
      var self = this;
      self.io.disconnect();
      self.io.manuallyDisconnected = true;
      _.each(self.listenersToUnbind, function (l) {
        self.removeListener(l[0], l[1]);
      });
      self.listenersToUnbind.length = 0;
    };
    socket.onAutobind = function (evt, f) {
      var cb = function () {
        try {
          f.apply(null, arguments);
        } catch (ex) {
          console.error(ex.stack);
        }
      };
      this.on(evt, cb);
      this.listenersToUnbind.push([evt, cb]);
      return cb;
    };

    socket.removeAutobindListener = function (evt, cb) {
      this.removeListener(evt, cb);
      var v = this.listenersToUnbind;
      for (var i = 0, n = v.length; i < n; i++) {
        if (v[i][1] === cb) {
          v.splice(i, 1);
          break;
        }
      }
    };

    socket.onceAutobind = function (evt, cb) {
      var self = this;
      var f = function () {
        cb.apply(null, arguments);
        self.removeAutobindListener(evt, callback);
      };
      var callback = this.onAutobind(evt, f);
    };

    if (socket.io.manuallyDisconnected) {
      socket.io.reconnect();
    }
    return socket;
  }


  //Constructor

  function Net(url) {
    var self = this;
    self.apiPostfix = '/api/1.0';
    self.serverUrl = url + self.apiPostfix;
    self.localUrl = self.apiPostfix;
    self.locationLoaded = false;
    self.loadCallbacks = [];
    self.cookies = [];
    self.clients = {};
    self.ajaxRequests = [];
    self.connectionState = 'disconnected';
    self.ajaxRequest({
      url: self.localUrl + '/ping',
      cancellable: false
    }, function (err) {
      self.hasLocal = !err;
      self.loaded = true;
      _.each(self.loadCallbacks, function (cb) { cb(); });
    });

    App.on('classroom:send', function (msg) {
      var obj = _.clone(msg);
      var to = obj.to;
      var action = obj.action;
      delete obj.to;
      delete obj.action;
      self.send({
        to: to,
        action: action,
        message: obj,
      });
    });

    App.on('classroom:broadcast', function (msg) {
      var obj = _.clone(msg);
      var action = obj.action;
      delete obj.action;
      self.send({
        action: action,
        message: obj,
      });
    });

    App.on('classroom:send:teacher', function (msg) {
      var obj = _.clone(msg);
      var action = obj.action;
      delete obj.action;
      self.send({
        to: '_teacher',
        action: action,
        message: obj,
      });
    });
  }

  Net.prototype.onLoad = function(cb) {
    if (this.loaded) {
      cb();
    } else {
      this.loadCallbacks.push(cb);
    }
  };

  Net.singleton = function () {
    if (!window.NetSingletonInstance) {
      var serverURL = App.storage.getItem('serverURL');
      serverURL = serverURL || 'http://lfa-classroom.herokuapp.com:80';
      window.NetSingletonInstance = new Net(serverURL);
    }
    return window.NetSingletonInstance;
  };

  //Location
  
  Net.prototype.sendUpdateLocation = function () {
    if (this.location && this.isTeacher() && !this.locationSent) {
      this.socket.emit('updateLocation', {
        classroom: this.classroom.id, 
        location: this.location,
        from: this.getClientId(),
      });
      this.locationSent = true;
    }
  };
  
  Net.prototype.startLocationLookup = function () {
    var self = this;

    if (self.locationLookupStarted) { return; }
    self.locationLookupStarted = true;

    App.trigger('classroom:location:locating');

    function resolveLocation(l) {
      self.location = l ? {
        latitude: l.coords.latitude,
        longitude: l.coords.longitude,
      } : null;
      self.locationLoaded = true;
      self.sendUpdateLocation();
      App.trigger('classroom:location:resolved', self.location);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(l) {
        resolveLocation(l);
      }, function () {
        resolveLocation(null);
      });
    } else {
      resolveLocation(null);
    }
  };

  Net.prototype.getNearbyClassrooms = function (cb) {
    var self = this;
    if (!self.location) {
      cb(new Error('Location unavailable'));
      return;
    }
    self.ajaxRequest({
      url: self.serverUrl + '/classroom/nearby/',
      cancellable: false,
      post: {
        location: self.location,
        book: SearchJSON.bookId,
        radius: 6500 * 1000 * Math.PI,
      },
    }, cb);
  };


  //Cookies
  
  Net.prototype.setCookie = function (key, val) {
    this.cookies[key] = val;
  };

  Net.prototype.getCookie = function (key) {
    return this.cookies[key];
  };

  Net.prototype.deleteCookie = function (key) {
    delete this.cookies[key];
  };


  //Identifiers

  Net.prototype.getDisplayName = function () {
    if (!this.displayName) {
      this.displayName = App.storage.getItem('displayName');
      if (!this.displayName) {
        this.setDisplayName('Student ' + this.getClientId().substr(0, 4));
      }
    }
    return this.displayName;
  };

  Net.prototype.setDisplayName = function (dn) {
    this.displayName = dn;
    App.storage.setItem('displayName', dn);
    App.trigger('classroom:displayName:change', dn);
    if (this.getConnectionState() === 'connected') {
      this.socket.emit('updateClients', {
        classroom: this.classroom.id, 
        book: SearchJSON.bookId,
        clients: [{
          id: this.getClientId(),
          name: dn,
        }],
      });
    }
  };

  Net.prototype.getClientId = function () {
    if (!this.clientId) {
      this.clientId = App.storage.getItem('clientId');
      if (!this.clientId) {
        this._setClientId(Net.generateId(16));
      }
    }
    return this.clientId;
  };

  Net.prototype._setClientId = function (dn) {
    this.clientId = dn;
    App.storage.setItem('clientId', dn);
  };

  Net.generateId = function (len) {
    var alpha = Net.idAlphabet;
    var alphaN = alpha.length;
    var id = [];
    for (var i = 0; i < len; i++) {
      id.push(alpha[Math.round(Math.random() * alphaN - 0.5)]);
    }
    return id.join('');
  };

  Net.idAlphabet = (function () {
    var r = [];
    function add(from, to) {
      var fromCode = from.charCodeAt(0);
      var toCode = to.charCodeAt(0);
      for (var i = fromCode; i <= toCode; i++) {
        r.push(String.fromCharCode(i));
      }
    }
    add('a', 'z');
    add('A', 'Z');
    add('0', '9');
    return r;
  })();

  Net.prototype.isTeacher = function () {
    return this.classroom && this.classroom.teacher === this.getClientId();
  };

  //Connection setup
  
  Net.prototype.setConnectionState = function (cs) {
    if (this.connectionState !== cs) {
      this.connectionState = cs;
      App.trigger('classroom:connectionStateChanged', this);
      App.trigger('classroom:' + this.connectionState, this);
    }
  };

  Net.prototype.getConnectionState = function () {
    return this.connectionState;
  };

  Net.prototype.getClassroom = function () {
    return this.classroom;
  };

  Net.prototype.sendHandshake = function () {
    var self = this;
    self.socket.emit('registerClients', {
      classroom: self.classroom.id, 
      book: SearchJSON.bookId,
      clients: [{
        id: self.getClientId(),
        name: self.getDisplayName(),
      }],
    });
  };

  Net.prototype.configureConnectedSocket = function () {
    var self = this;

    function parseClientMessage(obj, onClient, onEnd) {
      if (typeof (obj) !== 'object' || !(obj.clients instanceof Array)) {
        return;
      }
      var clients = _.filter(obj.clients, function (client) {
        if (typeof(client) !== 'object' ||
            typeof(client.id) !== 'string') {
          return false;
        }
        onClient(client);
        return true;
      });

      if (!clients.length) { return; }
      onEnd(clients);
    }

    self.socket.onAutobind('registerClients', function (obj) {
      parseClientMessage(obj, function (client) {
        self.clients[client.id] = client;
      }, function (clients) {
        App.trigger('classroom:registerClients', clients);
      });
    });

    self.socket.onAutobind('updateClients', function (obj) {
      parseClientMessage(obj, function (client) {
        if (self.clients[client.id]) {
          self.clients[client.id] = client;
        }
      }, function (clients) {
        App.trigger('classroom:updateClients', clients);
      });
    });

    self.socket.onAutobind('unregisterClients', function (obj) {
      parseClientMessage(obj, function (client) {
        delete self.clients[client.id];
      }, function (clients) {
        App.trigger('classroom:unregisterClients', clients);
      });
    });

    self.socket.onAutobind('reconnect_timeout', function () {
      self.socket.manualDisconnect();
      self.socket = null;
      self.setConnectionState('disconnected');
    });

    self.socket.onAutobind('actionMessage', function (msg) {
      self.recievedMessage(msg);
    });

    self.socket.onAutobind('connect', function () {
      self.sendHandshake();
      if (!self.locationSent) {
        self.sendUpdateLocation();
      }
    });
  };

  Net.prototype.send = function (to, action, msg) {
    if (to.message.to) {
      throw new Error('ce plm?');
    }
    if (this.socket && this.socket.connected && this.classroom) {
      if (typeof(to) === 'object') {
        action = to.action;
        msg = to.message;
        to = to.to;
      }
      msg = _.extend({}, msg, this.cookies);
      this.socket.emit('actionMessage', {
        to: to,
        from: this.getClientId(),
        classroom: this.classroom.id,
        action: action,
        message: msg,
      });
    }
  };

  Net.prototype.recievedMessage = function (obj) {
    var msg = _.clone(obj.message);
    msg.from = this.clients[obj.from] || { id: obj.from };
    msg.action = obj.action;
    App.trigger('classroom:recv', msg);
    if (obj.action) {
      App.trigger('classroom:recv:' + obj.action, msg);
    }
  };

  Net.prototype.ajaxRequest = function (opts, cb) {
    var self = this;

    var jqopts = {
      url: opts.url,
    };
    if (opts.timeout !== undefined) {
      jqopts = opts.timeout;
    }
    if (opts.post) {
      jqopts.type = 'POST';
      if (typeof(opts.post) === 'object') {
        jqopts.dataType = 'json';
        jqopts.contentType = 'application/json; charset=utf-8';
        jqopts.data = JSON.stringify(opts.post);
      }
    } else {
      jqopts.type = 'GET';
    }

    var jqxhr = $.ajax(jqopts);
    if (opts.cancellable !== false) {
      self.ajaxRequests.push(jqxhr);
    }

    jqxhr.done(function (data) {
      cb(null, data);
    });

    jqxhr.fail(function (xhr, textStatus) {
      var error;
      switch (textStatus) {
        case 'error':
          error = new Error(xhr.responseText || 'Request failed. Check your internet.');
          break;
        case 'abort':
          error = new Error('Request cancelled');
          error.abort = true;
          break;
        case 'timeout':
          error = new Error('Connection timed out. Check your internet.');
          break;
        case 'parsererror':
          error = new Error('Malformed response');
          break;
        default:
          error = new Error('Unknown error');
          break;
      }
      cb(error, null);
    });

    jqxhr.always(function () {
      var idx = self.ajaxRequests.indexOf(jqxhr); 
      if (idx > 0) {
        self.ajaxRequests.splice(idx, 1);
      }
    });
    return jqxhr;
  };

  Net.prototype.connectSocket = function (data, cb) {
    var self = this;
    cb = cb || function () {};
    if (self.getConnectionState() !== 'connecting') {
      return;
    }
    self.classroom = data;

    function configureSocket() {
      self.configureConnectedSocket();
      self.socketCallback = cb;
      self.socket.onceAutobind('connect', function() {
        self.setConnectionState('connected');
        self.socketCallback = null;
        cb();
      });
    }

    if (data) {
      if (data.display.local) {
        self.ajaxRequest({
          url: 'http://' + data.display.local + self.apiPostfix + '/ping',
          timeout: 3000,
        }, function (err) {
          if (err && err.abort) { 
            cb(err);
            return;
          }
          if (err) {
            self.socket = makeSocket(self.serverUrl);
          } else {
            self.socket = makeSocket('http://' + data.display.local + self.apiPostfix);
          }
          configureSocket();
        });
      } else {
        self.socket = makeSocket(self.serverUrl);
        configureSocket();
      }
    } else {
      cb();
    }
  };

  Net.prototype.disconnect = function () {
    var self = this;
    if (!self.disconnecting && (self.getConnectionState() !== 'disconnected')) {
      self.disconnecting = true;
      if (self.socket) {
        self.socket.manualDisconnect();
        self.socket = null;
      }
      self.clients = {};
      self.classroom = null;
      if (self.socketCallback) {
        var err = new Error('Connection cancelled');
        err.abort = true;
        self.socketCallback(err);
      }
      _.each(self.ajaxRequests, function (req) {
        req.abort();
      });
      self.disconnecting = false;
      self.setConnectionState('disconnected');
    }
  };


  //Classroom join
  
  Net.prototype._joinClassroom = function (url, endpoint, address, cb) {
    var self = this;
    cb = cb || function () {};
    if (self.getConnectionState() !== 'disconnected') {
      cb(new Error('Already connected'));
      return;
    }
    self.setConnectionState('connecting');
    self.locationSent = !!self.location;
    self.onLoad(function () {
      var url = self.hasLocal ? self.localUrl : self.serverUrl;
      self.ajaxRequest({
        url: url + endpoint,
        post: {
          book: SearchJSON.bookId,
          teacher: self.getClientId(),
          location: self.location,
        }
      }, function (err, data) {
        if (err) {
          self.disconnect();
          cb(err, null);
        } else {
          self.connectSocket({
            id: data.id,
            address: address || (data.id === '_local' ? data.display.local : data.display.external),
            display: data.display,
            teacher: data.teacher,
          }, function (err) {
            if (err) {
              cb(err, null);
            } else {
              cb(null ,self.classroom);
            }
          });
        }
      });
    });
  };

  Net.prototype.joinClassroom = function (classroom, cb) {
    if (/\.|:/.test(classroom)) {
      this._joinClassroom('http://' + classroom + this.apiPostfix, '/classroom/join/_local', classroom, cb);
    } else {
      this._joinClassroom(this.serverUrl, '/classroom/join/' + classroom, classroom, cb);
    }
  };

  Net.prototype.createClassroom = function (cb) {
    this._joinClassroom(null, '/classroom/create', null, cb);
  };


  return Net;
});
