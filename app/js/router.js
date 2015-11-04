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
    'models/movie/MovieModel',
    'models/tvshow/TvShowModel',
    'collections/tvshow/TvShowCollection'
], function($, _, Backbone, HomeView, ActorView, ActorModel,
            WatchlistsView, WatchlistView, WatchlistCollection,
            WatchlistModel, TvShowView, MovieView, NavbarView, MovieModel,MovieModel, TvShowModel, TvShowCollection) {

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

    var navbar = new NavbarView();
    navbar.render();

    var initialize = function(){

        var app_router = new AppRouter;

        app_router.on('route:showMovie', function(movieId){
            var movie = new MovieModel({id: movieId});
            var movieView = new MovieView(movie);
        });

        app_router.on('route:showActor', function (actorId) {
            var actor = new ActorModel({id: actorId});
            var actorView = new ActorView(actor);
        });

        app_router.on('route:showTvShow', function (tvShowId) {
            console.log("allo");
            var tvShow = new TvShowModel({id: tvShowId});
            var tvShowView = new TvShowView(tvShow);

            console.log("allo2");

        });

        app_router.on('route:showWatchLists', function(){
            // Password: equipe07
            var owner = {"email":"team07@gmail.com","name":"team07","following":[],"id":"5634d66a0986b8030010f59a"}
            var watchlists = new WatchlistCollection(owner);
            var watchlistsView = new WatchlistsView(watchlists);
        });

        app_router.on('route:showWatchList', function(watchlistId){
            var watchlist = new WatchlistModel({id: watchlistId});
            var watchlistView = new WatchlistView(watchlist);
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