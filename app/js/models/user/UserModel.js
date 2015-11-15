define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var UserModel = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/users/'
    });

    return UserModel;
});
