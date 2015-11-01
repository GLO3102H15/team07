define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var MovieModel = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/unsecure/movies/',
        defaults: {
            id: 0,
            date: "",
            genre: "",
            appleURL: "",
            description: "",
            rating: "",
            title: "",
            poster: ""
        },
        parse: function(data){
            var result = data.results[0];
            return {
                date: new Date(result.releaseDate),
                genre: result.primaryGenreName,
                appleURL: result.trackViewUrl,
                description: result.longDescription,
                rating: result.contentAdvisoryRating,
                title: result.trackName,
                poster: result.artworkUrl100.replace(new RegExp('100', 'g'), '1680')
            };
        }
    });

    return MovieModel;
});