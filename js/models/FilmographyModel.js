var FilmographyModel = Backbone.Model.extend({
    defaults: {
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