define([
  '../js/exercises',
  '../js/exercise'
], function () {
  var App = window.App;

  App.on('exercise:hint:show', function (hint, exercise) {
    App.trigger('avatar:mood', {mood: 'smart', message: hint, icon: 'fa-life-ring', interval: 3000});
    var data = exercise.toJSON();
    data.irritation = exercise.irritation;
    window.App.trigger('static', 'ex-hnt', data);
  });

  App.on('exercise:irritation:reset', function(exercise) {
    exercise.irritation = 0;
  });
  
  App.on('exercise:mounted', function(exercise) {
    exercise.irritation = 0;
  });

  App.on('exercise:irritation:up', function(amount, exercise) {
    if(!exercise.isMounted) {return;}

    var irritationLevel = exercise.irritation || 0;
    irritationLevel += Math.max(amount, 0);

    exercise.irritation = irritationLevel;

    if(exercise.childrenReady && irritationLevel >= exercise.irritationLevel && !exercise.alreadyMad) {
      App.trigger('avatar:mood', {
        mood: 'helpless',
        message: App.T('dontGuess'),
        icon: 'fa-exclamation',
        interval: 5000
      });
      window.App.trigger('static', 'ex-mad', exercise.toJSON());
      exercise.alreadyMad = true;
    }
    if(exercise.options.hints && exercise.options.hints[irritationLevel - 1]) {
      App.trigger('exercise:hint:show', exercise.options.hints[irritationLevel - 1], exercise);
      exercise.options.hints[irritationLevel - 1] = null;
    }

    if(exercise.options.hints && exercise.options.hints[irritationLevel]) {
      App.trigger('exercise:hint:show', exercise.options.hints[irritationLevel], exercise);
       exercise.options.hints[irritationLevel] = null;
    }
  });


  App.on('exercise:score:decrease', function(score, exercise) {
    App.trigger('exercise:irritation:up', 2, exercise);
  });

  App.on('exercise:score:same', function(score, exercise) {
    if (score >= 100) { return; }

    App.trigger('exercise:irritation:up', 1, exercise);
  });

  App.on('exercise:score:increase', function(score, exercise) {
    if (score < 100){
      App.trigger('exercise:irritation:up', -3, exercise);
    } else {
      App.trigger('exercise:irritation:reset', exercise, exercise);
    }
  });

});
