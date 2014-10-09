/**
 * Simple yes / no buttons with local storage and everything
 */
define([
  'jquery',
  '../js/exercise',
], function ($, Exercises) {
  // FIXME: Get these out of here!!
  var generateMultiplyToAdditionPattern = function (a,b) {
    var i = 0;
    var r = '^\\s*';
    
    while (i < a - 1) {
      r = r + b + '\\s*\\+\\s*';
      i++;
    }

    r = r + b + '\\s*$';

    if (a === b) {
      return r;
    }

    r = r + '|^\\s*';
    i = 0;

    while (i < b - 1) {
      r = r + a + '\\s*\\+\\s*';
      i++;
    }
    r = r + a + '\\s*$';

    return r;
  };

  var generateReflexiveMultiplyPattern = function (a,b) {
    var r = '^\\s*'+ a + '\\s*[x|X|\*]\\s*' + b + '\\s*$';
    
    if (a === b) {
      return r;
    }

    r += '|^\\s*' + b + '\\s*[x|X|\*]\\s*' + a + '\\s*$';
    return r;
  };

  var allowSpacesOn = function (expression) {
    if (typeof expression !== 'string'){
      return;
    }
    
    return '^\\s*' + 
              expression.replace(/\s+/g, '')
                .replace(/([\/\+\-\(\)])/g,'\\$1')
                .replace(/(\w)(\W+)/g, '$1\\s*$2\\s*') + 
              '\\s*$';
  };

  var Textline = Exercises.Exercise.extend({
      type: 'Textline',
      defaultIrritationLevel: 25,

      componentDidMount: function () {
        var self = this;

        self.inputType = self.options.type || 'text';

        self.max = self.options.max; // ok if undefined
        self.placeholder = self.options.placeholder || '';
        self.title = self.options.title || '';
        self.trim = self.options.trim || false;
        self.maxlength = self.options.max || '';
        self.size = self.options.size || (self.options.max && Math.min(50, self.options.max)) || '';
        self.rows = self.options.rows || 4;
        self.pattern = self.options.pattern || '*';
        
        // Set more reasonable irritation levels
        var c = parseInt(self.maxlength || self.size); // irritation coefficient :)
        if('numeric' === self.options.rows) {
          c *= 2 * self.options.rows;
        }
        
        if (!isNaN(c)) {
          self.irritationLevel = self.options.irritationLevel || c * c + self.defaultIrritationLevel;
        }

        self.$input = self.$el.find('.input');
        if (self.$input.length === 0) {
          self.$input = self.$el;
        }

        if (self.inputType === 'multiply-to-addition') {
          self.inputType = 'numeric';
          self.options.pattern = self.options.regexp = generateMultiplyToAdditionPattern(
              self.options.a || 1,
              self.options.b || 1
            );
        }

        if (self.inputType === 'reflexive-multiply') {
          self.inputType = 'numeric';
          self.options.pattern = self.options.regexp = generateReflexiveMultiplyPattern(
              self.options.a || 1,
              self.options.b || 1
            );
        }
        
        if (self.options.allowWhitespace) {
          self.options.regexp = allowSpacesOn(self.options.regexp);
          self.options.pattern = allowSpacesOn(self.options.pattern);
        }

        self.regexp    = new RegExp(
          self.options.regexp || '.+',
          self.options.regexpFlags || ''
        );

        if (self.inputType === 'multiline') {
          self.$input.append($('<textarea class="input-box" type="' +
            self.inputType +
            '" placeholder="' +
            self.placeholder +
            '" title="' +
            self.title +
            '" pattern="' +
            self.pattern +
            '" cols="' +
            self.size +
            '" rows="' +
            self.rows +
            '" maxlength="' +
            self.maxlength +
            '"></textarea>'));   
        } else {
          self.$input.append($('<input class="input-box" type="' +
            self.inputType +
            '" placeholder="' +
            self.placeholder +
            '" pattern="' +
            self.pattern +
            '" size="' +
            self.size +
            '" title="' +
            self.title +
            '" maxlength="' +
            self.maxlength +
            '"/>'));          
        }       

        var $box = self.$input.find('.input-box');

        var onInputChange = function(e) {
          var state = e.target.value;
          if (state === self.get('state')) { return; }
          self.set('state', state);
        };

        $box.keyup(onInputChange);
        $box.scroll(onInputChange);
        $box.click(onInputChange);
        $box.blur(onInputChange);        
      },

      render: function () {
        var self  = this;
        var state = self.get('state') || self.options.initialText || '';

        var currentText = self.$input.find('.input-box').val();
        
        if (state !== currentText) {
          self.$input.find('.input-box').val(state);
        }

        var matches = state.match(self.regexp);
        var i = 0, l = matches && matches.length;

        if(self.options.disabled) {
           self.$input.find('.input-box').prop('disabled', true);
        }

        while(i < l) {
          self.$el.find('[class^=match'+i+']').text(matches[i]);
          i++;
        }

        if (self.maxlength) {
          var remaining = self.maxlength - state.length;
          var $remaining = self.$el.find('.remaining');
          $remaining.text(remaining);
          $remaining.removeClass('remaining-alert');

          if (1.0 * remaining / self.maxlength < 0.2) {
            $remaining.addClass('remaining-alert');
          }
        }
      },

      score: function () {
        var self  = this;
        var state = self.get('state') || '';

        var matches = state.match(self.regexp);

        if (matches && matches.length > 0) {
          return 100;
        }
        else {
          return 0;
        }
      }
    });

  Exercises.Textline = Textline;

  return Exercises;
});