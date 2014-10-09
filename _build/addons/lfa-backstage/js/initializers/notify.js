define(function (require, exports, modules) {
  var App = require('app');

  $.notify.defaults({
    clickToHide: true,
    autoHide: true,
    autoHideDelay: 3000,
    arrowShow: false,
    arrowSize: 5,
    elementPosition: 'left',
    globalPosition: 'top right',
    style: 'lfa',
    className: 'info',
    showAnimation: 'slideDown',
    showDuration: 400,
    hideAnimation: 'slideUp',
    hideDuration: 200,
    gap: 2
  });

  $.notify.addStyle('lfa', {
    html: '<div>\n<span data-notify-text></span>\n</div>',
    classes: {
      base: {
        'font-weight': 'bold',
        'padding': '8px 15px 8px 14px',
        'background': '#222',
        'white-space': 'nowrap',
        'padding-left': '25px',
        'color': '#fff',
        'cursor': 'pointer',
        'font-family': '"Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans-serif',
      },
      error: {
      },
      success: {
      },
      info: {
      },
      warn: {
      }
    }
  });

  // defined in CSS file
  $.notify.addStyle('lfa-small', {
    html: '<div>\n<div><span data-notify-text></span>\n</div></div>',
    classes: {
      base: {
      },
      error: {
      },
      success: {
      },
      info: {
      },
      warn: {
      }
    }
  });

  // FIXME: change this to Avatar's $el!
  var $avatar = $('#rightbar-toggle');

  App.on('avatar:say', function (message, options) {
    var isSmall = (window.innerWidth <= 768);
    $avatar.notify(message, _.extend({
      style: isSmall ? 'lfa-small' : 'lfa',
      elementPosition: isSmall ? 'left top' : 'left'
    }, options));
  });
});
