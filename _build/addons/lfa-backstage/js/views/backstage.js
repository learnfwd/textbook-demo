define(function (require) {
  var Backbone = require('backbone');
  var _ = require('underscore');

  var BackstageView = Backbone.View.extend({
    initialize: function () {
      this.render();
    },

    template: function () {
      return window.getMixin('backstage')();
    },

    render: function () {
      var self = this;

      self.$el.html(self.template());

      var tabContent = self.$('.tab-content');
      var tabButtons = self.$('ul.notif-tabs');
      var paneConstructors = window.backstagePanes || [];
      self.panes = _.map(_.sortBy(paneConstructors, function (o) { return o.order; }), function (Pane) {
        var paneEl = $('<div id="tab-' + Pane.paneName + '" class="tab-pane"></div>');
        var tabEl = $('<li style="width: ' + 
          Math.floor(100 / paneConstructors.length) + 
          '%"></li>'
        );
        tabContent.append(paneEl);
        tabButtons.append(tabEl);
        return new Pane({
          el: paneEl,
          tabEl: tabEl
        });
      });

      var activePanes = _.sortBy(self.panes, function (o) { return -o.constructor.activePriority; });
      if (activePanes.length) {
        var activePane = activePanes[0];
        activePane.$el.addClass('active');
        activePane.$tabEl.addClass('active');
      }

      return self;
    }
  });

  return BackstageView;
});
