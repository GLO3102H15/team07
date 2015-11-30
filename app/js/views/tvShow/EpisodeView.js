define([
    'jquery',
    'underscore',
    'backbone',
    'models/tvshow/EpisodeModel',
    'views/YoutubeView',
    'text!templates/tvShow/tvShowEpisodeTemplate.html'
], function($, _, Backbone, EpisodeModel, YoutubeView, TvEpisodeTemplate) {
    var EpisodeView = Backbone.View.extend({
        template: _.template(TvEpisodeTemplate),

        initialize: function (collectionId) {

            this.model = new EpisodeModel({collectionId: collectionId});
            this.model.set("collectionId", collectionId);

            var self = this;

            this.model.fetch({

                success: function (tvShow) {
                    self.tvShow = tvShow;
                    self.render();
                }
            });
            return this;
        },

        render: function() {
            $("#tv-show-episode").html(this.template({tvShows: this.tvShow.attributes.results}));
            //this.videoPreview = new YoutubeView(this.model.get('trackName'));
            return this;
        }
    });

    return EpisodeView;
});
