/**
  * Generic exercise class. Mother of all exercises, and container for them all
  */
define([
  'jquery',
  'underscore',
  'backbone',
  'app',
  '../js/exercises'
], function ($, _, Backbone, App, Exercises) {
  var Exercise = Backbone.Model.extend({
      type: 'Exercise', // This should be overriden
      isMounted: false,  // becomes true after document.ready event
      defaultIrritationLevel: 15,

      _registerEventHandlers: function() {
        var self = this;

        self.on('change', Exercises.store.save, this);
        self.on('change:state', self._score);
        self.on('change:state', self._render);
        self.on('change:score', self._renderScoreBoxes);

        self.on('change:state', function(target, state) {
          window.App.trigger('exercise:state:changed', state, self);
        }, self);

        self.on('children_ready', function () {
          self._score();
          self._renderScoreBoxes();

          var irritationLevel = 0;
          _.each(self.children, function (child) {
             irritationLevel += child.irritationLevel * 1.2;
          });

          self.irritationLevel += Math.round(irritationLevel);

          self.childrenReady = true;
          App.trigger('exercise:irritation:up', 0, this);

          if (typeof(self.onChildrenReady) === 'function') {
            self.onChildrenReady();
          }

        });

        window.App.on('exercise:score:invalidate', function (exerciseName) {
          if(self.name !== exerciseName) { return; }
          self.set('score', null);
          self._score();
        });

        self._onScroll = function () {
          if (self.scrollTimeoutId !== undefined) {
            clearTimeout(self.scrollTimeoutId);
          }
          self.scrollTimeoutId = setTimeout(function() {
            self.scrollTimeoutId = undefined;
            self._onScrollEnd();
          }, 2000);
        };

        self.scrollView = $('#scrollview');
        if (!self.scrollView.length) {
          self.scrollView = $(window);
        }
        self.scrollView.on('scroll', self._onScroll);

        window.App.book.once('destroy-chapter', self._componentWillUnmount.bind(self));
      },

      _onChildChangedState: function (state, exercise) {
        if (typeof this.onChildChangedState === 'function') {
          this.onChildChangedState(state, exercise);
        }
      },

      _onChildChangedScore: function (state, exercise) {
        if (typeof this.onChildChangedScore === 'function') {
          this.onChildChangedScore(state, exercise);
        }

        this._score();
        this._renderScoreBoxes();
      },

      _prepareScoreBoxes: function() {
          var self = this;

          // check for progress box and set the required HTML inside
          var $progressBox = self.$el.find('.progress-box');
          var $otherBoxes = self.$el.find('.is-done-box, .score-box');

          $otherBoxes.dblclick(function(){
            self.clearState();
            window.location.reload();
          });

          if (self.options.ignoreScore) {
            // Nothing related to score, sir. Nothing.
            $progressBox.remove();
            $otherBoxes.remove();
          }
          else {
            $progressBox.each(function(index) {
              if($progressBox.eq(index).find('.progress-bar').length) {
                return;
              }

              var $progressBar = $('<div class="progress-bar progress-bar-success" id="pb-' +
                Math.floor(Math.random() * 1000000000) + '-' + index + 
                '" style="width: 50%"></div>');
              $progressBox.eq(index).append($progressBar);
            });

            $otherBoxes.each(function(i){
              var boxie = $otherBoxes.eq(i);
              if(!boxie.attr('id')) {
                boxie.attr('id', 'ebox-' + Math.floor(Math.random() * 1000000000));
              }
            });

            if(self.get('score') >= 100) {
              self.wasDoneAlready = true;
            }
          }
      },

      // register event for classroom events
      _registerClassroomEventsListener: function() {
        if (typeof this.onRemoteChanges === 'function') {
          this.listenTo(App, 'classroom:recv:ex_' + this.id + ':change' , function (msg) {
            var wg = window.App.workGroup;
            if (wg && msg.group === wg) {
              this.onRemoteChanges(msg);
            }
          });
        }
      },

      // called in the constructor -- backbone stuff
      // Fetches data from local storage, subscribes object to change
      // events and SHOULD NOT BE OVERRIDDEN. To hook, it
      // checks if 'componentDidInitialize' method exists and calls
      // it. componentDidInitialize can be used to add more features
      // after standard init.
      initialize: function (id, optionsJSON) {
        var self = this;
        this.id = id;
        this.options = {};

        if (typeof(optionsJSON) === 'string') {
          self.options = JSON.parse(optionsJSON);
        }

        self.children = [];
        self.name = self.options.name || self.id;

        Exercises.store.fetch(this);

        self.set('name', self.options.name || 'ex_' + self.id);
        self.set('type', self.type);

        if (typeof(self.componentDidInitialize) === 'function') {
          self.componentDidInitialize();
        }

        self.irritationLevel = self.options.irritationLevel || self.defaultIrritationLevel;


        self._registerEventHandlers();
        self._registerClassroomEventsListener();

        $(function () {
          self.isMounted = true;
          self.$el = $('#ex_' + self.id);

          self.$el.addClass('exercise');

          if (self.options.name) {
            self.$el.addClass(self.options.name);
          }

          self.$el.addClass('type-' + self.type);

          if (typeof(self.componentDidMount) === 'function') {
            self.componentDidMount();
          }

          window.App.trigger('exercise:mounted', self);

          self._prepareScoreBoxes();
          self._render();
          self._onScrollEnd();
        });

        window.App.trigger('exercise:initialized');
      },

      // This is the generic render method and
      // SHOULD NOT BE OVERRIDDEN
      // offers three hooks that you should write when needed
      //  * componentWillUpdate
      //  * render
      //  * componentDidUpdate
      _render: function () {
        if (!this.isMounted) { return; }
        var self = this;

        if (typeof(self.componentWillUpdate) === 'function') {
          self.componentWillUpdate();
        }

        if (typeof(self.render) === 'function') {
          self.render();
        }

        if (typeof(self.componentDidUpdate) === 'function') {
          self.componentDidUpdate();
        }

        window.App.trigger('exercise:rendered', self);
      },

      // Value of the exercise should return
      // what is the current selected or computed value
      //
      // By default, the value return is the state.
      // Override if necessary (e.g. for pick-ones)
      value: function () {
        return this.get('state');
      },

      clearState: function () {
        var self = this;
        self.set('state', null);

        _.each(self.children, function(child) {
          child.clearState();
        });
      },

      // Generic score method - does the average if
      // there are children and also calls 'score' method if
      // exists.
      // SHOULD NOT BE OVERRIDDEN. Use 'score' function instead
      _score: function () {
        if (this.options.ignoreScore) {
          return NaN; // Break the parent or others if they try to get the score
        }

        var selfScore; // undefined

        if (typeof(this.score) === 'function') {
          selfScore = this.score();
        }

        var score = selfScore || 0;

        if(!this.options.ignoreKidsScore && this.children.length > 0) {
          var s = 0;
          var n = 0;

          _.each(this.children, function (child) {
            if(child.options.ignoreScore){
              return;
            }

            s += child.get('score');
            n++;
          });

          if (selfScore !== undefined) {
            score = Math.round(1.0 * (s + selfScore) / (n + 1));
          } else {
            score = Math.round(1.0 * s / n);
          }
        }

        var oldScore = this.get('score');

        if(score !== oldScore) {
          this.set('score', score);
          window.App.trigger('exercise:score:changed', score, this);
          if (score < oldScore) {
            window.App.trigger('exercise:score:decrease', score, this);
          } else {
            window.App.trigger('exercise:score:increase', score, this);
          }

          if(score >= 100) {
            if(this.wasDoneAlready) {
              window.App.trigger('exercise:done', this);
            } else {
              window.App.trigger('exercise:first-time-done', this);
              this.wasDoneAlready = true;
            }
          }
        } else {
          window.App.trigger('exercise:score:same', score, this);
        }

        this.set('score', score);
        return score;
      },

      /*
       * Specific hooks area for generic exercise class
       */
      _renderScoreBoxes: function () {
        var self = this;
        var score = this.get('score');

        // TODO: This method of finding direct
        // descendents is rather ugly, but I cannot
        // find another better way.
        var myOwn = function (className) {
          var $all = self.$el.find(className);
          var $notMine = self.$el.find('.exercise ' + className);

          var notMineIds = [];
          $notMine.each(function (i) {
            notMineIds.push($notMine.eq(i).attr('id'));
          });

          var $mine =  $all.filter(function (i) {
            var pbox = $all.eq(i);
            var id = pbox.attr('id');
            return !_.contains(notMineIds, id);
          });

          return $mine;
        };

        myOwn('.progress-box .progress-bar').width(score + '%');

        myOwn('.is-done-box').html(
          (score >= 100) ? '<i class="fa fa-check done"></i>' : '<i class="fa fa-ellipsis-h not-done"></i>'
        );

        self.$el.removeClass('done not-done').addClass(
          (score >= 100) ? 'done' : 'not-done'
        );

        myOwn('.score-box').text(score + '%');
      },

      present: function() {
        var self = this;
        self.$el.addClass('presented');
        self.$el.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
          self.$el.removeClass('presented');
        });
      },

      _onScrollEnd: function() {
        if (!this.isMounted || this.isPresented) { return; }

        var vpY1 = this.scrollView.scrollTop();
        var vpY2 = this.scrollView.height() + vpY1;

        var exY1 = this.$el.offset().top;
        var scrollViewOff = this.scrollView.offset();
        if (scrollViewOff) {
          exY1 -= scrollViewOff.top - vpY1;
        }
        var exY2 = this.$el.outerHeight() + exY1;

        if ((exY1 >= vpY1 && exY1 <= vpY2) ||
            (exY2 >= vpY1 && exY2 <= vpY2) ||
            (vpY1 >= exY1 && vpY1 <= exY2)) {
          this.isPresented = true;
          this._unbindScrollEvent();
          this.present();
        }
      },

      _unbindScrollEvent: function() {
        var self = this;

        if (self.scrollView) {
          self.scrollView.off('scroll', self._onScroll);
          self.scrollView = null;
        }

        if (self.scrollTimeoutId !== undefined) {
          clearTimeout(self.scrollTimeoutId);
          self.scrollTimeoutId = undefined;
        }
      },

      // Destructor - called when the chapter changes
      // SHOULD NOT BE OVERRIDDEN. Use 'destroy' function instead
      _componentWillUnmount: function() {
        var self = this;
        self._unbindScrollEvent();

        if (typeof(self.componentWillUnmount) === 'function') {
          self.componentWillUnmount();
        }

        self.stopListening();
      }
    });

  Exercises.Exercise = Exercise;
  return Exercises;
});
