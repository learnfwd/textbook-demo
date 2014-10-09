/**
 * Avatar interaction
 */
define([], function () {
  var indifference = 0;
  var upsetance = 0;

  // TODO: should read an 'enabled' variable from config
  var isNotQualified = function(exercise) {
    if (exercise.options.ignoreAvatar) { return true;}

    if (exercise.type !== 'Exercise' && exercise.options.ignoreAvatar !== false) {
      return true;
    }
  };

  window.App.on('exercise:first-time-done', function(exercise) {
    if(isNotQualified(exercise)) {return;}
    
    var message  = exercise.options.firstTimeDoneMessage;
    var mood     = exercise.options.firstTimeDoneMood || 'smart';
    var interval = (typeof exercise.options.firstTimeDoneMood === 'number') ? interval * 1000 : 4000;
    var description = exercise.options.description;
    var sound    = exercise.options.firstTimeDoneSound;
    var icon     = exercise.options.firstTimeDoneIcon || 'fa-star';

    if (!message && window.firstTimeDoneMessages && window.firstTimeDoneMessages.length) {
      message = window.firstTimeDoneMessages[
        Math.floor(window.firstTimeDoneMessages.length * Math.random())
      ];
    }

    window.App.trigger('avatar:mood', {
      mood: mood,
      message: message,
      interval: interval,
      info: description,
      sound: sound,
      icon: icon
    });

    window.App.trigger('static', 'ex-ftd', exercise.toJSON());
  });

  window.App.on('exercise:done', function(exercise) {
    if(isNotQualified(exercise)) {return;}

    var message  = exercise.options.doneMessage;
    var mood     = exercise.options.doneMood || 'happy';
    var interval = (typeof exercise.options.doneMood === 'number') ? interval * 1000 : 3500;
    var description = exercise.options.description;
    var sound    = exercise.options.doneSound;
    var icon     = exercise.options.doneIcon;

    window.App.trigger('avatar:mood', {
      mood: mood,
      message: message,
      interval: interval,
      info: description,
      sound: sound,
      icon: icon
    });
  });

  window.App.on('exercise:score:increase', function(score, exercise) {
    if(isNotQualified(exercise)) {return;}

    var message  = exercise.options.scoreIncreaseMessage;
    var mood     = exercise.options.scoreIncreaseMood || 'wink';
    var interval = (typeof exercise.options.scoreIncreaseMood === 'number') ? interval * 1000 : 1000;
    var description = exercise.options.description;
    var sound    = exercise.options.scoreIncreaseSound;
    var icon     = exercise.options.scoreIncreaseIcon;

    window.App.trigger('avatar:mood', {
      mood: mood,
      message: message,
      interval: interval,
      info: description,
      sound: sound,
      icon: icon
    });
  });

  window.App.on('exercise:score:decrease', function(score, exercise) {
    if(isNotQualified(exercise)) {return;}

    var message  = exercise.options.scoreDecreaseMessage;
    var mood     = exercise.options.scoreDecreaseMood || 'upset';
    var interval = (typeof exercise.options.scoreDecreaseMood === 'number') ? interval * 1000 : 1000;
    var description = exercise.options.description;
    var sound    = exercise.options.scoreDecreaseSound;
    var icon     = exercise.options.scoreDecreaseIcon;
    if (Math.random() > 0.8) {
      window.App.trigger('avatar:mood', {
        mood: mood,
        message: message,
        interval: interval,
        info: description,
        sound: sound,
        icon: icon
      });
    }
  });

  window.App.on('exercise:score:same', function(score, exercise) {
    if(isNotQualified(exercise)) {return;}

    var message  = exercise.options.scoreTheSameMessage;
    var mood     = exercise.options.scoreTheSameMood || 'unimpressed';
    var interval = (typeof exercise.options.scoreTheSameMood === 'number') ? interval * 1000 : 1000;
    var description = exercise.options.description;
    var sound    = exercise.options.scoreTheSameSound;
    var icon     = exercise.options.scoreTheSameIcon;
    if (Math.random() > 0.9) {
      window.App.trigger('avatar:mood', {
        mood: mood,
        message: message,
        interval: interval,
        info: description,
        sound: sound,
        icon: icon
      });
    }
  });
});