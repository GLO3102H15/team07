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
    'models/movie/MovieModel'
], function($, _, Backbone, HomeView, ActorView, ActorModel,
            WatchlistsView, WatchlistView, WatchlistCollection,
            WatchlistModel, TvShowView, MovieView, NavbarView, MovieModel) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            'movies/:movieId': 'showMovie',
            'actors/:actorId': 'showActor',
            'tv-show': 'showTvShow',
            'watchlists': 'showWatchLists',
            'watchlists/:watchlistId': 'showWatchList',

            // Default
            '*actions': 'defaultAction'
        }
    });

    var navbar = new NavbarView();
    navbar.render();

    var initialize = function(){

        var app_router = new AppRouter;

        Backbone.View.prototype.destroyView = function() {
            this.undelegateEvents();
            this.$el.empty();
        };

        app_router.on('route:showMovie', function(movieId){
            if(this.currentView) {this.currentView.destroyView();}
            var movie = new MovieModel({id: movieId});
            var movieView = new MovieView(movie);
            this.currentView = movieView;
        });

        app_router.on('route:showActor', function (actorId) {
            if(this.currentView) {this.currentView.destroyView();}
            var actor = new ActorModel({id: actorId});
            var actorView = new ActorView(actor);
            this.currentView = actorView;
        });

        app_router.on('route:showTvShow', function () {
            if(this.currentView) {this.currentView.destroyView();}
            var tvShowView = new TvShowView();
            tvShowView.render();
            this.currentView = tvShowView;
        });

        app_router.on('route:showWatchLists', function(){
            if(this.currentView) {this.currentView.destroyView();}
            // Password: equipe07
            var owner = {"email":"team07@gmail.com","name":"team07","following":[],"id":"5634d66a0986b8030010f59a"}
            var watchlistsView = new WatchlistsView(new WatchlistCollection(owner));
            this.currentView = watchlistsView;
        });

        app_router.on('route:showWatchList', function(watchlistId){
            if(this.currentView) {this.currentView.destroyView();}
            var watchlistView = new WatchlistView(new WatchlistModel({id: watchlistId}));
            this.currentView = watchlistView;
        });

        app_router.on('route:defaultAction', function (actions) {
            var homeView = new HomeView();
            homeView.render();
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});