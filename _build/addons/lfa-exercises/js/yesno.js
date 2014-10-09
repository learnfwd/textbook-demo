/**
 * Simple yes / no buttons with local storage and everything
 */
define([
  'jquery',
  'app',
  '../js/exercise',
], function ($, App, Exercises) {
  var YesNo = Exercises.Exercise.extend({
      type: 'YesNo',

      componentDidMount: function () {
        var self = this;

        self.targetState = self.options.answer ? 1 : 2;

        self.yesButton = $('#ex_' + self.id + ' .yes');
        self.noButton =  $('#ex_' + self.id + ' .no');

        self.yesButton.on('click', function () {
          var state = self.get('state');
          self.set('state', state === 1 ? 0 : 1);
        });

        self.noButton.on('click', function () {
          var state = self.get('state');
          self.set('state', state === 2 ? 0 : 2);
        });

        self.yesButton.text(self.options.yes || 'Yes');
        self.noButton.text(self.options.no || 'No');


        // trigger a classroom change event change each time
        // something is changed. that is the state
        self.on('change:state', function() {
          if (!self.changingRemotely) {
            App.trigger('classroom:broadcast', {
              action: 'ex_' + self.id + ':change',
              state: self.get('state')
            });
          }
        });
      },

      onRemoteChanges: function(msg) {
        var self = this;
        self.changingRemotely = true;
        self.set('state', parseInt(msg.state));
        self.changingRemotely = false;
        
        var newValue;

        switch (parseInt(msg.state)) {
          case 1:
            newValue = self.$el.find('.buttons .btn').eq(0).text();
            break;
          case 2:
            newValue = self.$el.find('.buttons .btn').eq(1).text();
            break;
          default:
            newValue = App.T.translate('yesNoValueNothing');
            break;
        }

        var notification = App.T.translate('yesNoChangedNoDescription', [
          msg.from.name || msg.from.id,
          newValue
        ]);

        App.trigger('notify', notification);
        // if(self.options.description)
      },

      render: function () {
        var state = this.get('state');
        var self = this;

        self.yesButton.removeClass('btn-danger btn-success');
        self.noButton.removeClass('btn-danger btn-success');

        var newClass = (state === self.targetState) ? 'btn-success' : 'btn-danger';
        switch (state) {
          case 1:
            self.yesButton.addClass(newClass);
            break;
          case 2:
            self.noButton.addClass(newClass);
            break;
          default:
            break;
        }
      },

      score: function () {
        return 100 * (this.get('state') === this.targetState);
      }
    });

  Exercises.YesNo = YesNo;

  return Exercises;
});
