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
        return '<div class="page-loader full"><div class="page-loader-container"><div class="page-loader-loading"><i class="fa fa-fw fa-3x fa-spinner fa-spin page-loader-spinner"></i></div><div onclick="window.location.reload()" class="page-loader-failed"><i class="fa fa-fw fa-3x fa-exclamation-circle page-loader-failed-icon"></i><i class="fa fa-fw fa-3x fa-refresh page-loader-reload-icon"></i></div></div></div>';
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

    // classroom.jade compiled template
    templatizer["classroom"] = function tmpl_classroom(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        return buf.join("");
    };

    // classroom.jade:classroom-pane-tab compiled template
    templatizer["classroom"]["classroom-pane-tab"] = function tmpl_classroom_classroom_pane_tab() {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push('<a href="#tab-classroom" role="tab" data-toggle="tab"><i class="fa fa-fw fa-users"></i><span data-translate="classroomTabName"></span></a>');
        return buf.join("");
    };


    // classroom.jade:classroom-pane-disconnected compiled template
    templatizer["classroom"]["classroom-pane-disconnected"] = function tmpl_classroom_classroom_pane_disconnected() {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push('<div class="setting join-classroom"><span class="sublabel">Ask your teacher to create a classroom and give you the code</span><input type="text" placeholder="Enter code here" id="classroom-join-code" class="backstage-input"/><div id="classroom-join" class="backstage-button">Join classroom</div></div><div class="setting create-classroom"><span class="sublabel">Or if you\'re the teacher, you can create a classroom from here:</span><div id="classroom-create" class="backstage-button">Create classroom</div></div><div class="setting nearby"></div>');
        return buf.join("");
    };


    // classroom.jade:classroom-nearby compiled template
    templatizer["classroom"]["classroom-nearby"] = function tmpl_classroom_classroom_nearby(opts) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push('<div class="nearby-classrooms">');
        if (opts.state) {
            buf.push('<div class="sublabel nearby-title"> \nNearby classrooms:');
            if (opts.reloadable) {
                buf.push('<i class="fa fa-fw fa-refresh nearby-reload"></i>');
            }
            buf.push("</div>");
            if (opts.state === "loading") {
                buf.push('<div class="nearby-searching sublabel state"><i class="fa fa-fw fa-spinner fa-spin"></i><span>&nbsp;Searching for nearby classrooms...</span></div>');
            }
            if (opts.state === "empty") {
                buf.push('<div class="nearby-empty sublabel state"><span>No classrooms nearby.</span></div>');
            }
            if (opts.state === "error") {
                buf.push('<div class="nearby-error sublabel state"><span>Error: ' + jade.escape((jade_interp = opts.error.message) == null ? "" : jade_interp) + "</span></div>");
            }
            if (opts.state === "loaded") {
                buf.push('<div class="nearby-list state">');
                (function() {
                    var $obj = opts.classrooms;
                    if ("number" == typeof $obj.length) {
                        for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                            var classroom = $obj[$index];
                            buf.push("<div" + jade.attr("data-joinid", classroom.id, true, false) + ' class="nearby-classroom"><div class="title">' + jade.escape(null == (jade_interp = classroom.id) ? "" : jade_interp) + '</div><div class="backstage-button">Join</div></div>');
                        }
                    } else {
                        var $l = 0;
                        for (var $index in $obj) {
                            $l++;
                            var classroom = $obj[$index];
                            buf.push("<div" + jade.attr("data-joinid", classroom.id, true, false) + ' class="nearby-classroom"><div class="title">' + jade.escape(null == (jade_interp = classroom.id) ? "" : jade_interp) + '</div><div class="backstage-button">Join</div></div>');
                        }
                    }
                }).call(this);
                buf.push("</div>");
            }
        }
        buf.push("</div>");
        return buf.join("");
    };


    // classroom.jade:classroom-pane-connecting compiled template
    templatizer["classroom"]["classroom-pane-connecting"] = function tmpl_classroom_classroom_pane_connecting() {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push('<div class="setting"><i class="fa fa-spinner fa-spin"></i><span>&nbsp;Connecting...</span></div><div class="setting"><div id="classroom-disconnect" class="backstage-button"><i class="fa fa-fw fa-ban"></i>Cancel</div></div>');
        return buf.join("");
    };


    // classroom.jade:classroom-client compiled template
    templatizer["classroom"]["classroom-client"] = function tmpl_classroom_classroom_client(client, opts) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        var title = client.name || client.id;
        var classes = client.away ? "classroom-client-away" : "";
        buf.push("<div" + jade.attr("data-id", client.id, true, false) + jade.cls([ "classroom-client", classes ], [ null, true ]) + ">");
        if (opts.isTeacher) {
            buf.push('<i class="fa fa-fw fa-graduation-cap"></i>');
        } else {
            buf.push('<i class="fa fa-fw fa-user"></i>');
        }
        buf.push("<span>&nbsp;</span><span>" + jade.escape(null == (jade_interp = title) ? "" : jade_interp) + '</span><span class="away-label">&nbsp;(Away)</span>');
        if (opts.isTeacher) {
            buf.push('<span class="teacher-label">&nbsp;(Teacher)</span>');
        }
        buf.push('<div class="ring-bell classroom-teacher-visible"><i class="fa fa-bell"></i></div></div>');
        return buf.join("");
    };


    // classroom.jade:classroom-fullscreen-info compiled template
    templatizer["classroom"]["classroom-fullscreen-info"] = function tmpl_classroom_classroom_fullscreen_info(opts) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push('<div class="classroom-info classroom-info-fullscreen"><i class="fa fa-times close-icon"></i><div class="classroom-info-inner"><div class="classroom-info-label">Connected to classroom</div>');
        if (opts.classroom.display.external) {
            buf.push('<div class="classroom-info-big">' + jade.escape(null == (jade_interp = opts.classroom.display.external) ? "" : jade_interp) + "</div>");
            if (opts.classroom.display.local) {
                buf.push('<div class="classroom-info-small">' + jade.escape(null == (jade_interp = opts.classroom.display.local) ? "" : jade_interp) + "</div>");
            }
        } else {
            buf.push('<div class="classroom-info-big">' + jade.escape(null == (jade_interp = opts.classroom.display.local) ? "" : jade_interp) + "</div>");
        }
        buf.push("</div></div>");
        return buf.join("");
    };


    // classroom.jade:classroom-pane-connected compiled template
    templatizer["classroom"]["classroom-pane-connected"] = function tmpl_classroom_classroom_pane_connected(opts) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push('<div class="setting"><div class="sublabel">Connected to classroom:</div><table><tr class="classroom-info-tr"><td class="classroom-info">');
        if (opts.classroom.display.external) {
            buf.push('<div class="classroom-info-big">' + jade.escape(null == (jade_interp = opts.classroom.display.external) ? "" : jade_interp) + "</div>");
            if (opts.classroom.display.local) {
                buf.push('<div class="classroom-info-small">' + jade.escape(null == (jade_interp = opts.classroom.display.local) ? "" : jade_interp) + "</div>");
            }
        } else {
            buf.push('<div class="classroom-info-big">' + jade.escape(null == (jade_interp = opts.classroom.display.local) ? "" : jade_interp) + "</div>");
        }
        buf.push('</td><td class="classroom-info-buttons"><div id="classroom-disconnect" class="backstage-button"><i class="fa fa-fw fa-sign-out"></i>Leave</div><div id="classroom-fullscreen" class="backstage-button"><i class="fa fa-fw fa-desktop"></i>Big code</div><div id="classroom-teacher-bell" class="backstage-button classroom-teacher-visible"><i class="fa fa-fw fa-bell"></i>Bell</div></td></tr></table></div><div class="setting"><span class="sublabel">Work group:</span><ul class="backstage-tabs backstage-tabs-5 group-tabs"><li data-group="0"><a class="group-none"><div class="placeholder">N</div><i class="fa fa-ban"></i></a></li><li data-group="1"><a><div>A</div></a></li><li data-group="2"><a><div>B</div></a></li><li data-group="3"><a><div>C</div></a></li><li data-group="4"><a><div>D</div></a></li></ul></div><div class="setting classroom-teacher-visible"><div id="classroom-shuffle-groups" class="backstage-button"><i class="fa fa-random"></i><span>&nbsp;</span><span>Shuffle groups</span></div></div><div class="classroom-name-lock-setting"></div><div class="setting classroom-clients-label"><span class="sublabel">Classmates:</span></div><div class="classroom-client"><i class="fa fa-fw fa-graduation-cap classroom-teacher-visible"></i><i class="fa fa-fw fa-user classroom-teacher-invisible"></i><span>&nbsp;</span><span class="classroom-name-input"></span><span class="teacher-label">&nbsp;(You)</span></div><div class="classroom-clients"></div>');
        return buf.join("");
    };


    // classroom.jade:classroom-teacher-control-panel compiled template
    templatizer["classroom"]["classroom-teacher-control-panel"] = function tmpl_classroom_classroom_teacher_control_panel() {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push('<a class="menu-item menu-item-left teacher-panel-locknav"><div class="teacher-panel-popover"><span>Make everybody follow your page turns </span></div><div class="teacher-panel-toggle-on"><i class="fa fa-chain menu-item-contents"></i></div><div class="teacher-panel-toggle-off"><i class="fa fa-chain-broken menu-item-contents"></i></div></a><a class="menu-item menu-item-left teacher-panel-scroll"><div class="teacher-panel-popover"><span>Scroll everybody to your position</span></div><i class="fa fa-crosshairs menu-item-contents"></i></a><div class="classroom-code-display-container"></div>');
        return buf.join("");
    };


    // classroom.jade:toggle-switch compiled template
    templatizer["classroom"]["toggle-switch"] = function tmpl_classroom_toggle_switch(id) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push("<div" + jade.attr("id", "" + id + "", true, false) + ' class="onoffswitch"><div class="onoffswitch-label"><span class="onoffswitch-inner"><span class="onoffswitch-active"><span data-translate="ON" class="onoffswitch-switch"></span></span><span class="onoffswitch-inactive"><span data-translate="OFF" class="onoffswitch-switch"></span></span></span></div></div>');
        return buf.join("");
    };

    // backstage.jade compiled template
    templatizer["backstage"] = function tmpl_backstage(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        return buf.join("");
    };

    // backstage.jade:backstage compiled template
    templatizer["backstage"]["backstage"] = function tmpl_backstage_backstage() {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push('<div class="top-section"><a href="#book/z-help-00-help" class="backstage-button"><i class="fa fa-fw fa-question"></i><span data-translate="backstageHelpButton"></span></a><ul role="tablist" class="backstage-tabs notif-tabs"></ul></div><div class="tab-content"></div>');
        return buf.join("");
    };

    // notifications-pane.jade compiled template
    templatizer["notifications-pane"] = function tmpl_notifications_pane(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        return buf.join("");
    };

    // notifications-pane.jade:notifications-pane compiled template
    templatizer["notifications-pane"]["notifications-pane"] = function tmpl_notifications_pane_notifications_pane() {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push(templatizer["notifications-pane"]["notification-list"]());
        return buf.join("");
    };


    // notifications-pane.jade:notifications-pane-tab compiled template
    templatizer["notifications-pane"]["notifications-pane-tab"] = function tmpl_notifications_pane_notifications_pane_tab() {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push('<a href="#tab-notifications" role="tab" data-toggle="tab"><i class="fa fa-fw fa-bell"></i><span data-translate="backstageTabNotifications"></span></a>');
        return buf.join("");
    };


    // notifications-pane.jade:notification-list compiled template
    templatizer["notifications-pane"]["notification-list"] = function tmpl_notifications_pane_notification_list(notifications) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push('<div class="notification-list"><div class="clear-notifications backstage-button"><i class="fa fa-fw fa-trash-o"></i><span data-translate="backstageClearNotifications"></span></div><div class="notifications">');
        if (notifications && notifications.length) {
            (function() {
                var $obj = notifications;
                if ("number" == typeof $obj.length) {
                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                        var n = $obj[$index];
                        buf.push(templatizer["notifications-pane"]["notification"](n));
                    }
                } else {
                    var $l = 0;
                    for (var $index in $obj) {
                        $l++;
                        var n = $obj[$index];
                        buf.push(templatizer["notifications-pane"]["notification"](n));
                    }
                }
            }).call(this);
        }
        buf.push("</div></div>");
        return buf.join("");
    };


    // notifications-pane.jade:notification compiled template
    templatizer["notifications-pane"]["notification"] = function tmpl_notifications_pane_notification(n) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push("<div" + jade.attr("id", "notification-" + n.id + "", true, false) + jade.cls([ "notification", "" + (!n.icon ? "no-icon" : "") + "" ], [ null, true ]) + ">");
        if (n.icon) {
            buf.push('<div class="icon"><div' + jade.cls([ "fa fa-fw " + n.icon + "" ], [ true ]) + "></div></div>");
        }
        buf.push('<div class="body"><div class="message">' + jade.escape(null == (jade_interp = n.message) ? "" : jade_interp) + '</div><div class="info">' + jade.escape(null == (jade_interp = n.info) ? "" : jade_interp) + '</div><div class="time">' + jade.escape(null == (jade_interp = n.createdAt) ? "" : jade_interp) + "</div></div></div>");
        return buf.join("");
    };

    // settings-pane.jade compiled template
    templatizer["settings-pane"] = function tmpl_settings_pane(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        return buf.join("");
    };

    // settings-pane.jade:toggle-switch compiled template
    templatizer["settings-pane"]["toggle-switch"] = function tmpl_settings_pane_toggle_switch(id) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push("<div" + jade.attr("id", "" + id + "", true, false) + ' class="onoffswitch"><div class="onoffswitch-label"><span class="onoffswitch-inner"><span class="onoffswitch-active"><span data-translate="ON" class="onoffswitch-switch"></span></span><span class="onoffswitch-inactive"><span data-translate="OFF" class="onoffswitch-switch"></span></span></span></div></div>');
        return buf.join("");
    };


    // settings-pane.jade:settings-pane-tab compiled template
    templatizer["settings-pane"]["settings-pane-tab"] = function tmpl_settings_pane_settings_pane_tab() {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push('<a href="#tab-settings" role="tab" data-toggle="tab"><i class="fa fa-fw fa-cogs"></i><span data-translate="backstageTabSettings"></span></a>');
        return buf.join("");
    };


    // settings-pane.jade:settings-pane compiled template
    templatizer["settings-pane"]["settings-pane"] = function tmpl_settings_pane_settings_pane() {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push('<div class="setting"><span data-translate="backstageSettingTvMode" class="toggle-label"></span>');
        buf.push(templatizer["settings-pane"]["toggle-switch"]("tv-mode-toggle"));
        buf.push('</div><div class="setting setting-small"><span data-translate="backstageSettingTvModeSublabel" class="sublabel"></span></div><div class="setting"><span data-translate="backstageSettingTeacherMode" class="toggle-label"></span>');
        buf.push(templatizer["settings-pane"]["toggle-switch"]("teacher-mode-toggle"));
        buf.push('</div><div class="setting setting-small"><span data-translate="backstageSettingTeacherModeSublabel" class="sublabel"></span></div><div class="additional-settings"></div><div class="setting save-restore clear-fix"><span data-translate="saveRestore"></span><span data-translate="backupData" class="clearfix sublabel"></span><div class="backstage-button backup-button"><i class="fa fa-download"></i><span>&nbsp;</span><span data-translate="backupButtonLabel"></span></div><span class="clearfix download-link"></span><span data-translate="restoreData" class="sublabel clearfix"></span><div class="backstage-button restore-button"><input type="file" class="restore-input"/><i class="fa fa-upload"></i><span>&nbsp;</span><span data-translate="uploadButtonLabel"></span></div></div>');
        return buf.join("");
    };

    return templatizer;
}));