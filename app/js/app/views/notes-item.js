(function () {
  'use strict';

  // Notes Item View
  // ---------------
  App.Views.NotesItem = Backbone.View.extend({

    id: function () { return this.model.id; },

    tagName: 'tr',

    template: _.template(App.Templates["template-notes-item"]),

    events: {
      "click .note-view":   function () { this.viewNote(); },
      "click .note-edit":   function () { this.editNote(); },
      "click .note-delete": function () { this.deleteNote(); }
    },

    initialize: function (attrs, opts) {

      opts || (opts = {});
      this.router = opts.router || app.router;

      this.listenTo(this.model, {
        "change":   function () { this.render(); },
        "destroy":  function () { this.remove(); }
      });
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    viewNote: function () {
      var loc = ['note', this.model.id, 'edit'].join('/');
      this.router.navigate(loc, { trigger: true });
    },

    editNote: function () {
      var loc = ['note', this.model.id, 'edit'].join('/');
      this.router.navigate(loc, { trigger: true });
    },

    deleteNote: function () {
      this.model.destroy();
    }

  });  
}());
