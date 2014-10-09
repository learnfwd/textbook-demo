/**
 * Drawing pad with save state and other goodies
 */
define([
  'jquery',
  'underscore',
  '../js/exercise'
], function ($, _, Exercises) {

  var History = function () {
    this.past = [];
    this.index = -1;
  };

  History.prototype.current = function (obj) {
    var copy = JSON.parse(JSON.stringify(this.past[this.index]));
    return copy;
  };

  History.prototype.push = function (obj) {
    var copy = JSON.parse(JSON.stringify(obj));

    this.index++;
    this.past.length = this.index + 1;
    this.past[this.index] = copy;

    return this;
  };

  History.prototype.back = function () {
    if (this.index - 1 >= 0) {
      this.index--;
    }
    return this;
  };

  History.prototype.forward = function () {
    if (this.index + 1 < this.past.length) {
      this.index++;
    }
    return this;
  };

  var DrawingPad = Exercises.Exercise.extend({
    type: 'DrawingPad',

    scaleStrokes: function (scale, s) {
      // Crummy deep copy.
      var strokes = JSON.parse(JSON.stringify(s));

      _.each(strokes, function (stroke) {
        switch (stroke.type) {
        case 'freeform':
        case 'straight-line':
          _.each(stroke.paths, function (path) {
            path.from.x *= scale;
            path.from.y *= scale;
            path.to.x *= scale;
            path.to.y *= scale;
          });
          break;
        case 'rectangle':
          _.each(stroke.paths, function (path) {
            path.x *= scale;
            path.y *= scale;
            path.w *= scale;
            path.h *= scale;
          });
          break;
        case 'ellipse':
          _.each(stroke.paths, function (path) {
            path.x *= scale;
            path.y *= scale;
            path.r *= scale;
          });
          break;
        }
      });

      return strokes;
    },

    clear: function () {
      this.canvas[0].width = this.canvas[0].width;
    },

    redraw: function () {
      this.clear();
      this.draw();
    },

    draw: function () {
      for (var i = 0; i < this.strokes.length; i++) {
        switch (this.strokes[i].type) {
        case 'freeform':
        case 'straight-line':
          this.drawStroke(this.strokes[i]);
          break;
        case 'rectangle':
          var rect = this.strokes[i].paths[0];
          this.drawRect(
            rect.x,
            rect.y,
            rect.w,
            rect.h,
            this.strokes[i].color,
            this.strokes[i].lineWidth
          );
          break;
        case 'ellipse':
          var ellipse = this.strokes[i].paths[0];
          this.drawEllipse(
            ellipse.x,
            ellipse.y,
            ellipse.r,
            this.strokes[i].color,
            this.strokes[i].lineWidth
          );
          break;
        default:
          this.drawStroke(this.strokes[i]);
        }
      }
    },

    drawStroke: function (stroke) {
      for (var i = 0; i < stroke.paths.length; i++) {
        this.drawLine(
          stroke.paths[i].from,
          stroke.paths[i].to,
          stroke.color,
          stroke.lineWidth
        );
      }
    },

    drawLine: function (from, to, color, lineWidth) {
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = color;

      this.ctx.beginPath();
      this.ctx.moveTo(from.x, from.y);
      this.ctx.lineTo(to.x, to.y);
      this.ctx.closePath();
      this.ctx.stroke();
    },

    drawRect: function (x, y, w, h, color, lineWidth) {
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = color;

      this.ctx.beginPath();
      this.ctx.rect(x, y, w, h);
      this.ctx.stroke();
    },

    drawEllipse: function (x, y, r, color, lineWidth) {
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = color;

      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
      this.ctx.stroke();
    },

    getPosition: function (event) {
      return {
        x: parseInt(event.gesture.center.pageX - this.offset.left),
        y: parseInt(event.gesture.center.pageY - this.offset.top)
      };
    },

    restoreStrokes: function () {
      this.strokes = this.scaleStrokes(1 / this.scale, this.get('state').strokes);
    },

    saveStrokes: function () {
      this.set('state', {
        strokes: this.scaleStrokes(this.scale, this.strokes)
      });
      this.trigger('change', this);
      this.trigger('change:score', this._score());
    },

    componentDidMount: function () {
      if (!this.get('state')) {
        this.set('state', {
          strokes: []
        });
      }

      var self = this;

      this.history = new History();

      this.width = 0;
      this.height = 0;
      if (this.options.backgroundImage.length) {
        // If we have a backgroundImage, scale to that.
        this.$image = this.$el.find('.image');

        // Wait for the image to finish loading.
        this.$image.on('load', function () {
          self.width = self.$image.width();
          self.height = self.$image.height();
          self.scale = 10000.0 / self.width;

          self.show();
        });
      } else {
        // Else, scale to the provided options, or to a square with 100% width.
        this.width = this.options.width || this.$el.parent().width();
        this.height = this.options.height || this.width;
        this.scale = 10000.0 / this.width;

        // Render immediately, no need to wait for any image.
        this.show();
      }

      var lazyResize = _.throttle(function () {
        if (self.options.backgroundImage.length) {
          self.width = self.$image.width();
          self.height = self.$image.height();
        } else {
          self.width = self.options.width || self.$el.parent().width();
          self.height = self.options.height || self.width;
        }
        self.scale = 10000.0 / self.width;

        self.pad.attr({
          width: self.width,
          height: self.height
        });

        self.restoreStrokes();
        self.redraw();
      }, 100);

      // On window resize, redraw the canvas.
      $(window).on('resize', function () {
        // If no resize events have happened in 100ms.
        lazyResize();
      });
    },

    show: function () {
      var self = this;

      var primaryColor = this.options.primaryColor;
      var secondaryColor = this.options.secondaryColor;
      var backgroundImage = this.options.backgroundImage;

      var $colorPicker = this.$el.find('.buttons .btn-color-picker');
      var $freeformToggle = this.$el.find('.buttons .btn-freeform');
      var $straightLineToggle = this.$el.find('.buttons .btn-straight-line');
      var $rectangleToggle = this.$el.find('.buttons .btn-rectangle');
      var $ellipseToggle = this.$el.find('.buttons .btn-ellipse');
      var $undo = this.$el.find('.buttons .btn-undo');
      var $redo = this.$el.find('.buttons .btn-redo');
      var $destroy = this.$el.find('.buttons .btn-destroy');

      this.canvas = this.$el.find('canvas');
      this.offset;

      this.drawing = false;
      this.color = '#2c3e50';

      this.ctx = this.canvas[0].getContext('2d');
      this.ctx.strokeStyle = this.color;
      this.ctx.lineCap = 'round';
      this.ctx.lineWidth = 3;

      this.strokes = [];
      this.restoreStrokes();

      this.history.push(this.strokes);

      this.pad = this.canvas.attr({
        width: this.width,
        height: this.height
      }).hammer({
        preventDefault: true,
        dragMinDistance: 1
      });

      var from;
      var newStroke;

      // Available modes:
      // - 'freeform'
      // - 'straight-line'
      // - 'rectangle'
      // - 'ellipse'
      this.mode = 'freeform';

      this.pad.on('dragstart', function (event) {
        // Recompute current offset.
        // When processing `drag` events,
        // `event.gesture` contains absolute coordinates, relative to the window.
        // `this.offset` helps normalize these.
        var clientRect = self.canvas[0].getBoundingClientRect();
        self.offset = {
          top: clientRect.top,
          left: clientRect.left
        };

        self.drawing = true;
        from = self.getPosition(event);

        newStroke = {};
        newStroke.color = self.color;
        newStroke.lineWidth = self.ctx.lineWidth;
        newStroke.paths = [];
      });

      this.pad.on('dragend', function () {
        self.drawing = false;

        switch (self.mode) {
        case 'freeform':
          newStroke.type = 'freeform';
          break;
        case 'straight-line':
          newStroke.type = 'straight-line';
          break;
        case 'rectangle':
          newStroke.type = 'rectangle';
          break;
        case 'ellipse':
          newStroke.type = 'ellipse';
          break;
        }

        self.strokes.push(newStroke);
        self.history.push(self.strokes);
        self.saveStrokes();
      });

      this.pad.on('drag', function (event) {
        if (!self.drawing) {
          return;
        }
        var to = self.getPosition(event);

        switch (self.mode) {
        case 'freeform':
          self.drawLine(from, to, newStroke.color, newStroke.lineWidth);

          newStroke.paths.push({
            from: from,
            to: to
          });

          from = to;

          break;
        case 'straight-line':
          self.redraw();
          self.drawLine(from, to, newStroke.color, newStroke.lineWidth);

          newStroke.paths = [{
            from: from,
            to: to
          }];

          break;
        case 'rectangle':
          self.redraw();
          var x = Math.min(from.x, to.x);
          var y = Math.min(from.y, to.y);
          var w = Math.abs(from.x - to.x);
          var h = Math.abs(from.y - to.y);

          self.drawRect(x, y, w, h, newStroke.color, newStroke.lineWidth);

          newStroke.paths = [{
            x: x,
            y: y,
            w: w,
            h: h
          }];

          break;
        case 'ellipse':
          self.redraw();
          var x = from.x;
          var y = from.y;
          var r = Math.sqrt(
            Math.pow((from.x - to.x), 2) + Math.pow((from.y - to.y), 2)
          );
          r = Math.floor(r);

          self.drawEllipse(x, y, r, newStroke.color, newStroke.lineWidth);

          newStroke.paths = [{
            x: x,
            y: y,
            r: r
          }];

          break;
        }
      });

      var colors = [
        '#c0392b', // red
        '#f1c40f', // yellow
        '#2980b9', // blue
        '#ecf0f1', // white
        '#e67e22', // green
        '#27ae60', // orange
        '#9b59b6', // violet
        '#2c3e50', // black
      ];

      var html = [
        '<div class="colors">',
          '<div class="four">',
            '<div class="color red" data-color="#c0392b"></div>',
            '<div class="color yellow" data-color="#f1c40f"></div>',
            '<div class="color blue" data-color="#2980b9"></div>',
            '<div class="color white" data-color="#ecf0f1"></div>',
          '</div>',
          '<div class="four">',
            '<div class="color green" data-color="#e67e22"></div>',
            '<div class="color orange" data-color="#27ae60"></div>',
            '<div class="color violet" data-color="#9b59b6"></div>',
            '<div class="color black" data-color="#2c3e50"></div>',
          '</div>',
        '</div>'
      ].join('');

      $colorPicker.css('color', this.color);
      $colorPicker.popover({
        placement: 'top',
        html: true,
        content: html
      }).on('shown.bs.popover', function () {
        var $self = $(this);
        $(this).siblings('.popover').find('.color').on('click', function () {
          var color = $(this).data('color');
          $self.css('color', color);
          self.color = color;
          $self.popover('toggle');
        });
      });

      $freeformToggle.on('click', function () {
        if (!$(this).hasClass('active')) {
          self.mode = 'freeform';
          $(this).siblings('.tool').removeClass('active');
          $(this).addClass('active');
        }
      });

      $straightLineToggle.on('click', function () {
        if (!$(this).hasClass('active')) {
          self.mode = 'straight-line';
          $(this).siblings('.tool').removeClass('active');
          $(this).addClass('active');
        }
      });

      $rectangleToggle.on('click', function () {
        if (!$(this).hasClass('active')) {
          self.mode = 'rectangle';
          $(this).siblings('.tool').removeClass('active');
          $(this).addClass('active');
        }
      });

      $ellipseToggle.on('click', function () {
        if (!$(this).hasClass('active')) {
          self.mode = 'ellipse';
          $(this).siblings('.tool').removeClass('active');
          $(this).addClass('active');
        }
      });

      $undo.on('click', function () {
        self.strokes = self.history.back().current();
        self.saveStrokes();
        self.redraw();
      });

      $redo.on('click', function () {
        self.strokes = self.history.forward().current();
        self.saveStrokes();
        self.redraw();
      });

      $destroy.on('click', function () {
        self.strokes = [];
        self.history.push(self.strokes);
        self.saveStrokes();
        self.redraw();
      });

      // Draw initial strokes.
      this.draw();
    },

    score: function () {
      return 100 * (!_.isEmpty(this.get('state').strokes));
    }
  });

  Exercises.DrawingPad = DrawingPad;

  return Exercises;
});
