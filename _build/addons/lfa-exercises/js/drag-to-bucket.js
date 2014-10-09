define([
  'app',
  '../js/exercise',
  '../lib/Sortable'
], function (App, Exercises, Sortable) {
  var DragToBucket = Exercises.Exercise.extend({
    type: 'DragToBucket',

    onUpdate: function() {
      var self = this;
      var state = {};

      this.buckets.find('.bucket').each(function(bucketIndex, bucket){
        var newOrder = [];
        var $bucket = $(bucket);

        var name = $bucket.data('name') || bucketIndex;

        $bucket.find('.item').each(function (index, el) {
          newOrder.push($(el).data('index'));
        });


        state[name] = newOrder;
      });

      self.set('state', state);
      self.trigger('change:state', state, self);
    },

    componentDidMount: function () {
      var self = this;
      self.bucketNames = {};

      self.buckets = self.$el.find('.buckets');
      self.buckets = (self.buckets.length) ? self.buckets : self.$el;

      self.sortables = [];

      if (self.options.bucketsSortable) {
        self.sortables.push(
          new Sortable(self.buckets[0], {group: 'buckets' + self.id}));
      }

      self.buckets.find('.bucket').each(function (bucketIndex, bucket) {
        var $bucket = $(bucket);
        var name = $bucket.data('name') || bucketIndex;

        if (!name) {
          alert('Data-name is required for ' +
              'every .bucket. ' + self.options.name || self.id);
          throw 'Data-name is required for ' +
              'every .bucket. ' + self.options.name || self.id;
        }

        self.bucketNames[name] = $bucket;

        $bucket.find('.items').each(function(index, container) {
          self.sortables.push(
            new Sortable(container, {
              group: self.options.group ||'bucket' + self.id,
              handle: self.options.handle,
              draggable: self.options.draggable || '.item',
              onAdd: function () {
                self.onUpdate();
              },
              onUpdate: function () {
                self.onUpdate();
              }
            }));
        });
      });

      var l = self.$el.find('.item').length;

      self.irritationLevel = self.options.irritationLevel || self.defaultIrritationLevel +
        Math.round(l * l); // Combinations

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
    },

    rearrange: function () {
      var self = this;

      // Restore the order according to the saved state

      var state = self.get('state');
      if (!state) {return;}


      var items = self.$el.find('.item').detach();
      var l = items.length;
      var currentOrder = new Array(l);


      for (var i=0; i < l; i++) {
          var index = $(items[i]).data('index');

          if (!index) {
            alert('You forgot to have data-index property for a ' +
              'drag-to-bucket exercise somwehere on this page. Please have this property.');
            throw 'You forgot to have data-index property for a '+
              'drag-to-bucket exercise somwehere on this page. Please have this property.';
          }

          currentOrder[index] = i;
      }

      _.each( _.keys(state), function(bkt) {
        var $bucket = self.bucketNames[bkt];
        var bucketContainer = $bucket.find('.items');

        if(! bucketContainer.length) {
          bucketContainer = $bucket;
        }

        var bucketItems = state[bkt];
        for (var c = 0, biLen = bucketItems.length; c < biLen; c++) {
          bucketContainer.append(items[currentOrder[bucketItems[c]]]);
        }
      });
    },

    onRemoteChanges: function(msg) {
      var self = this;
      self.changingRemotely = true;
      self.set('state', msg.state);
      var newValue = 'coco';

      var notification = App.T.translate('yesNoChangedNoDescription', [
        msg.from.name || msg.from.id,
        newValue
      ]);

      App.trigger('notify', notification);
      self.rearrange();
      self.onUpdate();

      self.changingRemotely = false;
    },

    componentWillUnmount: function () {
      if (this.sortables) {
        for (var i = 0, v = this.sortables, n = v.length; i < n; i++) {
          v[i].destroy();
        }
        this.sortables = null;
      }
    },

    render: function () {
      var self = this;
      var score = self.get('score');
      var bucketsThatHave = {}; // used to see if all elements of a bucket are in that bucket

      self.rearrange();

      self.buckets.find('.bucket').each(function (bucketIndex, bucket) {
        var $bucket = $(bucket);
        var name = $bucket.data('name') || bucketIndex;

        $bucket.find('.item').each(function(itemIndex, item) {
          var $item = $(item);
          var target = $item.data('target');

          $item.removeClass('in-good-bucket in-bad-bucket');
          if (target === name) {
            $item.addClass('in-good-bucket');
          } else {
            $item.addClass('in-bad-bucket');
          }

          bucketsThatHave[target] = bucketsThatHave[target] || [];
          bucketsThatHave[target].push(name);
        });
      });


      _.each(_.keys(bucketsThatHave), function (key) {
        var u = _.union(bucketsThatHave[key]);
        // all emements are in when u has one element and that element is the key
        var allIn = u.length === 1 && u[0] === key;

        var $bucket = $('*[data-name="' + key + '"].bucket');
        $bucket.removeClass('all-in');
        if (allIn) {
          $bucket.addClass('all-in');
        }


      });

      if(score >= 100) {
        self.$el.addClass('done');
      } else {
        self.$el.removeClass('done');
      }
    },

    score: function () {
      var self = this;
      var score = 0;
      var state = self.get('state');

      var bucketsNo = 0;

      self.buckets.find('.bucket').each(function (bucketIndex, bucket) {
        var $bucket = $(bucket);
        var name = $bucket.data('name') || bucketIndex;
        var bucketScore = 0;
        var n = 0;

        $bucket.find('.item').each(function(itemIndex, item) {
          var target = $(item).data('target');

          n++;
          if (name === target) {
            bucketScore++;
          } else {
            bucketScore--;
          }
        });

        if (!n) { return; }

        bucketScore = Math.round(100 * bucketScore / n);
        bucketScore = Math.min(100, Math.max(bucketScore, 0));
        
        // TODO: Move this to render function, it does not belong here
        $bucket.removeClass('no-bad-items-inside');

        if(bucketScore === 100) {
          $bucket.addClass('no-bad-items-inside');
        }

        var bucketOrderScore = 0;
        if(bucketScore === 100 && self.options.orderInBuckets) {
          
          var itemIndexes = state[name];
          var iiLen = itemIndexes.length;

          if (iiLen > 1) { 
            for (var i = 1; i <iiLen; i++) {
              if (itemIndexes[i] > itemIndexes[i - 1]) {
                bucketOrderScore++;
              }
              else {
                bucketOrderScore--;
              }
            }
            bucketOrderScore = Math.round(100 * bucketOrderScore / (iiLen-1));
            bucketOrderScore = Math.min(100, Math.max(bucketOrderScore, 0));
          }
          else if(iiLen === 1) {
            bucketOrderScore = 100;
          }

          bucketScore = (bucketScore + bucketOrderScore) / 2;
        }

        score += bucketScore;
        bucketsNo++;

      });
      
      return Math.round(score/bucketsNo);
    }
  });

  Exercises.DragToBucket = DragToBucket;
  return Exercises;
});
