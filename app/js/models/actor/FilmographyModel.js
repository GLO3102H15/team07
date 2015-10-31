define([
    'backbone'
], function(Backbone) {
    var FilmographyModel = Backbone.Model.extend({
        urlRoot: function () {
            return 'https://umovie.herokuapp.com/unsecure/actors/' + this.attributes.artistId + "/movies";
        },
        defaults: {
            artistId: 0,
            wrapperType: "",
            kind: "",
            trackId: 0,
            artistName: "",
            trackName: "",
            trackCensoredName: "",
            trackViewUrl: "",
            previewUrl: "",
            artworkUrl30: "",
            artworkUrl60: "",
            artworkUrl100: "",
            collectionPrice: 0,
            trackPrice: 0,
            collectionHdPrice: 0,
            trackHdPrice: 0,
            releaseDate: "",
            collectionExplicitness: "",
            trackExplicitness: "",
            trackTimeMillis: 0,
            country: "",
            currency: "",
            primaryGenreName: "",
            contentAdvisoryRating: "",
            longDescription: "",
            radioStationUrl: ""
        }
    });

    return FilmographyModel;
});