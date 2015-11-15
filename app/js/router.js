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
    'views/login/LoginView'
], function($, _, Backbone, HomeView, ActorView, ActorModel,WatchlistsView, WatchlistView, WatchlistCollection,
            WatchlistModel, TvShowView, MovieView, NavbarView, MovieModel, TvShowModel, LoginView) {


    Backbone.View.prototype.destroyView = function() {
        this.undelegateEvents();
        this.$el.empty();
        delete this;
    };

    $(document).ajaxSend(function(e, xhr, options) {
        var user = localStorage.getItem('user');
        if(user){
            xhr.setRequestHeader("Authorization", JSON.parse(user).token);
        }
    });

    var AppRouter = Backbone.Router.extend({
        routes: {
            'movies/:movieId': 'showMovie',
            'actors/:actorId': 'showActor',
            'tv-show/:tvShowId': 'showTvShow',
            'watchlists': 'showWatchLists',
            'watchlists/:watchlistId': 'showWatchList',
            'login': 'showLogin',
            'logout': 'logout',

            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(){
        var app_router = new AppRouter;

        app_router.initializeView = function (View, model, requiresAuth) {
            if(this.currentView) {
                this.currentView.destroyView();
            }
            var user = localStorage.getItem('user');
            if(requiresAuth && !user) {
                View = LoginView;
                model = null;
            }

            if(user && !this.navbar) {
                this.navbar = new NavbarView();
            } else if (!user && this.navbar){
                this.navbar.destroyView();
                this.navbar = null;
            }
            this.currentView = new View(model);
        };

        app_router.on('route:showMovie', function(movieId){
            var movie = new MovieModel({id: movieId});
            this.initializeView(MovieView, movie, true);
        });

        app_router.on('route:showActor', function (actorId) {
            var actor = new ActorModel({id: actorId});
            this.initializeView(ActorView, actor, true);
        });

        app_router.on('route:showTvShow', function (tvShowId) {
            var tvShow = new TvShowModel({id: tvShowId});
            this.initializeView(TvShowView, tvShow, true);
        });

        app_router.on('route:showWatchLists', function(){
            var user = JSON.parse(localStorage.getItem('user'));
            var collection = new WatchlistCollection(user);
            this.initializeView(WatchlistsView, collection, true);
        });

        app_router.on('route:showWatchList', function(watchlistId){
            var model = new WatchlistModel({id: watchlistId});
            this.initializeView(WatchlistView, model, true);
        });

        app_router.on('route:showLogin', function(){
            this.initializeView(LoginView, null, false);
        });

        app_router.on('route:logout', function(){
            localStorage.removeItem('user');
            this.initializeView(LoginView, null, false);
        });

        app_router.on('route:defaultAction', function (actions) {
            this.initializeView(HomeView, null, true);
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});