(function () {
  'use strict';

  // Notes Filter View
  // -----------------
  // Controls search filter and emits filter events.
  App.Views.NotesFilter = Backbone.View.extend({

    el: ".navbar-search",

    events: {
      "submit": function () { return false; },

      "change   .search-query": "filterNotes",
      "keypress .search-query": "filterNotes",
      "keyup    .search-query": "filterNotes"
    },

    initialize: function () {
      this._query = this.$(".search-query").val().trim();

      this.listenTo(this.collection, "notes:add", function (model) {

        this.filterNote(model);
      });
    },

    query: function (val) {
      if(!_.isUndefined(val)) { this._query = val; }
      return this._.query;
    },

    isMatch: function (query, value) {
      if(_.isEmpty(query)) { return true; }

      value = value.toLowerCase();
      query = query.toLowerCase();

      return value.indexOf(query) > -1;
    },

    filterNote: function (model) {
      var $note = $("#" + model.id),
        match = this.isMatch(this.query(), model.get("title"));

        match ? $note.show() : $note.hide();
    },

    filterNotes: function () {
      var query = this.$(".search-query").val().trim();

      if (query !== this.query()) {
        this.query(query);
        this.collection.each(this.filterNote, this);
      }
    }
  });
  
}());