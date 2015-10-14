var App = require('lfa-core').App;
var Storage = require('lfa-core').Storage;
var $ = require('jquery');

App.book.on('render', function() {
  if(window.location.href.substr(-12) == 'ch99-contact')
    {
      $('#textbook').css('padding','0');
      $('section').css('padding','0');
    }

  if($('li.active').parent(0).is('li'))
    {
      console.log('yes');
      $('li.active').parent(0).addClass('activeParent');
    }
  else
    {
      console.log('yesy' + $('li.active').parent());
      $('li.active').addClass('activeParent');
    }
  $('#leftbar li:not(.active)').removeClass('activeParent');
});

(function() {
  'use strict';
  var $ = require('bootstrap');
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
  } else if (hh > 17 || hh < 2) {
    greetings.push('Good evening!!');
  } else {
    greetings.push('Hello!');
  }

  var useCounter = Storage.getItem('useCounter') || 0;
  useCounter = parseInt(useCounter) + 1;
  Storage.setItem('useCounter', useCounter);

  var message = greetings[Math.min(Math.floor(Math.random() *
    greetings.length * 1.5), greetings.length - 1)];


  if (useCounter < 2) {
    message = 'Thank you for trying this!';
  }

  setTimeout(function() {
    App.trigger('avatar:mood', {
      mood: 'smile',
      message: message,
      interval: 5000,
      icon: 'fa-smile-o'
    });
  }, 4000);

  App.book.on('render', function( /*opts*/ ) {
    var classroom = require('lfa-classroom');
    var ClassmateList = classroom.ClassmateList;
    var NameInput = classroom.NameInput;

    console.log(classroom, ClassmateList, NameInput);


    var studentList = document.getElementById('student-list');
    if (studentList) {
      React.render(
        React.createElement(ClassmateList, null),
        studentList
      );
    }

    var nameInput = document.getElementById('cover-name-input');
    if (nameInput) {
      React.render(
        React.createElement(NameInput, null),
        nameInput
      );
    }
  });
  $('body').after('<script type="text/javascript" src="https://news.lfwd.io/banner.js"></script>');
})();
