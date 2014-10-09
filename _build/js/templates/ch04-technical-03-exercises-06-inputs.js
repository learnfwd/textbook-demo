asyncDefine('ch04-technical-03-exercises-06-inputs', function(){ return function () { return "<article><section><h2 id=\"text-line\">Text Line</h2>\n<h3 id=\"decription\">Decription</h3>\n<p>This mixin, <code>+textline</code> is a simple input box that saves the data locally.\nIt inherits all the functionality of <em>+exercise</em>.</p>\n<p>As a parameter it takes the option object with the following optional fields:</p>\n<ul>\n<li><code>regexp</code> - a regular expression pattern (e.g. <code>/(\\d+)$/i</code> to match a string\n  that ends with a number and saves it inside a match variable - see .matchN below) \n  that can be used to score the exercise. Usual JS string patterns can be used here.</li>\n<li><code>regexpFlags</code> -- regular expression flags (see \n  <a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp\">docs</a>)    </li>\n<li><code>max</code> - the maximum number of characters that the text line ca</li>\n<li><code>placeholder</code> - placeholder text inside the input box</li>\n<li><code>title</code> -- title text for the input</li>\n<li><code>type</code> - html type for the input (i.e. <em>number</em>, <em>tel</em>, <em>email</em>, <em>date</em>, <em>url</em> , \n<a href=\"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input\">goto MDN to see more</a>). There are also the special\n<strong>multiline</strong> value that ouptputs a multi-row textarea instead of one line input, and <code>reflexive-multiply</code><ul>\n<li><code>multiply-to-addition</code> to provide regular expressions for usual math type exercises (see below the examples)</li>\n</ul>\n</li>\n<li><code>trim</code> -- trims the text inside the input</li>\n<li><code>size</code> -- width in columns</li>\n<li><code>rows</code> -- for multiline text, how many rows</li>\n<li><code>initialText</code>-- this is the text to show (not a placeholder) when the exercise loads for the first \n time or the state is empty</li>\n<li><code>disabled</code> -- if true, the text is not editableg</li>\n</ul>\n<p>Inside the +textline block there can be usual elements (<em>.progress-box</em>, <em>.is-done-box</em>, etc.) and specifically for this mixin there \ncan be a few more elements that need to have the class name in the form of <code>.matchN</code> where N is  a number and it is a place holder where.\nN starts with 0 for the first match.</p>\n<p>Extra bonus: <code>.remaining</code> class, if present and &#39;max&#39; is specified shows the number of characters left.\nStyle it as you want and add a style for <code>.remaining-alert</code> to enjoy it fully.</p>\n<p>Have fun with it!</p>\n<h3 id=\"example-source-\">Example (source)</h3>\n<pre><code>  +textline({name: &quot;ch06_ex1&quot;, type: &#39;numeric&#39;, max: 15,\n      title: &quot;e.g. Watson eats frogs.&quot;,\n      placeholder: &#39;Your text here...&#39;,\n      regexp: &quot;^(\\\\\\\\w+)\\\\\\\\s+(\\\\\\\\w+)\\\\\\\\s+(\\\\\\\\w+).*&quot;,\n      regexpFlags: &#39;&#39;\n      })\n  +statement\n      | Enter a three word sentence in the form: subject predicate complement.\n      | For example &lt;em&gt;I see you.&lt;/em&gt; or &lt;em&gt;You need food.&lt;/em&gt;\n\n  .is-done-box\n    .input\n    p Here are your results. Subject is &amp;nbsp;\n      strong.match1\n      |, predicate &amp;nbsp;\n      strong.match2\n      |, complement &amp;nbsp;\n      strong.match3</code></pre>\n<h3 id=\"example-rendered-\">Example (rendered)</h3>\n<script>var ex_791878215 = Exercises.push(new Exercises.Textline(791878215, '{\"name\":\"ch06_ex1\",\"type\":\"numeric\",\"max\":25,\"title\":\"e.g. Watson eats frogs.\",\"placeholder\":\"Your text here...\",\"regexp\":\"^(\\\\\\\\S+)\\\\\\\\s+(\\\\\\\\S+)\\\\\\\\s+(\\\\\\\\S+).*\",\"regexpFlags\":\"\"}'));\n</script><div id=\"ex_791878215\" class=\"textline\"><div class=\"block\"><div class=\"statement\">Enter a three word sentence in the form: subject predicate complement.\nFor example <em>I see you.</em> or <em>You need food.</em></div><div class=\"is-done-box\"></div><div class=\"score-box\"></div><div class=\"input\"></div><div class=\"remaining\"></div><p>Here are your results. Subject is &nbsp;<strong class=\"match1\"></strong>, predicate &nbsp;<strong class=\"match2\"></strong>, complement &nbsp;<strong class=\"match3\"></strong></p></div></div><script>Exercises.pop();</script><h3 id=\"another-examples-code-\">Another examples (code)</h3>\n<pre><code>  +textline({name: &quot;ch06_ex2&quot;, type: &#39;tel&#39;, max: 20,\n    title: &quot;Enter your phone number for emergencies&quot;,\n    placeholder: &#39;07...&#39;,\n    })\n    +statement\n      | Enter your phone number for emergencies\n      span.input\n\n  +textline({name: &quot;ch06_ex3&quot;, type: &#39;url&#39;, max: 150, size: 50,\n    title: &quot;Your website&quot;,\n    placeholder: &#39;http://example.com/page.html&#39;,\n    })\n    +statement\n      | Enter your website\n      span.input\n  +textline({name: &quot;ch06_ex4&quot;, type: &#39;text&#39;, max: 30,\n    size: 2, regexp: &#39;[A-Z]{2}&#39;})\n    +statement\n      | Your initials? (two CAPITAL letters, please)\n      span.input\n      span.is-done-box\n\n  +textline({name: &quot;ch06_ex5&quot;, type: &#39;date&#39;, max: 30})\n    +statement\n      | Enter your date of birth\n      span.input\n\n  +textline({name: &quot;ch06_ex6&quot;, type: &#39;time&#39;, max: 30,\n    title: &quot;When did you feel it?&quot;,\n    placeholder: &#39;&#39;,\n    })\n    +statement\n      | What time did you experience the earthquake?\n      span.input\n\n  +textline({name: &quot;ch06_ex7&quot;, type: &#39;multiline&#39;, max: 5000,\n    title: &quot;When did you feel it?&quot;,\n    rows: 7,\n    placeholder: &#39;&#39;,\n    })\n    +statement\n      | What makes you tick? Don&#39;t be shy:\n\n    .remaining\n    .input</code></pre>\n<h3 id=\"rendered-\">Rendered:</h3>\n<script>var ex_548634167 = Exercises.push(new Exercises.Textline(548634167, '{\"name\":\"ch06_ex2\",\"type\":\"tel\",\"max\":20,\"title\":\"Enter your phone number for emergencies\",\"placeholder\":\"07...\"}'));\n</script><div id=\"ex_548634167\" class=\"textline\"><div class=\"block\"><div class=\"statement\">Enter your phone number for emergencies<span class=\"input\"></span></div></div></div><script>Exercises.pop();</script><script>var ex_2115049360 = Exercises.push(new Exercises.Textline(2115049360, '{\"name\":\"ch06_ex3\",\"type\":\"url\",\"max\":150,\"size\":50,\"title\":\"Your website\",\"placeholder\":\"http://example.com/page.html\"}'));\n</script><div id=\"ex_2115049360\" class=\"textline\"><div class=\"block\"><div class=\"statement\">Enter your website<span class=\"input\"></span></div></div></div><script>Exercises.pop();</script><script>var ex_1191087585 = Exercises.push(new Exercises.Textline(1191087585, '{\"name\":\"ch06_ex4\",\"type\":\"text\",\"max\":30,\"size\":2,\"regexp\":\"[A-Z]{2}\"}'));\n</script><div id=\"ex_1191087585\" class=\"textline\"><div class=\"block\"><div class=\"statement\">Your initials? (two CAPITAL letters, please)<span class=\"input\"></span><span class=\"is-done-box\"></span></div></div></div><script>Exercises.pop();</script><script>var ex_48128929 = Exercises.push(new Exercises.Textline(48128929, '{\"name\":\"ch06_ex5\",\"type\":\"date\",\"max\":30}'));\n</script><div id=\"ex_48128929\" class=\"textline\"><div class=\"block\"><div class=\"statement\">Enter your date of birth<span class=\"input\"></span></div></div></div><script>Exercises.pop();</script><script>var ex_929323971 = Exercises.push(new Exercises.Textline(929323971, '{\"name\":\"ch06_ex6\",\"type\":\"time\",\"max\":30,\"title\":\"When did you feel it?\",\"placeholder\":\"\"}'));\n</script><div id=\"ex_929323971\" class=\"textline\"><div class=\"block\"><div class=\"statement\">What time did you experience the earthquake?<span class=\"input\"></span></div></div></div><script>Exercises.pop();</script><script>var ex_499896364 = Exercises.push(new Exercises.Textline(499896364, '{\"name\":\"ch06_ex7\",\"type\":\"multiline\",\"max\":5000,\"title\":\"When did you feel it?\",\"rows\":7,\"placeholder\":\"\"}'));\n</script><div id=\"ex_499896364\" class=\"textline\"><div class=\"block\"><div class=\"statement\">What makes you tick? Don't be shy:</div><div class=\"remaining\"></div><div class=\"input\"></div></div></div><script>Exercises.pop();</script><h3 id=\"initial-text-disabled\">Initial Text, disabled</h3>\n<pre><code>  +textline({name: &quot;ch06_ex9&quot;, type: &#39;text&#39;, max: 60, size: 60,\n    title: &quot;Put spaces here&quot;,\n    placeholder: &#39;use your keyboard&#39;,\n    initialText: &#39;Dearguysfromsupportmyspacebardoesnotseemtowork&#39;,\n    ignoreScore: true,\n    disabled: false\n    })\n    +statement\n      p Put spaces here\n      span.input.disabled\n\n  +textline({name: &quot;ch06_ex9&quot;, type: &#39;text&#39;, max: 60, size: 60,\n    title: &quot;Go away, nothing to do here&quot;,\n    placeholder: &#39;use your keyboard&#39;,\n    initialText: &#39;This is also disabled&#39;,\n    ignoreScore: true,\n    disabled: true\n    })\n    +statement\n      p Put spaces here\n      span.input.disabled</code></pre>\n<script>var ex_1205770549 = Exercises.push(new Exercises.Textline(1205770549, '{\"name\":\"ch06_ex9\",\"type\":\"text\",\"max\":60,\"size\":60,\"title\":\"Put spaces here\",\"placeholder\":\"use your keyboard\",\"initialText\":\"Dearguysfromsupportmyspacebardoesnotseemtowork\",\"ignoreScore\":true,\"disabled\":false}'));\n</script><div id=\"ex_1205770549\" class=\"textline\"><div class=\"block\"><div class=\"statement\"><p>Put spaces here</p><span class=\"input disabled\"></span></div></div></div><script>Exercises.pop();</script><script>var ex_1275818445 = Exercises.push(new Exercises.Textline(1275818445, '{\"name\":\"ch06_ex10\",\"type\":\"text\",\"max\":60,\"size\":60,\"title\":\"Go away, nothing to do here\",\"placeholder\":\"use your keyboard\",\"initialText\":\"This is also disabled\",\"ignoreScore\":true,\"disabled\":true}'));\n</script><div id=\"ex_1275818445\" class=\"textline\"><div class=\"block\"><div class=\"statement\"><p>Put spaces here</p><span class=\"input disabled\"></span></div></div></div><script>Exercises.pop();</script><h3 id=\"special-math-exercise\">Special Math exercise</h3>\n<ul>\n<li><p><code>multiply-to-addition</code> creates a numeric input used for multiply exercises\n of the following form: &quot;Write 3 * 5 as an addition.&quot;, expecting the result \n to be &#39;3 + 3 + 3 + 3 + 3&#39; or &#39;5 + 5 + 5&#39;. Whitespace in thr result \n is discretionary, i.e. &#39;2+2&#39;, &#39;  2 +2&#39; or &#39; 2 + 2 &#39; are all valid.</p>\n</li>\n<li><p><code>reflexive-multiply</code> creates a numeric input used for the arithmetic exercises\nof the following kind: write &#39;3 + 3&#39; as a multiplication and the result can be\n&#39;2*3&#39;, &#39;2 x 3&#39;, &#39;3 X 2&#39;, etc. Whitespace has the same policy as above.</p>\n</li>\n</ul>\n<script>var ex_711358889 = Exercises.push(new Exercises.Textline(711358889, '{\"name\":\"ch06_ex8\",\"type\":\"multiply-to-addition\",\"max\":30,\"a\":5,\"b\":2,\"placeholder\":\"5 + 5 + ....\"}'));\n</script><div id=\"ex_711358889\" class=\"textline\"><div class=\"block\"><div class=\"input\"></div><div class=\"score-box\"></div></div></div><script>Exercises.pop();</script><script>var ex_711358888 = Exercises.push(new Exercises.Textline(711358888, '{\"name\":\"ch06_ex9\",\"type\":\"reflexive-multiply\",\"max\":30,\"a\":3,\"b\":7,\"placeholder\":\"3 * ...\"}'));\n</script><div id=\"ex_711358888\" class=\"textline\"><div class=\"block\"><div class=\"input\"></div><div class=\"score-box\"></div></div></div><script>Exercises.pop();</script></section></article>"; }});