
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie/movieThumbnailTemplate.html',
    'models/movie/MovieModel'
], function($, _, Backbone, movieThumbnailTemplate, MovieModel){

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
            this.model.attributes = this.model.parse({results: [this.model.attributes]});
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        clear: function () {
            this.model.destroy({url: this.model.collection.url + '/' + this.model.get('trackId')});
        }
    });

    return WatchlistThumbnailView;
});