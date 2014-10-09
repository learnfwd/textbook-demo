define([
  'app',
  '../js/exercise',
  '../lib/Sortable'
], function (App, Exercises, Sortable) {
  var DragAndSort = Exercises.Exercise.extend({
    type: 'DragAndSort',
    defaultIrritationLevel: 25,

    onUpdate: function() {
      var self = this;
      var newOrder = [];

      self.$el.find('.item').each(function (index, el) {
        var $el = $(el);

        newOrder.push($el.data('index'));

        $el.removeClass('item-in-place item-not-in-place').
          addClass(
            $el.data('target') === index ? 'item-in-place' : 'item-not-in-place'
          );
      });

      self.set('state', newOrder);
      self.trigger('change:state', newOrder, self);
    },

    componentDidMount: function () {
      var self = this;

      var items = self.$el.find('.item');
      var l = items.length;

      self.container = self.$el.find('.items')[0] || self.$el[0];
      self.sortable = new Sortable(self.container, {
        group: self.options.group || 'group' + self.id,
        handle: self.options.handle,
        draggable: self.options.draggable || '.item',
        onUpdate: function () {
          self.onUpdate();
        }
      });

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

      self.rearrange();
      self.irritationLevel = self.options.irritationLevel || Math.round(l * l / 1.2); // Combinations
    },

    onRemoteChanges: function(msg) {
      var self = this;
      var oldState = self.get('state');

      self.changingRemotely = true;
      self.set('state', msg.state);
      var newValue = '';

      var notification = App.T.translate('dragAndSortNoDescription', [
        msg.from.name || msg.from.id,
        newValue
      ]);

      App.trigger('notify', notification);
      self.rearrange();
      self.onUpdate();

      self.changingRemotely = false;
    },

    rearrange: function () {
      var self = this;

      var items = self.$el.find('.item');
      var l = items.length;
      var i;

      // Compute 'target'
      var dataIndeces = [];
      for (i=0; i < l; i++) {
        dataIndeces.push($(items[i]).data('index'));
      }

      dataIndeces.sort();
      for (i=0; i < l; i++) {
       $(items[i]).data('target', _.indexOf(dataIndeces, $(items[i]).data('index')));
      }

      // Restore the order according to the saved state
      var state = self.get('state') || [];
      if(state.length === 0) { return; }

      var currentOrder = new Array(l);

      items.detach();

      for (i=0; i < l; i++) {
         currentOrder[$(items[i]).data('index')] = i;
      }

      for (i=0; i < l; i++) {
       $(this.container).append(items[currentOrder[state[i]]]);
       $(items[i]).data('target', _.indexOf(dataIndeces, $(items[i]).data('index')));
      }
    },

    componentWillUnmount: function () {
      if (this.sortable) {
        this.sortable.destroy();
      }
    },

    // render: function () {
    // },

    scoreComputedByInPlace: function () {
      var self = this;

      var $items = self.$el.find('.item') || 1; // don't divide by zero!
      var $itemsInPlace = self.$el.find('.item-in-place');

      return Math.round(100 * $itemsInPlace.length / $items.length);
    },

    scoreComputedByRelativeOrder: function () {
      var self = this;
      var state = self.get('state') || [];

      var score = 0;

      for(var i = 1, l = state.length; i < l; i++) {
        if(state[i-1] <= state[i]) {
          score++;
        }
      }
      score = Math.round(100 * score / (l-1));
      return score;
    },

    score: function () {
      var self = this;

      var s =  self.options.scoreByRelativeOrder ?
        (this.scoreComputedByRelativeOrder()) :
        (this.scoreComputedByInPlace());

      self.trigger('change:score', s, self);

      if(s >= 100) {
        self.$el.addClass('done');
      } else {
        self.$el.removeClass('done');
      }
      return s;
    }
  });

  Exercises.DragAndSort = DragAndSort;
  return Exercises;
});
