asyncDefine('ch04-technical-03-exercises-01-introduction-04-avatar', function(){ return function () { return "<article><section><h1 id=\"exercises-and-the-avatar\">Exercises and the avatar</h1>\n<p>The avatar is the icon integrated with the messging system. Exercises know by default to send\nsome messages to the avatar, and there is some built-in functionality for that.</p>\n<p>Avatar has moods and can display messages. At the time of writing this, the moods the avatar\ncan have are: <em>angry</em>, <em>cheeky</em>, <em>happy</em>, <em>helpless</em>, <em>neutral</em>, <em>sad</em>, <em>smart</em>,\n<em>smile</em>, <em>uneasy</em> and <em>wink</em>.</p>\n<h2 id=\"default-first-time-done-messages-\">Default &#39;first time done messages&#39;</h2>\n<p>In main.js, place the following line:</p>\n<p><code>window.firstTimeDoneMessages = [&#39;Bravo, bravo!&#39;, &#39;Felicitări!&#39;, &#39;Excelent!&#39;]</code></p>\n<h2 id=\"ignoreavatar\">ignoreAvatar</h2>\n<p>+exercise sends &#39;done&#39; event and &#39;done for the first time&#39; event. If you don&#39;t want\nthe avatar to be notified by the exercise, place the <code>ignoreAvatar: true</code> property inside\nthe mixin parameters</p>\n<p><strong>Sample code</strong></p>\n<pre><code>  .row\n    .col-xs-6.well\n      +exercise({name: &#39;with-avatar&#39;})\n        +pickone(2, [&#39;First&#39;, &#39;Second&#39;, &#39;Third&#39;])\n          p Chose the second answer and watch the avatar being happy\n    .col-xs-6.well\n      +exercise({name: &#39;with-avatar&#39;, ignoreAvatar: true})\n        +pickone(2, [&#39;First&#39;, &#39;Second&#39;, &#39;Third&#39;])\n          p Chose the second answer and watch the avatar remaining indifferent</code></pre>\n<p><strong>Rendered sample</strong></p>\n<div class=\"row\"><div class=\"col-xs-6 well\"><script>var ex_794238008 = Exercises.push(new Exercises.Exercise(794238008, '{\"name\":\"with-avatar\"}'));\n</script><div id=\"ex_794238008\" class=\"exercise\"><script>var ex_655451239 = Exercises.push(new Exercises.PickOne(655451239, '{\"answer\":2,\"choices\":[\"First\",\"Second\",\"Third\"]}'));\n</script><div id=\"ex_655451239\" class=\"pickone\"><p>Chose the second answer and watch the avatar being happy</p><div class=\"choices-container\"><div class=\"choices btn-group\"></div></div></div><script>Exercises.pop();</script></div><script>Exercises.pop();</script></div><div class=\"col-xs-6 well\"><script>var ex_405081087 = Exercises.push(new Exercises.Exercise(405081087, '{\"name\":\"without-avatar\",\"ignoreAvatar\":true}'));\n</script><div id=\"ex_405081087\" class=\"exercise\"><script>var ex_1384557614 = Exercises.push(new Exercises.PickOne(1384557614, '{\"answer\":2,\"choices\":[\"First\",\"Second\",\"Third\"]}'));\n</script><div id=\"ex_1384557614\" class=\"pickone\"><p>Chose the second answer and watch the avatar remaining indifferent</p><div class=\"choices-container\"><div class=\"choices btn-group\"></div></div></div><script>Exercises.pop();</script></div><script>Exercises.pop();</script></div></div><h2 id=\"avatar-messages\">Avatar messages</h2>\n<p>If there is a <code>description</code> field in the exercise this description will be used\nas the &#39;more information&#39; (or &#39;info&#39; field in the notification).</p>\n<p>Don&#39;t be upset about their verbosity. It makes your non-developer colleagues life easier.\nToo see how you can customize the avatar looks and behaviour, go to &#39;Backstage / Avatar&#39;\ndocumentation in this handbook.</p>\n<p>You can show messages and change moods on the following events:</p>\n<ul>\n<li><p>the exercise is done for the first time</p>\n<ul>\n<li><strong>firstTimeDoneMessage</strong> - what message should be displayed</li>\n<li><strong>firstTimeDoneMood</strong> - what mood</li>\n<li><strong>firstTimeDoneInterval</strong> - how much time (in seconds) the mood lasts</li>\n</ul>\n</li>\n<li><p>the exercise is done (but not the first time in the session)</p>\n<ul>\n<li><strong>doneMessage</strong> - what message should be displayed</li>\n<li><strong>doneMood</strong> - what mood</li>\n<li><strong>doneInterval</strong> - how much time (in seconds) the mood lasts</li>\n</ul>\n</li>\n<li><p>the exercise score decreases (but not the first time in the session)</p>\n<ul>\n<li><strong>scoreDecreaseMessage</strong> - what message should be displayed</li>\n<li><strong>scoreDecreaseMood</strong> - what mood</li>\n<li><strong>scoreDecreaseInterval</strong> - how much time (in seconds) the mood lasts</li>\n</ul>\n</li>\n<li><p>the exercise score increases (but not the first time in the session)</p>\n<ul>\n<li><strong>scoreIncreaseMessage</strong> - what message should be displayed</li>\n<li><strong>scoreIncreaseMood</strong> - what mood</li>\n<li><strong>scoreIncreaseInterval</strong> - how much time (in seconds) the mood lasts</li>\n</ul>\n</li>\n</ul>\n<p>Of course, you don&#39;t really need to overwrite all of the parameters above.\nThe defaults are pretty good and are already done for you.</p>\n<p>Using the same rules, you can add sounds and icons. See the documentation\nto get more info on how to use it.</p>\n<p><strong>Sample code</strong></p>\n<pre><code>  .row.well\n    +exercise({\n      name: &#39;with-avatar&#39;,\n      description: &#39;The exercise with the avatar moods&#39;,\n      firstTimeDoneMessage: &#39;Second is not always bad, congrats!&#39;,\n      firstTimeDoneMood: &#39;cheeky&#39;,\n      firstTimeDoneSound: &#39;http://buzz.jaysalvat.com/demo/sounds/win.mp3&#39;,\n      firstTimeDoneIcon: &#39;fa-heart&#39;,\n      firstTimeDoneInterval: 1,\n      scoreIncreasedMood: &#39;smile&#39;,\n      doneMessage: &#39;Bravo, bravo!&#39;,\n      scoreDecreaseMessage: &#39;Băi!!&#39;,\n      scoreDecreaseMood: &#39;angry&#39;,\n      scoreDecreaseInterval: 5,\n      })\n\n      .col-xs-6\n        +pickone(2, [&#39;First&#39;, &#39;Second&#39;, &#39;Third&#39;])\n          p Chose the second answer and watch the avatar saying stuff\n      .col-xs-6\n        +pickone(2, [&#39;First&#39;, &#39;Second&#39;, &#39;Third&#39;])\n          p Chose the second answer again, to make the score 100%!!</code></pre>\n<p><strong>Rendered sample</strong></p>\n<div class=\"row well\"><script>var ex_630820131 = Exercises.push(new Exercises.Exercise(630820131, '{\"name\":\"with-avatar\",\"description\":\"The exercise with the avatar moods\",\"firstTimeDoneMessage\":\"Second is not always bad, congrats!\",\"firstTimeDoneMood\":\"cheeky\",\"firstTimeDoneSound\":\"http://buzz.jaysalvat.com/demo/sounds/win.mp3\",\"firstTimeDoneIcon\":\"fa-heart\",\"firstTimeDoneInterval\":1,\"scoreIncreasedMood\":\"smile\",\"doneMessage\":\"Bravo, bravo!\",\"scoreDecreaseMessage\":\"Băi!!\",\"scoreDecreaseMood\":\"angry\",\"scoreDecreaseInterval\":5}'));\n</script><div id=\"ex_630820131\" class=\"exercise\"><div class=\"col-xs-6\"><script>var ex_1938316361 = Exercises.push(new Exercises.PickOne(1938316361, '{\"answer\":2,\"choices\":[\"First\",\"Second\",\"Third\"]}'));\n</script><div id=\"ex_1938316361\" class=\"pickone\"><p>Chose the second answer and watch the avatar saying stuff</p><div class=\"choices-container\"><div class=\"choices btn-group\"></div></div></div><script>Exercises.pop();</script></div><div class=\"col-xs-6\"><script>var ex_70562432 = Exercises.push(new Exercises.PickOne(70562432, '{\"answer\":2,\"choices\":[\"First\",\"Second\",\"Third\"]}'));\n</script><div id=\"ex_70562432\" class=\"pickone\"><p>Chose the second answer again, to make the score 100%!!</p><div class=\"choices-container\"><div class=\"choices btn-group\"></div></div></div><script>Exercises.pop();</script></div></div><script>Exercises.pop();</script></div></section></article>"; }});