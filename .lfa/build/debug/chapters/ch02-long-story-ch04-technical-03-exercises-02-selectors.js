registerChapter({ chapter: "ch02-long-story-ch04-technical-03-exercises-02-selectors", content: function () { return "<h1>Selectors</h1><p>By selectors we understand the kind of exercises where the user is presented several options to chose from</p>\n<h2 id=\"yesno-questions\">YesNo Questions</h2>\n<h3 id=\"description\">Description</h3>\n<p>A <strong>YesNo question</strong> provides a simple way to show a Yes/No choice.</p>\n<p><strong>Parameters:</strong></p>\n<ul>\n<li>zero parameters: expected answer defaults to true</li>\n<li>one boolean parameter: specify expected answer to get max score</li>\n<li>one object parameter: attributes: <code>answer</code> (boolean), <code>name</code> (string) , <code>yes</code> - text for yes, <code>no</code> - text for no</li>\n</ul>\n<p><strong>Scoring:</strong></p>\n<ul>\n<li>0 if selected option is different to expected result</li>\n<li>100 if selected option is equal to expected result</li>\n</ul>\n<h3 id=\"example-source-\">Example (source)</h3>\n<pre><code>  +exercise\n    +statement\n      h3 Important questions\n        span.score-box\n    .row\n      .col-md-12\n        .progress-box\n\n    .row\n      .col-md-6\n        +yesno(false)\n          | Can you open the pod bay doors? (no)\n\n        +yesno(true)\n          | Will I dream? (yes, Hal)\n      .col-md-6\n        //- Without a block, name parameter is mandatory\n        +yesno({answer: true, name:&#39;ex123unic&#39;, yes: &#39;True&#39;, no: &#39;False&#39;})\n        +yesno({answer: false, name:&#39;ex234unic&#39;, yes: &#39;Da&#39;, no: &#39;Nu&#39;})\n</code></pre><h4>Example (rendered)<script>var ex_841667155 = Exercises.push(new Exercises.Exercise(841667155, ''));\n</script><div id=\"ex_841667155\" class=\"exercise\"><div class=\"statement\"><h3>Important questions<span class=\"score-box\"></span></h3></div><div class=\"row\"><div class=\"col-md-12\"><div class=\"progress-box\"></div></div></div><div class=\"row\"><div class=\"col-md-6\"><script>(function () {\n  var exercise = Exercises.push(new Exercises.YesNo(293845071, '{\"answer\":false}'));\n  if (true) {\n    try {\n      var DashboardLoader = require('exercise-dashboard-loader');\n    } catch (ex) {};\n    if (DashboardLoader) {\n      DashboardLoader('#ex_cdb_293845071', exercise);\n    }\n  }\n})();\n</script><div id=\"ex_cdb_293845071\" class=\"classroom-dashboard\"></div><div id=\"ex_293845071\" class=\"yesno\"><div class=\"block\">Can you open the pod bay doors? (no)</div><div class=\"buttons btn-group btn-group-justified\"><div class=\"btn btn-default yes\"></div><div class=\"btn btn-default no\"></div></div></div><script>Exercises.pop();</script><script>(function () {\n  var exercise = Exercises.push(new Exercises.YesNo(1904524984, '{\"answer\":true}'));\n  if (true) {\n    try {\n      var DashboardLoader = require('exercise-dashboard-loader');\n    } catch (ex) {};\n    if (DashboardLoader) {\n      DashboardLoader('#ex_cdb_1904524984', exercise);\n    }\n  }\n})();\n</script><div id=\"ex_cdb_1904524984\" class=\"classroom-dashboard\"></div><div id=\"ex_1904524984\" class=\"yesno\"><div class=\"block\">Will I dream? (yes, Hal)</div><div class=\"buttons btn-group btn-group-justified\"><div class=\"btn btn-default yes\"></div><div class=\"btn btn-default no\"></div></div></div><script>Exercises.pop();</script></div><div class=\"col-md-6\"><script>(function () {\n  var exercise = Exercises.push(new Exercises.YesNo(1460272494, '{\"answer\":true,\"name\":\"ex123unic\",\"yes\":\"True\",\"no\":\"False\"}'));\n  if (true) {\n    try {\n      var DashboardLoader = require('exercise-dashboard-loader');\n    } catch (ex) {};\n    if (DashboardLoader) {\n      DashboardLoader('#ex_cdb_1460272494', exercise);\n    }\n  }\n})();\n</script><div id=\"ex_cdb_1460272494\" class=\"classroom-dashboard\"></div><div id=\"ex_1460272494\" class=\"yesno\"><div class=\"block\"></div><div class=\"buttons btn-group btn-group-justified\"><div class=\"btn btn-default yes\"></div><div class=\"btn btn-default no\"></div></div></div><script>Exercises.pop();</script><script>(function () {\n  var exercise = Exercises.push(new Exercises.YesNo(543216141, '{\"answer\":false,\"name\":\"ex234unic\",\"yes\":\"Da\",\"no\":\"Nu\"}'));\n  if (true) {\n    try {\n      var DashboardLoader = require('exercise-dashboard-loader');\n    } catch (ex) {};\n    if (DashboardLoader) {\n      DashboardLoader('#ex_cdb_543216141', exercise);\n    }\n  }\n})();\n</script><div id=\"ex_cdb_543216141\" class=\"classroom-dashboard\"></div><div id=\"ex_543216141\" class=\"yesno\"><div class=\"block\"></div><div class=\"buttons btn-group btn-group-justified\"><div class=\"btn btn-default yes\"></div><div class=\"btn btn-default no\"></div></div></div><script>Exercises.pop();</script></div></div></div><script>Exercises.pop();</script></h4><h2 id=\"pick-one\">Pick One</h2>\n<h3 id=\"description\">Description</h3>\n<p><strong>Pick one</strong> (<code>+pickone</code>) is a selector that allows user to select a single choice among several options presented.\nThis exercise is versatile, since it allows lots and lots of input types.</p>\n<p>You can have the trigger DOM element as a button created for you in place or as any element if you put an element\nwith a <code>.trigger</code> class inside the exercise.</p>\n<h3 id=\"parameters\">Parameters</h3>\n<p><code>+pickone(n, [series], {options}</code></p>\n<ul>\n<li>No parameters: defaults to one choice which is also the default answer (is &quot;1&quot;)</li>\n<li>One parameter: n (number), means that <em>n</em>-th answer is correct. Since there are no options specified,\na random number of buttons will be generated.</li>\n<li>Two parameters: n (ordinal of the correct answer in the series), [series, of, values] (1 dimensional array)</li>\n<li>Three parameters: n, series, options (hashmap). Options can have a <em>placement</em> attribute that can have\na value of <em>top</em>, <em>bottom</em>, <em>left</em>, <em>right</em>. <em>noClassChange: true</em> will prevent the trigger button from having \nclass changed when when user selects an option. <strong>ignoreAnswer: true</strong> makes the score 100% in all cases, no matter\nwhich answer is selected.</li>\n</ul>\n<h3 id=\"scoring\">Scoring</h3>\n<ul>\n<li>0 if selected option is different to expected result (specified by the 1st parameter of the mixin)</li>\n<li>100 if selected option is equal to expected result</li>\n</ul>\n<h3 id=\"example-source-\">Example (source)</h3>\n<pre><code>   +exercise({name: &#39;ch02e01&#39;})\n    +statement Pick one option below\n\n    //- Simple, useless  no text\n    +pickone({name: &#39;ch02e01po1&#39;})\n\n    //- Still useless, no parameters at all\n    +pickone\n      p Are you the one?\n\n    //- If &#39;choices&#39; is not specified, it is created by default\n    +pickone(4)\n      p How many seasons are there in a year ?\n\n    //- Options can have any value\n    +pickone(4, [&#39;2&#39;, &#39;4&#39;, &#39;7&#39;, &#39;9&#39;, &#39;10&#39;])\n      p How many rings in the Lord of the rings?\n\n    //- Pickone inside an element with a very small declared width\n    .row\n      .col-xs-1\n        +pickone(4, [&#39;1&#39;, &#39;2&#39;, &#39;4&#39;, &#39;6&#39;, &#39;10&#39;])\n          p How many horses can you tether to a chariot?\n\n    //- Text value\n    +pickone(3, [&#39;Bulgakov&#39;, &#39;Creangă&#39;, &#39;Shakespeare&#39;, &#39;Shaw&#39;])\n      p Who wrote &#39;Hamlet&#39;?\n\n    //- UTF text\n    //- placement can be changed if neeed\n    +pickone(2, [&#39;◯&#39;, &#39;◯ ◯&#39;, &#39;◯ ◯ ◯&#39; , &#39;◯ ◯ ◯ ◯&#39;], {placement: &#39;top&#39;})\n      p Pick a number greater than one and less than three.\n\n    +pickone(2, [&#39;McDonalds&#39;, &quot;Tiffanys&quot;, &#39;KFC&#39;], {placeholder: &#39;McDonalds&#39;, noClassChange: true})\n      p This one is fine because it is hidden. Discover where to click: I want to eat breakfast at\n        span.trigger\n        span .\n\n    +pickone(1, [&#39;2&#39;, &#39;4&#39;, &#39;6&#39;, &#39;20&#39;], {placement: &#39;top&#39;, ignoreAnswer: true})\n      p How many oranges do you want?\n      .score-box\n\n    +pickone(1, [&#39;2&#39;, &#39;4&#39;, &#39;6&#39;, &#39;20&#39;], {placement: &#39;top&#39;, noClassChange: true, ignoreAnswer: true})\n      p How many bananas do you want, no style?\n      .score-box\n\n    //- Numbers as choices\n    +pickone(1, [0, 1, 2, 3, 5])\n      p Find the number that can be written as a multiple of all the others.\n\n    //- HTML is an option too\n    +pickone(3, [\n      &#39;&lt;img style=\\\\&quot;max-width:200px;\\\\&quot; src=\\\\&quot;http://readfwd-wp.s3.amazonaws.com/dinu2.png\\\\&quot;/&gt;&#39;, \n      &#39;&lt;img style=\\\\&quot;max-width:200px;\\\\&quot; src=\\\\&quot;http://readfwd-wp.s3.amazonaws.com/paul.png\\\\&quot;/&gt;&#39;,\n      &#39;&lt;img style=\\\\&quot;max-width:200px;\\\\&quot; src=\\\\&quot;http://readfwd-wp.s3.amazonaws.com/leo.jpg\\\\&quot;/&gt;&#39;])\n      p Pick the Leo!\n</code></pre><script>var ex_760298970 = Exercises.push(new Exercises.Exercise(760298970, '{\"name\":\"ch02e01\"}'));\n</script><div id=\"ex_760298970\" class=\"exercise\"><div class=\"statement\">Pick one option below</div><script>(function () {\n  var exercise = Exercises.push(new Exercises.PickOne(846834451, '{\"name\":\"ch02e01po1\"}'));\n  if (true) {\n    try {\n      var DashboardLoader = require('exercise-dashboard-loader');\n    } catch (ex) {};\n    if (DashboardLoader) {\n      DashboardLoader('#ex_cdb_846834451', exercise);\n    }\n  }\n})();\n</script><div id=\"ex_cdb_846834451\" class=\"classroom-dashboard\"></div><div id=\"ex_846834451\" class=\"pickone\"><div class=\"choices-container\"><div class=\"choices btn-group\"></div></div></div><script>Exercises.pop();</script><script>(function () {\n  var exercise = Exercises.push(new Exercises.PickOne(642454226, '{}'));\n  if (true) {\n    try {\n      var DashboardLoader = require('exercise-dashboard-loader');\n    } catch (ex) {};\n    if (DashboardLoader) {\n      DashboardLoader('#ex_cdb_642454226', exercise);\n    }\n  }\n})();\n</script><div id=\"ex_cdb_642454226\" class=\"classroom-dashboard\"></div><div id=\"ex_642454226\" class=\"pickone\"><p>Are you the one?</p><div class=\"choices-container\"><div class=\"choices btn-group\"></div></div></div><script>Exercises.pop();</script><script>(function () {\n  var exercise = Exercises.push(new Exercises.PickOne(1775152406, '{\"answer\":4}'));\n  if (true) {\n    try {\n      var DashboardLoader = require('exercise-dashboard-loader');\n    } catch (ex) {};\n    if (DashboardLoader) {\n      DashboardLoader('#ex_cdb_1775152406', exercise);\n    }\n  }\n})();\n</script><div id=\"ex_cdb_1775152406\" class=\"classroom-dashboard\"></div><div id=\"ex_1775152406\" class=\"pickone\"><p>How many seasons are there in a year ?</p><div class=\"choices-container\"><div class=\"choices btn-group\"></div></div></div><script>Exercises.pop();</script><script>(function () {\n  var exercise = Exercises.push(new Exercises.PickOne(1675121502, '{\"answer\":4,\"choices\":[\"2\",\"4\",\"7\",\"9\",\"10\"]}'));\n  if (true) {\n    try {\n      var DashboardLoader = require('exercise-dashboard-loader');\n    } catch (ex) {};\n    if (DashboardLoader) {\n      DashboardLoader('#ex_cdb_1675121502', exercise);\n    }\n  }\n})();\n</script><div id=\"ex_cdb_1675121502\" class=\"classroom-dashboard\"></div><div id=\"ex_1675121502\" class=\"pickone\"><p>How many rings in the Lord of the rings?</p><div class=\"choices-container\"><div class=\"choices btn-group\"></div></div></div><script>Exercises.pop();</script><div class=\"row\"><div class=\"col-xs-1\"><script>(function () {\n  var exercise = Exercises.push(new Exercises.PickOne(1966293948, '{\"answer\":4,\"choices\":[\"1\",\"2\",\"4\",\"6\",\"10\"]}'));\n  if (true) {\n    try {\n      var DashboardLoader = require('exercise-dashboard-loader');\n    } catch (ex) {};\n    if (DashboardLoader) {\n      DashboardLoader('#ex_cdb_1966293948', exercise);\n    }\n  }\n})();\n</script><div id=\"ex_cdb_1966293948\" class=\"classroom-dashboard\"></div><div id=\"ex_1966293948\" class=\"pickone\"><p>How many horses can you tether to a chariot?</p><div class=\"choices-container\"><div class=\"choices btn-group\"></div></div></div><script>Exercises.pop();</script></div></div><script>(function () {\n  var exercise = Exercises.push(new Exercises.PickOne(1112083072, '{\"answer\":3,\"choices\":[\"Bulgakov\",\"Creangă\",\"Shakespeare\",\"Shaw\"]}'));\n  if (true) {\n    try {\n      var DashboardLoader = require('exercise-dashboard-loader');\n    } catch (ex) {};\n    if (DashboardLoader) {\n      DashboardLoader('#ex_cdb_1112083072', exercise);\n    }\n  }\n})();\n</script><div id=\"ex_cdb_1112083072\" class=\"classroom-dashboard\"></div><div id=\"ex_1112083072\" class=\"pickone\"><p>Who wrote 'Hamlet'?</p><div class=\"choices-container\"><div class=\"choices btn-group\"></div></div></div><script>Exercises.pop();</script><script>(function () {\n  var exercise = Exercises.push(new Exercises.PickOne(1740589826, '{\"placement\":\"top\",\"answer\":2,\"choices\":[\"◯\",\"◯ ◯\",\"◯ ◯ ◯\",\"◯ ◯ ◯ ◯\"]}'));\n  if (true) {\n    try {\n      var DashboardLoader = require('exercise-dashboard-loader');\n    } catch (ex) {};\n    if (DashboardLoader) {\n      DashboardLoader('#ex_cdb_1740589826', exercise);\n    }\n  }\n})();\n</script><div id=\"ex_cdb_1740589826\" class=\"classroom-dashboard\"></div><div id=\"ex_1740589826\" class=\"pickone\"><p>Pick a number greater than one and less than three.</p><div class=\"choices-container\"><div class=\"choices btn-group\"></div></div></div><script>Exercises.pop();</script><script>(function () {\n  var exercise = Exercises.push(new Exercises.PickOne(1452502703, '{\"placeholder\":\"McDonalds\",\"noClassChange\":true,\"answer\":2,\"choices\":[\"McDonalds\",\"Tiffany`s\",\"KFC\"]}'));\n  if (true) {\n    try {\n      var DashboardLoader = require('exercise-dashboard-loader');\n    } catch (ex) {};\n    if (DashboardLoader) {\n      DashboardLoader('#ex_cdb_1452502703', exercise);\n    }\n  }\n})();\n</script><div id=\"ex_cdb_1452502703\" class=\"classroom-dashboard\"></div><div id=\"ex_1452502703\" class=\"pickone\"><p>This one is fine because it is hidden. Discover where to click: I want to eat breakfast at  <span class=\"trigger\"></span>.</p><div class=\"choices-container\"><div class=\"choices btn-group\"></div></div></div><script>Exercises.pop();</script><script>(function () {\n  var exercise = Exercises.push(new Exercises.PickOne(651030604, '{\"placement\":\"top\",\"ignoreAnswer\":true,\"answer\":1,\"choices\":[\"2\",\"4\",\"6\",\"20\"]}'));\n  if (true) {\n    try {\n      var DashboardLoader = require('exercise-dashboard-loader');\n    } catch (ex) {};\n    if (DashboardLoader) {\n      DashboardLoader('#ex_cdb_651030604', exercise);\n    }\n  }\n})();\n</script><div id=\"ex_cdb_651030604\" class=\"classroom-dashboard\"></div><div id=\"ex_651030604\" class=\"pickone\"><p>How many oranges do you want?</p><div class=\"score-box\"></div><div class=\"choices-container\"><div class=\"choices btn-group\"></div></div></div><script>Exercises.pop();</script><script>(function () {\n  var exercise = Exercises.push(new Exercises.PickOne(1352760195, '{\"placement\":\"top\",\"noClassChange\":true,\"ignoreAnswer\":true,\"answer\":1,\"choices\":[\"2\",\"4\",\"6\",\"20\"]}'));\n  if (true) {\n    try {\n      var DashboardLoader = require('exercise-dashboard-loader');\n    } catch (ex) {};\n    if (DashboardLoader) {\n      DashboardLoader('#ex_cdb_1352760195', exercise);\n    }\n  }\n})();\n</script><div id=\"ex_cdb_1352760195\" class=\"classroom-dashboard\"></div><div id=\"ex_1352760195\" class=\"pickone\"><p>How many bananas do you want, no style?</p><div class=\"score-box\"></div><div class=\"choices-container\"><div class=\"choices btn-group\"></div></div></div><script>Exercises.pop();</script><script>(function () {\n  var exercise = Exercises.push(new Exercises.PickOne(1644469742, '{\"answer\":1,\"choices\":[0,1,2,3,5]}'));\n  if (true) {\n    try {\n      var DashboardLoader = require('exercise-dashboard-loader');\n    } catch (ex) {};\n    if (DashboardLoader) {\n      DashboardLoader('#ex_cdb_1644469742', exercise);\n    }\n  }\n})();\n</script><div id=\"ex_cdb_1644469742\" class=\"classroom-dashboard\"></div><div id=\"ex_1644469742\" class=\"pickone\"><p>Find the number that can be written as a multiple of all the others.</p><div class=\"choices-container\"><div class=\"choices btn-group\"></div></div></div><script>Exercises.pop();</script><script>(function () {\n  var exercise = Exercises.push(new Exercises.PickOne(1295630192, '{\"answer\":3,\"choices\":[\"<img style=\\\\\\\"max-width:200px;\\\\\\\" src=\\\\\\\"http://readfwd-wp.s3.amazonaws.com/dinu2.png\\\\\\\"/>\",\"<img style=\\\\\\\"max-width:200px;\\\\\\\" src=\\\\\\\"http://readfwd-wp.s3.amazonaws.com/paul.png\\\\\\\"/>\",\"<img style=\\\\\\\"max-width:200px;\\\\\\\" src=\\\\\\\"http://readfwd-wp.s3.amazonaws.com/leo.jpg\\\\\\\"/>\"]}'));\n  if (true) {\n    try {\n      var DashboardLoader = require('exercise-dashboard-loader');\n    } catch (ex) {};\n    if (DashboardLoader) {\n      DashboardLoader('#ex_cdb_1295630192', exercise);\n    }\n  }\n})();\n</script><div id=\"ex_cdb_1295630192\" class=\"classroom-dashboard\"></div><div id=\"ex_1295630192\" class=\"pickone\"><p>Pick the Leo!</p><div class=\"choices-container\"><div class=\"choices btn-group\"></div></div></div><script>Exercises.pop();</script></div><script>Exercises.pop();</script><h2 id=\"numeric-keypad\">Numeric Keypad</h2>\n<h3 id=\"description\">Description</h3>\n<p><strong>Num pad</strong> (<code>+numpad</code>) is a selector that allows user to easily enter numbers.</p>\n<p>Inside the mixin you can have the following elements:</p>\n<ul>\n<li><code>.trigger</code></li>\n<li><code>.result</code></li>\n<li><code>.result0</code> last digit, <code>result1</code> second to last, etc. The rule is that .resultN is the digit for 10^N in the number</li>\n</ul>\n<h3 id=\"parameters\">Parameters</h3>\n<p><code>+pickone(expectedAnswer, {options})</code></p>\n<ul>\n<li><h3 id=\"scoring\">Scoring</h3>\n</li>\n<li><p>0 if selected option is different to expected result (specified by the 1st parameter of the mixin)</p>\n</li>\n<li>100 if selected option is equal to expected result</li>\n</ul>\n<h3 id=\"example-source-\">Example (source)</h3>\n<pre><code>+numpad(172, { placement: &#39;bottom&#39;, placeholder: &#39;?&#39;, displayDecimalSeparator: false, numDigits: 3})\n  +statement\n    | 150 + 22 = ???\n  button.btn.btn-lg.btn-success.trigger Push me\n\n  span.result.trigger result\n  br\n  p.trigger Last digit:\n    i.result0 (??)\n    | , Second to last digit:\n    i.result1 (??)\n    | , 100&#39;s digit:\n    i.result2 (??)\n</code></pre><h3 id=\"example-rendered-\">Example (rendered)</h3>\n<script>var ex_1550998302 = Exercises.push(new Exercises.NumPad(1550998302, '{\"placement\":\"bottom\",\"placeholder\":\"?\",\"displayDecimalSeparator\":false,\"numDigits\":3,\"answer\":172}'));\n</script><div id=\"ex_1550998302\" class=\"numpad\"><div class=\"hidden numpad-hidden\"><div class=\"numpad-keys\"><div class=\"display input-group input-group-lg\"><input type=\"Number\" autocomplete=\"off\" class=\"form-control input-lg\"/><div class=\"input-group-btn\"><button data-value=\"clear\" class=\"btn btn-default btn-lg smpadding\"><i data-value=\"clear\" class=\"fa fa-times-circle\"></i></button></div></div><div class=\"keys\"><div class=\"row row1-3\"><div class=\"col-xs-4\"><button data-value=\"1\" class=\"digit\">1</button></div><div class=\"col-xs-4\"><button data-value=\"2\" class=\"digit\">2</button></div><div class=\"col-xs-4\"><button data-value=\"3\" class=\"digit\">3</button></div></div><div class=\"row row4-6\"><div class=\"col-xs-4\"><button data-value=\"4\" class=\"digit\">4</button></div><div class=\"col-xs-4\"><button data-value=\"5\" class=\"digit\">5</button></div><div class=\"col-xs-4\"><button data-value=\"6\" class=\"digit\">6</button></div></div><div class=\"row row7-9\"><div class=\"col-xs-4\"><button data-value=\"7\" class=\"digit\">7</button></div><div class=\"col-xs-4\"><button data-value=\"8\" class=\"digit\">8</button></div><div class=\"col-xs-4\"><button data-value=\"9\" class=\"digit\">9</button></div></div><div class=\"row row-extra\"><div class=\"col-xs-4\"><button data-value=\".\" class=\"digit\">.</button></div><div class=\"col-xs-4\"><button data-value=\"0\" class=\"digit\">0</button></div><div class=\"col-xs-4\"><button data-value=\"submit\" class=\"digit\"><i data-value=\"submit\" class=\"fa fa-check\"></i></button></div></div></div></div></div><div class=\"statement\">150 + 22 = ???</div><button class=\"btn btn-lg btn-success trigger\">Push me</button><span>&nbsp;</span><span class=\"is-done-box\"></span><span class=\"score-box\"></span><p class=\"result trigger\">result</p><p class=\"trigger\">Last digit:<i class=\"result0\">(??)</i>, Second to last digit:<i class=\"result1\">(??)</i>, 100's digit:<i class=\"result2\">(??)</i></p></div><script>Exercises.pop();</script>"; }});