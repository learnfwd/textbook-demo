/**
 * Full screen exercise contianer
 */
define([
  'jquery',
  '../js/exercise',
], function ($, Exercises) {
  var Modal = Exercises.Exercise.extend({
      type: 'Modal',

      newButton: function() {
        return $('<button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#ex_' +
          this.id +
          '_modal">' +
            (this.options.triggerLabelText || 'Show') +
          '</button>');
      },

      addTriggerClasses: function() {
        var self = this;
        this.$trigger.each(function(index) {
          self.$trigger.eq(index)
            .attr('data-toggle', 'modal')
            .attr('data-target', '#ex_' + self.id + '_modal');
        });
      },

      componentDidMount: function() {
        this.$preview = this.$el.find('.preview').detach();
        this.$el.append(this.$preview);
        this.$trigger = this.$el.find('.trigger');

        if(this.$trigger.length > 0) {
          this.addTriggerClasses();
        }
        else {
          this.$trigger = this.newButton();
        }

        this.$el.append(this.$trigger);
      }
    });

  Exercises.Modal = Modal;

  return Exercises;
});