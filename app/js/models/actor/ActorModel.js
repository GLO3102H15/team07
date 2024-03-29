define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var ActorModel = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/actors/',
        
        parse: function (response) {
            return response.results[0];
        }
    });

    return ActorModel;
});