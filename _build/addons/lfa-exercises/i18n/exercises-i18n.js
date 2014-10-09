define(['app'], function(App) {
  var en = App.T.languageObject('en');
  var ro = App.T.languageObject('ro');
  en.dontGuess = 'Are you solving this or just guessing the answer?';
  ro.dontGuess = 'Încerci să rezolvi exercițiul sau doar ghicești răspunsul?';

  ro.yesNoValueNothing = '(nimic)';
  en.yesNoValueNothing = '(nothing)';

  ro.yesNoChangedNoDescription = '%1 a schimbat valoarea la %2';
  en.yesNoChangedNoDescription = '%1 changed value to %2';

  ro.selectToHighlightNoDescroption = '%1 a %2';
  en.selectToHighlightNoDescroption = '%1 %2';

  ro.selectToHighlightSelected = ' selectat %1';
  en.selectToHighlightSelected = ' selected %1';

  ro.selectToHighlightUnselected = ' deselectat %1';
  en.selectToHighlightUnselected = ' unselected %1';

  ro.dragAndSortNoDescription = '%1 a mutat un element';
  en.dragAndSortNoDescription = '%1 moved an element';

  ro.dragAndSortMoved = ' a mutat %1';
  en.dragAndSortMoved = ' moved %1';

});
