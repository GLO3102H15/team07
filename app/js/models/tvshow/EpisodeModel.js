define(['underscore',
    'backbone'
], function(_, Backbone) {
    var EpisodeModel = Backbone.Model.extend({
        urlRoot: function (id) {
            return 'https://umovie.herokuapp.com/tvShows/season/' + this.attributes.collectionId + "/episodes";
        },
        defaults: {
            wrapperType: "",
            kind: "",
            artistId: 0,
            collectionId: 0,
            trackId: 0,
            artistName: "",
            collectionName: "",
            trackName: "",
            collectionCensoredName: "",
            trackCensoredName: "",
            artistViewUrl: "",
            collectionViewUrl: "",
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
            discCount: 0,
            discNumber: 0,
            trackCount: 0,
            trackNumber: 0,
            trackTimeMillis: 0,
            country: "",
            currency: "",
            primaryGenreName: "",
            contentAdvisoryRating: "",
            shortDescription: "",
            longDescription: "",
            radioStationUrl: ""
        }
    });

    return EpisodeModel;
});


