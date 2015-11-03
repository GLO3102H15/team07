define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var MovieModel = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/unsecure/movies/',
        parse: function (data) {
            var result = data.results[0];
            result['id'] = result.trackId;
            result['date'] = new Date(result.releaseDate);
            result['poster'] = result.artworkUrl100.replace('100x100', '800x800');
            result['thumbnail'] = result.artworkUrl100.replace('100x100', '400x300');
            return result;
        }
    });

    return MovieModel;
});