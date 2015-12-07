define([
    'jquery',
    'underscore',
    'backbone',
    'models/user/UserModel',
    'collections/watchlist/WatchlistCollection',
    'text!templates/user/userTemplate.html'
], function ($, _, Backbone, UserModel, WatchlistCollection, UserTemplate) {

    var UserView = Backbone.View.extend({
        events: {
            "click .btn-follow": "follow",
            "click .btn-unfollow": "unfollow"
        },

        template: _.template(UserTemplate),

        initialize: function (model, user, el) {
            var userViewScope = this;
            this.model = model;
            this.watchlists = new WatchlistCollection(this.model);
            this.user = user;
            this.el = el;

            this.model.fetch({
                success: function () {
                    userViewScope.watchlists.fetch({
                        success: function () {
                            userViewScope.render();
                        }
                    });
                }
            });
        },

        render: function () {
            this.el.empty();
            var values = this.model.attributes;
            values["watchlists"] = this.watchlists.models;
            values["isFollowing"] = this.user.isFollowing(this.model.get("email"));
            this.el.html(this.template(values));
        },

        follow: function () {
            this.user.follow(this.model.get("id"));
            this.render();
        },

        unfollow: function () {
            this.user.unfollow(this.model.get("id"));
            this.render();

        }
    });

    return UserView;
});