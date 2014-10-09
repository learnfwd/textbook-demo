define(function (require, exports, module) {
  var App = require('app');
  var Backbone = require('backbone');

  module.exports = Backbone.View.extend({
    moods: ["angry", "bored", "cheeky",
            "happy", "helpless", "neutral",
            "sad", "sleeping", "smart",
            "smile", "uneasy",
            "unimpressed", "upset",
            "wink", "wondering"],
    tag: 'div',
    className: 'avatar',

    initialize: function() {
      var self = this;
      self.moodStyles = 'avatar-mood-' + self.moods.join(' avatar-mood-');

      App.on('avatar:mood', function (mood) {
        if (mood && typeof mood === 'object' && typeof mood.message === 'string') {
          var notificationOptions = {};
          _.extend(notificationOptions, mood);
          notificationOptions.$anchor  = self.$el;
          App.trigger('notify', mood.message, notificationOptions);
        }
        self.setMood(mood);
      });

      self.render();
    },

    clearTimeout: function () {
      var self = this;
      if (self.timeout) {
        window.clearTimeout(self.timeout);
      }
      if (self.sleepingTimeout) {
        window.clearTimeout(self.timeout);
      }
    },

    setMood: function (mood) {
      var self = this;
      if (!mood) {mood = {};}
      
      if (typeof mood === 'string') {
        // One of the funniest lines ever written
        mood = { mood: mood }; 
      }

      self.mood = _.contains(self.moods, mood.mood) ? mood.mood : 'neutral';

      var interval = mood.interval || 3000;

      self.clearTimeout();
      self.$el.removeClass(self.moodStyles).addClass('avatar-mood-' + self.mood);

      self.timeout = window.setTimeout( function () {
        self.$el.removeClass(self.moodStyles).addClass('avatar-mood-neutral');
      }, interval);

      if (Math.random() > 0.8) { // one in five chances
        self.sleepingTimeout = window.setTimeout( function () {
          self.$el.removeClass(self.moodStyles).addClass('avatar-mood-sleeping');
        }, 25000);
      }
    },

    onClick: function() {
      var self = this;
      var interval = 1500;
      if(Math.random() < 0.7) {
        self.$el.removeClass(self.moodStyles).addClass('avatar-mood-smile');
      } else {
        self.$el.removeClass(self.moodStyles).addClass('avatar-mood-' + 
          self.moods[Math.floor(Math.random()*self.moods.length)]);
          interval = 1500 + Math.floor(5000 * Math.random());
      }

      self.timeout = window.setTimeout( function () {
        self.$el.removeClass(self.moodStyles).addClass('avatar-mood-neutral');
      }, interval);
    },

    events: {
      click: 'onClick',
      mouseover: 'onClick'
    },

    render: function () {
      var self = this;
      self.setMood();
      return self;
    }
  });
});
