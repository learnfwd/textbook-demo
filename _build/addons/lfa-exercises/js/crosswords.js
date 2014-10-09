/**
 * Full screen exercise contianer
 */
define([
  'jquery',
  'backbone',
  '../js/exercise',
], function ($, Backbone, Exercises) {
  var CrosswordsLetterView = Backbone.View.extend({
    initialize: function (options) {
      this.row    = options.row;
      this.column = options.column;
      this.letter = options.letter;
      this.fixed = options.fixed;
      this.content = options.content || this.fixed ? this.letter : '';
      this.oldContent = this.content;
      this.number = options.number;
      this.render();
    },

    onKeyDown: function (e) {
      switch (e.keyCode) {
        case 37:
          this.trigger('move', {direction: 'left', row: this.row, column: this.column});
          break;
        case 38:
          this.trigger('move', {direction: 'up', row: this.row, column: this.column});
          break;
        case 39:
          this.trigger('move', {direction: 'right', row: this.row, column: this.column});
          break;
        case 40:
          this.trigger('move', {direction: 'down', row: this.row, column: this.column});
          break;
        case 8:
          this.trigger('move', {direction: 'previous', row: this.row, column: this.column});
          this.changeContent(this.fixed ? this.letter : '');
          break;
        default:
          return;
      }
      e.preventDefault();
      e.stopPropagation();
    },

    changeContent: function (content) {
      this.$('input').val(content);
      this.content = content;

      if(content !== this.oldContent) {
        this.$el
              .removeClass('xw-letter-ok xw-letter-notok')
              .addClass(
                (this.letter.compareIgnoringCaseAndDiacritics(content) ? 'xw-letter-ok' : 'xw-letter-notok')
              );
        this.trigger('change', {row: this.row, column: this.column, letter: content, oldContent: this.oldContent});
        this.oldContent = content;
      }
    },

    onInputChange: function () {
      var content = this.fixed ? this.letter : this.$('input').val();
      content = content.slice(-1).toLocaleUpperCase();
      this.changeContent(content);
      this.trigger('move', {direction: 'next', row: this.row, column: this.column});
    },

    onFocus: function () {
      this.$('input').select();
      this.trigger('move', {direction: 'reset-direction', row: this.row, column: this.column});
    },

    events: {
      'keydown': 'onKeyDown',
      'input': 'onInputChange',
      'click': 'onFocus'
    },

    focus: function () {
      this.$('input').focus();
    },

    setWordId: function (id) {
      this.$el.addClass('xwgrid-word-id-' +  id);
    },

    render: function () {
      this.$el.empty();
      this.$el.addClass('xwgrid-letter');
      this.$el.addClass('xwgrid-letter-non-blank');
      this.$el.addClass('xwgrid-letter-row-'    + this.row);
      this.$el.addClass('xwgrid-letter-column-' + this.column);
      this.$el.addClass('xwgrid-letter-letter-' + this.letter);
      
      if(this.number !== ' ') {
        var $num = $('<span></span>');
        $num.addClass('xwnumber');
        $num.text(this.number);
        this.$el.append($num);        
      }

      var $input = $('<input type="text"/>');

      if (this.fixed) {
        this.$el.addClass('xw-letter-fixed');
      }

      if (this.content && this.content !== '')  {
        $input.val(this.content);
        if (this.content === this.letter) {
          this.$el.addClass('xw-letter-ok');
        } else {
          this.$el.addClass('xw-letter-notok');
        }
      }

      this.$el.append($input);

      return this;
    }
  });

  var CrosswordsView = Backbone.View.extend({
    tagName: 'div',
    className: 'xwgrid sans',

    initialize: function (options) {
      var self = this;
      var words = options.words;

      var letters = [];
      var numbers  = [];
      var fixed = [];

      _.each(words, function (word) {
        letters.push(word.replace(/\d|>/g, ' ').replace(/\s/g, '').split(''));
        numbers.push(word.replace(/\s/g, '').replace(/[^\d]/g, '_').split('_'));
        fixed.push(word.replace(/\d+|\s+/g, '').replace(/[^>]/g, '_').replace(/>_/g, '>').split(''));
      });

      self.letters = letters;
      self.numbers = numbers;
      self.fixed   = fixed;
      self.state = options.state || [];
      
      self.createSolutionMatrix();
      self.render();
    },

    createSolutionMatrix: function () {
      var self = this;

      // Create a solution matrix
      self.solutions = [];
      var i, j, cw; //iterators and current word
      var letter;

      // vertical pass
      j = 0;
      var max = self.letters[0].length;

      while (j < max) {
        cw = []; // current word

        i = 0;
        while (i <= self.letters.length) {
          letter = self.letters[i] && self.letters[i][j];

          if (letter && letter !== '_') {
            cw.push([i, j, letter]);
          } else {
            if (cw.length > 1) {
              self.solutions.push(cw);
            }
            cw = [];
          }
          i++;
        }
        j++;
      }

      // horizontal pass
      i = 0;
      while (i < self.letters.length) {
        cw = []; // current word

        j = 0;
        while (j <= self.letters[i].length) {
          letter = self.letters[i][j];

          if (letter && letter !== '_') {
            cw.push([i, j, letter]);
          } else {
            if (cw.length > 1) {
              self.solutions.push(cw);
            }
            cw = [];
          }
          j++;
        }
        i++;
      }
    },

    createBlankBox: function (row, col) {
      var $box = $('<span></span>');
      $box.addClass('xwgrid-letter');
      $box.addClass('xwgrid-letter-row-' + row);
      $box.addClass('xwgrid-letter-column-' + col);
      $box.addClass('xwgrid-letter-blank');
      return $box;
    },

    change: function (params) {
      var self = this;
      var r = params.row    - 1;
      var c = params.column - 1;
      var l = params.letter;

      self.state[r][c] = l;
      self.trigger('change:state', self.state, self);
    },

    render: function () {
      var self = this;
      self.views = [];

      self.$el.html('');

      // Create rows and letters
      _.each(self.letters, function (row, i) {
        var $row = $('<div></div>');
        $row.addClass('xwgrid-row');
        $row.addClass('xwgrid-row-' + i);
        self.views[i] = [];
        self.state[i] = self.state[i] || [];

        _.each(row, function (letter,j) {
          if(letter === '_') {
            $row.append(self.createBlankBox(i + 1, j + 1, self.numbers[i][j]));
          }
          else {
            var isFixed = self.fixed[i][j] === '>';

            if (isFixed) {
              self.state[i][j] = letter;
            }

            var state = self.state[i][j] || '';
            var view  = new CrosswordsLetterView({
              row: i + 1,
              column: j + 1,
              letter: letter,
              fixed: isFixed,
              content: state,
              number: self.numbers[i][j]
            });

            self.listenTo(view, 'move',   self.move);
            self.listenTo(view, 'change', self.change);

            $row.append(view.$el);
            self.views[i][j] = view;
          }
          self.$el.append($row);
        });
      });

      // add classes needed for solution highlight
      // we set an word id for each letter cell so
      // that when the word is complete, we can add
      // a '...is-ok' class for that word
      for(var i in self.solutions) {
        for (var j in self.solutions[i]) {
          var sol = self.solutions[i][j];
          self.views[sol[0]][sol[1]].setWordId(i);
        }
      }

      return self;
    },

    getDirectionForStartNode: function (row, col) {
      var self = this;
      var right  = self.letters[row][col+1];
      if (right && right !== '_' ){
        // TODO: this would be very nice to have.
        // But it doesn't work for now
        // right has a letter && below has not
        if(self.state[row] && self.state[row][col] && 
           self.state[row][col].length > 0 &&
           self.state[row + 1] && self.state[row + 1][col] && 
           self.state[row + 1][col].length === 0){ 
          return 'V';
        }

        return '>';
      }

      var down = self.letters[row+1][col];
      if (down && down !== '_' ){
        return 'V';
      }
    },

    getNext: function(row, col) {
      var self = this;

      var next = {
        row: row,
        col : col
      };

      var antiInfiniteLoop = false;

      // Going down
      if(self.direction === 'V') {
        next.row++;
        // See if anything is available below
        if ( self.letters[next.row] && self.letters[next.row][next.col] && self.letters[next.row][next.col] !== '_') {
          return next;
        }
        
        antiInfiniteLoop = false;
        // find the closest numbered cell to the right
        while(true) {
          next.row++;
          if(next.row >= self.letters.length) {
            next.row = 0;
            next.col++;
            if(next.col > self.letters[next.row].length) {
              next.col = 0;
              if(antiInfiniteLoop === true) {
                alert('Hey, you need at least one number in the Crosswords puzzle.');
              }
              antiInfiniteLoop = true;
            }
          }

          if(self.numbers[next.row] && self.numbers[next.row][next.col] && self.numbers[next.row][next.col] !== ' ') {
            self.direction = self.getDirectionForStartNode(next.row, next.col);
            return next;
          }
        }
      }
      else {
        next.col++;
        if (self.letters[next.row] && self.letters[next.row][next.col] && self.letters[next.row][next.col] !== '_') {
          return next;
        }
        antiInfiniteLoop = false;
        // find the closest numbered cell below
        while(true) {
          next.col++;
          if(next.col >= self.letters[next.row].length) {
            next.col = 0;
            next.row++;
            if(next.row >= self.letters.length) {
              next.row = 0;
              if(antiInfiniteLoop === true) {
                alert('Hey, you need at least one number in the Crosswords puzzle.');
              }
              antiInfiniteLoop = true;
            }
          }

          if(self.numbers[next.row] && self.numbers[next.row][next.col] && self.numbers[next.row][next.col] !== ' ') {
            self.direction = self.getDirectionForStartNode(next.row, next.col);
            return next;
          }
        }
      }
    },

    getPrevious: function(row, col) {
      var self = this;

      var prev = {
        row: row,
        col : col
      };

      if(self.direction === 'V') {
        row--;
        row = Math.max(0, row);

        if(self.letters[row][col] && self.letters[row][col] !== '_') {
          prev.row = row;
        }
      }
      else {
        col--;
        col = Math.max(0, col);

        if(self.letters[row][col] && self.letters[row][col] !== '_') {
          prev.col = col;
        }
      }

      return prev;
    },

    getLeft:  function(row, col) {
      var self = this;
      var next = {row: row, col: col};

      do {
        col--;
        if (col < 0) { col = self.letters[row].length - 1; }

        if (self.letters[row][col] && self.letters[row][col] !== '_') {
          next.col = col;
          break;
        }
      } while (col !== next.col);

      return next;
    },

    getRight:  function(row, col) {
      var self = this;
      var next = {row: row, col: col};

      do {
        col++;
        if (col >= self.letters[row].length ) { col = 0; }

        if (self.letters[row][col] && self.letters[row][col] !== '_') {
          next.col = col;
          break;
        }
      } while (col !== next.col);

      return next;
    },

    getUp:  function(row, col) {
      var self = this;
      var next = {row: row, col: col};

      do {
        row--;
        if (row < 0) { row = self.letters.length - 1; }

        if (self.letters[row][col] && self.letters[row][col] !== '_') {
          next.row = row;
          break;
        }
      } while (row !== next.row);

      return next;
    },

    getDown:  function(row, col) {
      var self = this;
      var next = {row: row, col: col};

      do {
        row++;
        if (row >= self.letters.length) { row = 0; }

        if (self.letters[row][col] && self.letters[row][col] !== '_') {
          next.row = row;
          break;
        }
      } while (row !== next.row);

      return next;
    },

    move: function (options) {
      var self = this;
      var d = options.direction;
      var r = options.row - 1,
          c = options.column - 1;
      var where;

      switch (d) {
        case 'reset-direction':
          self.direction = self.getDirectionForStartNode(r, c);
          return;
        case 'up':
          where = self.getUp(r, c);
          break;
        case 'down':
          where = self.getDown(r, c);
          break;
        case 'left':
          where = self.getLeft(r, c);
          break;
        case 'right':
          where = self.getRight(r, c);
          break;
        case 'previous':
          where = self.getPrevious(r, c);
          break;
        case 'next':
          where = self.getNext(r, c);
          break;
      }

      if (where.row !== r || where.col !== c) {
        self.views[where.row][where.col].focus();
      }
    },

    score: function () {
      var self = this;
      var score = 0;
      
      var i, j, word, row, col, letter, lettersOkInWord;

      for (i in self.solutions) {
        word = self.solutions[i];
        lettersOkInWord = 0;

        for (j in word) {
          row = word[j][0];
          col = word[j][1];
          letter  = word[j][2];

          if(letter.compareIgnoringCaseAndDiacritics(self.state[row][col])) {
            lettersOkInWord++;
          }

          if (lettersOkInWord === word.length) {
            score++;
            self.$('.xwgrid-word-id-' +  i).removeClass('xw-word-not-ok').addClass('xw-word-ok');
          }
          else {
            self.$('.xwgrid-word-id-' +  i).removeClass('xw-word-ok').addClass('xw-word-not-ok');
          }
        }
      }

      score = Math.round(100 * score / self.solutions.length);

      self.trigger('change:score', score);
      return score;
    }
  });

  var Crosswords = Exercises.Exercise.extend({
    type: 'Crosswords',

    componentDidMount: function () {
      var self = this;

      self.view = new CrosswordsView({
        words: self.options.words,
        state: self.get('state'),
        numbering: self.options.numbering
      });

      self.$el.find('.xwordscontent').html(self.view.render().el);

      self.listenTo(self.view, 'change:state', function (state) {
        self.set('state', state);
        var score = self._score();
        self.trigger('change', self);
        self.trigger('change:score', score);
      });

      var l = self.options.words.join(' ').replace(/[^a-zA-Z]/g, '').length;
      self.irritationLevel = self.options.irritationLevel || 5 * l; // five tries per letter, on average
    },

    reset: function () {
      var self = this;
      self.unset('state');
      self.trigger('change', self);
      self.view.initialize({
        words: self.options.words,
        state: self.get('state'),
        numbering: self.options.numbering
      });
    },

    render: function() {
      var self = this;

      if(!self.options.noAutoResize) {
        var resize = function() {
          var size = Math.floor(
            self.$el.find('.xwordscontent').width() / 1.05 /(1 + self.options.words[0].replace(/\s|\d/g, '').length)
          );
          self.$el.find('.xwgrid-letter').width(size + 'px').height(size + 'px').css('font-size', (size / 2) + 'px');
        };

        $(window).resize(resize);
        resize();
      }

      if(self.options.hideNumbers) {
        self.$el.find('.xwnumber').hide();
      }
      
    },

    score: function () {
      var score = this.view.score();
      return score;
    }
  });

  Exercises.Crosswords = Crosswords;

  return Exercises;
});
