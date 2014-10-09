define([
  'backbone', 
  '../net/net', 
  'app', 
], function (Backbone, Net, App) {
  var net = Net.singleton();

  var NameInput = Backbone.View.extend({
    initialize: function () {
      this.render();
    },

    tagName: 'input',

    render: function () {
      var self = this;
      var inside = false;

      self.$el.val(net.getDisplayName());
      self.$el.on('change keydown', function(evt) {
        if (evt.type === 'change' || evt.keyCode === 13) {
          inside = true;
          net.setDisplayName(self.$el.val());
          inside = false;
        }
      });

      self.listenTo(App, 'classroom:displayName:change', function (val) {
        if (!inside) {
          self.$el.val(val);
        }
      });
    },
  });

  return NameInput;
});
