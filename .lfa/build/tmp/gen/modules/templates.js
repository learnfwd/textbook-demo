(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof root === 'undefined' || root !== Object(root)) {
        throw new Error('templatizer: window does not exist or is not an object');
    } else {
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function e(e){return null!=e&&""!==e}function n(t){return(Array.isArray(t)?t.map(n):t&&"object"==typeof t?Object.keys(t).filter(function(e){return t[e]}):[t]).filter(e).join(" ")}var t={};return t.merge=function r(n,t){if(1===arguments.length){for(var a=n[0],i=1;i<n.length;i++)a=r(a,n[i]);return a}var o=n["class"],s=t["class"];(o||s)&&(o=o||[],s=s||[],Array.isArray(o)||(o=[o]),Array.isArray(s)||(s=[s]),n["class"]=o.concat(s).filter(e));for(var l in t)"class"!=l&&(n[l]=t[l]);return n},t.joinClasses=n,t.cls=function(e,r){for(var a=[],i=0;i<e.length;i++)a.push(r&&r[i]?t.escape(n([e[i]])):n(e[i]));var o=n(a);return o.length?' class="'+o+'"':""},t.style=function(e){return e&&"object"==typeof e?Object.keys(e).map(function(n){return n+":"+e[n]}).join(";"):e},t.attr=function(e,n,r,a){return"style"===e&&(n=t.style(n)),"boolean"==typeof n||null==n?n?" "+(a?e:e+'="'+e+'"'):"":0==e.indexOf("data")&&"string"!=typeof n?(-1!==JSON.stringify(n).indexOf("&")&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),n&&"function"==typeof n.toISOString&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+e+"='"+JSON.stringify(n).replace(/'/g,"&apos;")+"'"):r?(n&&"function"==typeof n.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+e+'="'+t.escape(n)+'"'):(n&&"function"==typeof n.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+e+'="'+n+'"')},t.attrs=function(e,r){var a=[],i=Object.keys(e);if(i.length)for(var o=0;o<i.length;++o){var s=i[o],l=e[s];"class"==s?(l=n(l))&&a.push(" "+s+'="'+l+'"'):a.push(t.attr(s,l,!1,r))}return a.join("")},t.escape=function(e){var n=String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+e?e:n},t.rethrow=function a(e,n,t,r){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||r))throw e.message+=" on line "+t,e;try{r=r||(function () { throw new Error("No such module"); })().readFileSync(n,"utf8")}catch(i){a(e,null,t)}var o=3,s=r.split("\n"),l=Math.max(t-o,0),f=Math.min(s.length,t+o),o=s.slice(l,f).map(function(e,n){var r=n+l+1;return(r==t?"  > ":"    ")+r+"| "+e}).join("\n");throw e.path=n,e.message=(n||"Jade")+":"+t+"\n"+o+"\n\n"+e.message,e},t}();

    var templatizer = {};


    // error-message.jade compiled template
    templatizer["error-message"] = function tmpl_error_message() {
        return "<p>If you're seeing this, either you have to wait for things to finish loading, or something went wrong.</p>";
    };

    // toc.jade compiled template
    templatizer["toc"] = function tmpl_toc(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        return buf.join("");
    };

    // toc.jade:toc compiled template
    templatizer["toc"]["toc"] = function tmpl_toc_toc(chapters) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push('<ul class="tableofcontents">');
        (function() {
            var $obj = chapters;
            if ("number" == typeof $obj.length) {
                for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                    var chapter = $obj[$index];
                    buf.push("<li" + jade.attr("data-url", "" + chapter.url + "", true, false) + ' class="fold">');
                    var hasChildren = chapter.children && chapter.children.length;
                    if (chapter.locals.subtitle) {
                        buf.push("<a" + jade.attr("href", "#book/" + chapter.url + "", true, false) + jade.cls([ "subtitled", hasChildren ? "foldable" : "" ], [ null, true ]) + '><span class="title">' + jade.escape(null == (jade_interp = chapter.locals.title) ? "" : jade_interp) + '</span><span class="subtitle">' + jade.escape(null == (jade_interp = chapter.locals.subtitle) ? "" : jade_interp) + "</span></a>");
                    } else {
                        buf.push("<a" + jade.attr("href", "#book/" + chapter.url + "", true, false) + jade.cls([ hasChildren ? "foldable" : "" ], [ true ]) + '><span class="title">' + jade.escape(null == (jade_interp = chapter.locals.title) ? "" : jade_interp) + "</span></a>");
                    }
                    if (hasChildren) {
                        buf.push('<div class="fold-button"><i class="fold-icon fa fa-fw fa-chevron-down"></i></div><div class="children-container">');
                        buf.push(templatizer["toc"]["toc"](chapter.children));
                        buf.push("</div>");
                    }
                    buf.push("</li>");
                }
            } else {
                var $l = 0;
                for (var $index in $obj) {
                    $l++;
                    var chapter = $obj[$index];
                    buf.push("<li" + jade.attr("data-url", "" + chapter.url + "", true, false) + ' class="fold">');
                    var hasChildren = chapter.children && chapter.children.length;
                    if (chapter.locals.subtitle) {
                        buf.push("<a" + jade.attr("href", "#book/" + chapter.url + "", true, false) + jade.cls([ "subtitled", hasChildren ? "foldable" : "" ], [ null, true ]) + '><span class="title">' + jade.escape(null == (jade_interp = chapter.locals.title) ? "" : jade_interp) + '</span><span class="subtitle">' + jade.escape(null == (jade_interp = chapter.locals.subtitle) ? "" : jade_interp) + "</span></a>");
                    } else {
                        buf.push("<a" + jade.attr("href", "#book/" + chapter.url + "", true, false) + jade.cls([ hasChildren ? "foldable" : "" ], [ true ]) + '><span class="title">' + jade.escape(null == (jade_interp = chapter.locals.title) ? "" : jade_interp) + "</span></a>");
                    }
                    if (hasChildren) {
                        buf.push('<div class="fold-button"><i class="fold-icon fa fa-fw fa-chevron-down"></i></div><div class="children-container">');
                        buf.push(templatizer["toc"]["toc"](chapter.children));
                        buf.push("</div>");
                    }
                    buf.push("</li>");
                }
            }
        }).call(this);
        buf.push("</ul>");
        return buf.join("");
    };

    return templatizer;
}));