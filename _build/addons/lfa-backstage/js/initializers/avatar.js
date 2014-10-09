define(function (require, exports, module) {  
  var AvatarView = require('../views/avatar-view');
  var avatar = new AvatarView();
  $('#rightbar-toggle').empty().html(avatar.el);

  module.exports = avatar;

  // FIXME: This should show the avatar only
  window.App.on('avatar:mood', function () {
    $('.menu.unpinned').removeClass('unpinned');
  });

});
