define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/watchlist/watchlistThumbnailTemplate.html'
], function($, _, Backbone, watchlistThumbnailTemplate){

    var WatchlistThumbnailView  = Backbone.View.extend({

        template: _.template(watchlistThumbnailTemplate),

        events: {
            "dblclick .panel-footer": "edit",
            "keypress .edit-watchlist"  : "updateOnEnter",
            "click a.close": "clear"
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        render: function() {
            this.model.randomizeThumbnailCover();
            this.$el.html(this.template(this.model.toJSON()));
            this.input = this.$('.edit-watchlist');
            return this;
        },

        edit: function() {
            this.$el.addClass("editing-watchlist");
            this.input.focus();
        },

        close: function() {
            var value = this.input.val();
            if (!value) {
                this.clear();
            } else {
                this.model.save({name: value});
                this.$el.removeClass("editing-watchlist");
            }
        },

        updateOnEnter: function(e) {
            if (e.keyCode == 13) this.close();
        },

        clear: function () {
            this.model.destroy();
        }
    });

    return WatchlistThumbnailView;
});