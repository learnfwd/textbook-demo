define(['app', 'backbone', '../net/net'], function (App, Backbone, Net) {
  var net = Net.singleton();

  var NearbyClassrooms = Backbone.View.extend({
    initialize: function () {
      var self = this;

      self.state = null;
      if (net.locationLoaded) {
        self.fetchClassrooms();
      } else {
        self.listenTo(App, 'classroom:location:resolved', self.fetchClassrooms.bind(self));
        self.listenTo(App, 'classroom:location:locating', self.render.bind(self));
      }
      self.render();
    },

    render: function () {
      var self = this;

      var renderOpts = {
        state: self.state,
        error: self.error,
        classrooms: self.classrooms,
        locating: net.locationLookupStarted && !net.locationLoaded,
        reloadable: net.locationLoaded && net.location && self.state !== 'loading',
      };

      self.$el.html(window.getMixin('classroom-nearby')(renderOpts));

      if (renderOpts.reloadable) {
        self.$('.nearby-title').click(self.fetchClassrooms.bind(self));
      }
      if (self.state === 'loaded') {
        self.$('.nearby-classroom').click(function () {
          App.trigger('classroom:join', $(this).data('joinid'));
        });
      }
    },

    setState: function (state) {
      if (state !== this.state) {
        this.state = state;
        this.render();
      }
    },

    fetchClassrooms: function () {
      var self = this;

      if (self.state === 'loading') { return; }
      self.setState('loading');

      function stateChanged(error, result) {
        if (error) {
          self.error = error;
          self.setState('error');
          return;
        }
        self.classrooms = result;
        self.setState(result.length ? 'loaded' : 'empty');
      }

      if (!net.location) {
        self.error = new Error('Cannot get location');
        self.setState('error');
        return;
      }

      net.getNearbyClassrooms(stateChanged);
    },

  });

  return NearbyClassrooms;
});
