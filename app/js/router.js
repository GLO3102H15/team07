define([
    'jquery',
    'underscore',
    'backbone',
    'views/home/HomeView',
    'views/actor/ActorView'
    //'views/contributors/ContributorsView',
    //'views/footer/FooterView'
], function($, _, Backbone, HomeView, ActorView /*MovieView, WatchListsView*/ /* TvShowView, ActorView, ...*/) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            //'movie': 'showMovie',
            'actor': 'showActor',
            //'tv-show': 'showTvShow',
            //'watch-lists': 'showWatchLists',

            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(){

        var app_router = new AppRouter;
        /*
        app_router.on('route:showMovie', function(){

            // Call render on the module we loaded in via the dependency array
            var movieView = new MovieView();
            movieView.render();

        });*/

        app_router.on('route:showActor', function () {

            // Like above, call render but know that this view has nested sub views which
            // handle loading and displaying data from the GitHub API
            var actorView = new ActorView();
            actorView.render();
        });

        /*
        // Instantiate
        app_router.on('route:showTvShow', function () {

            // Like above, call render but know that this view has nested sub views which
            // handle loading and displaying data from the GitHub API
            var tvShowView = new TvShowView();
         tvShowView.render();
        });*/
        /*
        app_router.on('route:showWatchLists', function(){

            // Call render on the module we loaded in via the dependency array
            var watchListsView = new WatchListsView();
            watchListsView.render();

        });*/

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