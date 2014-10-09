define([
  'jquery',
  'backbone',
  '../js/exercise',
], function ($, Backbone, Exercises) {
  var StaticBlock = Backbone.View.extend({
    tag: 'span',
    className: 'calcuwords-block calcuwords-block-static',

    properMath: function (what) {
      return what.
        replace(/\*/g, '&times;').
        replace(/\-\-/g, '&mdash;').
        replace(/\-/g, '&ndash;').
        replace(/\//g, '&divide;');
    },

    initialize: function(options) {
      var self = this;
      self.row = options.row;
      self.column = options.column;
      self.content = self.properMath(options.content);
      self.render();
    },

    render: function() {
      var self = this;
      self.$el.html(self.content);
      self.$el.addClass('calcuwords-block-row-' + self.row);
      self.$el.addClass('calcuwords-block-col-' + self.column);
      return self;
    }
  });

  var EditableBlock = Backbone.View.extend({
    tag: 'span',
    className: 'calcuwords-block calcuwords-block-editable',

    operators: '+-*/()<>×xX÷–—'.split(''),

    properMath: function (what) {
      return what.
        replace(/\*/g, '×').
        replace(/x/ig, '×').
        replace(/\-\-/g, '—').
        replace(/\-/g, '–').
        replace(/\//g, '÷').
        replace(/\:/g, '÷');
    },

    initialize: function(options) {
      var self = this;
      self.row = options.row;
      self.column = options.column;
      self.letter = options.letter;
      self.direction = options.direction;

      if (_.indexOf(self.operators, self.letter) >= 0){
        self.isOperator = true;
        self.letter = self.properMath(self.letter);
      }

      self.initialContent = options.initialContent || '';
      self.render();
    },

    add: function(what) {
      var content = parseInt(this.$('input').val());
      
      if(!isNaN(content)) {
        this.changeContent(''+(content + what + 10) % 10);
      }
    },

    onKeyDown: function (e) {
      switch (e.keyCode) {
        case 37:
          this.trigger('move', {direction: 'left', row: this.row, column: this.column});
          break;
        case 38:
          this.add(1);
          break;
        case 39:
          this.trigger('move', {direction: 'right', row: this.row, column: this.column});
          break;
        case 40:
          this.add(-1);
          break;
        case 8:
          // Because digits are usually 
          // filled in in the oposite direction
          // this is why right goes left
          this.trigger('move', {direction: this.direction?'right':'left', row: this.row, column: this.column});
          this.changeContent('');
          break;
        default:
          return;
      }
      e.preventDefault();
      e.stopPropagation();
    },

    changeContent: function (content) {
      if (this.isOperator && content.length > 0) {
        if (_.indexOf(this.operators, content) < 0){
          this.changeContent('');
          return;
        }
        content = this.properMath(content);
      }

      this.$('input').val(content);
      this.content = content;
      
      if(content !== this.oldContent) {
        this.$el.removeClass('calcuwords-block-ok calcuwords-block-not-ok');
        
        if (content.length) {
          this.$el.addClass(
                (this.letter.compareIgnoringCaseAndDiacritics(content) ? 
                  'calcuwords-block-ok' : 
                  'calcuwords-block-not-ok')
          );
        }

        this.trigger('change', {row: this.row, column: this.column, letter: content, oldContent: this.oldContent});
        this.oldContent = content;
      }
    },

    onInputChange: function () {
      var content = this.$('input').val();
      content = content.slice(-1).toLocaleUpperCase();
      this.changeContent(content);

      // Because digits are usually 
      // filled in in the oposite direction
      // this is why right goes left
      this.trigger('move', {direction: this.direction?'left':'right', row: this.row, column: this.column});
    },
    
    focus: function () {
      this.$('input').focus();
      this.$('input').select();
    },

    onFocus: function () {
      this.$('input').select();
    },

    events: {
      'keydown': 'onKeyDown',
      'input': 'onInputChange',
      'click': 'onFocus'
    },

    render: function() {
      var self = this;

      self.$el.empty().append(
        $('<input>').val(self.initialContent)
      );

      self.$el.addClass('calcuwords-block-row-' + self.row);
      self.$el.addClass('calcuwords-block-col-' + self.column);
      if(self.isOperator) {
        self.$el.addClass('calcuwords-block-operator');
      }

      if(self.initialContent) {
        self.$el.addClass(
            (self.letter.compareIgnoringCaseAndDiacritics(self.initialContent) ? 
              'calcuwords-block-ok' : 
              'calcuwords-block-not-ok')
          );
      }
      return self;
    }
  });

  var CalcuwordsView = Backbone.View.extend({
    tag: 'div',
    className: 'calcuwords-grid',

    initialize: function(options) {
      var self = this;

      self.words = options.words;
      self.state = options.state;
      self.lines = options.lines;
      self.direction = options.direction;

      self.on('change:state', self.score);

      self.render();
    },

    reinitialize: function(options) {
      var self = this;
      options = options || {};

      self.words = options.words &&self.words;
      self.state = options.state &&self.state;
      self.lines = options.lines &&self.lines;
      self.direction = options.direction && self.direction;

      self.render();
    },

    getIndexOfView: function(row, column) {
      var self = this;

      var i = 0;
      while (i < self.editableBlocks.length) {
        if( 
          self.editableBlocks[i][0] === row &&
          self.editableBlocks[i][1] === column) {
          break;
        }
        i++;
      }
      return i;
    },
    
    onChange: function (params) {
      this.state[this.getIndexOfView(params.row, params.column)] = params.letter;
      this.trigger('change:state', this.state, this);
    },

    score: function() {
      var self = this;

      var _score = Math.round(100 * self.$('.calcuwords-block-ok').length / self.editableBlocks.length );

      if(self._score !== _score ) {
        self._score = _score;
        self.trigger('change:score', _score, self);
      }

      return _score;
    },
    
    onMove: function(params) {
      var self = this;
      var row = params.row;
      var column = params.column;
     
      var i = self.getIndexOfView(row, column);

      if (params.direction === 'left') {
        i--;
      } else {
        i++;
      }

      i = (i + self.editableBlocks.length) % self.editableBlocks.length;
      self.views[self.editableBlocks[i][0]][self.editableBlocks[i][1]].focus();
    },

    render: function() {
      var self = this;
      self.$el.empty();

      _.invoke(self.views || [], 'destroy');

      self.state = self.state || [];
      self.views = [];
      self.editableBlocks = [];

      _.each(self.words, function(blocks, i) {
        self.views[i] = [];

        var $row = $('<div></div>').
                addClass('calcuwords-row').
                addClass('calcuwords-row-' + i);

        _.each(blocks, function(block, j) {
          var letter = $.trim(block);
           if (letter.substr(-1) === '?') {
            self.views[i][j] = new EditableBlock({
              row: i, column: j, 
              initialContent: self.state[self.editableBlocks.length],
              letter: letter.slice(0, -1),
              direction: self.direction  !== 'right' && self.words.length > 1
            });

            self.listenTo(self.views[i][j], 'move', self.onMove);
            self.listenTo(self.views[i][j], 'change', self.onChange);

            self.editableBlocks.push([i, j, letter.slice(0, -1), self.views[i][j]]);
          } else {
            self.views[i][j] = new StaticBlock({
              row: i, column: j,
              content: letter
            });
          }
          $row.append(self.views[i][j].$el);
        });

        if(_.contains(self.lines, i + 1, true)) {
          $row.append($('<hr>'));
        }

        self.$el.append($row);
      });
      
      self.score();
      return self;
    }
  });

  var Calcuwords = Exercises.Exercise.extend({
    type: 'Calcuwords',
    componentDidMount: function () {
      var self = this;
      var state = self.get('state') || [];
      var words = self.options.words;
      var linesAt = self.options.linesAt || [];
      var direction = self.options.direction;

      self.ignoreScore = self.options.ignoreScore = self.options.ignoreScore || (words.join('').indexOf('?') < 0);
      self.view  = new CalcuwordsView({
        words: words,
        state: state,
        lines: linesAt,
        direction: direction
      });

      self.listenTo(self.view, 'change:state', function(newState) {
        self.set('state', newState);
        self.trigger('change:state', newState, self);
      });

      self.listenTo(self.view, 'change:score', function(newScore) {
        self.set('score', newScore);
        self.trigger('change:score', newScore, self);
      });

      self.$grid = self.$el.find('.calcugrid');
      if (self.$grid.length === 0) {
        self.$grid = $('<div></div>').addClass('calcugrid');
        self.$el.append(self.$grid);
      }

      self.$grid.empty().append(self.view.$el);
    },

    score: function() {
      return this.get('score');
    },

    value: function() {
      return this.get('state').join('').
        replace(/×/g, '*').
        replace(/–/g, '-').
        replace(/—/g, '-').
        replace(/÷/g, '/');
    }
  });

  Exercises.Calcuwords = Calcuwords;

  return Exercises;
});