
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie/movieThumbnailTemplate.html'
], function($, _, Backbone, movieThumbnailTemplate){

    var WatchlistThumbnailView  = Backbone.View.extend({

        template: _.template(movieThumbnailTemplate),

        events: {
            "click a.close": "clear"
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            console.log(this.model.attributes);
            console.log(this.$el);
            return this;
        },

        clear: function () {
            this.model.destroy();
        }
    });

    return WatchlistThumbnailView;
});