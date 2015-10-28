define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var ActorModel = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/unsecure/actors/',
        defaults: {
            wrapperType: "",
            artistType: "",
            artistName: "",
            artistLinkUrl: "",
            artistId: 0,
            amgArtistId: 0,
            primaryGenreName: "",
            primaryGenreId: 0,
            radioStationUrl: ""
        },
        idAttribute: "artistId"
    });

    return ActorModel;
});