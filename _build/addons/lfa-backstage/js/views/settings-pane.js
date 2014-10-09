define(function(require) {
  var Backbone = require('backbone');

  var SettingsPane = Backbone.View.extend({
    initialize: function (opts) {
      opts = opts || {};
      this.$tabEl = opts.tabEl;
      this.render();
    },

    tabTemplate: function () {
      return window.getMixin('settings-pane-tab')();
    },

    template: function () {
      return window.getMixin('settings-pane')();
    },

    render: function () {
      var self = this;
      self.$el.html(self.template());
      self.$tabEl.html(self.tabTemplate());

      var content = self.$('.additional-settings');
      var paneConstructors = window.backstageSettingPanes || [];
      self.panes = _.map(_.sortBy(paneConstructors, function (o) { return o.order; }), function (Pane) {
        var paneEl = $('<div></div>');
        content.append(paneEl);
        return new Pane({
          el: paneEl,
        });
      });

      var teacherModeToggle = self.$el.find('#teacher-mode-toggle');
      function setTeacherMode(newTm) {
        if (newTm !== tm) {
          tm = newTm;
          if (tm) {
            self.$el.find('#teacher-hidden').remove();
            self.$el.append('<style id="teacher-visible">.teacher-hidden{display:none;}</style>');
          } else {
            self.$el.append('<style id="teacher-hidden">.teacher-visible{display:none;}</style>');
            self.$el.find('#teacher-visible').remove();
          }
          window.App.storage.setItem('teacherMode', tm ? 'true' : 'false');
        }
      }


      var teacherMode = window.App.storage.getItem('teacherMode');

      var tm = 3; //de ce nu?

      setTeacherMode(teacherMode === undefined || teacherMode === 'true');
      teacherModeToggle.toggleClass('checked', tm);
      teacherModeToggle.on('click', function() {
        teacherModeToggle.toggleClass('checked');
        setTeacherMode(!tm);
      });
    },
  });

  SettingsPane.order = 10;
  SettingsPane.activePriority = 0;
  SettingsPane.paneName = 'settings';

  window.backstagePanes = window.backstagePanes || [];
  window.backstagePanes.push(SettingsPane);
  return SettingsPane;
});
