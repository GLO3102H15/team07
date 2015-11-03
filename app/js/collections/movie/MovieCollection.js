define([
    'underscore',
    'backbone',
    'models/movie/MovieModel'
], function(_, Backbone, MovieModel) {
    var MovieCollection = Backbone.Collection.extend({
        model: MovieModel
    });

    return MovieCollection;
});
