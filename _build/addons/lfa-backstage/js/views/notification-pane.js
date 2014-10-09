define(function(require) {
  var Backbone = require('backbone');
  var NotificationListView = require('./notification-list');

  var NotificationPane = Backbone.View.extend({
    initialize: function (opts) {
      opts = opts || {};
      this.$tabEl = opts.tabEl;
      this.render();
      this.notifications = new NotificationListView({
        el: this.$('.notification-list')
      });
    },

    tabTemplate: function () {
      return window.getMixin('notifications-pane-tab')();
    },

    template: function () {
      return window.getMixin('notifications-pane')();
    },

    render: function () {
      this.$el.html(this.template());
      this.$tabEl.html(this.tabTemplate());
    },
  });

  NotificationPane.order = 0;
  NotificationPane.activePriority = 10;
  NotificationPane.paneName = 'notifications';

  window.backstagePanes = window.backstagePanes || [];
  window.backstagePanes.push(NotificationPane);
  return NotificationPane;
});
