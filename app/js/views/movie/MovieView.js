define([
    'jquery',
    'underscore',
    'backbone',
    'models/movie/MovieModel',
    'collections/watchlist/WatchlistCollection',
    'models/watchlist/WatchlistModel',
    'views/YoutubeView',
    'text!templates/movie/movieTemplate.html'
], function ($, _, Backbone, MovieModel, WatchlistCollection, WatchlistModel, YoutubeView, movieTemplate) {

    var MovieView = Backbone.View.extend({
        el: $("#page"),

        template: _.template(movieTemplate),

        events: {
            "click .movie-buttons .btn": "addToWatchlist"
        },

        initialize: function (model) {
            var movieViewScope = this;
            this.model = model;

            var owner = {
                "email": "team07@gmail.com",
                "name": "team07",
                "following": [],
                "id": "5634d66a0986b8030010f59a"
            };
            this.watchlists = new WatchlistCollection(owner);

            var renderView = _.after(2, function () {
                movieViewScope.render();
            });
            this.model.fetch({success: renderView});
            this.watchlists.fetch({success: renderView});
        },

        render: function () {
            var values = this.model.attributes;
            values['watchlists'] = this.watchlists.getWatchlistsWithoutMovie(this.model.get('trackId'));
            this.$el.html(this.template(values));
            this.videoPreview = new YoutubeView(this.model.get('trackName'));
        },

        addToWatchlist: function () {
            var watchlistID = $('#watchlist-dropdown').val();
            if (watchlistID !== null){
                var watchlist =  this.watchlists.get(watchlistID);
                //var watchlist = new WatchlistModel({id: watchlistID});
                this.model.unset('id');
                watchlist.movies.create(this.model.attributes, {url: watchlist.movies.url});
                //var modelScope = this;
                //this.watchlists.fetch({success: modelScope.renderView});
            }
        }
    });

    return MovieView;
});