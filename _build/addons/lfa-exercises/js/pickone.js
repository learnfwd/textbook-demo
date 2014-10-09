define([
  'app',
  '../js/exercise',
], function (App, Exercises) {
  var PickOne = Exercises.Exercise.extend({
    type: 'PickOne',

    componentDidMount: function () {
      var self = this;
      var i, howMany;

      self.answer = self.options.answer || 1;
      self.choices = self.options.choices || [];
      self.placement = self.options.placement || 'right';
      self.options.placeholder = self.options.placeholder || '..';

      if (self.choices.length === 0) {
        howMany = self.answer + 4 * Math.random();

        for (i = 1; i <= howMany; i++) {
          self.choices.push('' + i);
        }
      }

      for (i = 0, howMany = self.choices.length; i < howMany; i++) {
        self.choices[i] = self.choices[i].toString();
      }

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

      self.irritationLevel = self.options.irritationLevel || Math.max(3, Math.round(self.choices.length / 2));

      self.$btnTrigger  = self.$el.find('.trigger');

      if (self.$btnTrigger.length === 0) {
        self.$btnTrigger = $('<button type="button" class="btn btn-default trigger"></button>');
        self.$el.append(self.$btnTrigger);
      }

      self.choiceContainer = self.$el.find('.choices-container');

      var onClick = function (e) {
        var $target = $(e.target);
        var state;

        do {
          state = $target.data('value');
          if(state) {break;}
          $target = $target.parent();
        } while ($target.length > 0);

        self.set('state', state);
        self.$btnTrigger.popover('hide');
      };

      self.popover = self.$btnTrigger.popover({
        html: true,
        trigger: 'manual',
        placement: this.placement,
        content: function () {
          self.choiceContainer.css('width', $('article').width() * 0.5);
          self.choiceContainer.css('display', 'block');
          self.choiceContainer.empty();

          var $choices = $('<div class="choices"></div>');
          self.choiceContainer.append($choices);

          var $btnGroup = null;
          var height = 0;
          var width = 0;

          var state = self.get('state') - 1;

          for (var i = 0; i < self.choices.length; i++) {
            var $button = $(
              '<button type="button" class="btn btn-default" data-value="' + (i+1) + '">' +
                self.choices[i] +
              '</button>');

            if (!self.options.noClassChange && state === i) {
              var newClass = (self.options.ignoreAnswer || i === self.answer - 1) ? 'btn-success' : 'btn-danger';
              $button.addClass(newClass);
            }

            var hadBtnGroup = true;
            if (!$btnGroup) {
              $btnGroup = $('<div class="btn-group"></div>');
              $choices.append($btnGroup);
              hadBtnGroup = false;
            }

            $btnGroup.append($button);

            var newHeight = $choices.height();
            if (height !== newHeight && hadBtnGroup) {
              $button.remove();
              $btnGroup = null;
              i--;
            } else {
              var newWidth = $btnGroup.width();
              if (newWidth > width) {
                width = newWidth;
              }
            }
            height = newHeight;
          }

          self.choiceContainer.css('display', '');
          $choices.css('width', width + 2);
          $choices.css('height', height + 2);
          return $choices[0].outerHTML;
        }
      });

      self.popover.on('shown.bs.popover', function () {
        var buttons = $('#ex_' + self.id + ' .popover button');

        buttons.each(function (id, button) {
          $(button).click(onClick);
        });
      });

      var onClickInside = function() {
        self.$btnTrigger.popover('show');
      };

      var onClickOutside = function(e) {
        var pop = $('#ex_' + self.id + ' .popover');
        if (!(pop.is(e.target) || pop.has(e.target).length)) {
          self.$btnTrigger.popover('hide');
          e.preventDefault();
          e.stopPropagation();
        }
      };

      self.$btnTrigger.on('click', onClickInside);

      self.popover.on('show.bs.popover', function () {
        $(document).on('mouseup', onClickOutside);
        self.$btnTrigger.off('click', onClickInside);
      });

      self.popover.on('hide.bs.popover', function () {
        $(document).off('mouseup', onClickOutside);
      });

      self.popover.on('hidden.bs.popover', function () {
        self.$btnTrigger.on('click', onClickInside);
      });
    },

    onRemoteChanges: function(msg) {
      var self = this;
      self.changingRemotely = true;
      self.set('state', parseInt(msg.state));

      self.changingRemotely = false;

      var newValue = self.choices[parseInt(msg.state)- 1] ;

      if (!newValue) {
        self.changingRemotely = true;
        self.set('state', undefined);
        self.changingRemotely = false;
        newValue =  App.T.translate('yesNoNothing');
      }

      var notification = App.T.translate('yesNoChangedNoDescription', [
        msg.from.name || msg.from.id,
        newValue
      ]);

      App.trigger('notify', notification);
    },

    render: function () {
      var state = parseInt(this.get('state')) - 1;


      if (this.choices[state]) {
        this.$btnTrigger.html(this.choices[state]);

        if(!this.options.noClassChange) {
          this.$btnTrigger
            .removeClass('btn-success btn-danger')
            .addClass((this.options.ignoreAnswer || this.get('state') === this.answer) ? 'btn-success' : 'btn-danger');
        }
      } else {

        this.$btnTrigger.html(this.options.placeholder);
      }

    },

    score: function () {
      return 100 * (this.options.ignoreAnswer || this.get('state') === this.answer);
    }
  });

  Exercises.PickOne = PickOne;

  return Exercises;
});
