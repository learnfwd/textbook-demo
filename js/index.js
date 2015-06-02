(function() {
  'use strict';
  var App = require('lfa-core/app');
  var $   = require('bootstrap');
  var ClassMateList = require('lfa-classroom/views/classmate-list');
  var NameInput = require('lfa-classroom/views/name-input');

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

  var useCounter = App.storage.getItem('useCounter') || 0;
  useCounter = parseInt(useCounter) + 1;
  App.storage.setItem('useCounter', useCounter);

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

    var studentList = document.getElementById('student-list');
    if (studentList) {
      React.render(
        React.createElement(ClassMateList, null),
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

})();