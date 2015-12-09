define([
    'jquery',
    'underscore',
    'backbone',
    'models/user/UserModel',
    'collections/watchlist/WatchlistCollection',
    'text!templates/user/userTemplate.html'
], function ($, _, Backbone, UserModel, WatchlistCollection, UserTemplate) {

    var UserView = Backbone.View.extend({
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
            var that = this;
            this.el.empty();
            var values = this.model.attributes;
            values["watchlists"] = this.watchlists.models;
            values["isFollowing"] = this.user.isFollowing(this.model.get("email"));
            this.el.html(this.template(values));
            $("#" + this.el[0].id + " .btn-follow").on("click", function() {
                that.follow(this.value)
            });
            $("#" + this.el[0].id + " .btn-unfollow").on("click", function() {
                that.unfollow(this.value)
            });

        },

        follow: function (id) {
            var userViewScope = this;
            this.user.follow(id);
            this.user.fetch({
                success: function () {
                    userViewScope.render();
                }
            });
        },

        unfollow: function (id) {
            var userViewScope = this;
            this.user.unfollow(id);
            this.user.fetch({
                success: function () {
                    userViewScope.render();
                }
            });
        }
    });

    return UserView;
});