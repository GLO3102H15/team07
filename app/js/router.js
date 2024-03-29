define([
    'jquery',
    'underscore',
    'backbone',
    'jqueryCookie',
    'views/NavbarView',
    'views/home/HomeView',
    'views/actor/ActorView',
    'views/login/LoginView',
    'views/login/SignupView',
    'views/tvShow/TvShowView',
    'views/movie/MovieView',
    'views/user/ProfileView',
    'views/user/FriendsView',
    'views/watchlist/WatchlistsView',
    'views/watchlist/WatchlistView',
    'models/actor/ActorModel',
    'models/watchlist/WatchlistModel',
    'models/movie/MovieModel',
    'models/tvshow/TvShowModel',
    'models/user/UserModel',
    'collections/watchlist/WatchlistCollection',
    'views/search/ResultView'
], function ($, _, Backbone, JqueryCookie, NavbarView, HomeView, ActorView, LoginView, SignupView, TvShowView, MovieView,
             ProfileView, FriendsView, WatchlistsView, WatchlistView, ActorModel, WatchlistModel, MovieModel, TvShowModel,
             UserModel, WatchlistCollection, ResultView) {

    Backbone.View.prototype.destroyView = function () {
        this.undelegateEvents();
        this.$el.empty();
        delete this;
    };

    $(document).ajaxSend(function (e, xhr, options) {
        var user = $.cookie('user');
        if (user) {
            xhr.setRequestHeader("Authorization", user.token);
        }
    });

    var AppRouter = Backbone.Router.extend({
        routes: {
            'movies/:movieId': 'showMovie',
            'actors/:actorId': 'showActor',
            'tv-show/:tvShowId': 'showTvShow',
            'watchlists/:watchlistId': 'showWatchList',
            'search/:data': 'search',
            'users/:userId': 'showUser',
            'users/:userId/friends': 'showUserFriends',
            'users/:usedId/watchlists': 'showWatchLists',
            'login': 'showLogin',
            'signup': 'showSignup',
            'logout': 'logout',

            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function () {
        $.cookie.json = true;
        var app_router = new AppRouter;
        app_router.navbar = new NavbarView();

        app_router.initializeView = function (View, model, requiresAuth) {
            if (this.currentView) {
                this.currentView.destroyView();
            }
            var user = $.cookie('user');
            if (requiresAuth && !user) {
                View = LoginView;
                model = null;
            }

            this.navbar.render(user);
            this.currentView = new View(model);
        };

        app_router.on('route:showMovie', function (movieId) {
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

        app_router.on('route:showWatchLists', function (userId) {
            var collection = new WatchlistCollection(new UserModel({id: userId}));
            this.initializeView(WatchlistsView, collection, true);
        });

        app_router.on('route:showWatchList', function (watchlistId) {
            var model = new WatchlistModel({id: watchlistId});
            this.initializeView(WatchlistView, model, true);
        });

        app_router.on('route:showUser', function (userId) {
            var model = new UserModel({id: userId});
            this.initializeView(ProfileView, model, true);
        });

        app_router.on('route:showUserFriends', function (userId) {
            var model = new UserModel({id: userId});
            this.initializeView(FriendsView, model, true);
        });

        app_router.on('route:showLogin', function () {
            this.initializeView(LoginView, null, false);
        });

        app_router.on('route:showSignup', function () {
            this.initializeView(SignupView, null, false);
        });

        app_router.on('route:logout', function () {
            $.removeCookie('user');
            this.initializeView(LoginView, null, false);
        });

        app_router.on('route:search', function(data) {
            var resultView = new ResultView();
            resultView.getResults(data);
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