define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/actorsResultTemplate.html',
    'text!templates/search/moviesResultTemplate.html'
], function($, _, Backbone, actorsResult, moviesResult) {
    var ResultView = Backbone.View.extend({

        initialize: function() {
            this.model.on("change:actorsResult", this.displayActorsResults, this);
            this.model.on("change:moviesResult", this.displayMoviesResults, this);
        },

        displayMoviesResults: function(model) {
            $("#home-navbar").click();
            console.log(model.toJSON());
            var template = _.template(moviesResult);
            $("#movies-search").html(template(model.toJSON()));
        },

        displayActorsResults: function(model) {
            $("#home-navbar").click();
            console.log(model.toJSON());
            var template = _.template(actorsResult);
            $("#actors-search").html(template(model.toJSON()));
        },

        getResults: function(value) {
            this.model.performSearch(value);
        }
    });

    return ResultView;
});
