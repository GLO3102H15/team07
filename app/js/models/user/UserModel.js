define([
    'underscore',
    'backbone',
    'lib/gravatar/gravatar'
], function (_, Backbone, Gravatar) {

    var UserModel = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/users/',

        parse: function (response) {
            response.avatar = Gravatar.generate(response.email);
            return response;
        }
    });

    return UserModel;
});
