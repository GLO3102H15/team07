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

        initialize: function (collectionId, episodeNumber) {
            this.model = new EpisodeModel({collectionId: collectionId});
            var self = this;
            this.model.fetch({
                success: function (modal) {
                    self.modal = modal;
                    self.show(episodeNumber);
                }
            });
        },

        show: function(episodeNumber) {
            var info = this.modal.attributes.results[episodeNumber];
            $("#episode-info").html(this.template(info));
            //this.videoPreview = new YoutubeView(info.collectionName + " episode " + info.trackNumber);
        },

        render: function(){
           temp =$("#episode-info").html()+$("#video-preview").html();
            this.$el.html(temp);
            return this;
        }
    });

    return ModalView;
});
