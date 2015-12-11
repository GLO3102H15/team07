define([
    'jquery',
    'underscore',
    'backbone',
    'models/search/SearchModel',
    'text!templates/search/actorsResultTemplate.html',
    'text!templates/search/moviesResultTemplate.html',
    'text!templates/search/tvshowsResultTemplate.html',
    'text!templates/search/usersResultTemplate.html',
    'text!templates/search/filteredMovies.html',
    'text!templates/search/filteredTvShows.html',
    'models/user/UserModel',
    'collections/watchlist/WatchlistCollection',
    'models/movie/MovieModel'
], function($, _, Backbone, SearchModel, actorsResult, moviesResult, tvshowsResult, usersResult, filteredMovies, filteredTvShows, UserModel,  WatchlistCollection, MovieModel) {

    function bindModelByGenreSelector(model, selectorId) {
        var allButton = $('<label class="btn btn-primary">all</label>').click(
            function() {
                allButton.prop('filterButtons').forEach(function(button) {
                    button.prop('checked', false);
                    button.removeClass("active");
                });
                model.resetFilters();
            }
        );
        allButton.prop('filterButtons', []);
        $("#" + selectorId).append(function() {
            return allButton;
        });
        model.forEachAvailableFilter(function(filter){
            $("#" + selectorId).append(function() {
                var button = $('<label class="btn btn-primary"><input type="checkbox">' + filter + '</label>');

                button.prop('checked', false);

                button.click(function() {
                    if(button.prop('checked')) {
                        button.prop('checked', false);
                        model.removeFilter(filter);
                    } else {
                        button.prop('checked', true);
                        model.addFilter(filter);
                    }
                });

                allButton.prop('filterButtons').push(button);
                return button;
            });
        });
    }

    var Watchlists = {};

    var ResultView = Backbone.View.extend({
        initialize: function() {
            this.actors = new SearchModel({fetchCallback: function(actors, value) {
                $.get("https://umovie.herokuapp.com/search/actors?" + "q=" + value).done(function(data) {
                    actors.updateResults(data.results);
                });
            }});

            this.movies = new SearchModel({
                fetchCallback: function(movies, value) {
                    $.get("https://umovie.herokuapp.com/search/movies?" + "q=" + value).done(function(data) {
                        movies.updateResults(data.results);
                    });
                },
                filterAttribute: 'primaryGenreName'
            });

            this.tvShows = new SearchModel({
                fetchCallback: function(tvShows, value) {
                    $.get("https://umovie.herokuapp.com/search/tvshows/seasons?" + "q=" + value).done(function(data) {
                        tvShows.updateResults(data.results);
                    });
                },
                filterAttribute: 'primaryGenreName'
            });

            this.users = new SearchModel({fetchCallback: function(users, value) {
                $.get("https://umovie.herokuapp.com/search/users?" + "q=" + value).done(function(data) {
                    users.updateResults(data);
                });
            }});

            var owner = new UserModel($.cookie('user'));
            Watchlists = new WatchlistCollection(owner);
            Watchlists.fetch();

            this.actors.on("change:results", this.displayActorsResults, this.actors);
            this.movies.on("change:results", this.displayMoviesResults, this.movies);
            this.tvShows.on("change:results", this.displayTvShowsResults, this.tvShows);
            this.users.on("change:results", this.displayUsersResults, this.users);

            this.movies.on("change:filteredResults", this.filterMovieResults, this.movies);
            this.tvShows.on("change:filteredResults", this.filterTvShowResults, this.tvShows);
        },

        displayMoviesResults: function(model) {

            $("#page-search-movies").html(
                '<div class="container" id="movies-search" style = "background-color: white"></div>');
            var template = _.template(moviesResult);

            var values = model.toJSON();
            values['watchlists'] = Watchlists;

            $("#movies-search").html(template(values)).hide().slideDown("slow");
            $(".toggle-search1").click(function() {
                $("#actors-search").slideUp("slow");
                $("#movies-search").slideUp("slow");
                $("#tvshows-search").slideUp("slow");
                $("#users-search").slideUp("slow");
            });

            $(".add-watchlist").click(function() {
                var movieId = $(this).attr('id');
                var button = $(this);

                var movie = new MovieModel({id: movieId});

                var whenMovieFetched = function () {
                    var watchlistID = $('#selected-watchlist').val();
                    if (watchlistID !== null){
                        var watchlist =  Watchlists.get(watchlistID);
                        movie.unset('id');
                        movie.unset('watchlists');
                        watchlist.movies.create(movie.attributes, {url: watchlist.movies.url});
                        button.attr("disabled", true);
                    }
                };
                movie.fetch({success: whenMovieFetched});
            });

            bindModelByGenreSelector(model, "filter-movie-buttons");
        },

        filterMovieResults: function(model) {
            var template = _.template(filteredMovies);
            $("#filtered-movie-results").html(template(model.toJSON()));

            $(".add-watchlist").click(function() {
                var movieId = $(this).attr('id');
                var button = $(this);

                var movie = new MovieModel({id: movieId});

                var whenMovieFetched = function () {
                    var watchlistID = $('#selected-watchlist').val();
                    if (watchlistID !== null){
                        var watchlist =  Watchlists.get(watchlistID);
                        movie.unset('id');
                        movie.unset('watchlists');
                        watchlist.movies.create(movie.attributes, {url: watchlist.movies.url});
                        button.attr("disabled", true);
                    }
                };
                movie.fetch({success: whenMovieFetched});
            });
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
            });

            bindModelByGenreSelector(model, "filter-tvshows-buttons");
        },

        filterTvShowResults: function(model) {
            var template = _.template(filteredTvShows);
            $("#filtered-tvshow-results").html(template(model.toJSON()));
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
            });
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
                $(this).attr("disabled", true);
            });
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
