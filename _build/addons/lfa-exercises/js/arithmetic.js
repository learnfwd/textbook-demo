/**
 * Simple yes / no buttons with local storage and everything
 */
define([
  'jquery',
  '../js/exercise',
], function ($, Exercises) {
  var Arithmetic = Exercises.Exercise.extend({
      type: 'Arithmetic',
      sanitize: function(s) {
        return s.toString().replace(/[^0-9\-+=\(\)\$\*\%\*\/<>\.,\|\&]/g, '').replace(',', '.');
      },

      onChildrenReady: function () {
        var self = this;
        //self.options.ignoreKidsScore = true;
        self.expression = self.sanitize(self.options.expression);

        for(var i = 0; i < self.children.length; i++) {
          self.expression = self.expression.replace(new RegExp('\\$' + (i+1), 'g'), 
            'parseFloat(eval(self.sanitize(self.children['+ i +'].value())))');
        }
        self._score();
      },

      onChildChangedState: function () {
        this.trigger('change:state');
      },

      score: function () {
        try {
          var self = this;
          var score = eval(self.expression);
          if(score) {
            return 100;
          }
          else {
            return 0;
          }
        } 
        catch(err) {
          return 0;
        }
      }
    });

  Exercises.Arithmetic = Arithmetic;

  return Exercises;
});