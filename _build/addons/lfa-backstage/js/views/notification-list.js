define(function (require) {
  var App = require('app');
  var Backbone = require('backbone');
  var NotificationView = require('./notification');
  var Notifications = require('../collections/notifications');
  var Buzz = require('buzz');

  var NotificationListView = Backbone.View.extend({
    initialize: function () {
      this.listenTo(Notifications, 'add', this.addOne);
      this.listenTo(Notifications, 'fetch', this.addAll);
      this.listenTo(Notifications, 'remove', this.removeOne);
      this.listenTo(Notifications, 'reset', this.removeAll);

      Notifications.fetch();

      this.listenTo(App, 'notify', function (message, options) {
        options = options || {};
        options.info = options.info || '';
        options.icon = options.icon || '';
        options.url = options.url || '';
        options.silent = options.silent || false;
        options.autoHideDelay = options.autoHideDelay || 3000;
        var isSmall = (window.innerWidth <= 768);
        options.style = options.style || (isSmall ? 'lfa-small' : 'lfa');
        options.elementPosition = options.elementPosition || (isSmall? 'left top' : 'left');


        if (options.url && !options.icon) {
          options.icon = 'fa-info';
        }

        if (options.persistent !== false) {
          Notifications.add({
            message: message,
            info: options.info,
            icon: options.icon,
            url: options.url
          }).save();
        }

        if (options.sound) {
          var sound = new Buzz.sound(options.sound);
          sound.load();
          sound.play();
        }

        if (!options.silent) {
          if (options.$anchor) {
            options.$anchor.notify(message, options);
          } else {
            $.notify(message, options);
          }
        }
      });
    },

    getNotifications: function () {
      return _.invoke(Notifications.toArray(), 'toJSON');
    },

    addOne: function (notification) {
      var view = new NotificationView({
        model: notification
      });
      this.$('.notifications').prepend(view.render().el);
    },

    removeOne: function (notification) {
      this.$('#notification-' + notification.id).remove();
    },

    addAll: function () {
      this.render(_.invoke(Notifications.toArray(), 'toJSON'));
    },
    
    removeAll: function () {
      this.$('.notifications').html('');
    },

    template: function () {
      return window.getMixin('notification-list');
    },

    render: function (notifications) {
      this.$el.html(
        this.template(
          notifications
        )
      );
    },

    clear: function () {
      Notifications.reset();
    },

    events: {
      'click .clear-notifications': 'clear'
    }
  });

  return NotificationListView;
});
