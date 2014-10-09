/**
 *  Connect the dots
 */
define([
  'jquery',
  '../js/exercise',
  'raphael',
], function ($, Exercises, Raphael) {
  var ConnectPoints = Exercises.Exercise.extend({
      type: 'ConnectPoints',

      saveState: function () {
        var conn = [];
        for (var i = 0, v = this.connections, n = v.length; i < n; i++) {
          var obj = v[i];
          if (typeof(obj.points[0]) === 'string' && typeof(obj.points[1]) === 'string') {
            conn.push(obj.points);
          }
        }
        
        this.set('state', conn);
        this.trigger('change:state', conn, this);
      },

      forceReflow: function (cb) {
        this.$el[0].offsetWidth = this.$el[0].offsetWidth;
        setTimeout(cb, 0);
      },

      componentDidMount: function () {
        var self = this;

        window.ex = self;

        self.cancelEvents = [];

        self.validConnections = self.options.connections || [];
        self.manyToMany = self.options.manyToMany || false;
        self.lineStyle = self.options.lineStyle || { 'stroke': '#1E6BBA' };
        self.orientation = self.options.orientation || 'any';
        self.correctLineStyle = self.options.correctLineStyle || {};
        self.connectors = self.getConnectors();
        self.connections = self.getConnections();

        var l = self.options.connections.length;

        self.irritationLevel = self.options.irritationLevel || 
          Math.round(l*l*1.5); //little higher, because of save states that don't modify score
        self.bindEvents();
        self.initPaper();
      },

      getConnectors: function() {
        var self = this;
        var r = {};

        var autoName = 0;

        self.$el.find('.connector').each(function(idx, el) {
          var $el = $(el);
          var conn = {
            $el: $el,
            name: $el.data('name'),
            group: $el.data('group')
          };
          if (!conn.name) {
            conn.name = '_connector' + autoName++;
          }
          for (var p = el.parentNode; p && !conn.group; p = p.parentNode) {
            conn.group = $(p).data('group');
          }
          for (p = el.parentNode; p; p = p.parentNode) {
            var $p = $(p);
            if ($p.hasClass('extension')) {
              conn.extension = $p;
              break;
            }
          }
          if (!conn.extension && $el.parent().hasClass('pin-to')) {
            conn.extension = $el.parent();
          }
          self.configureForDrag($el, conn.name);
          if (conn.extension) {
            self.configureForDrag(conn.extension, conn.name);
          }
          r[conn.name] = conn;
        });

        return r;
      },

      getConnections: function() {
        var self = this;

        var state = self.get('state') || [];

        var r = [];
        for (var i = 0, n = state.length; i < n; i++) {
          var obj = state[i];
          if (!self.connectors[obj[0]] || !self.connectors[obj[1]]) {
            continue;
          }
          var conn = {
            points: [obj[0], obj[1]]
          };
          r.push(conn);
        }

        return r;
      },

      initPaper: function() {
        var self = this;

        self.paper = Raphael(self.$el[0], 0, 0);
        self.svg = this.$el.children('svg');

        var timer = null;
        var onResize = _.throttle(function(refired) {
          self.forceReflow(function() {
            var w = self.$el.outerWidth();
            var h = self.$el.outerHeight();
            self.paper.setSize(w, h);
            self.svg.css('width', w);
            self.svg.css('height', h);
            self.svg.css('top', 0);
            self.svg.css('left', 0);
            self.forceReflow(self.render.bind(self));
            if (!refired) {
              if (timer) {
                clearTimeout(timer);
              }
              timer = setTimeout(function() {
                onResize(true);
                timer = undefined;
              }, 1000);
            }
          });
        }, 100);

        self.onResize = onResize;

        $(window).on('resize', onResize);
        self.cancelEvents.push(function() {
          $(window).off('resize', onResize);
        });

        onResize();
      },

      renderConnection: function(conn) {
        var points = conn.points.slice();
        var w, h, i, j, m, v;

        var needsNubs = [true, true];
        var svgOffset = this.$el.offset();

        for (i = 0; i < 2; i++) {
          var p = points[i];
          if (typeof(p) === 'string') {
            var connEl = this.connectors[p].$el;
            var off = connEl.offset();
            off.top -= svgOffset.top;
            off.left -= svgOffset.left;
            w = connEl.outerWidth();
            h = connEl.outerHeight();
            points[i] = {
              x: off.left + w*0.5,
              y: off.top + h*0.5
            };
            needsNubs[i] = false;
          }
        }

        var cp;
        var strongness = 0.5;
        w = points[1].x - points[0].x;
        h = points[1].y - points[0].y;

        var horiz;
        if (this.orientation === 'horizontal') {
          horiz = true;
        } else if (this.orientation === 'vertical') {
          horiz = false;
        } else {
          horiz = Math.abs(w) >= Math.abs(h);
        }

        if (horiz) {
          cp = {
            x1: points[0].x + w * strongness,
            y1: points[0].y,
            x2: points[1].x - w * strongness,
            y2: points[1].y
          };
        } else {
          cp = {
            x1: points[0].x,
            y1: points[0].y + h * strongness,
            x2: points[1].x,
            y2: points[1].y - h * strongness,
          };
        }

        var svgCommands = [
          'M', points[0].x, points[0].y, 
          'C', cp.x1, cp.y1, cp.x2, cp.y2, 
          points[1].x, points[1].y
        ];

        if (!conn.view) {
          conn.view = {
            path: this.paper.path(svgCommands),
            nubs: [null, null]
          };
          conn.view.path.attr('stroke-width', this.nubSize * 0.5);
        } else {
          conn.view.path.attr('path', svgCommands.join(' '));
        }
        conn.view.path.attr(this.lineStyle);
        if (!_.isEqual(this.correctLineStyle, {})) {
          var correct = false;
          for (j = 0, v = this.validConnections, m = v.length; j < m; j++) {
            var vconn = v[j];
            if ((vconn[0] === conn.points[0] && vconn[1] === conn.points[1]) ||
                (vconn[0] === conn.points[1] && vconn[1] === conn.points[0])) {
              correct = true;
              break;
            }
          }
          if (correct) {
            conn.view.path.attr(this.correctLineStyle);
          }
        }

        for (i = 0; i < 2; i++) {
          var nub = conn.view.nubs[i];
          if (needsNubs[i]) {
            if (!nub) {
              conn.view.nubs[i] = nub = $('<div class="connector"><div/>');
              nub.css('position', 'absolute');
              nub.css('left', 0);
              nub.css('top', 0);
              this.$el.append(nub);
            }
            var vendors = ['', '-webkit-', '-moz-', '-o-', '-ms-'];
            for (j = 0, m = vendors.length; j < m; j++) {
              nub.css(vendors[j] + 'transform', 'translate3d(' +
                    (points[i].x - this.nubSize * 0.5) + 'px, ' +
                    (points[i].y - this.nubSize * 0.5) + 'px, 0px)');
            }
          } else {
            if (nub) {
              nub.remove();
              conn.view.nubs[i] = null;
            }
          }
        }
      },

      destroyConnectionView: function(view) {
        if (view.path) {
          view.path.remove();
          view.path = null;
        }
        for (var i = 0; i < 2; i++) {
          var nub = view.nubs[i];
          view.nubs[i] = null;
          if (nub) {
            nub.remove();
          }
        }
      },

      render: function() {
        var self = this;
        if (!self.paper) { return; }

        self.nubSize = 20;

        for (var i = 0, v = self.connections, n = v.length; i < n; i++) {
          self.renderConnection(v[i]);
        }
      },

      configureForDrag: function(el, conn) {
        var self = this;

        el.on('mousedown', function(e) {
          self.touchId = null;
          if (self.mouseDown(e.pageX, e.pageY, conn)) {
            e.preventDefault();
          }
        });

        el.on('touchstart', function(e) {
          if (!self.touchId) {
            var touch = e.originalEvent.touches[0];
            if (self.mouseDown(touch.pageX, touch.pageY, conn)) {
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
              if (self.mouseMove(touch.pageX, touch.pageY)) {
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
                if (self.mouseDown(e.pageX, e.pageY, conn)) {
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
            if (self.mouseMove(e.pageX, e.pageY)) {
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
              if (self.mouseMove(e.pageX, e.pageY, $(this))) {
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

        self.cancelEvents.push(function() {
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
        });
      },

      componentWillUnmount: function() {
        var self = this;
        if (self.cancelEvents) {
          for (var i = 0, v = self.cancelEvents, n = v.length; i < n; i++) {
            v[i]();
          }
          delete self.cancelEvents;
        }
      },

      hitTest: function(x, y, div) {
        var pos = div.offset();
        var w = div.outerWidth();
        var h = div.outerHeight();
        return (x >= pos.left && x <= pos.left + w &&
                y >= pos.top  && y <= pos.top + h);
      },

      mouseDown: function(x, y, name) {
        var self = this;
        var conn;

        if (self.draggingConnection) { return false; }
        if (!self.manyToMany) {
          for (var i = 0, v = self.connections, n = v.length; i < n; i++) {
            conn = v[i];
            if (conn.points[0] === name) {
              self.draggingConnection = conn;
              self.draggingConnIndex = i;
              self.draggingEnd = 0;
              self.draggingFrom = conn.points[1];
              break;
            } else if (conn.points[1] === name) {
              self.draggingConnection = conn;
              self.draggingConnIndex = i;
              self.draggingEnd = 1;
              self.draggingFrom = conn.points[0];
              break;
            }
          }
        }

        if (!self.draggingConnection) {
          conn = { points: [name, null] };
          self.draggingConnIndex = self.connections.length;
          self.draggingConnection = conn;
          self.draggingEnd = 1;
          self.draggingFrom = name;
          self.connections.push(conn);
        }

        self.mouseMove(x, y);

        return true;
      },

      getHoveredConnector: function(x, y) {
        for (var i = 0, v = _.keys(this.connectors), n = v.length; i < n; i++) {
          var key = v[i];
          var conn = this.connectors[key];
          if (this.hitTest(x, y, conn.$el) || (conn.extension && this.hitTest(x, y, conn.extension))) {
            return conn.name;
          }
        }
        return null;
      },

      canDragTo: function(hoveredObject) {
        if (!hoveredObject) { return false; }
        var newConn = this.connectors[hoveredObject];
        var fromConn = this.connectors[this.draggingFrom];
        if (!this.manyToMany) {
          for (var i = 0, v = this.connections, n = v.length; i < n; i++) {
            var conn = v[i];
            if (conn.points[0] === hoveredObject || conn.points[1] === hoveredObject) {
              return false;
            }
          }
        }
        return newConn.group !== fromConn.group;
      },

      setHoveredObject: function(hoveredObject) {
        var self = this;

        if (hoveredObject !== self.hoveredObject) {
          if (self.hoveredObject) {
            var oldConn = self.connectors[self.hoveredObject];
            oldConn.$el.removeClass('hover');
            if (oldConn.extension) {
              oldConn.extension.removeClass('hover');
            }
          }
          if (hoveredObject && self.canDragTo(hoveredObject)) {
            var newConn = self.connectors[hoveredObject];
            newConn.$el.addClass('hover');
            if (newConn.extension) {
              newConn.extension.addClass('hover');
            }
          }
          self.hoveredObject = hoveredObject;
        }
      },

      mouseMove: function(x, y) {
        var self = this;

        if (!self.draggingConnection) { return false; }

        var off = self.$el.offset();
        var w = self.$el.width();
        var h = self.$el.height();
        var pageX = x;
        var pageY = y;
        x -= off.left;
        y -= off.top;

        var border = self.nubSize * 0.5;
        if (x < border) {
          x = border;
        }
        if (y < border) {
          y = border;
        }
        if (x > w - border) {
          x = w - border;
        }
        if (y > h - border) {
          y = h - border;
        }

        self.draggingConnection.points[self.draggingEnd] = {
          x: x,
          y: y
        };

        self.setHoveredObject(self.getHoveredConnector(pageX, pageY));

        self.render();
        return true;
      },

      mouseUp: function() {
        var self = this;

        if (!self.draggingConnection) { return false; }

        if (self.hoveredObject && self.canDragTo(self.hoveredObject)) {
          self.draggingConnection.points[self.draggingEnd] = self.hoveredObject;
        } else {
          self.connections.splice(self.draggingConnIndex, 1);
          self.destroyConnectionView(self.draggingConnection.view);
        }
        self.draggingConnection = null;
        self.setHoveredObject(null);
        self.saveState();

        return true;
      },


      score: function() {
        var scale = 100.0 / this.validConnections.length;
        var score = 0;
        for (var i = 0, v = this.connections, n = v.length; i < n; i++) {
          var conn = v[i];
          score--;
          for (var j = 0, w = this.validConnections, m = w.length; j < m; j++) {
            var vconn = w[j];
            if ((vconn[0] === conn.points[0] && vconn[1] === conn.points[1]) ||
                (vconn[0] === conn.points[1] && vconn[1] === conn.points[0])) {
              score += 2;
              break;
            }
          }
        }
        score *= scale;
        if (score < 0) {
          score = 0;
        }
        if (score > 100) {
          score = 100;
        }
        return Math.round(score);
      }
    });

  Exercises.ConnectPoints = ConnectPoints;
  return Exercises;
});
