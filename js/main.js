define([
  '../addons/lfa-exercises/js/main',
  '../addons/lfa-backstage/js/main',
  '../addons/lfa-classroom/js/main',
  '../addons/lfa-classroom/js/views/name-input',
  '../addons/lfa-content-widgets/js/main',
], function(Exercises) {
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

  $('#textbook')
    .removeClass('col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2')
    .addClass('col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1');

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

  $('body').after('<script type="text/javascript" src="dist/lfa-content-editor.js"></script>');
});
