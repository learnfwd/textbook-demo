/**
 *  Combine syllables to form words
 */
define([
  'jquery',
  '../js/exercise',
], function ($, Exercises) {
  var CombineSyllables = Exercises.Exercise.extend({
      type: 'CombineSyllables',

      saveState: function () {
        this.set('state', this.state);
        this.trigger('change:state', this.state, this);
      },

      forceReflow: function (cb) {
        this.$el[0].offsetWidth = this.$el[0].offsetWidth;
        setTimeout(cb, 0);
      },

      componentDidMount: function () {
        var self = this;

        self.words = self.options.words || [];
        self.recall = self.options.recall;
        if (self.recall === undefined) {
          self.recall = true;
        }
        self.autoValidate = self.options.autoValidate;
        self.bonusScore = self.options.bonusScore;
        self.wordCount = self.options.wordCount || self.words.length;
        self.callback = eval('(function(word, valid, already) {' + (self.options.callback || '') + ';})').bind(self);

        self.state = self.get('state') || {};
        if (self.state.syllables === undefined) {
          self.state.syllables = [];
        }
        if (self.state.guessedWords === undefined) {
          self.state.guessedWords = [];
        }

        // set an irritation level proportional to the square of sylables
        // and words (this is random, but shoult be fair)
        var l = self.$el.find('.item').length;
        var w = self.options.words.length;
        self.irritationLevel = self.options.irritationLevel || 
          Math.max(l * l + w * w, self.defaultIrritationLevel);
          
        self.$el.find('[data-target=\"combine-syllables.validate\"]').click(self.validate.bind(self));
        self.$el.find('[data-target=\"combine-syllables.clearlist\"]').click(self.clearList.bind(self));
        
        var items = self.$el.find('.item');
        self.dropspot = self.$el.find('.dropspot');
        self.wordlist = self.$el.find('.wordlist');

        self.dropspot.css('position', 'relative');

        self.bindEvents();
        self.buildArrangedArray(items, function() {
          self.configureForDrag(items);
          self.forceReflow(self.render.bind(self));
        });
      },

      configureForDrag: function(el) {
        var self = this;

        el.on('mousedown', function(e) {
          self.touchId = null;
          if (self.mouseDown(e.clientX, e.clientY, $(this))) {
            e.preventDefault();
          }
        });

        el.on('touchstart', function(e) {
          if (!self.touchId) {
            var touch = e.originalEvent.touches[0];
            var x = touch.pageX - $(window).scrollLeft();
            var y = touch.pageY - $(window).scrollTop();
            if (self.mouseDown(x, y, $(this))) {
              e.preventDefault();
              self.touchId = touch.identifier;
            }
          }
        });

        el.on('touchmove', function(e) {
          var touches = e.originalEvent.changedTouches;
          for (var i = 0, n = touches.length; i < n; i++) {
            var touch = touches[i];
            if (touch.identifier === self.touchId) {
              if (self.mouseMove(touch.pageX - $(window).scrollLeft(), touch.pageY - $(window).scrollTop())) {
                e.preventDefault();
                e.stopPropagation();
              }
              break;
            }
          }
        });

        el.on('touchend touchcancel', function(e) {
          var touches = e.originalEvent.changedTouches;
          for (var i = 0, n = touches.length; i < n; i++) {
            var touch = touches[i];
            if (touch.identifier === self.touchId) {
              self.touchId = null;
              if (self.mouseUp()) {
                e.preventDefault();
              }
              break;
            }
          }
        });

        if (self.msCrapware) {
          el.each(function(idx, elem) {
            var pointerDown = function(e) {
              if (!self.touchId) {
                var x = e.pageX - $(window).scrollLeft();
                var y = e.pageY - $(window).scrollTop();
                if (self.mouseDown(x, y, $(this))) {
                  self.touchId = e.pointerId;
                  e.preventDefault();
                  e.stopPropagation();
                }
              }
            };

            if (self.msBullshit) {
              elem.addEventListener('MSPointerDown', pointerDown);
            } else {
              elem.addEventListener('pointerdown', pointerDown);
            }
          });
        }
      },

      bindEvents: function() {
        var self = this;

        var elem = document;

        var mouseMove = function(e) {
          if (!self.touchId) {
            if (self.mouseMove(e.clientX, e.clientY)) {
              e.preventDefault();
              e.stopPropagation();
            }
          }
        };

        var mouseUp = function() {
          if (!self.touchId) {
            self.mouseUp();
          }
        };

        $(elem).on('mousemove', mouseMove);
        $(elem).on('mouseup', mouseUp);

        // Internet Explorer bullshit.
        // Hours wasted here: 3. Please increment this counter until you realize that IE sucks

        self.msCrapware = false; //IE
        self.msBullshit = true; //IE10
        if (window.navigator.pointerEnabled) {
          self.msCrapware = true;
          self.msBullshit = false;
        } else if (window.navigator.msPointerEnabled) {
          self.msCrapware = true;
        }

        if (self.msCrapware) {
          var pointerMove = function(e) {
            if (self.touchId === e.pointerId) {
              var x = e.pageX - $(window).scrollLeft();
              var y = e.pageY - $(window).scrollTop();
              if (self.mouseMove(x, y, $(this))) {
                e.preventDefault();
                e.stopPropagation();
              }
            }
          };

          var pointerUp = function(e) {
            if (self.touchId === e.pointerId) {
              self.touchId = null;
              if (self.mouseUp()) {
                e.preventDefault();
                e.stopPropagation();
              }
            }
          };

          if (self.msBullshit) {
            elem.addEventListener('MSPointerMove', pointerMove);
            elem.addEventListener('MSPointerUp', pointerUp);
            elem.addEventListener('MSPointerCancel', pointerUp);
          } else {
            elem.addEventListener('pointermove', pointerMove);
            elem.addEventListener('pointerup', pointerUp);
            elem.addEventListener('pointercancel', pointerUp);
          }

        }

        self.cancelEvents = function() {
          if (self.msCrapware) {
            if (self.msBullshit) {
              elem.removeEventListener('MSPointerMove', pointerMove);
              elem.removeEventListener('MSPointerUp', pointerUp);
              elem.removeEventListener('MSPointerCancel', pointerUp);
            } else {
              elem.removeEventListener('pointermove', pointerMove);
              elem.removeEventListener('pointerup', pointerUp);
              elem.removeEventListener('pointercancel', pointerUp);
            }
          }
          $(elem).off('mousemove', mouseMove);
          $(elem).off('mouseup', mouseUp);
        };
      },

      componentWillUnmount: function() {
        var self = this;
        if (self.cancelEvents) {
          self.cancelEvents();
          delete self.cancelEvents;
        }
      },

      buildArrangedItem: function(item) {
        var newEl = item.clone();
        newEl.removeClass('used');
        newEl.removeClass('dragging');
        newEl.css('position', 'absolute');
        newEl.css('margin-top', 0);
        newEl.addClass('animated');
        return newEl;
      },

      buildArrangedArray: function(elements, cb) {
        var self = this;
        var items = [];
        elements.each(function(idx, el) {
          var $el = $(el);
          var syl = $el.data('syl');
          $el.attr('data-index', idx);
          items.push({
            syl: syl,
            el: $el,
            used: false
          });
        });
        self.items = items;

        var tillCallback = 1;

        self.arrangedItems = [];
        _.each(self.state.syllables, function(syl, index) {
          var i, n;
          for (i = 0, n = items.length; i < n; i++) {
            if (items[i].syl === syl && !items[i].used) {
              break;
            }
          }

          if (i === n) {
            throw new Error('You just gave me a nonexistant syllable');
          }

          tillCallback++;

          var $el = self.buildArrangedItem(items[i].el);
          self.dropspot.append($el);
          self.arrangedItems.push($el);
          self.configureForDrag($el);
          $el.css('width', '');
          $el.css('height', '');
          self.forceReflow(function() {
            var width = $el.width();
            var height = $el.height();
            var outerWidth = $el.outerWidth();
            var outerHeight = $el.outerHeight();
            $el.css('width', width);
            $el.css('height', height);
            $el.data('reflowOuterWidth', outerWidth);
            $el.data('reflowOuterHeight', outerHeight);
            items[i].used = true;
            if (!--tillCallback) {
              cb();
            }
          });
        });

        if (!--tillCallback) {
          cb();
        }
      },

      render: function() {
        var self = this;

        _.each(self.items, function(it) {
          if (it.used) {
            it.el.addClass('used');
          } else {
            it.el.removeClass('used');
          }
        });

        var x = 0;
        _.each(self.arrangedItems, function(el) {
          el.css('margin-left', x);
          var w = el.data('reflowOuterWidth');
          x += (w === undefined ? el.outerWidth() : w) + 2;
        });

        self.$el.toggleClass('empty', self.arrangedItems.length === 0);

        var wordlistHtml = '';
        _.each(self.state.guessedWords, function(o) {
          wordlistHtml += '<div class="word' + (self.lastWord === o ? ' last' : '') + '">' + o + '</div>';
        });
        self.wordlist.html(wordlistHtml);
      },

      positionInWindow: function(div) {
        var pos = div.offset();
        pos.top -= $(window).scrollTop() - div.css('margin-top');
        pos.left -= $(window).scrollLeft() - div.css('margin-left');
        return pos;
      },

      hitTest: function(x, y, div) {
        var pos = div.offset();
        pos.top -= $(window).scrollTop();
        pos.left -= $(window).scrollLeft();
        var w = div.outerWidth();
        var h = div.outerHeight();
        return (x >= pos.left && x <= pos.left + w &&
                y >= pos.top  && y <= pos.top + h);
      },

      positionElement: function($el, x, y) {
        var vendors = ['', '-webkit-', '-moz-', '-ms-', '-o-'];
        for (var i = 0, n = vendors.length; i < n; i ++) {
          $el.css(vendors[i] + 'transform', 'translate3d(' + x + 'px, ' + y + 'px, 0px)');
        }
      },

      recallTo: function(from, to, cb) {
        var self = this;

        from.addClass('animated');
        var pos = to.offset();
        pos.top -= $(window).scrollTop();
        pos.left -= $(window).scrollLeft();
        self.positionElement(from, pos.left, pos.top);

        var width = to.data('reflowWidth');
        var height = to.data('reflowHeight');
        if (width === undefined) {
          width = to.width();
        }
        if (height === undefined) {
          height = to.height();
        }
        from.css('width', width);
        from.css('height', height);

        var oldPos = from.offset();
        oldPos.top -= $(window).scrollTop();
        oldPos.left -= $(window).scrollLeft();
        var oldWidth = from.width();
        var oldHeight = from.height();

        if (oldPos.top !== pos.top || oldPos.left !== pos.left || oldWidth !== width || oldHeight !== height) {
          from.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
            cb.call(self);
          });
        } else {
          cb.call(self);
        }
      },

      mouseDown: function(x, y, $el) {
        var self = this;
        if (self.currentlyDragged || $el.data('dragged')) { return false; }

        var index = -1;
        for (var i = 0, v = self.arrangedItems, n = v.length; i < n; i++) {
          if (v[i].is($el)) {
            index = i;
            break;
          }
        }

        var origin = self.items[$el.data('index')];
        if (index === -1 && origin.used) { return false; }

        self.lastTouchedObject = -2;
        self.dragStartIndex = self.dragEndIndex = index;
        self.lastX = x;
        self.lastY = y;
        self.$el.removeClass('good');
        self.$el.removeClass('bad');
        self.$el.removeClass('already-submitted');

        // Cloning the element and taking it out of page
        var clone = $el.clone();
        self.currentlyDragged = $el;

        var offset = $el.offset();
        var width = $el.width();
        var height = $el.height();

        if (index >= 0) {
          self.placeholder = clone;
          self.arrangedItems[index] = clone;
          self.insideDropspot = true;
        } else {
          origin.el = clone;
          self.configureForDrag(clone);
          self.placeholder = self.buildArrangedItem($el);
          self.placeholder.css('width', width);
          self.placeholder.css('height', height);
          self.insideDropspot = false;
        }

        $el.removeClass('animated');
        $el.css('margin-left', 0);
        $el.css('margin-top', 0);
        $el.addClass('dragging');
        self.placeholder.addClass('placeholder');

        $el.css('left', 0);
        $el.css('top', 0);
        self.dragX = offset.left - $(window).scrollLeft();
        self.dragY = offset.top - $(window).scrollTop();
        self.positionElement($el, self.dragX, self.dragY);
        $el.css('width', width);
        $el.css('height', height);
        $el.css('position', 'fixed');
        $el.attr('data-dragged', 'true');

        clone.addClass('dragging-from');
        $el.after(clone);

        return true;
      },

      mouseUp: function() {
        var self = this;
        var $el = self.currentlyDragged;
        if (!$el) { return false; }

        self.currentlyDragged = null;
        var origin = self.items[$el.data('index')];

        if (self.dragEndIndex < 0) {
          if (self.dragStartIndex >= 0) {
            self.state.syllables.splice(self.dragStartIndex, 1);
            origin.used = false;
            self.saveState();
            self.render();
          }
          origin.el.addClass('recall');
          self.recallTo($el, origin.el, function () {
            origin.el.removeClass('dragging-from');
            origin.el.removeClass('recall');
            $el.remove();
          });
        } else {
          if (self.dragEndIndex !== self.dragStartIndex) {
            if (self.dragStartIndex >= 0) {
              self.state.syllables.splice(self.dragStartIndex, 1);
            } else {
              origin.used = true;
            }
            self.state.syllables.splice(self.dragEndIndex, 0, origin.el.data('syl'));
            self.saveState();
          }
          var placeholder = self.placeholder;
          self.placeholder = null;
          self.configureForDrag(placeholder);

          // Resize trick
          var oldWidth = placeholder.width();
          var oldHeight = placeholder.height();
          placeholder.css('width', '');
          placeholder.css('height', '');
          placeholder.removeClass('animated');
          self.forceReflow(function() {
            var width = placeholder.width();
            var height = placeholder.height();
            placeholder.data('reflowOuterWidth', placeholder.outerWidth());
            placeholder.data('reflowOuterHeight', placeholder.outerHeight());
            placeholder.data('reflowWidth', width);
            placeholder.data('reflowHeight', height);
            placeholder.css('width', oldWidth);
            placeholder.css('height', oldHeight);
            self.forceReflow(function() {
              placeholder.addClass('animated');
              placeholder.css('width', width);
              placeholder.css('height', height);
              self.render();

              self.recallTo($el, placeholder, function() {
                placeholder.removeClass('placeholder');
                placeholder.removeClass('dragging-from');
                origin.el.removeClass('dragging-from');
                self.forceReflow(function() {
                  $el.remove();
                });
              });
            });
          });
          return true;
        }

        if (this.autoValidate) {
          this.validate();
        }
      },

      mouseMove: function(x, y) {
        var self = this;
        var $el = self.currentlyDragged;
        if (!$el) { return false; }

        var deltaX = x - self.lastX;
        var deltaY = y - self.lastY;
        self.lastX = x;
        self.lastY = y;
        self.dragX += deltaX;
        self.dragY += deltaY;
        self.positionElement($el, self.dragX, self.dragY);

        var inDrop = self.hitTest(x, y, self.dropspot);
        if (self.insideDropspot !== inDrop) {
          self.insideDropspot = inDrop;
          if (inDrop) {
            self.dropspotEntered();
          } else {
            self.dropspotLeft();
          }
        }

        var touchedObject = inDrop ? -1 : -2;
        var touchedIndex = touchedObject;

        for (var i = 0, v = self.arrangedItems, n = v.length; i < n; i++) {
          var elem = v[i];
          if (!elem.is(self.placeholder) && self.hitTest(x, y, elem)) {
            touchedObject = elem;
            touchedIndex = i;
            break;
          }
        }

        if (self.lastTouchedObject !== touchedObject) {
          self.lastTouchedObject = touchedObject;

          var oldIndex = self.dragEndIndex;
          var newIndex = touchedIndex;
          if (oldIndex >= 0 && newIndex >= 0 && oldIndex !== newIndex) {
            self.arrangedItems.splice(oldIndex, 1);
            self.arrangedItems.splice(newIndex, 0, self.placeholder);
            self.dragEndIndex = newIndex;
            self.render();
          }
        }

        return true;
      },

      dropspotEntered: function() {
        var self = this;
        if (self.dragEndIndex < 0) {
          self.dropspot.append(self.placeholder);
          self.dragEndIndex = self.arrangedItems.length;
          self.arrangedItems.push(self.placeholder);
          self.render();
        }
        if (self.dragStartIndex === -1) {
          self.dropspot.addClass('dragover');
        } else {
          self.dropspot.addClass('dragover-from');
        }
      },

      dropspotLeft: function() {
        var self = this;
        if (self.dragEndIndex >= 0) {
          self.placeholder.remove();
          self.arrangedItems.splice(self.dragEndIndex, 1);
          self.dragEndIndex = -1;
          self.render();
        }
        if (self.dragStartIndex === -1) {
          self.dropspot.addClass('dragover');
        } else {
          self.dropspot.addClass('dragover-from');
        }
      },

      setPlaceholder: function(placeholder, pos) {
        if (!placeholder && this.placeholder) {
          this.placeholder.removeClass('placeholder');
        }
        if (placeholder) {
          setTimeout(function() {
            placeholder.addClass('placeholder');
          }, 0);
        }
        this.placeholder = placeholder;
        this.dragEndIndex = placeholder ? pos : -1;
      },
      
      validate: function() {
        var self = this;
        var word = self.state.syllables.join('');

        var valid = _.contains(self.words, word);
        var alreadyMatched = _.contains(self.state.guessedWords, word);

        if (valid && !alreadyMatched) {
          self.state.guessedWords.push(word);
          if (self.recall) {
            self.state.syllables = [];
            _.each(self.arrangedItems, function(el) {

              el.removeClass('animated');
              var offset = el.offset();
              var width = el.width();
              var height = el.height();
              var x = offset.left - $(window).scrollLeft();
              var y = offset.top - $(window).scrollTop();
              el.css('left', 0);
              el.css('top', 0);
              el.css('margin-left', 0);
              el.css('margin-top', 0);
              el.css('width', width);
              el.css('height', height);
              el.css('position', 'fixed');
              self.positionElement(el, x, y);

              var origin = self.items[el.data('index')];
              origin.el.addClass('recall');
              origin.used = false;
              self.forceReflow(function() {
                self.recallTo(el, origin.el, function() {
                  el.remove();
                  origin.el.removeClass('recall');
                });
              });
            });
            self.arrangedItems.length = 0;
          }
          self.saveState();
        }

        if (valid) {
          self.lastWord = word;
        }

        self.$el.removeClass('good');
        self.$el.removeClass('bad');
        self.$el.removeClass('already-submitted');
        self.forceReflow(function() {
          if (!self.autoValidate && !valid) {
            self.$el.addClass('bad');
          }
          if (valid) {
            if (!alreadyMatched) {
              self.$el.addClass('good');
            } else {
              if (!self.autoValidate) {
                self.$el.addClass('already-submitted');
              }
            }
          }
          self.render();
        });

        if (!self.autoValidate || valid) {
          self.callback(word, valid, alreadyMatched);
        }
      },

      clearList: function() {
        this.state.guessedWords.length = 0;
        this.saveState();
      },

      score: function() {
        var score = this.state.guessedWords.length / this.wordCount;
        if (!score.bonusPoints && score > 1) {
          score = 1;
        }
        return Math.round(score * 100);
      }
    });


  Exercises.CombineSyllables = CombineSyllables;
  return Exercises;
});
