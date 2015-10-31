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
            this.listenTo(this.watchlist.movies, 'add', this.addOne);
            this.listenTo(this.watchlist.movies, 'reset', this.addAll);
            this.listenTo(this.watchlist.movies, 'all', this.render);
            this.$el.html(this.template());
            var that = this;
            this.watchlist.fetch({
                success: function() {
                    console.log(that.watchlist);
                    console.log(that.watchlist.movies);
                }
            });
        },

        render: function(){
            if (this.watchlist.movies.length) {
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
            this.watchlist.movies.each(this.addOne, this);
        }
    });

    return WatchlistView;
});
