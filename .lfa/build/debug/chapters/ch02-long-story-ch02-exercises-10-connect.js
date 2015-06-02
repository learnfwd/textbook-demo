registerChapter({ chapter: "ch02-long-story-ch02-exercises-10-connect", content: function () { return "<div class=\"text\"><h1 id=\"connector\">Connector</h1>\n<p>This is a type of exercise where the elements must be connected in pairs according to rules decided by the textbook authors.</p>\n<p>Elements can be arranged horizontally, vertically or freely. What is common is that each connectable element (source or destination) has a small disc <em>handle</em>. This small disc can be dragged from source to the destination or from destination to the source to make the connection.</p>\n<p>The score is determined as the ratio between the number of correct connections and the total number of connections that need to be done. Bad connections decrease the score.</p>\n</div><p>Connect the arab numerals with their Roman version:</p><script>var ex_1204648026 = Exercises.push(new Exercises.ConnectPoints(1204648026, '{\"name\":\"help10-1\",\"orientation\":\"horizontal\",\"connections\":[[\"a1\",\"r1\"],[\"a5\",\"r5\"],[\"a9\",\"r9\"]]}'));\n</script><div id=\"ex_1204648026\" class=\"connect-points\"><div class=\"block\"><div class=\"progress-box\"></div><div class=\"score-box\"></div><div class=\"row\"><!--first group--><div data-group=\"arab\" class=\"col-xs-5\"><div class=\"choice pin-to\"><div data-name=\"a1\" class=\"connector pin-right\"></div>1</div><div class=\"choice pin-to\"><div data-name=\"a5\" class=\"connector pin-right\"></div>5</div><div class=\"choice pin-to\"><div data-name=\"a9\" class=\"connector pin-right\"></div>9</div></div><!--space for the lines--><div class=\"col-xs-2\"></div><!--second group--><div data-group=\"roman\" class=\"col-xs-5\"><div class=\"choice pin-to\"><div data-name=\"r9\" class=\"connector pin-left\"></div>IX</div><div class=\"choice pin-to\"><div data-name=\"r5\" class=\"connector pin-left\"></div>V</div><div class=\"choice pin-to\"><div data-name=\"r1\" class=\"connector pin-left\"></div>I</div></div></div></div></div><script>Exercises.pop();</script>"; }});