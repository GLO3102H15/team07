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
            $("#validation-alert").hide();
            if (this.watchlists.length) {
                this.$('#watchlist-thumbnails').show();
            } else {
                this.$('#watchlist-thumbnails').hide();
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
            $("#validation-alert").text(message).removeClass('hide');
            $("#validation-alert").fadeTo(2000, 500).slideUp(500, function(){
                $("#validation-alert").addClass('hide');
            });
        }
    });

    return WatchlistsView;
});
