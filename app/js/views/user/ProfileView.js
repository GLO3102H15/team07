define([
    'jquery',
    'underscore',
    'backbone',
    'models/user/UserModel',
    'views/user/UserView'
], function ($, _, Backbone, UserModel, UserView) {

    var ProfileView = Backbone.View.extend({
        el: $("#page"),

        initialize: function (model) {
            var userViewScope = this;
            this.model = model;
            this.user = new UserModel($.cookie("user"));
            this.user.fetch({success: function() {
                userViewScope.render()
                }
            });
        },

        render: function () {
            this.$el.html("<div id='container' class='container'></div>");
            $("#container").html("<div id='profile-panel' class='row'></div>");
            var view = new UserView(this.model, this.user, $('#profile-panel'));
        }
    });

    return ProfileView;
});