define([
  'app',
  '../js/exercise',
], function (App, Exercises) {
  var SelectToHighlight = Exercises.Exercise.extend({
    type: 'SelectToHighlight',

    componentDidMount: function () {
      var self = this;
      var state = self.get('state') || [];

      self.$spans = self.$el.find('.good, .bad');
      self.startingScore = self.options.startingScore || 0;
      self.selectedClass = self.options.selectedClass || 'selected';
      self.scoreN = self.options.scoreN;

      self.$spans.each(function (index) {
        var $span = self.$spans.eq(index);

        $span.data({
          index: index,
          isGood: $span.hasClass('good')
        });

        state[index] = state[index] || 0;

        $span.on('click', function () {
          var s = self.get('state') || [];
          s[index] = s[index] ? 0 : 1;

          self.set('state', s);
          self.trigger('change:state', s, self);
        });
      });

      self.set('state', state);

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
      var oldState = self.get('state');

      self.changingRemotely = true;
      self.set('state', msg.state);
      self.changingRemotely = false;

      var differences = [];

      for(var i = 0, max = Math.max(oldState.length, msg.state.length); i < max; i++) {
        var x = oldState[i];
        var y = msg.state[i];

        if(x !== y)  {
          differences.push(App.T.translate(
              y ? 'selectToHighlightSelected' : 'selectToHighlightUnselected',
              self.$spans.eq(i).text()
            )
          );
        }
      }

      var notification = App.T.translate('selectToHighlightNoDescroption', [
        msg.from.name || msg.from.id,
        differences.join(', ')
      ]);

      App.trigger('notify', notification);
    },

    render: function () {
      var self = this;
      var state = self.get('state') || [];

      self.$spans.each(function (index, span) {
        var $span = $(span);

        if (state[index]) {
          $span.addClass(self.selectedClass);
        } else {
          $span.removeClass(self.selectedClass);
        }
      });
    },

    score: function () {
      var self = this;
      var state = self.get('state') || [];

      var s = 0;
      var n = self.scoreN || self.$spans.filter('.good').length || 1;

      self.$spans.each(function (index) {
        var $span = self.$spans.eq(index);
        var data = $span.data();
        var isGood = data.isGood;

        if (state[index]) {
          if (isGood) {
            s++;
          } else {
            s--;
          }
        }
      });

      s = Math.min(Math.max(self.startingScore + (100.0 * s / n), 0), 100);
      return Math.round(s);
    }
  });

  Exercises.SelectToHighlight = SelectToHighlight;

  return Exercises;
});
