define([
    'jquery',
    'underscore',
    'backbone',
    'models/user/UserModel',
    'text!templates/user/userTemplate.html'
], function ($, _, Backbone, UserModel, UserTemplate) {

    var UserView = Backbone.View.extend({
        el: $("#page"),

        events: {
            "click .btn-follow": "follow",
            "click .btn-unfollow": "unfollow"
        },

        template: _.template(UserTemplate),

        initialize: function (model) {
            var userViewScope = this;
            this.model = model;
            this.user = new UserModel($.cookie("user"));

            var renderView = _.after(2, function () {
                userViewScope.render();
            });
            this.model.fetch({success: renderView});
            this.user.fetch({success: renderView});
        },

        render: function () {
            this.$el.empty();
            var values = this.model.attributes;
            values["isFollowing"] = this.user.isFollowing(this.model.get("id"));
            this.$el.html(this.template(values));
        },

        follow: function () {
            this.user.follow(this.model.get("id"));
            this.render();
        },

        unfollow: function() {
            this.user.unfollow(this.model.get("id"));
            this.render();

        }
    });

    return UserView;
});