define(function (require) {
  var Store = require('store');
  var Backbone = require('backbone');
  var Notification = require('../models/notification');

  var NotificationsCollection = Backbone.Collection.extend({
    model: Notification,

    localStorage: new Store('lfa-notifications'),

    comparator: function (notification) {
      return notification.get('createdAt');
    },

    reset: function () {
      this.trigger('reset');
      _.invoke(this.toArray(), 'destroy');
    }
  });

  return new NotificationsCollection();
});
