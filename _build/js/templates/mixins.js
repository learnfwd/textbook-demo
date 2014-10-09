define(function() {
  var jade_mixins = {};
jade_mixins["article"] = function(title, subtitle){
var block = (this && this.block), attributes = (this && this.attributes) || {};
if (!self) { locals.title = title; locals.subtitle = subtitle; }
buf.push("<article>");
block && block();
buf.push("</article>");
};
jade_mixins["section"] = function(title){
var block = (this && this.block), attributes = (this && this.attributes) || {};
if (!self) { locals.sections = locals.sections || []; locals.sections.push(title); }
buf.push("<section>");
block && block();
buf.push("</section>");
};
jade_mixins["img"] = function(path){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<img" + (jade.attr("src", "" + (path) + "", true, false)) + "/>");
};
jade_mixins["parallax"] = function(path){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div" + (jade.attr("style", "background-image: url('" + (path) + "')", true, false)) + " class=\"parallax\">");
if ( block)
{
block && block();
}
buf.push("</div>");
};
jade_mixins["link_to"] = function(path){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<a" + (jade.attr("href", "" + (path) + "", true, false)) + ">");
if ( block)
{
block && block();
}
else
{
buf.push(jade.escape(null == (jade.interp = path) ? "" : jade.interp));
}
buf.push("</a>");
};
jade_mixins["widget"] = function(path){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<iframe" + (jade.attr("src", "" + (path) + "", true, false)) + "></iframe>");
};
jade_mixins["_toc"] = function(chapters){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<ul class=\"tableofcontents\">");
// iterate chapters
;(function(){
  var $$obj = chapters;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var chapter = $$obj[$index];

buf.push("<li" + (jade.attr("data-url", "" + (chapter.url) + "", true, false)) + " class=\"fold\">");
var hasChildren = (chapter.children && chapter.children.length);
if ( chapter.locals.subtitle)
{
buf.push("<a" + (jade.attr("href", "#book/" + (chapter.url) + "", true, false)) + (jade.cls(['subtitled',hasChildren ? 'foldable' : ''], [null,true])) + "><span class=\"title\">" + (jade.escape(null == (jade.interp = chapter.locals.title) ? "" : jade.interp)) + "</span><span class=\"subtitle\">" + (jade.escape(null == (jade.interp = chapter.locals.subtitle) ? "" : jade.interp)) + "</span></a>");
}
else
{
buf.push("<a" + (jade.attr("href", "#book/" + (chapter.url) + "", true, false)) + (jade.cls([hasChildren ? 'foldable' : ''], [true])) + "><span class=\"title\">" + (jade.escape(null == (jade.interp = chapter.locals.title) ? "" : jade.interp)) + "</span></a>");
}
if ( hasChildren)
{
buf.push("<div class=\"fold-button\"><i class=\"fold-icon fa fa-fw fa-chevron-down\"></i></div><div class=\"children-container\">");
jade_mixins["_toc"](chapter.children);
buf.push("</div>");
}
buf.push("</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var chapter = $$obj[$index];

buf.push("<li" + (jade.attr("data-url", "" + (chapter.url) + "", true, false)) + " class=\"fold\">");
var hasChildren = (chapter.children && chapter.children.length);
if ( chapter.locals.subtitle)
{
buf.push("<a" + (jade.attr("href", "#book/" + (chapter.url) + "", true, false)) + (jade.cls(['subtitled',hasChildren ? 'foldable' : ''], [null,true])) + "><span class=\"title\">" + (jade.escape(null == (jade.interp = chapter.locals.title) ? "" : jade.interp)) + "</span><span class=\"subtitle\">" + (jade.escape(null == (jade.interp = chapter.locals.subtitle) ? "" : jade.interp)) + "</span></a>");
}
else
{
buf.push("<a" + (jade.attr("href", "#book/" + (chapter.url) + "", true, false)) + (jade.cls([hasChildren ? 'foldable' : ''], [true])) + "><span class=\"title\">" + (jade.escape(null == (jade.interp = chapter.locals.title) ? "" : jade.interp)) + "</span></a>");
}
if ( hasChildren)
{
buf.push("<div class=\"fold-button\"><i class=\"fold-icon fa fa-fw fa-chevron-down\"></i></div><div class=\"children-container\">");
jade_mixins["_toc"](chapter.children);
buf.push("</div>");
}
buf.push("</li>");
    }

  }
}).call(this);

