var tour = new Tour({
  autoscroll: true,
  steps: [
  {
    orphan: false,
    element: "#selector-exercises",
    title: "Quick navigation",
    content: "Use the \'next\' and \'previous\' buttons to navigate",
    placement: 'bottom', // top bottom right left
    onShow: function (tour) {
      $('#scrollview').animate({ scrollTop: $('#selector-exercises').offset().top }, 500);
    }
  },
  {
    orphan: false,
    element: "#pick-one",
    title: "Pick-one ",
    content: "simple exercise, with multiple answers where only one is correct",
    placement: 'right',
    onShow: function (tour) {
      $('#scrollview').animate({ scrollTop: $('#pick-one').offset().top }, 500);
    }
  },
  {
    orphan: false,
    element: "#push-to-select",
    title: "push to select",
    content: "<img src=\'http://ecx.images-amazon.com/images/I/315dK1%2BTOFL.jpg\'></img>",
    placement: 'top',
    onShow: function (tour) {
      $('#scrollview').animate({ scrollTop: $('#push-to-select').offset().top }, 500);
    }
  },
  {
    orphan: false,
    element: "#true-false-exercises-or-true-false-",
    title: "true / false",
    content: "<img src= \'http://www.selvamadre.com/wp-content/uploads/2014/08/red-or-blue-pill.jpg\'></img>",
    placement: 'right',
    onShow: function (tour) {
      $('#scrollview').animate({ scrollTop: $('#true-false-exercises-or-true-false-').offset().top }, 500);
    }
  }
  ],
  storage:false
  });
tour.init();
tour.start(true);
//$('#scrollview').animate({ scrollTop: $('#true-false-exercises-or-true-false-').offset().top }, 500);
//$('button[data-role="next"]').css('background-color','red');