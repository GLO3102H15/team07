define([
    'jquery',
    'underscore',
    'backbone',
    'views/home/HomeView',
    'views/actor/ActorView',
    'views/watchLists/WatchListsView',
    'views/tvShow/TvShowView',
    'views/movie/MovieView'
], function($, _, Backbone, HomeView, ActorView, WatchListsView, TvShowView, MovieView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            'movie': 'showMovie',
            'actor': 'showActor',
            'tv-show': 'showTvShow',
            'watch-lists': 'showWatchLists',

            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(){

        var app_router = new AppRouter;

        app_router.on('route:showMovie', function(){
            var movieView = new MovieView();
            movieView.render();

        });

        app_router.on('route:showActor', function () {
            var param = 347084658; // Chris Pratt. Temporaire...
            var actorView = new ActorView(param);
        });


        app_router.on('route:showTvShow', function () {
            var tvShowView = new TvShowView();
            tvShowView.render();
        });

        app_router.on('route:showWatchLists', function(){
            var watchListsView = new WatchListsView();
            watchListsView.render();

        });

        app_router.on('route:defaultAction', function (actions) {

            // We have no matching route, lets display the home page
            var homeView = new HomeView();
            homeView.render();
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});