var tour = new Tour({
  autoscroll: true,
  steps: [
  {
    orphan: false,
    element: "#selector-exercises",
    title: "Quick tip",
    content: "Use the\'next\' and \'previous\' buttons to navigate",
    placement: 'bottom'
  },
  {
    orphan: false,
    element: "#pick-one",
    title: "Title of my step",
    content: "Content of my step",
    placement: 'left'
  },
  {
    orphan: false,
    element: "#push-to-select",
    title: "Title of my step",
    content: "Content of my step",
    placement: 'left'
  },
  {
    orphan: false,
    element: "#true-false-exercises-or-true-false-",
    title: "Title of my step",
    content: "Content of my step",
    placement: 'left'
  }
  ],
  storage:false
  });
tour.init();
tour.start(true);


