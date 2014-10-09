asyncDefine('ch04-technical-03-exercises-98-full-screen', function(){ return function () { return "<article><section><h1 id=\"the-notification-system\">The notification system</h1>\n<p>Options:</p>\n<ul>\n<li><code>title</code> - modal window title</li>\n<li><code>okLabelText</code> - modal dismiss button text</li>\n<li><code>triggerLabelText</code> - launch button text</li>\n</ul>\n<p>Sub-divisions:</p>\n<ul>\n<li>One or more <code>.previews</code></li>\n<li>One or more <code>.triggers</code></li>\n</ul>\n<p>Sampe code:</p>\n<pre><code>  +exercise-modal({name: &#39;ex98_1&#39;, title: &#39;Full screen hello&#39;, okLabelText: &#39;Done&#39;, triggerLabelText: &#39;How are you?&#39;})\n    +yesno\n      p Are you ok?\n\n\n  +exercise-modal({name: &#39;ex98_2&#39;,\n    title: &#39;Sample with preview div&#39;, \n    okLabelText: &#39;Done&#39;,\n    triggerLabelText: &#39;Who sings that?&#39;})\n    .preview\n      p\n      | Iarba ce-a rămas verde într-un cucui\n\n    +textline({name: &#39;ex98_2_1&#39;})\n\n  +exercise-modal({name: &#39;ex98_1&#39;, title: &#39;Full screen hello&#39;, okLabelText: &#39;Done&#39;, triggerLabelText: &#39;How are you?&#39;})\n    .preview\n      p Custom trigger!\n        span.trigger Click this absolutely unconspicous text!\n    +yesno\n      p You din&#39;t see that coming.</code></pre>\n<p>Rendered code:</p>\n<script>var ex_185103182 = Exercises.push(new Exercises.Modal(185103182, '{\"name\":\"ex98_1\",\"title\":\"Full screen hello\",\"okLabelText\":\"Done\",\"triggerLabelText\":\"How are you?\"}'));\n</script><div id=\"ex_185103182\" class=\"exercise-modal\"><div id=\"ex_185103182_modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"185103182_modal_label\" aria-hidden=\"true\" class=\"modal fade\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"close\">×</button><h4 id=\"185103182_modal_label\" class=\"modal-title\">Full screen hello</h4></div><div class=\"modal-body\"><script>var ex_1957106099 = Exercises.push(new Exercises.YesNo(1957106099, ''));\n</script><div id=\"ex_1957106099\" class=\"yesno\"><div class=\"block\"><p>Are you ok?</p></div><div class=\"buttons btn-group btn-group-justified\"><div class=\"btn btn-default yes\"></div><div class=\"btn btn-default no\"></div></div></div><script>Exercises.pop();</script></div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-primary\">Done</button></div></div></div></div></div><script>Exercises.pop();</script><script>var ex_573493852 = Exercises.push(new Exercises.Modal(573493852, '{\"name\":\"ex98_2\",\"title\":\"Sample with preview div\",\"okLabelText\":\"Done\",\"triggerLabelText\":\"Who sings that?\"}'));\n</script><div id=\"ex_573493852\" class=\"exercise-modal\"><div id=\"ex_573493852_modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"573493852_modal_label\" aria-hidden=\"true\" class=\"modal fade\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"close\">×</button><h4 id=\"573493852_modal_label\" class=\"modal-title\">Sample with preview div</h4></div><div class=\"modal-body\"><div class=\"preview\"><p></p>Iarba ce-a rămas verde într-un cucui</div><script>var ex_742903991 = Exercises.push(new Exercises.Textline(742903991, '{\"name\":\"ex98_2_1\"}'));\n</script><div id=\"ex_742903991\" class=\"textline\"><div class=\"block\"></div></div><script>Exercises.pop();</script></div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-primary\">Done</button></div></div></div></div></div><script>Exercises.pop();</script><script>var ex_1569314763 = Exercises.push(new Exercises.Modal(1569314763, '{\"name\":\"ex98_1\",\"title\":\"Full screen hello\",\"okLabelText\":\"Done\",\"triggerLabelText\":\"How are you?\"}'));\n</script><div id=\"ex_1569314763\" class=\"exercise-modal\"><div id=\"ex_1569314763_modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"1569314763_modal_label\" aria-hidden=\"true\" class=\"modal fade\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"close\">×</button><h4 id=\"1569314763_modal_label\" class=\"modal-title\">Full screen hello</h4></div><div class=\"modal-body\"><div class=\"preview\"><p>Custom trigger!<span class=\"trigger\">Click this absolutely unconspicous text!</span></p></div><script>var ex_1433221527 = Exercises.push(new Exercises.YesNo(1433221527, ''));\n</script><div id=\"ex_1433221527\" class=\"yesno\"><div class=\"block\"><p>You din't see that coming.</p></div><div class=\"buttons btn-group btn-group-justified\"><div class=\"btn btn-default yes\"></div><div class=\"btn btn-default no\"></div></div></div><script>Exercises.pop();</script></div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-primary\">Done</button></div></div></div></div></div><script>Exercises.pop();</script></section></article>"; }});