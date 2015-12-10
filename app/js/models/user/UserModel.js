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

        isFollowing: function (id) {
            if(this.get("id") === id) {return -1;}
            return _.some(this.get('following'), function(user){
                return user.id === id;
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
            this.get('following').push({id: userID});
        },

        unfollow: function (userID) {
            $.ajax({
                url: "https://umovie.herokuapp.com/follow/" + userID,
                type: "DELETE"
            });
            this.set('following', _.without(this.get('following'), _.findWhere(this.get('following'), {id: userID})));
        }
    });

    return UserModel;
});
