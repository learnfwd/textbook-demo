asyncDefine('ch04-technical-03-exercises-08-wordgames', function(){ return function () { return "<article><section><h1 id=\"word-games\">Word Games</h1>\n<p>(please also see the crossword at the end of this chapter)</p>\n<h2 id=\"split-in-syllables\">Split in syllables</h2>\n<p>This type of exercise can be used when you need separator between elements.\nAlthough it is mainly useful for &quot;Split this word in syllables&quot;, it can be used\nfor other types, such as &#39;Put the commas in this sentence&#39;</p>\n<p>Syntax is standard. Besides the usual parameters there are:</p>\n<ul>\n<li><code>separator</code> is the text (or HTML code) </li>\n<li><code>word</code> is an expression with the syllables, containing text or HTML code.\n  Inside syllables use <code>||</code> (the bar character twice) to instruct the exercise\n  code to insert a fake separator ana <code>^^</code> to insert a real one.\n  E.g. if you want the word &#39;el·e·phant&#39; rendered as\n  &#39;el/e/ph/an/t&#39;, use this syntax &#39;el^^e^^ph||an||t&#39;. </li>\n<li><code>isModal</code> instructs the exercise to be displayed full-scren.</li>\n</ul>\n<p>Special elements inside the mixin:</p>\n<ul>\n<li><code>.split-in-syllables-body</code> is the container (div, span), where the exercise\nwidget will be rendered. If not present, one is created and appended at the end.</li>\n<li><code>.preview</code> is an element that in case the exercise is modal, this div\nis displayed outside, not inside the modal. Useful when </li>\n<li><code>.result</code> is an element (span, div, whatever) that when present is updated\nwith the rendered value of the exercise (see the exemples below)</li>\n<li><code>.full-screen-header</code> when pesent replaces the header in the modal box. Here\nyou can place score boxes, is done boxes, etc.</li>\n<li>score-box, is-done-box, progress-box are used as usual</li>\n</ul>\n<pre><code>  +split-in-syllables({\n      name: &#39;split-in-syllables-1&#39;,\n      separator: &#39;·&#39;, // or any html code. Undefined or falsy for &#39;-&#39;\n      word: &#39;h||e^^m||a^^t&lt;i class=\\\\&quot;fa fa-user\\\\&quot;&gt;&lt;/i&gt;&#39;,\n  })\n    .score-box\n    .progress-box\n    .is-done-box\n    .preview\n      | Your result, mylord:\n      span.result\n\n  +split-in-syllables({\n      name: &#39;split-in-syllables-2&#39;,\n      separator: &#39;,&#39;,\n      word: &#39;Anna^^come|| outside^^ please!&#39;\n  })\n    .is-done-box\n    .score-box\n\n  +split-in-syllables({\n      name: &#39;split-in-syllables-3&#39;,\n      separator: &#39;,&#39;,\n      word: &#39;I|| do not|| have|| time^^ Dan^^ I|| really|| do not.&#39;,\n      isModal: true\n  })\n    .is-done-box\n    .full-screen-header\n      .is-done-box.inline-block\n      span Place the commas\n      span.small.result.sans\n      .progress-box\n    .preview\n      .score-box\n      | Your result, sir:\n      span.result</code></pre>\n<script>var ex_1858226758 = Exercises.push(new Exercises.SplitInSyllables(1858226758, '{\"name\":\"split-in-syllables-1\",\"separator\":\"·\",\"word\":\"h||e^^m||a^^t<i class=\\\\\\\"fa fa-user\\\\\\\"></i>\"}'));\n</script><div id=\"ex_1858226758\" class=\"split-in-syllables\"><div class=\"score-box\"></div><div class=\"progress-box\"></div><div class=\"is-done-box\"></div><div class=\"preview\">Your result, mylord:<span class=\"result\"></span></div></div><script>Exercises.pop();</script><script>var ex_435053808 = Exercises.push(new Exercises.SplitInSyllables(435053808, '{\"name\":\"split-in-syllables-2\",\"separator\":\",\",\"word\":\"Anna^^come|| outside^^ please!\"}'));\n</script><div id=\"ex_435053808\" class=\"split-in-syllables\"><div class=\"is-done-box\"></div><div class=\"score-box\"></div></div><script>Exercises.pop();</script><script>var ex_1113892845 = Exercises.push(new Exercises.SplitInSyllables(1113892845, '{\"name\":\"split-in-syllables-3\",\"separator\":\",\",\"word\":\"I|| do not|| have|| time^^ Dan^^ I|| really|| do not.\",\"isModal\":true}'));\n</script><div id=\"ex_1113892845\" class=\"split-in-syllables\"><div id=\"ex_1113892845_modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"1113892845_modal_label\" aria-hidden=\"true\" class=\"modal fade\"><div class=\"modal-dialog modal-sm\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"close\">×</button><span class=\"replaceable\"><h4 id=\"1113892845_modal_label\" class=\"modal-title\">Split</h4></span></div><div class=\"modal-body\"><div class=\"is-done-box\"></div><div class=\"full-screen-header\"><div class=\"is-done-box inline-block\"></div><span>Place the commas</span><span class=\"small result sans\"></span><div class=\"progress-box\"></div></div><div class=\"preview\"><div class=\"score-box\"></div>Your result, sir:<span class=\"result\"></span></div></div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-primary\">OK</button></div></div></div></div></div><script>Exercises.pop();</script></section><section><h2 id=\"crossword\">Crossword</h2>\n<p><strong>Options:</strong></p>\n<p>Please see the samples to see how this is used, but only after you read the rest.</p>\n<ul>\n<li><code>noAutoResize</code>: by default the crosswords resize to fit the container. \nMake this attribute true to prevent automatic resize.</li>\n<li><code>hideNumbers</code>: don&#39;t show the small numbers</li>\n</ul>\n<p>By default the widget comes styled with bright colors. Copy and paste these\nstatements in your <strong>master.styl</strong> file and play with the values:</p>\n<pre><code>.YOURCLASSHERE\n  .xwgrid\n    .xwgrid-letter\n      color: #fff\n      margin: 1px\n      padding: 0\n    .xwgrid-letter-non-blank\n      background-color: #5F9EDF\n      border: 0;\n    .xw-word-ok\n      input\n        background-color: #33bb33;\n    .xw-letter-ok\n      input\n        background-color: #66dd33;\n    input:focus\n      background-color: #ff9933 !important\n    span.xwnumber\n      color: white;\n      font-size: 60%;\n      margin: 0 0 0 5px;\n      padding: 0;</code></pre>\n<p><strong>CSS Classes</strong></p>\n<p>There are a lot of extra CSS classes that are available to customize how the crosswords look and feel like</p>\n<ul>\n<li><code>xwgrid-letter</code> -- all boxes have this style (blanks or letters)</li>\n<li><code>xwgrid-letter-blank</code> -- blank boxes have this (you may want to color blanks your way)</li>\n<li><code>xwgrid-letter-non-blank</code> -- lettr boxes</li>\n<li><code>xwgrid-letter-row-11</code> -- each row is numbered (1, 2, ...) from top to bottom</li>\n<li><code>xwgrid-letter-column-3</code> -- each column is numbered (1, 2, ...) from left to right</li>\n<li><code>xwgrid-letter-letter-A</code> -- each letter has its own class (maybe you need to style &#39;H&#39; differently)</li>\n<li><code>xwgrid-word-id-3</code> (each word -- horizontal or vertical has its own ID, 1, 2....)</li>\n<li><code>xw-letter-ok</code> -- if a letter is correct, this class is on. This is not styled in CSS by default</li>\n<li><code>xw-letter-not-ok</code> -- if a letter is incorrect, this class is on</li>\n<li><code>xw-word-ok</code> -- same as above, but for whole words</li>\n<li><code>xw-word-not-ok</code> -- word is incorrect, even if some letters are correct</li>\n</ul>\n<p><strong><em>Sample code / Tutorial:</em></strong></p>\n<ol>\n<li>First, plan your crosswords on a piece of paper or in a spreadsheet. If you already have it on paper, skip this step.</li>\n<li>Copy and paste the sample below in your target textbook</li>\n<li>Count the rows, columns and how many definitions you have, than use the generator to get the letter matrix right</li>\n<li>Copy and paste the generated matrix in your code</li>\n<li>Indent it properly</li>\n<li>Replace underscores with your letters at the right position. Please keep reading<ol>\n<li>If you have fixed / prefilled letters, place a <code>&gt;</code> sign before the letter (this is why we left you spaces between underscores and letters :) ). E.g. &gt;K to have a fixed K.</li>\n<li>If the letter is at the beginning of a definition, write the number before the letter. E.g. <code>12R</code> to have number <code>12</code> written in small fonts above the input box. Or <code>12&gt;R</code> to have R fixed in place for you.</li>\n</ol>\n</li>\n</ol>\n<p>In the sample below <em>1&gt;K</em> is pre-filled at row 1, column 8.</p>\n<pre><code>  +crosswords({\n    name: &#39;fulxword1&#39;,\n    hideNumbers: false,\n\n    words: //  1  2  3  4  5  6  7  8  9  0  1  2\n           [&#39;  _  _  _  _  _  _  _1&gt;K  _  _  _  _&#39;,  //  1\n            &#39;  _  _  _  _  _  _  _  U  _  _  _  _&#39;,  //  2\n            &#39;  _  _  _ 2O  R  H  A  N  _  _  _  _&#39;,  //  3\n            &#39;  _  _  _  _  _  _  _  D  _  _  _  _&#39;,  //  4\n            &#39;  _  _  _  _  _  _  _  E  _  _  _  _&#39;,  //  5\n            &#39;  _  _  _  _  _  _  _  R  _  _  _  _&#39;,  //  6\n            &#39;  _  _  _  _3&gt;M  U  R  A  K  A  M  I&#39;,  //  7\n            &#39;  _  _  _  _  E  _  _  _  _  _  _  _&#39;,  //  8\n            &#39;  _  _ 4S  A &gt;L  I  N  G  E  R  _  _&#39;,  //  9\n            &#39;  _  _  _  _  V  _  _  _  _  _  _  _&#39;,  //  10\n            &#39;  _  _ 5A  S  I  M  O  V  _ 6C  _  _&#39;,  //  11\n            &#39;  _  _  _  _  L  _  _  _  _  L  _  _&#39;,  //  12\n            &#39; 7G  O  G  O  L  _  _  _  _  A  _  _&#39;,  //  13\n            &#39;  _  _  _  _8&gt;E  X  U  P  E  R  Y  _&#39;,  //  14\n            &#39;  _  _  _  _  _  _  _  _  _  K  _  _&#39;,  //  15\n            &#39;  _  _  _  _  _  _  _  _  _  E  _  _&#39;]  //  16\n  })\n  .progress-box\n  .score-box\n  .row\n    .col-md-8\n      .xwordscontent\n      .clearfix  \n    .col-md-4.well.sans\n      strong Writer Names\n      br\n      span Definitions</code></pre>\n<p><strong><em>Rendered example:</em></strong></p>\n<script>var ex_138421699 = Exercises.push(new Exercises.Crosswords(138421699, '{\"name\":\"fulxword1\",\"hideNumbers\":false,\"words\":[\"  _  _  _  _  _  _  _1>K  _  _  _  _\",\"  _  _  _  _  _  _  _  U  _  _  _  _\",\"  _  _  _ 2O >R >H >A >N  _  _  _  _\",\"  _  _  _  _  _  _  _  D  _  _  _  _\",\"  _  _  _  _  _  _  _  E  _  _  _  _\",\"  _  _  _  _  _  _  _  R  _  _  _  _\",\"  _  _  _  _3>M  U  R  A  K  A  M  I\",\"  _  _  _  _  E  _  _  _  _  _  _  _\",\"  _  _ 4S  A >L  I  N  G  E  R  _  _\",\"  _  _  _  _  V  _  _  _  _  _  _  _\",\"  _  _ 5A  S  I  M  O  V  _ 6C  _  _\",\"  _  _  _  _  L  _  _  _  _  L  _  _\",\" 7G  O  G  O  L  _  _  _  _  A  _  _\",\"  _  _  _  _8>E  X  U  P  E  R  Y  _\",\"  _  _  _  _  _  _  _  _  _  K  _  _\",\"  _  _  _  _  _  _  _  _  _  E  _  _\"]}'));\n</script><div id=\"ex_138421699\" class=\"crosswords\"><div class=\"progress-box\"></div><div class=\"score-box\"></div><div class=\"row\"><div class=\"col-md-8\"><div class=\"xwordscontent\"></div><div class=\"clearfix\"> </div></div><div class=\"col-md-4 well sans\"><strong>Writer Names</strong><br/><span>Definitions</span><div class=\"row\"><div class=\"col-xs-12\"><pre>Horizontal:\n\n2. ... Pamuk \n3. Haruki ...\n4. J.D. ...  \n5. Isac ...  \n6. N.V. ...  \n7. Antoine de Saint-....</pre></div><div class=\"col-xs-12\"><pre>Vertical:\n\n1. Milan ...  \n3. Herman ...  \n6. Arthur C. ....\n</pre></div></div></div></div></div><script>Exercises.pop();</script><h2>Crossword Letter Matrix Generator</h2><p>Use this generator to get an empty template for your mixin</p><div class=\"clearfix\"><form><span>Rows:<input id=\"numrows\" type=\"numeric\" size=\"2\" max=\"2\" value=\"12\" class=\"inline-block\"/><span>x Columns:</span><input id=\"numcols\" type=\"numeric\" size=\"2\" max=\"2\" value=\"8\" class=\"inline-block\"/><span>with :</span><input id=\"numdefs\" type=\"numeric\" size=\"2\" max=\"2\" value=\"8\" class=\"inline-block\"/><span> definitions</span></span></form><div class=\"clearfix\"><pre class=\"stars\">Please wait a sec...</pre></div><script>var rows_generator = function(r,c, spacers){\n  result = '//';\n  for(var i = 1; i <= c; i++) {\n    result += spacers + i %10;\n  }\n  for(var j = 1; j <= r; j++) {\n    result += '\\n \\'';\n    for(var i = 1; i <= c; i++) {\n      result += spacers + '_';\n    }\n    result += '\\', // ' + j;\n  }\n  return result;\n};\n\nvar onUpdate = function() {\n  var r = parseInt( $('#numrows').val());\n  var c = parseInt( $('#numcols').val());\n  // make space for definition numbers (1 space for less than 10 def., 2 spaces for more, etc.)\n  var spacers = new Array(2+Math.floor(Math.log(parseInt( $('#numdefs').val())/ Math.LN10))).join(' ');\n  $('.stars').text(rows_generator(r, c, spacers));\n};\n\n$('#numrows').keyup(onUpdate);\n$('#numcols').keyup(onUpdate);\n$('#numdefs').keyup(onUpdate);\n$(function(){\n  onUpdate();\n});\n</script></div></section></article>"; }});