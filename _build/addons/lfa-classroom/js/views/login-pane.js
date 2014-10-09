define(['backbone', './name-input', '../translations'], function (Backbone, NameInput) {

  var LoginPane = Backbone.View.extend({
    initialize: function () {
      this.render();
    },

    template: function () {
      return window.getMixin('login-pane')();
    },

    render: function () {
      var self = this;
      self.$el.html(self.template());
      var input = self.$el.find('#classroom-display-name');
      self.nameInput = new NameInput({ el: input });
    },
  });

  LoginPane.order = 0;
  LoginPane.paneName = 'login';

  window.backstageSettingPanes = window.backstageSettingPanes || [];
  window.backstageSettingPanes.push(LoginPane);
  return LoginPane;
});