buf.push("</ul>");
};
jade_mixins["minitoc"] = function(url){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var id = (url + Math.random().toString()).hashCode();
buf.push("<div" + (jade.attr("id", 'minitoc_' + (id) + '', true, false)) + " class=\"minitoc\"></div><script>$(document).ready(function() {\n  var url = '" + (jade.escape((jade.interp = url) == null ? '' : jade.interp)) + "' || window.App.book.currentChapter;\n  new TocView({ el: $('#minitoc_" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + "'), url: url });\n});\n</script>");
};
jade_mixins["youtube"] = function(url){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"video\"><iframe" + (jade.attr("src", "https://www.youtube.com/embed/" + (url) + "?rel=0", true, false)) + " frameborder=\"0\" allowfullscreen=\"allowfullscreen\"></iframe></div>");
};
jade_mixins["vimeo"] = function(url){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"video\"><iframe" + (jade.attr("src", "//player.vimeo.com/video/" + (url) + "?rel=0", true, false)) + " frameborder=\"0\" webkitallowfullscreen=\"webkitallowfullscreen\" mozallowfullscreen=\"mozallowfullscreen\" allowfullscreen=\"allowfullscreen\"></iframe></div>");
};
jade_mixins["cloudfront"] = function(server, name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"video\"><video controls=\"controls\" preload=\"auto\"" + (jade.attr("poster", "http://" + (server) + ".cloudfront.net/" + (name) + ".png", true, false)) + "><source" + (jade.attr("src", "http://" + (server) + ".cloudfront.net/" + (name) + ".mp4", true, false)) + "/></video></div>");
};
jade_mixins["modal"] = function(id, title){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div" + (jade.attr("id", "" + (id) + "", true, false)) + " tabindex=\"-1\" role=\"dialog\"" + (jade.attr("aria-labelledby", '' + (id) + '-label', true, false)) + " aria-hidden=\"true\" class=\"modal\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"close\">×</button><h4 class=\"modal-title\">" + (jade.escape(null == (jade.interp = title) ? "" : jade.interp)) + "</h4></div><div class=\"modal-body\">");
if ( block)
{
block && block();
}
else
{
buf.push("<p class=\"text-danger\">You forgot to add content to the modal. Like this:</p><pre>//- the button to open the modal\n.btn(href=\"#my-modal\", data-toggle=\"modal\")\n\n//- the actual modal\n+modal(\"my-modal\", \"A title\")\n  p Content.\n  </pre>");
}
buf.push("</div></div></div></div>");
};
jade_mixins["lightbox"] = function(path, largerPath){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var largerPath = largerPath || '#';
buf.push("<a" + (jade.attr("href", '' + (largerPath) + '', true, false)) + " class=\"lightbox\"><img" + (jade.attr("src", "" + (path) + "", true, false)) + " alt=\"\"/></a>");
};
jade_mixins["draw"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
options = options || {};
options.width = options.width || '';
options.height = options.height || '';
options.primaryColor = options.primaryColor || '#333';
options.secondaryColor = options.secondaryColor || '#3388CD';
options.backgroundColor = options.backgroundColor || '#eee';
buf.push("<div" + (jade.attr("data-width", "" + (options.width) + "", true, false)) + (jade.attr("data-height", "" + (options.height) + "", true, false)) + (jade.attr("data-primary-color", "" + (options.primaryColor) + "", true, false)) + (jade.attr("data-secondary-color", "" + (options.secondaryColor) + "", true, false)) + (jade.attr("data-background-color", "" + (options.backgroundColor) + "", true, false)) + " class=\"sketchpad\"><div class=\"editor\"></div><div class=\"row\"><div class=\"col-xs-12 col-sm-6\"><div class=\"btn-group btn-group-justified btn-group-lg\"><div" + (jade.attr("style", "color: " + (options.primaryColor) + ";", true, false)) + " class=\"btn btn-default btn-color-switcher\"><i class=\"fa fa-pencil fa-fw\"></i></div><div class=\"btn btn-default btn-eraser\"><i class=\"fa fa-eraser fa-fw\"></i></div><div class=\"btn btn-default btn-destroy\"><div class=\"text-danger\"><i class=\"fa fa-trash-o fa-fw\"></i></div></div></div></div><div class=\"col-xs-12 col-sm-6\"><div class=\"btn-group btn-group-justified btn-group-lg\"><div class=\"btn btn-default btn-undo\"><i class=\"fa fa-rotate-left fa-fw\"></i></div><div class=\"btn btn-default btn-redo\"><i class=\"fa fa-rotate-right fa-fw\"></i></div><div class=\"btn btn-default btn-save\"><div class=\"text-success\"><i class=\"fa fa-cloud-download fa-fw\"></i></div></div></div></div></div></div>");
};
jade_mixins["rightbar"] = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<p class=\"text-center\">Nothing here yet.</p>");
};
jade_mixins["error-message"] = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<p>If you're seeing this, either you have to wait for things to finish loading, or something went wrong.</p>");
};
jade_mixins["browser-warning-head"] = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
if ( !global.options.browser_warning)
{
buf.push("<script>window.browserOK = true;</script>");
}
else
{
buf.push("<script>(function () {\n  var nVer = navigator.appVersion;\n  var nAgt = navigator.userAgent;\n  var browserName  = navigator.appName;\n  var fullVersion  = ''+parseFloat(navigator.appVersion); \n  var majorVersion = parseInt(navigator.appVersion,10);\n  var osName = 'Unknown';\n  var nameOffset,verOffset,ix;\n  var browserOK = false;\n  \n  if (nAgt.indexOf(\"Android\")!=-1) {\n    osName = \"Android\";\n  } else if (nAgt.indexOf(\"iPhone\")!=-1 || nAgt.indexOf(\"iPod\")!=-1 || nAgt.indexOf(\"iPad\")!=-1) {\n    osName = \"iOS\";\n  } else if (nAgt.indexOf(\"Linux\")!=-1) {\n    osName = \"Linux\";\n  } else if (nAgt.indexOf(\"Mac OS X\")!=-1) {\n    osName = \"OS X\";\n  } else if (nAgt.indexOf(\"Windows\")!=-1) {\n    osName = \"Windows\";\n  }\n  \n  // In Opera, the true version is after \"Opera\" or after \"Version\"\n  if ((verOffset=nAgt.indexOf(\"Opera\"))!=-1) {\n   browserName = \"Opera\";\n   fullVersion = nAgt.substring(verOffset+6);\n   if ((verOffset=nAgt.indexOf(\"Version\"))!=-1) \n     fullVersion = nAgt.substring(verOffset+8);\n  }\n  // In MSIE, the true version is after \"MSIE\" in userAgent\n  else if ((verOffset=nAgt.indexOf(\"MSIE\"))!=-1) {\n   browserName = \"Microsoft Internet Explorer\";\n   fullVersion = nAgt.substring(verOffset+5);\n  }\n  // In MSIE 11, the true version is after \"ver:\" in userAgent\n  else if ((verOffset=nAgt.indexOf(\"Trident\"))!=-1) {\n   verOffset = nAgt.indexOf(\"rv:\");\n   browserName = \"Microsoft Internet Explorer\";\n   fullVersion = nAgt.substring(verOffset+3);\n  }\n  // In Chrome, the true version is after \"Chrome\" \n  else if ((verOffset=nAgt.indexOf(\"Chrome\"))!=-1) {\n   browserName = \"Chrome\";\n   fullVersion = nAgt.substring(verOffset+7);\n  }\n  // In Safari, the true version is after \"Safari\" or after \"Version\" \n  else if ((verOffset=nAgt.indexOf(\"Safari\"))!=-1) {\n   browserName = \"Safari\";\n   fullVersion = nAgt.substring(verOffset+7);\n   if ((verOffset=nAgt.indexOf(\"Version\"))!=-1) \n     fullVersion = nAgt.substring(verOffset+8);\n  }\n  // In Firefox, the true version is after \"Firefox\" \n  else if ((verOffset=nAgt.indexOf(\"Firefox\"))!=-1) {\n   browserName = \"Firefox\";\n   fullVersion = nAgt.substring(verOffset+8);\n  }\n  // In most other browsers, \"name/version\" is at the end of userAgent \n  else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < \n            (verOffset=nAgt.lastIndexOf('/')) ) \n  {\n   browserName = nAgt.substring(nameOffset,verOffset);\n   fullVersion = nAgt.substring(verOffset+1);\n   if (browserName.toLowerCase()==browserName.toUpperCase()) {\n    browserName = navigator.appName;\n   }\n  }\n  // trim the fullVersion string at semicolon/space/) if present\n  if ((ix=fullVersion.indexOf(\";\"))!=-1)\n     fullVersion=fullVersion.substring(0,ix);\n  if ((ix=fullVersion.indexOf(\" \"))!=-1)\n     fullVersion=fullVersion.substring(0,ix);\n  if ((ix=fullVersion.indexOf(\")\"))!=-1)\n     fullVersion=fullVersion.substring(0,ix);\n     \n  majorVersion = parseInt(''+fullVersion,10);\n  if (isNaN(majorVersion)) {\n   fullVersion  = ''+parseFloat(navigator.appVersion); \n   majorVersion = parseInt(navigator.appVersion,10);\n  }\n  \n  if (browserName === undefined) {\n    browserName = 'Unknown Browser';\n  }\n  \n  browserOK = ( (browserName === 'Chrome' && majorVersion >= 31) ||\n                (browserName === 'Firefox' && majorVersion >= 25) ||\n                (browserName === 'Safari' && majorVersion >= 6) ||\n                (browserName === 'Microsoft Internet Explorer' && majorVersion >= 10) );\n                \n  console.log('UserAgent: ', nAgt);\n  console.log('Browser detection: ' + browserName + ' ' + \n    fullVersion + '(' + majorVersion + ') on ' +\n    osName + (browserOK ? ' OK' : ' FAIL'));\n    \n  if (!browserOK) {\n    var browsers = {\n      chrome: {\n        href: 'https://www.google.com/chrome/browser/',\n        text: 'Google Chrome (&gt;= 31.0)'\n      },\n      safari: {\n        href: 'https://www.apple.com/safari/',\n        text: 'Apple Safari (&gt;= 6.0)'\n      },\n      firefox: {\n        href: 'http://www.mozilla.org/firefox/new/',\n        text: 'Mozilla Firefox (&gt;= 25.0)'\n      },\n      msie: {\n        href: 'http://windows.microsoft.com/en-us/internet-explorer/download-ie',\n        text: 'Internet Explorer (&gt;= 10.0)'\n      },\n      mobilesafari: {\n        href: 'https://www.apple.com/ios/',\n        text: 'Apple Mobile Safari (iOS &gt;= 6.0)'\n      },\n      androidchrome: {\n        href: 'market://details?id=com.android.chrome',\n        text: 'Google Chrome (&gt;= 31.0)'\n      },\n    };\n    \n    var recommend = [];\n    \n    if (osName === 'Android') {\n      recommend = ['androidchrome'];\n    } else if (osName === 'iOS') {\n      recommend = ['mobilesafari'];\n    } else {\n      recommend.push('chrome');\n      if (osName === 'OS X') {\n        recommend.push('safari');\n      }\n      recommend.push('firefox');\n      if (osName === 'Windows') {\n        recommend.push('msie');\n      }\n    }\n    \n    var list = '';\n    for (var i = 0, n = recommend.length; i < n; i++) {\n      var brw = browsers[recommend[i]];\n      list = list + '<li><a href=\"' + brw.href + '\">' + brw.text + '</a></li>';\n    }\n    \n    window.browserRecomendationList = list;\n  }\n  \n  window.browserFullName = browserName + ' ' + fullVersion;\n  window.browserOK = browserOK;\n})();\n</script>");
}
};
jade_mixins["browser-warning-content"] = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div id=\"browser-warning\"><script>if (window.browserOK) {\n  document.write('<style type=\"text/css\">#browser-warning{ display: none; }</style>');\n  function removeClass(el, className) {\n    el.className = el.className.replace(className, '');\n  }\n  removeClass(document.querySelector('#scrollview'), 'locked');\n}\n</script>");
var default_browser_warning = {title: 'Outdated or unsupported browser', body: 'We\'ve noticed that you\'re using <strong>%1</strong>. This browser or platform is either old or unsupported. We\'re not stopping you from continuing, but we warn you that some content might not be displayed or function correctly. We recommend you updating/switching to one of these:'};
var browser_warning = global.options.browser_warning;
if (typeof(browser_warning) !== 'object') {
browser_warning = default_browser_warning;
}
browser_warning.title = browser_warning.title || default_browser_warning.title;
browser_warning.body = browser_warning.body || default_browser_warning.body;
if ( global.options.browser_warning)
{
buf.push("<div class=\"bwarn-content col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12\"><script>window.removeBrowserWarning = function() {\n  var el = document.querySelector('#browser-warning');\n  el.parentNode.removeChild(el);\n  function removeClass(el, className) {\n    el.className = el.className.replace(className, '');\n  }\n  removeClass(document.querySelector('#scrollview'), 'locked');\n}</script><h1 class=\"pull-right\"><a href=\"#\" onclick=\"removeBrowserWarning()\" class=\"btn btn-outline-inverse btn-lg\">OK</a></h1><h1 class=\"bwarn-title\">" + (null == (jade.interp = browser_warning.title) ? "" : jade.interp) + "</h1><p class=\"bwarn-body\">" + (null == (jade.interp = browser_warning.body) ? "" : jade.interp) + "</p><script>var el = document.querySelector('#browser-warning .bwarn-content .bwarn-body');\nel.innerHTML = el.innerHTML.replace('%1', window.browserFullName);</script><ul><script>if (!window.browserOK && window.browserRecomendationList) {\n  document.write(window.browserRecomendationList);\n}\n</script></ul></div>");
}
buf.push("</div>");
};
function getUniqueId(options, block) {
var id = '';
if (block) {
id += block.toString();
};
if (options && options.name) {
id += options.name
};
if (id === '') {
id += Math.random();
};
return Math.abs(id.hashCode()).toString();
}
jade_mixins["exercise"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var id = getUniqueId(options, block);
var options_JSON = JSON.stringify(options);
buf.push("<script>var ex_" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + " = Exercises.push(new Exercises.Exercise(" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + ", '" + (((jade.interp = options_JSON) == null ? '' : jade.interp)) + "'));\n</script><div" + (jade.attr("id", "ex_" + (id) + "", true, false)) + " class=\"exercise\">");
if ( block)
{
buf.push(jade.escape(null == (jade.interp = block()) ? "" : jade.interp));
}
buf.push("</div><script>Exercises.pop();</script>");
};
jade_mixins["statement"] = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"statement\">");
if ( block)
{
buf.push(jade.escape(null == (jade.interp = block()) ? "" : jade.interp));
}
buf.push("</div>");
};
jade_mixins["yesno"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
if ( typeof(options) === 'boolean')
{
options = {answer: options};
}
var id = getUniqueId(options, block);
var options_JSON = JSON.stringify(options);
buf.push("<script>var ex_" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + " = Exercises.push(new Exercises.YesNo(" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + ", '" + (((jade.interp = options_JSON) == null ? '' : jade.interp)) + "'));\n</script><div" + (jade.attr("id", "ex_" + (id) + "", true, false)) + " class=\"yesno\"><div class=\"block\">");
if ( block)
{
buf.push(jade.escape(null == (jade.interp = block()) ? "" : jade.interp));
}
buf.push("</div><div class=\"buttons btn-group btn-group-justified\"><div class=\"btn btn-default yes\"></div><div class=\"btn btn-default no\"></div></div></div><script>Exercises.pop();</script>");
};
jade_mixins["pickone"] = function(answer, choices, options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
if ( typeof(answer) === 'number')
{
options = options || {}
options.answer = answer;
options.choices = choices;
}
else
{
options = answer;
}
var id = getUniqueId(options, block);
var options_JSON = JSON.stringify(options);
buf.push("<script>var ex_" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + " = Exercises.push(new Exercises.PickOne(" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + ", '" + (((jade.interp = options_JSON) == null ? '' : jade.interp)) + "'));\n</script><div" + (jade.attr("id", "ex_" + (id) + "", true, false)) + " class=\"pickone\">");
if ( block)
{
buf.push(jade.escape(null == (jade.interp = block()) ? "" : jade.interp));
}
buf.push("<div class=\"choices-container\"><div class=\"choices btn-group\"></div></div></div><script>Exercises.pop();</script>");
};
jade_mixins["select-to-highlight"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var id = getUniqueId(options, block);
var options_JSON = JSON.stringify(options);
buf.push("<script>var ex_" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + " = Exercises.push(new Exercises.SelectToHighlight(" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + ", '" + (((jade.interp = options_JSON) == null ? '' : jade.interp)) + "'));\n</script><div" + (jade.attr("id", "ex_" + (id) + "", true, false)) + " class=\"select-to-highlight\">");
if ( block)
{
buf.push(jade.escape(null == (jade.interp = block()) ? "" : jade.interp));
}
buf.push("</div><script>Exercises.pop();</script>");
};
jade_mixins["drag-and-sort"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
if ( block)
{
var id = getUniqueId(options, block);
}
else
{
buf.push("<script>alert('Bad Drag-and-Sort block somewehere in the code. Please have block content or {name: ....} as parameter')\nthrow  'Bad Drag-and-Sort block somewehere in the code. Please have block content or {name: ....} as parameter'\n</script>");
}
var options_JSON = JSON.stringify(options);
buf.push("<script>var ex_" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + " = Exercises.push(new Exercises.DragAndSort(" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + ", '" + (((jade.interp = options_JSON) == null ? '' : jade.interp)) + "'));\n</script><div" + (jade.attr("id", "ex_" + (id) + "", true, false)) + " class=\"drag-and-sort\">");
if ( block)
{
buf.push(jade.escape(null == (jade.interp = block()) ? "" : jade.interp));
}
buf.push("</div><script>Exercises.pop();</script>");
};
jade_mixins["drag-to-bucket"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
if ( block)
{
var id = getUniqueId(options, block);
}
else
{
buf.push("<script>alert('Bad Drag-to-Bucket block somewehere in the code. Please have block content or {name: ....} as parameter')\nthrow  'Bad Drag-to-Bucket block somewehere in the code. Please have block content or {name: ....} as parameter'\n</script>");
}
var options_JSON = JSON.stringify(options);
buf.push("<script>var ex_" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + " = Exercises.push(new Exercises.DragToBucket(" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + ", '" + (((jade.interp = options_JSON) == null ? '' : jade.interp)) + "'));\n</script><div" + (jade.attr("id", "ex_" + (id) + "", true, false)) + " class=\"drag-to-bucket\">");
if ( block)
{
buf.push(jade.escape(null == (jade.interp = block()) ? "" : jade.interp));
}
buf.push("</div><script>Exercises.pop();</script>");
};
jade_mixins["numpad"] = function(answer, options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
if ( typeof(answer) === 'number')
{
options = options || {}
options.answer = answer;
}
else
{
options = answer;
}
var id = getUniqueId(options, block);
if ( !id)
{
buf.push("<script>alert('Bad NumPad block somewehere in the code. Please have block content or {name: ....} as parameter')\n</script>");
}
var options_JSON = JSON.stringify(options);
buf.push("<script>var ex_" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + " = Exercises.push(new Exercises.NumPad(" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + ", '" + (((jade.interp = options_JSON) == null ? '' : jade.interp)) + "'));\n</script><div" + (jade.attr("id", "ex_" + (id) + "", true, false)) + " class=\"numpad\"><div class=\"hidden numpad-hidden\"><div class=\"numpad-keys\"><div class=\"display input-group input-group-lg\"><input type=\"Number\" autocomplete=\"off\" class=\"form-control input-lg\"/><div class=\"input-group-btn\"><button data-value=\"clear\" class=\"btn btn-default btn-lg smpadding\"><i data-value=\"clear\" class=\"fa fa-times-circle\"></i></button></div></div><div class=\"keys\"><div class=\"row row1-3\"><div class=\"col-xs-4\"><button data-value=\"1\" class=\"digit\">1</button></div><div class=\"col-xs-4\"><button data-value=\"2\" class=\"digit\">2</button></div><div class=\"col-xs-4\"><button data-value=\"3\" class=\"digit\">3</button></div></div><div class=\"row row4-6\"><div class=\"col-xs-4\"><button data-value=\"4\" class=\"digit\">4</button></div><div class=\"col-xs-4\"><button data-value=\"5\" class=\"digit\">5</button></div><div class=\"col-xs-4\"><button data-value=\"6\" class=\"digit\">6</button></div></div><div class=\"row row7-9\"><div class=\"col-xs-4\"><button data-value=\"7\" class=\"digit\">7</button></div><div class=\"col-xs-4\"><button data-value=\"8\" class=\"digit\">8</button></div><div class=\"col-xs-4\"><button data-value=\"9\" class=\"digit\">9</button></div></div><div class=\"row row-extra\"><div class=\"col-xs-4\"><button data-value=\".\" class=\"digit\">.</button></div><div class=\"col-xs-4\"><button data-value=\"0\" class=\"digit\">0</button></div><div class=\"col-xs-4\"><button data-value=\"submit\" class=\"digit\"><i data-value=\"submit\" class=\"fa fa-check\"></i></button></div></div></div></div></div>");
if ( block)
{
buf.push(jade.escape(null == (jade.interp = block()) ? "" : jade.interp));
}
buf.push("</div><script>Exercises.pop();</script>");
};
jade_mixins["drawingpad"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
options = options || {};
options.backgroundImage = options.backgroundImage || '';
options.hideButtons = options.hideButtons || false;
var id = getUniqueId(options, block);
if (!block && !options.name) {
options.dontSave = true;
}
var options_JSON = JSON.stringify(options);
buf.push("<script>var ex_" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + " = Exercises.push(new Exercises.DrawingPad(" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + ", '" + (((jade.interp = options_JSON) == null ? '' : jade.interp)) + "'));\n</script><div" + (jade.attr("id", "ex_" + (id) + "", true, false)) + " class=\"drawingpad\">");
if ( block)
{
buf.push(jade.escape(null == (jade.interp = block()) ? "" : jade.interp));
}
buf.push("<div class=\"editor\">");
if ( options.backgroundImage.length)
{
buf.push("<img" + (jade.attr("src", "" + (options.backgroundImage) + "", true, false)) + " alt=\"\" class=\"image\"/>");
}
buf.push("<canvas></canvas></div>");
if ( !options.hideButtons)
{
buf.push("<div class=\"row buttons\"><div class=\"col-xs-12\"><div class=\"row\"><div class=\"col-xs-3\"><div class=\"btn btn-default btn-color-picker btn-block btn-lg\"><i class=\"fa fa-square fa-fw\"></i></div></div><div class=\"col-xs-9\"><div class=\"btn-group btn-group-justified btn-group-lg\"><div class=\"btn btn-default tool btn-freeform active\"><i class=\"fa fa-pencil fa-fw\"></i></div><div class=\"btn btn-default tool btn-straight-line\"><span>—</span></div><div class=\"btn btn-default tool btn-rectangle\"><i class=\"fa fa-square-o fa-fw\"></i></div><div class=\"btn btn-default tool btn-ellipse\"><i class=\"fa fa-circle-o fa-fw\"></i></div></div></div></div></div><div class=\"col-xs-12\"><div class=\"btn-group btn-group-justified btn-group-lg\"><div class=\"btn btn-default btn-destroy\"><div class=\"text-danger\"><i class=\"fa fa-trash-o fa-fw\"></i></div></div><div class=\"btn btn-default btn-undo\"><i class=\"fa fa-rotate-left fa-fw\"></i></div><div class=\"btn btn-default btn-redo\"><i class=\"fa fa-rotate-right fa-fw\"></i></div></div></div></div>");
}
buf.push("</div><script>Exercises.pop();</script>");
};
jade_mixins["textline"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
options = options || {}
var id = getUniqueId(options, block);
if (typeof options.regexp === 'object' && options.regexp && typeof(options.regexp.source) === 'string')  {
options.regexp = options.regexp.source;
}
if (typeof options.regexp === 'string') {
options.regexp = options.regexp.replace(/\\/g, '\\\\');
}
var options_JSON = JSON.stringify(options);
if (typeof options.pattern === 'object' && options.pattern && typeof(options.pattern.source) === 'string')  {
options.pattern = options.pattern.source;
}
if (typeof options.pattern === 'string') {
options.pattern = options.pattern.replace(/\\/g, '\\\\');
}
var options_JSON = JSON.stringify(options);
buf.push("<script>var ex_" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + " = Exercises.push(new Exercises.Textline(" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + ", '" + (((jade.interp = options_JSON) == null ? '' : jade.interp)) + "'));\n</script><div" + (jade.attr("id", "ex_" + (id) + "", true, false)) + " class=\"textline\"><div class=\"block\">");
if ( block)
{
buf.push(jade.escape(null == (jade.interp = block()) ? "" : jade.interp));
}
buf.push("</div></div><script>Exercises.pop();</script>");
};
jade_mixins["arithmetic"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
options = options || {}
var id = getUniqueId(options, block);
var options_JSON = JSON.stringify(options);
buf.push("<script>var ex_" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + " = Exercises.push(new Exercises.Arithmetic(" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + ", '" + (((jade.interp = options_JSON) == null ? '' : jade.interp)) + "'));\n</script><div" + (jade.attr("id", "ex_" + (id) + "", true, false)) + " class=\"arithmetic\"><div class=\"block\">");
if ( block)
{
buf.push(jade.escape(null == (jade.interp = block()) ? "" : jade.interp));
}
buf.push("</div></div><script>Exercises.pop();</script>");
};
jade_mixins["exercise-modal"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var id = getUniqueId(options, block);
var options_JSON = JSON.stringify(options);
var title = options.title || '';
var okLabelText = options.okLabelText || 'OK'
buf.push("<script>var ex_" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + " = Exercises.push(new Exercises.Modal(" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + ", '" + (((jade.interp = options_JSON) == null ? '' : jade.interp)) + "'));\n</script><div" + (jade.attr("id", "ex_" + (id) + "", true, false)) + " class=\"exercise-modal\"><div" + (jade.attr("id", "ex_" + (id) + "_modal", true, false)) + " tabindex=\"-1\" role=\"dialog\"" + (jade.attr("aria-labelledby", '' + (id) + '_modal_label', true, false)) + " aria-hidden=\"true\" class=\"modal fade\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"close\">×</button><h4" + (jade.attr("id", "" + (id) + "_modal_label", true, false)) + " class=\"modal-title\">" + (jade.escape((jade.interp = title) == null ? '' : jade.interp)) + "</h4></div><div class=\"modal-body\">");
if ( block)
{
buf.push(jade.escape(null == (jade.interp = block()) ? "" : jade.interp));
}
else
{
buf.push("<h1>PLEASE HAVE A BLOCK HERE</h1><h2>You forgot to put a block in the modal widget (id=" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + ")</h2>");
}
buf.push("</div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-primary\">" + (jade.escape((jade.interp = okLabelText) == null ? '' : jade.interp)) + "</button></div></div></div></div></div><script>Exercises.pop();</script>");
};
jade_mixins["crosswords"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var id = getUniqueId(options, block);
var options_JSON = JSON.stringify(options);
buf.push("<script>var ex_" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + " = Exercises.push(new Exercises.Crosswords(" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + ", '" + (((jade.interp = options_JSON) == null ? '' : jade.interp)) + "'));\n</script><div" + (jade.attr("id", "ex_" + (id) + "", true, false)) + " class=\"crosswords\">");
if ( block)
{
buf.push(jade.escape(null == (jade.interp = block()) ? "" : jade.interp));
}
buf.push("</div><script>Exercises.pop();</script>");
};
jade_mixins["calcuwords"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var id = getUniqueId(options, block);
var options_JSON = JSON.stringify(options);
buf.push("<script>var ex_" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + " = Exercises.push(new Exercises.Calcuwords(" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + ", '" + (((jade.interp = options_JSON) == null ? '' : jade.interp)) + "'));</script><div" + (jade.attr("id", "ex_" + (id) + "", true, false)) + " class=\"calcuwords\">");
if ( block)
{
buf.push(jade.escape(null == (jade.interp = block()) ? "" : jade.interp));
}
buf.push("</div><script>Exercises.pop();</script>");
};
jade_mixins["split-in-syllables"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var id = getUniqueId(options, block);
var options_JSON = JSON.stringify(options);
var title = options.title || 'Split';
var okLabelText = options.okLabelText || 'OK'
buf.push("<script>var ex_" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + " = Exercises.push(new Exercises.SplitInSyllables(" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + ", '" + (((jade.interp = options_JSON) == null ? '' : jade.interp)) + "'));\n</script><div" + (jade.attr("id", "ex_" + (id) + "", true, false)) + " class=\"split-in-syllables\">");
if ((options && options.isModal))
{
buf.push("<div" + (jade.attr("id", "ex_" + (id) + "_modal", true, false)) + " tabindex=\"-1\" role=\"dialog\"" + (jade.attr("aria-labelledby", '' + (id) + '_modal_label', true, false)) + " aria-hidden=\"true\" class=\"modal fade\"><div class=\"modal-dialog modal-sm\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"close\">×</button><span class=\"replaceable\"><h4" + (jade.attr("id", "" + (id) + "_modal_label", true, false)) + " class=\"modal-title\">" + (jade.escape((jade.interp = title) == null ? '' : jade.interp)) + "</h4></span></div><div class=\"modal-body\">");
if ( block)
{
buf.push(jade.escape(null == (jade.interp = block()) ? "" : jade.interp));
}
buf.push("</div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-primary\">" + (jade.escape((jade.interp = okLabelText) == null ? '' : jade.interp)) + "</button></div></div></div></div>");
}
else
{
if ( block)
{
buf.push(jade.escape(null == (jade.interp = block()) ? "" : jade.interp));
}
}
buf.push("</div><script>Exercises.pop();</script>");
};
jade_mixins["combine-syllables"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
options = options || {}
var id = getUniqueId(options, block);
var options_JSON = JSON.stringify(options);
buf.push("<script>var ex_" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + " = Exercises.push(new Exercises.CombineSyllables(" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + ", '" + (((jade.interp = options_JSON) == null ? '' : jade.interp)) + "'));\n</script><div" + (jade.attr("id", "ex_" + (id) + "", true, false)) + " class=\"combine-syllables\"><div class=\"block\">");
if ( block)
{
buf.push(jade.escape(null == (jade.interp = block()) ? "" : jade.interp));
}
buf.push("</div></div><script>Exercises.pop();</script>");
};
jade_mixins["connect-points"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
options = options || {}
var id = getUniqueId(options, block);
var options_JSON = JSON.stringify(options);
buf.push("<script>var ex_" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + " = Exercises.push(new Exercises.ConnectPoints(" + (jade.escape((jade.interp = id) == null ? '' : jade.interp)) + ", '" + (((jade.interp = options_JSON) == null ? '' : jade.interp)) + "'));\n</script><div" + (jade.attr("id", "ex_" + (id) + "", true, false)) + " class=\"connect-points\"><div class=\"block\">");
if ( block)
{
buf.push(jade.escape(null == (jade.interp = block()) ? "" : jade.interp));
}
buf.push("</div></div><script>Exercises.pop();</script>");
};
jade_mixins["notifications-pane"] = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
jade_mixins["notification-list"]();
};
jade_mixins["notifications-pane-tab"] = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<a href=\"#tab-notifications\" role=\"tab\" data-toggle=\"tab\"><i class=\"fa fa-fw fa-bell\"></i><span data-translate=\"backstageTabNotifications\"></span></a>");
};
jade_mixins["notification-list"] = function(notifications){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"notification-list\"><div class=\"clear-notifications backstage-button\"><i class=\"fa fa-fw fa-trash-o\"></i><span data-translate=\"backstageClearNotifications\"></span></div><div class=\"notifications\">");
if ( notifications && notifications.length)
{
// iterate notifications
;(function(){
  var $$obj = notifications;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var n = $$obj[$index];

jade_mixins["notification"](n);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var n = $$obj[$index];

jade_mixins["notification"](n);
    }

  }
}).call(this);

}
buf.push("</div></div>");
};
jade_mixins["notification"] = function(n){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div" + (jade.attr("id", "notification-" + (n.id) + "", true, false)) + (jade.cls(['notification',"" + ( (!n.icon) ? 'no-icon' : '' ) + ""], [null,true])) + ">");
if ( n.icon)
{
buf.push("<div class=\"icon\"><div" + (jade.cls(["fa fa-fw " + (n.icon) + ""], [true])) + "></div></div>");
}
buf.push("<div class=\"body\"><div class=\"message\">" + (jade.escape(null == (jade.interp = n.message) ? "" : jade.interp)) + "</div><div class=\"info\">" + (jade.escape(null == (jade.interp = n.info) ? "" : jade.interp)) + "</div><div class=\"time\">" + (jade.escape(null == (jade.interp = n.createdAt) ? "" : jade.interp)) + "</div></div></div>");
};
jade_mixins["toggle-switch"] = function(id){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div" + (jade.attr("id", '' + (id) + '', true, false)) + " class=\"onoffswitch\"><div class=\"onoffswitch-label\"><span class=\"onoffswitch-inner\"><span class=\"onoffswitch-active\"><span data-translate=\"ON\" class=\"onoffswitch-switch\"></span></span><span class=\"onoffswitch-inactive\"><span data-translate=\"OFF\" class=\"onoffswitch-switch\"></span></span></span></div></div>");
};
jade_mixins["settings-pane-tab"] = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<a href=\"#tab-settings\" role=\"tab\" data-toggle=\"tab\"><i class=\"fa fa-fw fa-cogs\"></i><span data-translate=\"backstageTabSettings\"></span></a>");
};
jade_mixins["settings-pane"] = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"setting\"><span data-translate=\"backstageSettingTeacherMode\" class=\"toggle-label\"></span>");
jade_mixins["toggle-switch"]('teacher-mode-toggle');
buf.push("</div><div class=\"setting teacher-visible\"><span data-translate=\"backstageSettingTeacherModeSublabel\" class=\"sublabel\"></span></div><div class=\"additional-settings\"></div><div class=\"setting canSaveRestore clear-fix\"><span data-translate=\"saveRestore\"></span><span data-translate=\"backupData\" class=\"clearfix sublabel\"></span><div id=\"backupData\" data-translate=\"backupButtonLabel\" class=\"backstage-button\"></div><span id=\"downloadLink\" class=\"clearfix\"></span><span data-translate=\"restoreData\" class=\"sublabel clearfix\"></span><div id=\"restoreOuterButton\" class=\"backstage-button\"><input id=\"restoreButton\" type=\"file\"/><span data-translate=\"uploadButtonLabel\"></span></div><!--Inline JS. urrrgh. TODO: Move this somewhere else--><script>if(typeof window.FileReader === 'undefined') {\n  $('.canSaveRestore').addClass('hidden');\n} else {\n  $('.canSaveRestore').removeClass('hidden');\n}\n\n$('#restoreOuterButton').click(function (e) {\n  $('#restoreButton').click();\n});\n\n$('#restoreButton').click(function (e) {\n  e.stopPropagation();\n});\n\n$('#restoreButton').change(function (e) {\n  var files = e.target.files;\n  var reader = new FileReader();\n  \n  reader.onload = function(e) {\n    try{\n      var data = JSON.parse(e.target.result);\n      _.each(data, function(v, k) {\n        window.App.storage.setItem(k, v);\n        window.location.reload();\n      });\n    }\n    catch (e) {\n      console.warn(e);\n      alert('Invalid file');\n    }\n  };\n  \n  reader.readAsText(files[0]);\n});\n\n$('#backupData').click(function () {\n  // application/octet-stream required for Safari to download instead\n  // of display\n  var bb = new Blob([JSON.stringify(window.App.stoage)], {type : 'application/octet-stream'});\n  var d = new Date();\n  var fileName = 'Backup-' + document.title.replace(/ /g, '-') + '-';\n  \n  fileName += d.getFullYear() + '-' +\n              ('0' + (d.getMonth()+1)).slice(-2) + '-' +\n              ('0' + d.getDate()).slice(-2) + '.txt';\n              \n  var a = document.createElement('a');\n  a.download = fileName;\n  a.href = URL.createObjectURL(bb);\n  a.draggable = true;\n  a.textContent = window.App.T('downloadButtonLabel');\n  \n  a.addEventListener('click', function() {\n    $(this).remove();\n  });\n  \n  var dl = $('#downloadLink');\n  dl.empty();\n  dl.append(a);\n  try {\n    a.click(); //Older firefox only supports click() on INPUT elements\n  } catch(e) {};\n});</script></div>");
};
jade_mixins["backstage"] = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"top-section\"><a href=\"../../index.html\" class=\"backstage-button\"><i class=\"fa fa-fw fa-book\"></i><span data-translate=\"backstageBackToLibrary\"></span></a><ul role=\"tablist\" class=\"backstage-tabs notif-tabs\"></ul></div><div class=\"tab-content\"></div>");
};
jade_mixins["login-pane"] = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"setting display-name\"><span>Display name</span><br/><span class=\"sublabel\">This will be how you'll show up in the classroom</span><input type=\"text\" id=\"classroom-display-name\" class=\"backstage-input\"/></div>");
};
jade_mixins["classroom-pane-tab"] = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<a href=\"#tab-classroom\" role=\"tab\" data-toggle=\"tab\"><i class=\"fa fa-fw fa-users\"></i><span data-translate=\"classroomTabName\"></span></a>");
};
jade_mixins["classroom-pane-disconnected"] = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"setting join-classroom\"><span class=\"sublabel\">Ask your teacher to create a classroom and give you the code</span><input type=\"text\" placeholder=\"Enter code here\" id=\"classroom-join-code\" class=\"backstage-input\"/><div id=\"classroom-join\" class=\"backstage-button\">Join classroom</div></div><div class=\"setting create-classroom\"><span class=\"sublabel\">Or if you're the teacher, you can create a classroom from here:</span><div id=\"classroom-create\" class=\"backstage-button\">Create classroom</div></div><div class=\"setting nearby\"></div>");
};
jade_mixins["classroom-nearby"] = function(opts){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"nearby-classrooms\">");
if ( opts.state || opts.locating)
{
buf.push("<div class=\"sublabel nearby-title\">Nearby classrooms:");
if ( opts.reloadable)
{
buf.push("<i class=\"fa fa-fw fa-refresh nearby-reload\"></i>");
}
buf.push("</div>");
if ( opts.locating)
{
buf.push("<div class=\"nearby-location sublabel state\"><i class=\"fa fa-fw fa-compass fa-spin\"></i><span>&nbsp;Getting your location so that you can discover nearby classrooms. Please give the book permission to read your location.</span></div>");
}
if ( opts.state === 'loading')
{
buf.push("<div class=\"nearby-searching sublabel state\"><i class=\"fa fa-fw fa-spinner fa-spin\"></i><span>&nbsp;Searching for nearby classrooms...</span></div>");
}
if ( opts.state === 'empty')
{
buf.push("<div class=\"nearby-empty sublabel state\"><span>No classrooms nearby.</span></div>");
}
if ( opts.state === 'error')
{
buf.push("<div class=\"nearby-error sublabel state\"><span>Error: " + (jade.escape((jade.interp = opts.error.message) == null ? '' : jade.interp)) + "</span></div>");
}
if ( opts.state === 'loaded')
{
buf.push("<div class=\"nearby-list state\">");
// iterate opts.classrooms
;(function(){
  var $$obj = opts.classrooms;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var classroom = $$obj[$index];

var dist = classroom.distance;
if (dist >= 1000) {
dist = Math.round(dist/1000).toString() + ' km';
} else {
dist = Math.round(dist).toString() + ' m';
}
buf.push("<div" + (jade.attr("data-joinid", classroom.id, true, false)) + " class=\"nearby-classroom\"><div class=\"title\">" + (jade.escape(null == (jade.interp = classroom.id) ? "" : jade.interp)) + "</div><div class=\"subtitle\">" + (jade.escape(null == (jade.interp = dist) ? "" : jade.interp)) + "</div><div class=\"backstage-button\">Join</div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var classroom = $$obj[$index];

var dist = classroom.distance;
if (dist >= 1000) {
dist = Math.round(dist/1000).toString() + ' km';
} else {
dist = Math.round(dist).toString() + ' m';
}
buf.push("<div" + (jade.attr("data-joinid", classroom.id, true, false)) + " class=\"nearby-classroom\"><div class=\"title\">" + (jade.escape(null == (jade.interp = classroom.id) ? "" : jade.interp)) + "</div><div class=\"subtitle\">" + (jade.escape(null == (jade.interp = dist) ? "" : jade.interp)) + "</div><div class=\"backstage-button\">Join</div></div>");
    }

  }
}).call(this);

buf.push("</div>");
}
}
buf.push("</div>");
};
jade_mixins["classroom-pane-connecting"] = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"setting\"><i class=\"fa fa-spinner fa-spin\"></i><span>&nbsp;Connecting...</span></div><div class=\"setting\"><div id=\"classroom-disconnect\" class=\"backstage-button\"><i class=\"fa fa-fw fa-ban\"></i>Cancel</div></div>");
};
jade_mixins["classroom-client"] = function(client, opts){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var title = client.name || client.id;
var classes = client.away ? 'classroom-client-away' : '';
buf.push("<div" + (jade.attr("data-id", client.id, true, false)) + (jade.cls(['classroom-client',classes], [null,true])) + ">");
if ( opts.isTeacher)
{
buf.push("<i class=\"fa fa-fw fa-graduation-cap\"></i>");
}
else
{
buf.push("<i class=\"fa fa-fw fa-user\"></i>");
}
buf.push("<span>&nbsp;</span><span>" + (jade.escape(null == (jade.interp = title) ? "" : jade.interp)) + "</span><span class=\"away-label\">&nbsp;(Away)</span>");
if ( opts.isTeacher)
{
buf.push("<span class=\"teacher-label\">&nbsp;(Teacher)</span>");
}
buf.push("<div class=\"ring-bell classroom-teacher-visible\"><i class=\"fa fa-bell\"></i></div></div>");
};
jade_mixins["classroom-fullscreen-info"] = function(opts){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"classroom-info classroom-info-fullscreen\"><i class=\"fa fa-times close-icon\"></i><div class=\"classroom-info-inner\"><div class=\"classroom-info-label\">Connected to classroom</div>");
if ( opts.classroom.display.external)
{
buf.push("<div class=\"classroom-info-big\">" + (jade.escape(null == (jade.interp = opts.classroom.display.external) ? "" : jade.interp)) + "</div>");
if ( opts.classroom.display.local)
{
buf.push("<div class=\"classroom-info-small\">" + (jade.escape(null == (jade.interp = opts.classroom.display.local) ? "" : jade.interp)) + "</div>");
}
}
else
{
buf.push("<div class=\"classroom-info-big\">" + (jade.escape(null == (jade.interp = opts.classroom.display.local) ? "" : jade.interp)) + "</div>");
}
buf.push("</div></div>");
};
jade_mixins["classroom-pane-connected"] = function(opts){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"setting\"><div class=\"sublabel\">Connected to classroom:</div><table><tr class=\"classroom-info-tr\"><td class=\"classroom-info\">");
if ( opts.classroom.display.external)
{
buf.push("<div class=\"classroom-info-big\">" + (jade.escape(null == (jade.interp = opts.classroom.display.external) ? "" : jade.interp)) + "</div>");
if ( opts.classroom.display.local)
{
buf.push("<div class=\"classroom-info-small\">" + (jade.escape(null == (jade.interp = opts.classroom.display.local) ? "" : jade.interp)) + "</div>");
}
}
else
{
buf.push("<div class=\"classroom-info-big\">" + (jade.escape(null == (jade.interp = opts.classroom.display.local) ? "" : jade.interp)) + "</div>");
}
buf.push("</td><td class=\"classroom-info-buttons\"><div id=\"classroom-disconnect\" class=\"backstage-button\"><i class=\"fa fa-fw fa-sign-out\"></i>Leave</div><div id=\"classroom-fullscreen\" class=\"backstage-button\"><i class=\"fa fa-fw fa-desktop\"></i>Big code</div></td></tr></table></div><div class=\"setting\"><span class=\"sublabel\">Work group:</span><ul class=\"backstage-tabs backstage-tabs-5 group-tabs\"><li data-group=\"0\"><a class=\"group-none\"><div class=\"placeholder\">N</div><i class=\"fa fa-ban\"></i></a></li><li data-group=\"1\"><a><div>A</div></a></li><li data-group=\"2\"><a><div>B</div></a></li><li data-group=\"3\"><a><div>C</div></a></li><li data-group=\"4\"><a><div>D</div></a></li></ul></div><div class=\"setting classroom-clients-label\"><span class=\"sublabel\">Classmates:</span></div><div class=\"classroom-client\"><i class=\"fa fa-fw fa-graduation-cap classroom-teacher-visible\"></i><i class=\"fa fa-fw fa-user classroom-teacher-invisible\"></i><span>&nbsp;</span><input class=\"backstage-input name-input\"/><span class=\"teacher-label\">&nbsp;(You)</span></div><div class=\"classroom-clients\"></div>");
};
jade_mixins["classroom-teacher-control-panel"] = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<a class=\"menu-item menu-item-left teacher-panel-locknav\"><div class=\"teacher-panel-popover\"><span>Lock everybody on the same page as you</span></div><div class=\"teacher-panel-toggle-on\"><i class=\"fa fa-lock menu-item-contents\"></i></div><div class=\"teacher-panel-toggle-off\"><i class=\"fa fa-unlock menu-item-contents\"></i></div></a><a class=\"menu-item menu-item-left teacher-panel-scroll\"><div class=\"teacher-panel-popover\"><span>Scroll everybody to your position</span></div><i class=\"fa fa-crosshairs menu-item-contents\"></i></a>");
};
jade_mixins["toggle-switch"] = function(id){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div" + (jade.attr("id", '' + (id) + '', true, false)) + " class=\"onoffswitch\"><div class=\"onoffswitch-label\"><span class=\"onoffswitch-inner\"><span class=\"onoffswitch-active\"><span data-translate=\"ON\" class=\"onoffswitch-switch\"></span></span><span class=\"onoffswitch-inactive\"><span data-translate=\"OFF\" class=\"onoffswitch-switch\"></span></span></span></div></div>");
};
  return jade_mixins;
});