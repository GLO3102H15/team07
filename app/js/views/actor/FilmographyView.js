define([
    'jquery',
    'underscore',
    'backbone',
    'models/actor/FilmographyModel',
    'text!templates/actor/filmography.html'
], function($, _, Backbone, FilmographyModel, filmography_template) {
    var FilmographyView = Backbone.View.extend({
        template: _.template(filmography_template),

        initialize: function (artistId) {
            this.model = new FilmographyModel();
            this.model.set("artistId", artistId);

            var self = this;
            this.model.fetch({
                success: function (movies) {
                    self.movies = movies;
                    self.render();
                }
            });
            return this;
        },

        render: function() {
            var sortedMovies = _.sortBy(this.movies.changed.results, 'releaseDate');
            $("#actor-filmography").html(this.template({movies: sortedMovies}));
            return this;
        }
    });

    return FilmographyView;
});