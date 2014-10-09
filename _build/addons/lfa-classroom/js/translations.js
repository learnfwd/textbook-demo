define(['app'], function(App) {
  var T = App.T;
  var en = T.languageObject('en');
  var ro = T.languageObject('ro');

  en.classroomTabName = 'Classroom';
  ro.classroomTabName = 'Clasă';

  en.OFF = 'OFF';
  ro.OFF = 'NU';
  en.ON = 'ON';
  ro.ON = 'DA';

  return T;
});
