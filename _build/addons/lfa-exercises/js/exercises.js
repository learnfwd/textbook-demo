/**
 * Utility class (actually hash table) for exercises storage and structure
 * Offers: store (fetch, save), push, and pop methods
 */
define([], function () {
  /* global IEProofLocalStorage */
  String.prototype.toLowerCaseAndCleanupDiacritics = function() {
    var text = this.trim().toLocaleLowerCase();
    var replaceThis = ['ă', 'â', 'î', 'ș', 'ț', 'ş', 'ţ', '\u0070ula', '\u0070izd\u0061', '\u006Duie'];
    var withThis    = ['a', 'a', 'i', 's', 't', 's', 't', 'salut', 'hello', 'nici chiar'];

    for(var i = 0, j = replaceThis.length; i < j; i++) {
      text = text.split(replaceThis[i]).join(withThis[i]);
    }
    return text;
  };

  String.prototype.compareIgnoringCase = function(to) {
    to = to || '';
    return this.trim().toLocaleLowerCase() === to.trim().toLocaleLowerCase();
  };

  String.prototype.compareIgnoringCaseAndDiacritics = function(to) {
    to = to || '';
    return this.toLowerCaseAndCleanupDiacritics() === to.toLowerCaseAndCleanupDiacritics();
  };

  // TODO
  String.prototype.translate = function() {
    return this + ' (ro)';
  };

  var Exercises = {
    // Local storage API proxy
    store: {
      fetch: function (exercise) {
        if (!exercise.id) {
          console.error('Exercise should have an ID when fetched');
          return null;
        }

        exercise.set(
          JSON.parse(window.App.storage.getItem('ex_' + exercise.id))
        );

        exercise.trigger('data_loaded', exercise);
        exercise._render();
      },

      save: function (exercise) {
        if (exercise.options && exercise.options.dontSave) {
          return;
        }

        if (!exercise.id) {
          console.error('Exercise should have an ID when saved');
          return null;
        }

        if (!exercise.attributes) {
          console.warn('Nothing to save. Attributes are null');
          return null;
        }

        try {
          window.App.storage.setItem(
            'ex_' + exercise.id,
            JSON.stringify(exercise.toJSON())
          );
          exercise.trigger('data_saved', exercise);
        }
        catch (err) {
          alert('This page needs to save data locally.' +
            ' Please use an updated browser or leave private mode in order to continue. \n' + err);
          throw ('This page needs to save data locally.'+
            ' Please use an updated browser or leave private mode in order to continue. ' + err);
        }
      },

      clear: function(exercise) {
        try {
          window.App.storage.removeItem('ex_' + exercise.id);
          exercise.trigger('data_cleared', exercise);
          exercise._render();
        }
        catch (err) {
          alert('This page needs to save data locally.' +
            ' Please use an updated browser or leave private mode in order to continue. \n' + err);
          throw ('This page needs to save data locally.'+
            ' Please use an updated browser or leave private mode in order to continue. ' + err);
        }
      }
    },

    _stack: [],

    findIdByName: function (name) {
      return _.find(_.keys(window.App.storage), function (key) {
        try {
          var attrs = JSON.parse(window.App.storage.getItem(key));
          return attrs.name === name;
        }
        catch (E) {
          return undefined;
        }
      });
    },

    getAttributesById: function (id) {
      if (!id) {
        return;
      }

      try {
        return JSON.parse(window.App.storage.getItem(id));
      } catch (E) {
        return undefined;
      }
    },

    getAttributesByName: function (name) {
      return this.getAttributesById(this.findByName(name));
    },

    clearAppStorage: function() {
      _.each(_.keys(window.App.storage), function(k) {
        if(k.match(/^ex_\d+/)) {
          window.App.storage.removeItem(k);
        }
      });
    },

    deleteStorageForId: function(id) {
      window.App.storage.removeItem(id);
    },


    // Push & Pop are used to implement the hierarchy in the
    // exercise tree
    push: function (exercise) {
      var _stack = this._stack;
      var parent = _stack[_stack.length - 1];

      _stack.push(exercise);

      this.current = exercise;

      if (parent) {
        parent.children.push(exercise);
        parent.listenTo(exercise, 'change:state', parent._onChildChangedState);
        parent.listenTo(exercise, 'change:score', parent._onChildChangedScore);
      }

      return exercise;
    },

    pop: function () {
      var top = this._stack.pop();
      this.current = top;
      top.trigger('children_ready');
      top._render();
      return top;
    }
  };
  return Exercises;
});