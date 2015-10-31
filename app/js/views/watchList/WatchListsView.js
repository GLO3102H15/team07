define([
    'jquery',
    'underscore',
    'backbone',
    'views/watchlist/WatchlistThumbnailView',
    'text!templates/watchlist/watchlistsTemplate.html'
], function($, _, Backbone, WatchlistThumbnailView, watchListsTemplate){

    var StubMovieList =  [
        {
            appleURL: "https://itunes.apple.com/us/movie/the-martian/id1039586890?uo=4",
            date: "Fri Oct 02 2015 03:00:00 GMT-0400 (EDT)",
            description: "From legendary director Ridley Scott (Alien, Prometheus) comes a gripping tale of human strength and the will to survive. During a mission to Mars, American astronaut Mark Watney (Matt Damon) is presumed dead and left behind. But Watney is still alive. Against all odds, he must find a way to contact Earth in the hope that scientists can devise a rescue plan to bring him home.",
            genre: "Sci-Fi & Fantasy",
            id: "1039586890",
            poster: "http://is2.mzstatic.com/image/thumb/Video69/v4/cd/55/af/cd55afac-b2ed-cff9-1680-3af005241e98/posterart_US.jpg/1680x1680bb-85.jpg",
            rating: "PG-13",
            title: "The Martian",
        },
        {
            appleURL: "https://itunes.apple.com/us/movie/back-to-the-future/id380239015?uo=4",
            date: "Wed Jul 03 1985 03:00:00 GMT-0400 (EDT)",
            description: "From the Academy Award-winning filmmakers Steven Spielberg and Robert Zemeckis comes Back to the Future - the original, groundbreaking adventure that sparked one of the most successful trilogies ever! When teenager Marty McFly (Michael J. Fox) is blasted to 1955 in the DeLorean time machine created by the eccentric Doc Brown (Christopher Lloyd), he finds himself mixed up in a time-shattering chain reaction that could vaporize his future - and leave him trapped in the past. Powered by innovative special effects, unforgettable songs and non-stop action, Back to the Future is an unrivaled adventure that stands the test of time.",
            genre: "Comedy",
            id: "380239015",
            poster: "http://is2.mzstatic.com/image/thumb/Video/b1/e2/bd/mzl.ecliikoq.jpg/1680x1680bb-85.jpg",
            rating: "PG",
            title: "Back to the Future",
        }
    ];

    var WatchlistsView = Backbone.View.extend({
        el: $("#page"),

        template: _.template(watchListsTemplate),


        events: {
            "click #new-watchlist button":  "addWatchlist"
        },
        
        initialize: function (collection) {
            this.watchlists = collection;
            this.listenTo(this.watchlists, 'add', this.addOne);
            this.listenTo(this.watchlists, 'reset', this.addAll);
            this.listenTo(this.watchlists, 'all', this.render);
            this.$el.html(this.template());
            this.input = this.$("#new-watchlist input");
            this.watchlists.fetch();
        },

        render: function(){
            if (this.watchlists.length) {
                this.$('#watchlist-thumbnails').show();
            } else {
                this.$('#watchlist-thumbnails').hide();
            }
        },

        addOne: function(watchlist){
            debugger;
            console.log(watchlist);
            var view = new WatchlistThumbnailView({model: watchlist});
            this.$('#watchlist-thumbnails').append(view.render().$el);
        },

        addAll: function() {
            this.watchlists.each(this.addOne, this);
        },

        addWatchlist: function () {
            debugger;
            var watchlistName = this.input.val();
            if (!watchlistName) { return; }
            var user = this.watchlists.user;
            this.watchlists.create({
                name: watchlistName,
                owner: user,
                movies: StubMovieList
            }, {wait: true});
        }
    });

    return WatchlistsView;
});
