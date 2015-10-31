define([
    'underscore',
    'backbone',
    'models/watchlist/WatchlistModel'
], function(_, Backbone, WatchlistModel) {

    var WatchlistCollection = Backbone.Collection.extend({
        url: 'https://umovie.herokuapp.com/unsecure/watchlists',

        model: WatchlistModel,

        initialize: function (user) {
            this.user = user;
        },

        parse: function (response) {
            var watchlistCollectionScope = this;
            var userWatchlists = _.filter(response, function (watchlist) {
                if (_.has(watchlist.owner, "email")) {
                    return watchlist.owner.email === watchlistCollectionScope.user.email;
                } else {
                    return false;
                }
            });
            return userWatchlists;
        }
    });

    return WatchlistCollection;
});