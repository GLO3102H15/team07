define([
    'jquery',
    'underscore',
    'backbone',
    'views/watchlist/WatchlistThumbnailView',
    'text!templates/watchlist/watchlistsTemplate.html'
], function($, _, Backbone, WatchlistThumbnailView, watchListsTemplate){

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
            this.$('#watchlist-title h1 strong').text(this.watchlists.user + "'s Watchlists");
            if (this.watchlists.length) {
                this.$('#watchlist-thumbnails').show();
                this.$('#empty-watchlist').hide();
            } else {
                this.$('#watchlist-thumbnails').hide();
                this.$('#empty-watchlist').show();
            }
            if($.cookie('user').name === this.watchlists.user) {
                this.$('#new-watchlist').show();
            } else {
                this.$('#new-watchlist').hide();
            }
        },

        addOne: function(watchlist){
            var view = new WatchlistThumbnailView({model: watchlist});
            this.$('#watchlist-thumbnails').append(view.render().$el);
        },

        addAll: function() {
            this.watchlists.each(this.addOne, this);
        },

        addWatchlist: function () {
            debugger;
            var watchlistName = this.input.val();
            var watchlistWithSameName = this.watchlists.findWhere({name: watchlistName});
            if (!watchlistName ) {
                this.showMessageError("A watchlist must have a name!");
            }
            else if (watchlistWithSameName) {
                this.showMessageError("This name is already taken. Please choose another!");
            }
            else {
                var user = this.watchlists.user;
                this.watchlists.create({
                    name: watchlistName,
                    owner: user
                }, {wait: true});
            }
        },

        showMessageError: function (message) {
            $("#validation-alert").text(message).removeClass('hide')
                .fadeTo(3000, 500).slideUp(500, function(){
                $(this).addClass('hide');
            });
        }
    });

    return WatchlistsView;
});
