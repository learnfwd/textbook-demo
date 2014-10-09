define([
  'backbone', 
  '../net/navigation-lock', 
  'app', 
], function (Backbone, NavLock, App) {
  var navLock = NavLock.singleton();

  var TeacherControlPanel = Backbone.View.extend({
    initialize: function () {
      this.render();
    },

    className: 'teacher-panel',

    render: function () {
      var self = this;
      self.$el.html(window.getMixin('classroom-teacher-control-panel')());

      var navLockButton = self.$('.teacher-panel-locknav');
      navLockButton.toggleClass('active', navLock.teacherGetNavigationLocked());

      navLockButton.click(function () {
        var old = navLock.teacherGetNavigationLocked();
        navLock.teacherSetNavigationLocked(!old);
      });

      self.listenTo(App, 'classroom:navigation:navLock:changed', function (val) {
        navLockButton.toggleClass('active', val);
      });

      self.$('.teacher-panel-scroll').click(function () {
        App.trigger('classroom:navigation:scroll');
      });
    },

    remove: function () {
      Backbone.View.prototype.remove.apply(this, arguments);
    }
  });

  return TeacherControlPanel;
});
