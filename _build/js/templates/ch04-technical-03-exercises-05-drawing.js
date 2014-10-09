asyncDefine('ch04-technical-03-exercises-05-drawing', function(){ return function () { return "<article><section><h1 id=\"drawing-pad\">Drawing Pad</h1>\n<h3 id=\"description\">Description</h3>\n<p>Creates a drawable canvas element. Supports the following interactions:</p>\n<ul>\n<li>toggle between main and secondary color</li>\n<li>full erase</li>\n<li>undo</li>\n<li>redo</li>\n</ul>\n<p><strong>Note</strong>: Saving only works if you provide a name option or a block. See below.</p>\n<h3 id=\"parameters\">Parameters</h3>\n<pre><code>+drawingpad({options})\n  block</code></pre>\n<p>Takes an optional block of text (which it will output above the canvas as-is), and\nan options parameter that can contain the following parameters:</p>\n<ul>\n<li><code>name</code> (string), default: None. To enable the save function,\nyou have to provide a name or block content.</li>\n<li><code>backgroundImage</code>, default: None. If you use a <code>backgroundImage</code>,\nthe canvas will scale to the size of the image, and your\nwidth/height values won&#39;t matter anymore.</li>\n<li><code>width</code> (%, px, em), default: <code>100%</code></li>\n<li><code>height</code> (%, px, em), default: as much as <code>width</code></li>\n<li><code>hideButtons</code>, default: <code>false</code></li>\n</ul>\n<h3 id=\"scoring\">Scoring</h3>\n<ul>\n<li>0  if nothing was drawn</li>\n<li>100 if something was drawn</li>\n</ul>\n<h3 id=\"example-source-\">Example (source)</h3>\n<pre><code>+drawingpad({name: &#39;ch05dp1&#39;, primaryColor: &#39;#F33&#39;, backgroundImage: &#39;http://placekitten.com/1500/750&#39;})\n  .score-box</code></pre>\n<h3 id=\"example-rendered-\">Example (rendered)</h3>\n<script>var ex_1998229717 = Exercises.push(new Exercises.DrawingPad(1998229717, '{\"name\":\"ch05dp1\",\"primaryColor\":\"#F33\",\"backgroundImage\":\"http://placekitten.com/1500/750\",\"hideButtons\":false}'));\n</script><div id=\"ex_1998229717\" class=\"drawingpad\"><div class=\"score-box\"></div><div class=\"editor\"><img src=\"http://placekitten.com/1500/750\" alt=\"\" class=\"image\"/><canvas></canvas></div><div class=\"row buttons\"><div class=\"col-xs-12\"><div class=\"row\"><div class=\"col-xs-3\"><div class=\"btn btn-default btn-color-picker btn-block btn-lg\"><i class=\"fa fa-square fa-fw\"></i></div></div><div class=\"col-xs-9\"><div class=\"btn-group btn-group-justified btn-group-lg\"><div class=\"btn btn-default tool btn-freeform active\"><i class=\"fa fa-pencil fa-fw\"></i></div><div class=\"btn btn-default tool btn-straight-line\"><span>—</span></div><div class=\"btn btn-default tool btn-rectangle\"><i class=\"fa fa-square-o fa-fw\"></i></div><div class=\"btn btn-default tool btn-ellipse\"><i class=\"fa fa-circle-o fa-fw\"></i></div></div></div></div></div><div class=\"col-xs-12\"><div class=\"btn-group btn-group-justified btn-group-lg\"><div class=\"btn btn-default btn-destroy\"><div class=\"text-danger\"><i class=\"fa fa-trash-o fa-fw\"></i></div></div><div class=\"btn btn-default btn-undo\"><i class=\"fa fa-rotate-left fa-fw\"></i></div><div class=\"btn btn-default btn-redo\"><i class=\"fa fa-rotate-right fa-fw\"></i></div></div></div></div></div><script>Exercises.pop();</script></section></article>"; }});