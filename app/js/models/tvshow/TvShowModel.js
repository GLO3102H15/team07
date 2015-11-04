define([
    'underscore',
    'backbone',
    'collections/tvshow/TvShowCollection'
], function (_, Backbone, TvShowCollection) {

    var TvShowModel = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/unsecure/tvshows/season/',
        parse: function (data) {
            var resultatTvShow = data.results[0];
            resultatTvShow['id'] = data.collectionId;
            resultatTvShow['date'] = new Date(data.releaseDate);
            resultatTvShow['poster'] = resultatTvShow.artworkUrl100.replace('100x100', '800x800');



            return resultatTvShow;
        }


        //initialize: function () {
        //    this.movies = new TvShowCollection(this.movies);
        //    this.movies.url = this.urlRoot + this.id + '/episodes';
        //},
        //
        //
        //
        //parse: function (response) {
        //    var movies = new TvShowCollection(response.movies);
        //    movies.url = this.urlRoot + response.id + '/movies';
        //    return {
        //        id: response.id,
        //        name: response.name,
        //        owner: response.owner,
        //        movies: movies
        //    };
        //}


    });

    return TvShowModel;
});
