define([
    'underscore',
    'backbone',
    'lib/gravatar/gravatar'
], function (_, Backbone, Gravatar) {

    var UserModel = Backbone.Model.extend({
        urlRoot: "https://umovie.herokuapp.com/users/",

        parse: function (response) {
            response.avatar = Gravatar.generate(response.email);
            return response;
        },

        isFollowing: function (userID) {
            if(this.get("id") === userID) {return -1;}
            return _.some(this.get('following'), function(user){
                user._id === userID;
            });
        },

        follow: function (userID) {
            $.ajax({
                url: "https://umovie.herokuapp.com/follow",
                type: "POST",
                data: JSON.stringify({id: userID}),
                contentType:"application/json",
                dataType:"json"
            });
        },

        unfollow: function (userID) {
            $.delete("https://umovie.herokuapp.com/follow/" + userID);
        }
    });

    return UserModel;
});
