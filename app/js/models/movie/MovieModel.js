define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var MovieModel = Backbone.Model.extend({

        urlRoot: 'https://umovie.herokuapp.com/movies/',

        parse: function (data) {
            var result;
            if(_.has(data, 'results')) {
                result = data.results[0];
            } else if (_.has(data, 'movies')) {
                lastIndex = data.movies.length - 1;
                result = data.movies[lastIndex];
            } else {
                return {};
            }

            result['id'] = result.trackId;
            result['date'] = new Date(result.releaseDate);
            result['poster'] = result.artworkUrl100.replace('100x100', '800x800');
            result['thumbnail'] = result.artworkUrl100.replace('100x100', '400x300');

            if(!result['contentAdvisoryRating']) {
                result['contentAdvisoryRating'] = "G";
            }

            return result;
        },

        isMovie: function (movieId) {
            return this.get('trackId') === movieId;
        }
    });

    return MovieModel;
});