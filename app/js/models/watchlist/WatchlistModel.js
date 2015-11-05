define([
    'underscore',
    'backbone',
    'collections/movie/MovieCollection'
], function (_, Backbone, MovieCollection) {

    var WatchlistModel = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/unsecure/watchlists/',


        initialize: function () {
            this.movies = new MovieCollection(this.movies);
            this.movies.url = this.urlRoot + this.id + '/movies';
        },

        default: {
            name: "",
            owner: {},
            movies: []
        },

        parse: function (response) {
            var movies = new MovieCollection(response.movies);
            movies.url = this.urlRoot + response.id + '/movies';
            return {
                id: response.id,
                name: response.name,
                owner: response.owner,
                movies: movies
            };
        },


        hasMovie: function (movieId) {
            var result =  _.some(this.get('movies').models, function(movie){
                return movie.isMovie(movieId);
            });

            return result;
        },

        randomizeThumbnailCover: function () {
            var thumbnail = "images/emptyBasket.jpg";
            var movies = this.get('movies').models;
            if (movies.length) {
                var movie = _.sample(movies);
                thumbnail = movie.attributes.artworkUrl100.replace('100x100', '400x300');
            }
            return thumbnail;
        }
    });

    return WatchlistModel;
});