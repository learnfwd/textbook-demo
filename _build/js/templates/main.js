define(function(require){
  window.jade = require('lfa/js/lib/jade-helpers.js');
  window.jade_mixins = require('js/templates/mixins.js');

  var templates = {};
  templates = require('js/templates/index.js');
  return templates;
});