define([
  'lfa-exercises',
  'lfa-backstage',
  'lfa-classroom',
  'lfa-classroom/views/name-input',
  'lfa-content-widgets',
], function(Exercises) {
  // Add content editor module
  //$.getScript('/dist/lfa-content-editor.js');

  window.Exercises = Exercises;
  NameInput = arguments[3];

  window.firstTimeDoneMessages = [
    'Bravo!',
    'Congrats!',
    'Excellent!',
    'Correct!',
    'Super!',
    'Impressive!',
    'Flawless!'
  ];

  var greetings = ['Welcome!', 'Hi!', 'Good day!', 'Howdy!', 'What\'s up?'];

  var hh = (new Date()).getHours();

  if (hh >= 2 && hh < 12) {
    greetings.push('Good morning!');
  }
  else if (hh > 17 || hh < 2) {
    greetings.push('Good evening!!');
  } else {
    greetings.push('Hello!');
  }

  var useCounter = window.App.storage.getItem('useCounter') || 0;
  useCounter = parseInt(useCounter) + 1;

  var message = greetings[Math.min(Math.floor(Math.random() *
    greetings.length*1.5), greetings.length-1)];


  if(useCounter < 2){
     message = 'Thank you for trying this!';
  }

  window.setTimeout(function () {
    window.App.trigger('avatar:mood', {
      mood: 'smile',
      message: message,
      interval: 5000,
      icon: 'fa-smile-o'
    });
  }, 4000);

  window.App.storage.setItem('useCounter', useCounter);

  var nameInput = null;

  App.book.on('render', function (opts) {
    var chapter = opts.chapter;

    if (nameInput) {
      nameInput.remove();/**/
    }

    if (chapter === 'ch00-cover-00-cover') {
      nameInput = new NameInput({
        el: $('.cover-name-input'),
      });
    }

    $('.progress .progress-bar').progressbar();
  });
});
