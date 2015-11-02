define([
    'jquery',
    'underscore',
    'backbone',
    'models/movie/MovieModel',
    'collections/watchlist/WatchlistCollection',
    'models/watchlist/WatchlistModel',
    'views/YoutubeView',
    'text!templates/movie/movieTemplate.html',
], function ($, _, Backbone, MovieModel, WatchlistCollection, WatchlistModel, YoutubeView, movieTemplate) {

    var MovieView = Backbone.View.extend({
        el: $("#page"),

        template: _.template(movieTemplate),

        events: {
            "click .movie-buttons .btn": "addToWatchlist",
        },

        initialize: function (model) {
            var movieViewScope = this;
            this.model = model;

            var owner = {
                "email": "team07@gmail.com",
                "name": "team07",
                "following": [],
                "id": "5634d66a0986b8030010f59a"
            }
            this.watchlists = new WatchlistCollection(owner);

            var renderView = _.after(2, function () {
                movieViewScope.render();
            });
            this.model.fetch({success: renderView});
            this.watchlists.fetch({success: renderView});
        },

        render: function () {
            var values = this.model.attributes;
            values['watchlists'] = this.watchlists;
            this.$el.html(this.template(values));
            this.videoPreview = new YoutubeView(this.model.attributes.title);
        },

        addToWatchlist: function () {
            var watchlistID = $('#watchlist-dropdown').val();
            if (watchlistID !== null){
                var watchlist = new WatchlistModel({id: watchlistID});
                watchlist.movies.create({
                    "wrapperType": "track",
                    "kind": "feature-movie",
                    "trackId": 265727087,
                    "artistName": "James Wan",
                    "trackName": "Saw",
                    "trackCensoredName": "Saw",
                    "trackViewUrl": "https://itunes.apple.com/us/movie/saw/id265727087?uo=4",
                    "previewUrl": "http://a978.v.phobos.apple.com/us/r1000/097/Video/a6/aa/f2/mzm.jszrvyyu..640x360.h264lc.D2.p.m4v",
                    "artworkUrl30": "http://is5.mzstatic.com/image/pf/us/r30/Music/af/37/e2/dj.fsfobjrm.30x30-50.jpg",
                    "artworkUrl60": "http://is2.mzstatic.com/image/pf/us/r30/Music/af/37/e2/dj.fsfobjrm.60x60-50.jpg",
                    "artworkUrl100": "http://is2.mzstatic.com/image/pf/us/r30/Music/af/37/e2/dj.fsfobjrm.100x100-75.jpg",
                    "collectionPrice": 9.99,
                    "trackPrice": 9.99,
                    "trackRentalPrice": 2.99,
                    "collectionHdPrice": 12.99,
                    "trackHdPrice": 12.99,
                    "trackHdRentalPrice": 3.99,
                    "releaseDate": "2004-10-29T07:00:00Z",
                    "collectionExplicitness": "notExplicit",
                    "trackExplicitness": "notExplicit",
                    "trackTimeMillis": 6187486,
                    "country": "USA",
                    "currency": "USD",
                    "primaryGenreName": "Horror",
                    "contentAdvisoryRating": "R",
                    "longDescription": "Would you die to live? That's what two men, Adam (Leigh Whannell) and Gordon (Cary Elwes), have to ask themselves when they're paired up in a deadly situation. Abducted by a serial killer, they're trapped up in a prison constructed with such ingenuity that they may not be able to escape before their captor decides it's time to dismantle their bodies in his signature way. Attempting to break free may kill them, but staying definitely will.",
                    "radioStationUrl": "https://itunes.apple.com/station/idra.265727087"
                }, {url: watchlist.movies.url});
            }
        }
    });

    return MovieView;
});