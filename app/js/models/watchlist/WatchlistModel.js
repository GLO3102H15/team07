define([
    'underscore',
    'backbone',
    'collections/movie/MovieCollection'
], function(_, Backbone, MovieCollection) {

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

        parse: function(response){
            var movies = new MovieCollection(response.movies);
            movies.url = this.urlRoot + response.id + '/movies';
            return {
                id: response.id,
                name: response.name,
                owner: response.owner,
                movies: movies
            };
        }
    });

    return WatchlistModel;
});