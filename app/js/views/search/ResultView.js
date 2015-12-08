define([
    'jquery',
    'underscore',
    'backbone',
    'models/search/SearchModel',
    'text!templates/search/actorsResultTemplate.html',
    'text!templates/search/moviesResultTemplate.html',
    'text!templates/search/tvshowsResultTemplate.html',
    'text!templates/search/usersResultTemplate.html'
], function($, _, Backbone, SearchModel, actorsResult, moviesResult, tvshowsResult, usersResult) {
    var ResultView = Backbone.View.extend({

        initialize: function() {
            this.actors = new SearchModel({fetchCallback: function(actors, value) {
                $.get("https://umovie.herokuapp.com/search/actors?" + "q=" + value).done(function(data) {
                    actors.set({"results": data.results});
                }).fail(function() {
                    console.log("failed");
                });
            }});

            this.movies = new SearchModel({fetchCallback: function(movies, value) {
                $.get("https://umovie.herokuapp.com/search/movies?" + "q=" + value).done(function(data) {
                    movies.set({"results": data.results});
                }).fail(function() {
                    console.log("failed");
                });
            }});

            this.tvShows = new SearchModel({fetchCallback: function(tvShows, value) {
                $.get("https://umovie.herokuapp.com/search/tvshows/seasons?" + "q=" + value).done(function(data) {
                    tvShows.set({"results": data.results});
                }).fail(function() {
                    console.log("failed");
                });
            }});

            this.users = new SearchModel({fetchCallback: function(users, value) {
                $.get("https://umovie.herokuapp.com/search/users?" + "q=" + value).done(function(data) {
                    users.set({"results": data});
                }).fail(function() {
                    console.log("failed");
                });
            }});

            this.actors.on("change:results", this.displayActorsResults, this.actors);
            this.movies.on("change:results", this.displayMoviesResults, this.movies);
            this.tvShows.on("change:results", this.displayTvShowsResults, this.tvShows);
            this.users.on("change:results", this.displayUsersResults, this.users);
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

        searchAll: function(value) {
            this.actors.performSearch(value);
            this.movies.performSearch(value);
            this.tvShows.performSearch(value);
            this.users.performSearch(value);
        },

        getResults: function(value) {
            $("#page").html(
                '<div id="page-search-actors"></div>' +
                '<div id="page-search-movies"></div>' +
                '<div id="page-search-tvshows"></div>' +
                '<div id="page-search-users"></div>');
            $('.navbar-toggle').click();

            this.searchAll(value);
        }
    });

    return ResultView;
});
