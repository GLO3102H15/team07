define([
    'jquery',
    'underscore',
    'backbone',
    'models/tvshow/EpisodeModel',
    'views/YoutubeView',
    'text!templates/tvShow/modalTemplate.html'
], function($, _, Backbone, EpisodeModel, YoutubeView, ModalTemplate) {
    var ModalView = Backbone.View.extend({
        template: _.template(ModalTemplate),

        initialize: function (collectionId, episodeId) {
            this.model = new EpisodeModel({collectionId: collectionId});
            this.model.set("collectionId", collectionId);

            var self = this;
            this.model.fetch({

                success: function (modal) {
                    self.modal = modal;
                    self.render(episodeId);
                }
            });
            return this;
        },

        render: function(episodeId) {
            $("#modal").html(this.template(this.modal.attributes.results[episodeId]));
            //this.videoPreview = new YoutubeView(this.model.get('trackName'));
            return this;
        }
    });

    return ModalView;
});
