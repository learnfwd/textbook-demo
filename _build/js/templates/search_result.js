define(function(){ return function template(locals) {
window.buf = [];var self = locals || {};
buf.push("<li><a" + (jade.attr("href", "#book/" + (locals.url) + "", true, false)) + "><span class=\"title\">" + (jade.escape(null == (jade.interp = locals.title) ? "" : jade.interp)) + "</span><span class=\"body\">" + (jade.escape(null == (jade.interp = locals.body.substring(0, 50)) ? "" : jade.interp)) + "</span></a></li>");;return buf.join("");
}});