define(function (require) {
  require('./views/classroom-pane');
  require('./views/login-pane');
  require('./net/navigation-lock').singleton();
});
