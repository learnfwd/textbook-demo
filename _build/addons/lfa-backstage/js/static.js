define(['app', './lib/socket.io'], function(App, io) {
  function getSessionId() {
    var key = 'lfa_sessionId_' + document.title;
    var sessionId = App.storage.getItem(key);
    if (!sessionId) {
      sessionId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r&0x3 | 0x8);
        return v.toString(16);
      });
      App.storage.setItem(key, sessionId);
    }
    return sessionId;
  }
  var domain = 'lfa-static.herokuapp.com';

  // AJAX implementation
  
  /* function sendAJAX(obj) {
    var url = 'http://' + domain + '/log';
    var xht = new XMLHttpRequest();
    xht.onerror = function() {};
    xht.open('POST', url, true);
    xht.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xht.setRequestHeader('Content-Type', 'application/json');
    xht.send(JSON.stringify(obj));
  } */


  // WebSockets implementation

  var ws = null;
  var messageQueue = [];
  var timerRunning = false;

  function sendWS(obj) {
    function sendQueue() {
      if (!messageQueue.length) { return; }
      if (!ws) { return; }
      if (ws.readyState === WebSocket.CONNECTING) { return; }
      if (ws.readyState !== WebSocket.OPEN) {
        reopenConnection();
        return;
      }
      for (var i = 0, n = messageQueue.length; i < n; i++) { 
        ws.send(JSON.stringify(messageQueue[i]));
      }
      messageQueue.length = 0;
    }

    function reopenConnection() {
      ws = null;
      if (messageQueue.length) {
        if (!timerRunning) {
          timerRunning = true;
          setTimeout(function() {
            setUpConnection();
            timerRunning = false;
          }, 10000);
        }
      }
    }

    function setUpConnection() {
      if (!ws) {
        ws = new WebSocket('ws://' + domain);
        ws.onopen = sendQueue;
        ws.onerror = reopenConnection;
      }
    }

    messageQueue.push(obj);
    setUpConnection();
    sendQueue();
  }

  function sendLog(key, data) {
    sendWS({
      userAgent: window.navigator.userAgent,
      title: document.title,
      sessionId: getSessionId(),
      clientTime: new Date(),
      key: key,
      data: data,
    });
  }

  window.App.on('static', function (key, data) {
    sendLog(key, data);
  });

  window.App.book.on('render', function (opts) {
    sendLog('navigate', { route: opts.chapter });
  });

});
