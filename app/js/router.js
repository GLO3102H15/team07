define([
    'jquery',
    'underscore',
    'backbone',
    'views/home/HomeView',
    'views/actor/ActorView',
    'models/actor/ActorModel',
    'views/watchlist/WatchlistsView',
    'views/watchlist/WatchlistView',
    'collections/watchlist/WatchlistCollection',
    'models/watchlist/WatchlistModel',
    'views/tvShow/TvShowView',
    'views/movie/MovieView',
    'views/NavbarView',
    'models/movie/MovieModel',
    'models/tvshow/TvShowModel',
    'collections/tvshow/TvShowCollection'
], function($, _, Backbone, HomeView, ActorView, ActorModel,WatchlistsView, WatchlistView, WatchlistCollection,
            WatchlistModel, TvShowView, MovieView, NavbarView, MovieModel, TvShowModel, TvShowCollection) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            'movies/:movieId': 'showMovie',
            'actors/:actorId': 'showActor',
            'tv-show/:tvShowId': 'showTvShow',
            'watchlists': 'showWatchLists',
            'watchlists/:watchlistId': 'showWatchList',

            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(){

        Backbone.View.prototype.destroyView = function() {
            this.undelegateEvents();
            this.$el.empty();
            delete this;
        };

        var viewCleanup = function (lastView) {
            if(lastView) {
                lastView.destroyView();
            }
        };

        var app_router = new AppRouter;

        app_router.on('route:showMovie', function(movieId){
            viewCleanup(this.currentView);
            var movie = new MovieModel({id: movieId});
            var movieView = new MovieView(movie);
            this.currentView = movieView;
        });

        app_router.on('route:showActor', function (actorId) {
            viewCleanup(this.currentView);
            var actor = new ActorModel({id: actorId});
            var actorView = new ActorView(actor);
            this.currentView = actorView;
        });

        app_router.on('route:showTvShow', function (tvShowId) {
            viewCleanup(this.currentView);
            var tvShow = new TvShowModel({id: tvShowId});
            var tvShowView = new TvShowView(tvShow);
            this.currentView = tvShowView;
        });

        app_router.on('route:showWatchLists', function(){
            viewCleanup(this.currentView);
            // Password: equipe07
            var owner = {"email":"team07@gmail.com","name":"team07","following":[],"id":"5634d66a0986b8030010f59a"}
            var watchlistsView = new WatchlistsView(new WatchlistCollection(owner));
            this.currentView = watchlistsView;
        });

        app_router.on('route:showWatchList', function(watchlistId){
            viewCleanup(this.currentView);
            var watchlistView = new WatchlistView(new WatchlistModel({id: watchlistId}));
            this.currentView = watchlistView;
        });

        app_router.on('route:defaultAction', function (actions) {
            var homeView = new HomeView();
            homeView.render();
        });

        var navbar = new NavbarView();
        navbar.render();

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});