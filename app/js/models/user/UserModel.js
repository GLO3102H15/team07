define([
    'underscore',
    'backbone',
    'md5'
], function (_, Backbone, md5) {

    var UserModel = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/users/',

        parse: function (response) {
            response.avatar = this.generateGravatar(response.email);
            return response;
        },

        generateGravatar: function (email) {
            var hashedEmail = md5(email.trim().toLowerCase());
            return "http://www.gravatar.com/avatar/" + hashedEmail;
        }
    });

    return UserModel;
});
