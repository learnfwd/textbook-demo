define([
  '../js/exercise',
], function (Exercises) {
  var NumPad = Exercises.Exercise.extend({
    type: 'NumPad',

    componentDidMount: function () {
      var self = this;

      self.answer = self.options.answer || 1;
      self.placement = self.options.placement || 'right';
      self.keypad  = $('#ex_' + self.id + ' .numpad-hidden');
      self.options.placeholder = self.options.placeholder || '?';

      if(!self.options.displayDecimalSeparator) {
        self.$el.find('[data-value="."]').hide();
      }

      // Look for a trigger button. If not, add one
      self.btnTrigger  = $('#ex_' + self.id + ' .trigger');
      if(self.btnTrigger.length === 0) {
        self.btnTrigger = $('<button type="button" class="btn btn-default trigger">'+
          self.options.placeholder +
          '</button>');
        self.$el.prepend(self.btnTrigger);
      }

      var onChange = function (e) {
        var code = e.which;
        if (code === 13) { e.preventDefault(); }
        if (code === 32 || code === 13 || code === 188 || code === 186) {
          self.btnTrigger.popover('hide');
        }

        var state = self.get('state') || '';
        state = e.target.value;

        var numDigits = self.options.numDigits;
        if(numDigits > 0) {
          state = state.substr(-numDigits);
        }

        self.set('state', state);

        self.trigger('change:state', state, self);
      };

      var onClick = function (e) {
        var state = self.get('state') || '';
        var btn = $(e.target).data('value');

        switch (btn) {
          case '.':
            if(state === '') {
              return;
            }
            state = state + '' + btn;
            break;
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
            if(state === '0') {
              return;
            }
            state = state + '' + btn;
            break;
          case 'submit':
            self.btnTrigger.popover('hide');
            break;
          case 'clear':
            state = '';
            self.$el.find('[class^=result]').text(self.options.placeholder);
            break;

        }

        var numDigits = self.options.numDigits;
        if(numDigits > 0) {
          state = state.substr(-numDigits);
        }

        self.set('state', state);

        if(self.answer < 10) {
          self.btnTrigger.popover('hide');
        }
      };

      self.popover = self.btnTrigger.popover({
        html: true,
        placement: this.placement,
        content: function () {
          return self.keypad.html();
        }
      });

      self.popover.on('shown.bs.popover', function () {
        var buttons = $('#ex_' + self.id + ' button');

        var state = self.get('state') || '';
        $('#ex_' + self.id + ' .display input').val(state);


        buttons.each(function (id, button) {
          $(button).click(onClick);
        });

        var $input = $('#ex_' + self.id + ' input');
        $input.keyup(onChange);
        $input.focus();
      });
    },

    render: function () {
      var self = this;
      var state = self.get('state') || '';

      self.$el.find('.display input').val(state);
      self.$el.find('.result').text(state);

      var x = parseInt(state);
      var numberOfDigits = 1 + Math.log(x) / 2.302585092994046; // i.e. ln(x) / ln(10)

      for (var i = 0; i < numberOfDigits; i++) {
        self.$el.find('.result' + i).text(x % 10);
        x = Math.floor(x/10);
      }
    },

    score: function () {
      var score = 100 * (this.get('state') === '' + this.answer);
      this.trigger('change:score', score);
      return score;
    }
  });
  
  Exercises.NumPad = NumPad;

  return Exercises;
});