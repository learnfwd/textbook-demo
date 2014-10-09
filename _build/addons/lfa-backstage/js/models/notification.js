define(function (require) {
  var Backbone = require('backbone');

  var Notification = Backbone.Model.extend({
    initialize: function () {
      this.set('createdAt', this.get('createdAt') || +new Date());
    },

    defaults: {
      message: '',
      info: '',
      icon: ''
    }
  });

  return Notification;
});
