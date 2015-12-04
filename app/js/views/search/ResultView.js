define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/actorsResultTemplate.html',
    'text!templates/search/moviesResultTemplate.html',
    'text!templates/search/tvshowsResultTemplate.html',
    'text!templates/search/usersResultTemplate.html'
], function($, _, Backbone, actorsResult, moviesResult,tvshowsResult, usersResult) {
    var ResultView = Backbone.View.extend({

        initialize: function() {
            this.model.on("change:actorsResult", this.displayActorsResults, this);
            this.model.on("change:moviesResult", this.displayMoviesResults, this);
            this.model.on("change:tvshowsResult", this.displayTvShowsResults, this);
            this.model.on("change:usersResult", this.displayUsersResults, this);
        },

        displayMoviesResults: function(model) {
            $("#page-search-movies").html(
                '<div class="container" id="movies-search" style = "background-color: white"></div>');
            var template = _.template(moviesResult);
            $("#movies-search").html(template(model.toJSON())).hide().slideDown("slow");
            $(".toggle-search1").click(function() {
                $("#actors-search").slideUp("slow");
                $("#movies-search").slideUp("slow");
                $("#tvshows-search").slideUp("slow");
                $("#users-search").slideUp("slow");
            })
        },

        displayTvShowsResults: function(model) {
            $("#page-search-tvshows").html(
                '<div class="container" id="tvshows-search" style = "background-color: white"></div>');
            var template = _.template(tvshowsResult);
            $("#tvshows-search").html(template(model.toJSON())).hide().slideDown("slow");
            $(".toggle-search2").click(function() {
                $("#actors-search").slideUp("slow");
                $("#movies-search").slideUp("slow");
                $("#tvshows-search").slideUp("slow");
                $("#users-search").slideUp("slow");
            })
        },

        displayActorsResults: function(model) {
            $("#page-search-actors").html(
                '<div class="container" id="actors-search" style = "margin-top: 20px; background-color: white"></div>');
            var template = _.template(actorsResult);
            $("#actors-search").html(template(model.toJSON())).hide().slideDown("slow");
            $(".toggle-search").click(function() {
                $("#actors-search").slideUp("slow");
                $("#movies-search").slideUp("slow");
                $("#tvshows-search").slideUp("slow");
                $("#users-search").slideUp("slow");
            })
        },

        displayUsersResults: function(model) {
            $("#page-search-users").html(
                '<div class="container" id="users-search" style = "background-color: white"></div>');
            var template = _.template(usersResult);
            $("#users-search").html(template(model.toJSON())).hide().slideDown("slow");
            $(".toggle-search3").click(function() {
                $("#actors-search").slideUp("slow");
                $("#movies-search").slideUp("slow");
                $("#tvshows-search").slideUp("slow");
                $("#users-search").slideUp("slow");
            });
            $(".follow-button").click(function() {
                var data = {"id": $(this).attr('id') };
                $.ajax({
                    type: "POST",
                    url: "https://umovie.herokuapp.com/follow",
                    data: JSON.stringify(data),
                    contentType: 'application/json'
                });
            })
        },

        getResults: function(value) {
            $("#page").html(
                '<div id="page-search-actors"></div>' +
                '<div id="page-search-movies"></div>' +
                '<div id="page-search-tvshows"></div>' +
                '<div id="page-search-users"></div>');
            $('.navbar-toggle').click();
            this.model.performSearch(value);
        }
    });

    return ResultView;
});
