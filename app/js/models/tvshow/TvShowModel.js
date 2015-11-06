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
            if ("contentAdvisoryRating" in resultatTvShow){
                resultatTvShow['rating'] = resultatTvShow.contentAdvisoryRating;
            }else{
                resultatTvShow['rating'] = "TV-G"
            }
            return resultatTvShow;
        }
    });

    return TvShowModel;
});
