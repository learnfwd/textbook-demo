define(function (require) {
  require('../js/lib/moment.min');
  require('./static');
  require('./translations');

  var App = require('app');
  var BackstageView = require('./views/backstage');

  require('./views/notification-pane');
  require('./views/settings-pane');

  App.on('ready', function() {
    var backstage = new BackstageView({
      el: $('#rightbar')
    });

    App.backstage = backstage;
    App.avatar = require('../js/initializers/avatar');

    App.T.translateElement($('#rightbar'));
    require('../js/initializers/notify');  
    require('../js/initializers/backupRestore');
  });
});
