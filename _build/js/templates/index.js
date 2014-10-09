define(function(require) {
  var async = {};
  var templates = {};
  
  window.asyncDefine = function (key, fn) {
    var opts = async[key];
    if (!opts.loading) return;
    opts.loading = false;
    opts.loaded = true;
    var value = fn()();
    templates[key] = value;
    for (var i = 0, n = opts.callbacks.length; i < n; i++) {
      opts.callbacks[i](null, value);
    }
    opts.callbacks.length = 0;
  };
  
  templates.asyncLoad = function (key, callback) {
    var opts = async[key];
    if (opts.loaded) {
      callback(null, templates[key]);
    } else {
      opts.callbacks.push(callback);
      if (!opts.loading) {
        opts.loading = true;
        var script = document.createElement('script');
        script.src = opts.src;
        opts.element = script;
        document.head.appendChild(script);
      }
    }
  };
  
  templates.templateExists = function (key) {
    return async[key] !== undefined || templates[key] !== undefined;
  };
  
  templates.removeLoaded = function (key) {
    var opts = async[key];
    if (opts.loaded) {
      templates[key] = undefined;
    } else if (opts.loading) {
      for (var i = 0, n = opts.callbacks.length; i < n; i++) {
        opts.callbacks[i](new Error('Loading cancelled'), null);
      }
    }
    if (opts.element) {
      document.head.removeChild(opts.element);
      opts.element = null;
    }
    opts.loading = opts.loaded = false;
  };
  
  function register(key, src) {
    async[key] = {
      src: src,
      callbacks: []
    };
  };

  register('ch00-cover-00-cover', 'js/templates/ch00-cover-00-cover.js');
  register('ch01-intro-00-intro', 'js/templates/ch01-intro-00-intro.js');
  register('ch01-intro-01-how-to-use', 'js/templates/ch01-intro-01-how-to-use.js');
  register('ch02-exercises-00-intro', 'js/templates/ch02-exercises-00-intro.js');
  register('ch02-exercises-02-selectors', 'js/templates/ch02-exercises-02-selectors.js');
  register('ch02-exercises-04-drawing-pad', 'js/templates/ch02-exercises-04-drawing-pad.js');
  register('ch02-exercises-05-textline', 'js/templates/ch02-exercises-05-textline.js');
  register('ch02-exercises-06-drag-and-sort', 'js/templates/ch02-exercises-06-drag-and-sort.js');
  register('ch02-exercises-08-splitter', 'js/templates/ch02-exercises-08-splitter.js');
  register('ch02-exercises-09-combine', 'js/templates/ch02-exercises-09-combine.js');
  register('ch02-exercises-10-connect', 'js/templates/ch02-exercises-10-connect.js');
  register('ch02-exercises-11-crosswords', 'js/templates/ch02-exercises-11-crosswords.js');
  register('ch02-exercises-12-arithmetic', 'js/templates/ch02-exercises-12-arithmetic.js');
  register('ch03-classroom-00-intro', 'js/templates/ch03-classroom-00-intro.js');
  register('ch03-classroom-02-sync-nav', 'js/templates/ch03-classroom-02-sync-nav.js');
  register('ch03-classroom-03-working-together', 'js/templates/ch03-classroom-03-working-together.js');
  register('ch03-classroom-04-under-control', 'js/templates/ch03-classroom-04-under-control.js');
  register('ch04-technical-00-intro', 'js/templates/ch04-technical-00-intro.js');
  register('ch05-next-steps-00-intro', 'js/templates/ch05-next-steps-00-intro.js');
  register('ch04-technical-02-backstage-00-the-backstage', 'js/templates/ch04-technical-02-backstage-00-the-backstage.js');
  register('ch04-technical-02-backstage-01-the-avatar', 'js/templates/ch04-technical-02-backstage-01-the-avatar.js');
  register('ch04-technical-02-backstage-02-notifications', 'js/templates/ch04-technical-02-backstage-02-notifications.js');
  register('ch04-technical-02-backstage-03-the-dashboard', 'js/templates/ch04-technical-02-backstage-03-the-dashboard.js');
  register('ch04-technical-03-exercises-00-exercises-toc', 'js/templates/ch04-technical-03-exercises-00-exercises-toc.js');
  register('ch04-technical-03-exercises-02-selectors', 'js/templates/ch04-technical-03-exercises-02-selectors.js');
  register('ch04-technical-03-exercises-03-highlighters', 'js/templates/ch04-technical-03-exercises-03-highlighters.js');
  register('ch04-technical-03-exercises-04-sortables', 'js/templates/ch04-technical-03-exercises-04-sortables.js');
  register('ch04-technical-03-exercises-05-drawing', 'js/templates/ch04-technical-03-exercises-05-drawing.js');
  register('ch04-technical-03-exercises-06-inputs', 'js/templates/ch04-technical-03-exercises-06-inputs.js');
  register('ch04-technical-03-exercises-07-math', 'js/templates/ch04-technical-03-exercises-07-math.js');
  register('ch04-technical-03-exercises-07b-calcuwords', 'js/templates/ch04-technical-03-exercises-07b-calcuwords.js');
  register('ch04-technical-03-exercises-08-wordgames', 'js/templates/ch04-technical-03-exercises-08-wordgames.js');
  register('ch04-technical-03-exercises-09-syllables', 'js/templates/ch04-technical-03-exercises-09-syllables.js');
  register('ch04-technical-03-exercises-10-connect', 'js/templates/ch04-technical-03-exercises-10-connect.js');
  register('ch04-technical-03-exercises-98-full-screen', 'js/templates/ch04-technical-03-exercises-98-full-screen.js');
  register('ch04-technical-03-exercises-01-introduction-01-introduction', 'js/templates/ch04-technical-03-exercises-01-introduction-01-introduction.js');
  register('ch04-technical-03-exercises-01-introduction-02-exercise', 'js/templates/ch04-technical-03-exercises-01-introduction-02-exercise.js');
  register('ch04-technical-03-exercises-01-introduction-03-exercise-extra', 'js/templates/ch04-technical-03-exercises-01-introduction-03-exercise-extra.js');
  register('ch04-technical-03-exercises-01-introduction-04-avatar', 'js/templates/ch04-technical-03-exercises-01-introduction-04-avatar.js');
  register('ch04-technical-03-exercises-01-introduction-05-hints-and-irritation', 'js/templates/ch04-technical-03-exercises-01-introduction-05-hints-and-irritation.js');
  register('ch04-technical-03-exercises-99-advanced-00-advanced-intro', 'js/templates/ch04-technical-03-exercises-99-advanced-00-advanced-intro.js');
  register('ch04-technical-03-exercises-99-advanced-97-utility-functions', 'js/templates/ch04-technical-03-exercises-99-advanced-97-utility-functions.js');
  register('ch04-technical-03-exercises-99-advanced-99-extras', 'js/templates/ch04-technical-03-exercises-99-advanced-99-extras.js');
  templates['search_result'] = require('js/templates/search_result.js');
  return templates;
});