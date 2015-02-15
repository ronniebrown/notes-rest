(function () {
  'use strict';

  // Router
  // ------
  // The router translates routes in to views.
  App.Routers.Router = Backbone.Router.extend({

    routes: {
      "": "notes",
      "note/:id/:action": "note"
    },

    initialize: function (opts) {
      opts || (opts = {});
      this.notesView = opts.notesView || app.notesView;
      this.noteNavView = opts.noteNavView || app.noteNavView;

      if(!this.notesView) { throw new Error("No notesView"); }
      if (!this.noteNavView) { throw new Error("No noteNavView"); }

      this.noteView = null;
    },

    notes: function () {
      this.notesView.render();
    },

    note: function (noteId, action) {
      if (this.noteView) {
        if (this.noteView.model.id === noteId) {
          return this.noteView.trigger("update:" + action);
        } else {
          this.noteView.remove();
        }
      }

      var model = this.notesView.collection.get(noteId);
      if (!model) {
        return this.navigate("", { trigger: true });
      }

      this.noteView = new App.Views.Note({ model: model }. {
        action: action, 
        nav: this.noteNavView
      });
      $("#note").html(this.noteView.render().$el);
    }

  });  
}());