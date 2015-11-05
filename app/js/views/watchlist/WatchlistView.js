define([
    'jquery',
    'underscore',
    'backbone',
    'views/movie/MovieThumbnailView',
    'text!templates/watchlist/watchlistTemplate.html'
], function($, _, Backbone, MovieThumbnailView, watchlistTemplate){

    var WatchlistView = Backbone.View.extend({

        el: $("#page"),

        template: _.template(watchlistTemplate),

        initialize: function (model) {
            this.watchlist = model;
            this.listenTo(this.watchlist, 'change', this.addAll);
            this.$el.html(this.template());
            this.watchlist.fetch();
        },

        render: function(){
            if (this.watchlist.get('movies').models.length) {
                this.$('#watchlist-thumbnails').show();
            } else {
                this.$('#watchlist-thumbnails').hide();
            }
        },

        addOne: function(movie){
            var view = new MovieThumbnailView({model: movie});
            this.$('#watchlist-thumbnails').append(view.render().$el);
        },

        addAll: function() {
            _.each(this.watchlist.get('movies').models, this.addOne);
        }
    });

    return WatchlistView;
});
