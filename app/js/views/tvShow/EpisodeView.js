define([
    'jquery',
    'underscore',
    'backbone',
    'models/tvshow/EpisodeModel',
    'text!templates/tvShow/tvShowEpisodeTemplate.html'
], function($, _, Backbone, EpisodeModel, TvEpisodeTemplate) {
    var EpisodeView = Backbone.View.extend({
        template: _.template(TvEpisodeTemplate),

        initialize: function (collectionId) {
            this.model = new EpisodeModel();
            this.model.set("collectionId", collectionId);

            var self = this;
            var renderView = _.after(1, function () {
                self.render();
            });
            this.model.fetch({

                success: function (tvShow) {
                    //console.log(tvShow.defaults.collectionHdPrice);
                    self.tvShows = tvShow;
                    renderView();
                }
            });
            return this;
        },

        render: function() {
            $("#tv-show-episode").html(this.template({tvShows: this.tvShows.changed.results}));
            return this;
        }
    });

    return EpisodeView;
});
