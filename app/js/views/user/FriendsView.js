define([
    'jquery',
    'underscore',
    'backbone',
    'models/user/UserModel',
    'views/user/UserView',
    'text!templates/user/friendsTemplate.html'
], function ($, _, Backbone, UserModel, UserView, FriendsTemplate) {

    var FriendsView = Backbone.View.extend({
        el: $("#page"),

        template: _.template(FriendsTemplate),

        initialize: function (model) {
            var friendsViewScope = this;
            this.user = new UserModel($.cookie("user"));
            this.model = model;
            var renderView = _.after(2, function () {
                friendsViewScope.render();
            });
            this.model.fetch({success: renderView});
            this.user.fetch({success: renderView});
        },

        render: function () {
            var friendsViewScope = this;
            this.$el.html(this.template({userName: this.model.get("name")}));
            var friends = this.model.get("following");
            for (var i = 0; i < friends.length; i++) {
                var friendModel = new UserModel(friends[i]);
                friendModel.fetch({
                    success: function (model) {
                        $("#container").append("<div id='friend-panel-" + model.get("id") +  "' class='row'></div>");
                        var view = new UserView(model, friendsViewScope.user, $('#friend-panel-' + model.get("id")));
                    }
                });
            }
        }
    });

    return FriendsView;
});