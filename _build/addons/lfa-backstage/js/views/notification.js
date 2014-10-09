define(function (require) {
  var Backbone = require('backbone');
  var _ = require('underscore');

  var NotificationView = Backbone.View.extend({
    template: function (obj) {
      var html = window.getMixin('notification')(obj);

      return html;
    },

    render: function () {
      var data = this.model.toJSON();
      _.extend(
        data,
        { createdAt: moment(data.createdAt).fromNow() }
      );

      this.$el.html(
        this.template(
          data
        )
      );
      return this;
    },

    events: {
      'click': function () {
        this.$('.notification').toggleClass('active');
      },
      'click .notification .icon': function () {
        var url = this.model.toJSON().url;
        if (url) {
          window.App.book.show(url);
        }
      }
    }
  });

  return NotificationView;
});
