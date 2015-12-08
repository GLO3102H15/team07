define([
    'jquery',
    'underscore',
    'backbone',
    'views/movie/MovieThumbnailView',
    'text!templates/watchlist/watchlistTemplate.html'
], function($, _, Backbone, MovieThumbnailView, watchlistTemplate){

    var WatchlistView = Backbone.View.extend({

        el: $("#page"),

        template: _.template(watchlistTemplate),

        initialize: function (model) {
            var watchlistScope = this;
            this.watchlist = model;
            this.listenTo(this.watchlist, 'change', this.addAll);
            this.$el.html(this.template());
            this.watchlist.fetch({
                success: function () {
                    watchlistScope.render();
                }
            });
        },

        render: function(){
            if (this.watchlist.get('movies').models.length) {
                this.$('#watchlist-thumbnails').show();
                this.$('#empty-watchlist').hide();
            } else {
                this.$('#empty-watchlist').show().text("There are no movies!");
                this.$('#watchlist-thumbnails').hide();
            }
        },

        addOne: function(movie){
            var view = new MovieThumbnailView({model: movie});
            this.$('#watchlist-thumbnails').append(view.render().$el);
        },

        addAll: function() {
            _.each(this.watchlist.get('movies').models, this.addOne);
            if ($.cookie('user').name !== this.watchlist.get("owner").name) {
                $(".close").hide();
            }
        }
    });

    return WatchlistView;
});
