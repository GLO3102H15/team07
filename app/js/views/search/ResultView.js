define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/actorsResultTemplate.html',
    'text!templates/search/moviesResultTemplate.html',
    'text!templates/search/tvshowsResultTemplate.html'
], function($, _, Backbone, actorsResult, moviesResult,tvshowsResult) {
    var ResultView = Backbone.View.extend({

        initialize: function() {
            this.model.on("change:actorsResult", this.displayActorsResults, this);
            this.model.on("change:moviesResult", this.displayMoviesResults, this);
            this.model.on("change:tvshowsResult", this.displayTvShowsResults, this);
        },

        displayMoviesResults: function(model) {
            $("#home-navbar").click();
            var template = _.template(moviesResult);
            $("#movies-search").html(template(model.toJSON())).hide().slideDown("slow");
            $(".toggle-search1").click(function() {
                $("#actors-search").slideUp("slow");
                $("#movies-search").slideUp("slow");
                $("#tvshows-search").slideUp("slow");
            })
        },

        displayTvShowsResults: function(model) {
            $("#home-navbar").click();
            var template = _.template(tvshowsResult);
            $("#tvshows-search").html(template(model.toJSON())).hide().slideDown("slow");
            $(".toggle-search1").click(function() {
                $("#actors-search").slideUp("slow");
                $("#movies-search").slideUp("slow");
                $("#tvshows-search").slideUp("slow");
            })
        },

        displayActorsResults: function(model) {
            $("#home-navbar").click();
            var template = _.template(actorsResult);
            $("#actors-search").html(template(model.toJSON())).hide().slideDown("slow");
            $(".toggle-search2").click(function() {
                $("#actors-search").slideUp("slow");
                $("#movies-search").slideUp("slow");
                $("#tvshows-search").slideUp("slow");
            })
        },

        getResults: function(value) {
            this.model.performSearch(value);
        }
    });

    return ResultView;
});
