/**
 * Full screen exercise contianer
 */
define([
  'jquery',
  'underscore',
  'backbone',
  '../js/exercise'
], function ($, _, Backbone, Exercises) {
  var SeparatorView = Backbone.View.extend({
    tagName: 'span',
    className: 'split-in-syllables-separator',

    initialize: function (options) {
      this.separator = options.separator;
      this.isSelected = options.selected;
      this.render();
    },

    onClick: function () {
      var self = this;
      self.$el.data('margin', self.$el.data('margin') ? 'yes' : undefined);
      self.$el.toggleClass('split-in-syllables-separator-selected');
      self.isSelected = !self.isSelected;
      self.trigger('change');
    },

    events: {
      'click': 'onClick'      
    },

    render: function () {
      var self = this;
      self.$el.empty();

      var $separator = $('<span></span>');
      $separator.html(self.separator);
      self.$el.append($separator);
      if(self.isSelected) {
        self.$el.addClass('split-in-syllables-separator-selected');
      }

      return self;
    },
  });

  var SplitInSyllablesView = Backbone.View.extend({
    tagName: 'div',
    className: 'split-in-syllables-container',

    initialize: function (options) {
      var self = this;
      self.word = options.word;
      self.state = options.state;
      self.separator = options.separator;
      self.letters = self.word.replace(/\^\^/g, '||').split('||');
      self.render();

      self.solution = [];
      _.each(self.word.replace(/[^\^\^|^||]/g, ''), function(elem, index) {
        if (index%2 && elem === '^') {
          self.solution.push((index-1)/2);
        }
      });
    },

    onChange: function () {
      var self = this;
      var $result = self.$('.split-in-syllables-separator');

      var selected = [];
      $result.each(function (index) {
        if ($result.eq(index).hasClass('split-in-syllables-separator-selected')) {
          selected.push(index);
        }
      });
      self.trigger('SelectionUpdated', {selection: selected, solution: self.solution});
    },


    getValue : function() {
      var self = this;
      var items = self.$('.split-in-syllables-letter, .split-in-syllables-separator-selected');
      
      var result = '';
      _.each(items, function (item, index) {
        result = result + items.eq(index).html();
      });
      return result;
    },


    render: function () {
      var self = this;

      self.$el.empty();

      _.each(self.letters, function (letter, index) {
        var $letter = $('<span></span>');
        $letter.addClass('split-in-syllables-letter');
        $letter.html(letter);
        self.$el.append($letter);

        if(index < self.letters.length - 1) {
          var isSelected = _.indexOf(self.state, index) >= 0;
          var separator = new SeparatorView({separator: self.separator, selected: isSelected});

          self.listenTo(separator, 'change', self.onChange);
          self.$el.append(separator.$el);
        }
      });

      return self;
    }
  });

  var SplitInSyllables = Exercises.Exercise.extend({
    type: 'SplitInSyllables',

    newButton: function () {
      return $('<button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#ex_' +
        this.id +
        '_modal">' +
          (this.options.triggerLabelText || 'Show') +
        '</button>');
    },

    addTriggerClasses: function () {
      var self = this;
      this.$trigger.each(function (index) {
        self.$trigger.eq(index)
          .attr('data-toggle', 'modal')
          .attr('data-target', '#ex_' + self.id + '_modal');
      });
    },

    onChangeSelection: function (params) {
      var selection = params.selection;
      var solution  = params.solution;
      var common = _.intersection(selection, solution);
      var different = _.difference(selection, solution);

      this.set('state', selection);

      var score = (common.length - different.length)/ solution.length * 100;
      score = Math.round(Math.max(0, score));
      this.set('score', score);
    },

    componentDidMount: function () {
      var self = this;
      self.$preview = self.$el.find('.preview');
      self.$result  = self.$el.find('.result');
      self.$trigger = self.$el.find('.trigger');
      self.$body    = self.$el.find('.split-in-syllables-body');

      if (self.$body.length === 0) {
        self.$body = $('<span></span>');
        self.$body.addClass('split-in-syllables-body');
        if(self.options.isModal) {
          self.$el.find('.modal-body').append(self.$body);
        }
        else {
          self.$el.append(self.$body);
        }
      }
      self.view = new SplitInSyllablesView({
        word: self.options.word,
        separator: self.options.separator,
        state: self.get('state')
      });

      self.listenTo(self.view, 'SelectionUpdated', self.onChangeSelection);      
      self.$body.empty().append(self.view.$el);
      self.view.onChange();

      self.irritationLevel = self.options.irritationLevel ||
        Math.round(3.2 * self.options.word.replace(/\^\^/g, '||').split('||').length);

      if(self.options.isModal) {
        self.$el.append(self.$preview.detach());
        
        // Maybe we have a custom modal header
        var $header = self.$el.find('.full-screen-header');
        if($header.length) {
          self.$el.find('.modal-header span.replaceable').empty().append($header.detach());
        }

        if(self.$trigger.length > 0) {self.addTriggerClasses(); }
        else {self.$trigger = self.newButton(); self.$el.append(self.$trigger);}  
  
        //make the separators move after a little bit
        self.$el.find('.modal').on('show.bs.modal', self.present.bind(self));
      }
    },

    present: function () {
      var self = this;
      self.isPresented = true;

      self.$el.find('.split-in-syllables-separator').each(function (index, sep) {
        var $sep = $(sep);
        $sep.removeClass('updownshake');
        
        setTimeout(function () {
          $sep.addClass('updownshake');
        }, (index+1)*300*Math.random());
      });
    },

    render: function () {
      this.$result.html(this.view.getValue());
    },

    score: function () {
      return this.get('score');
    }
  });

  Exercises.SplitInSyllables = SplitInSyllables;

  return Exercises;
});
