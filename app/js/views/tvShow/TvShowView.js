define([
    'jquery',
    'underscore',
    'backbone',
    'models/tvshow/TvShowModel',
    'views/YoutubeView',
    'views/tvShow/EpisodeView',
    'views/tvShow/ModalView',
    'text!templates/tvShow/tvShowTemplate.html',
    'collections/tvshow/TvShowCollection',
    'lib/bootstrapModal/BootstrapModal'
], function($, _, Backbone, tvModel, YoutubeView, EpisodeView, ModalView, tvShowTemplate, TvShowCollection,BootstrapModal){

    var TvShowView = Backbone.View.extend({
        el: $("#page"),

        events: {
            "click #something" : "modalWindow"
        },


        template: _.template(tvShowTemplate),
        initialize: function (tvmodel) {
            var self = this;
            var tvShowViewScope = this;

            this.tvShowModel = tvmodel;
            this.artistId = this.id;
            this.tvShowModel.fetch({
                success: function () {
                    tvShowViewScope.render();
                    this.episodesView = new EpisodeView(self.artistId);
                }
            });
            return this;
        },

        render: function () {
            this.$el.html(this.template(this.tvShowModel.toJSON()));
            this.videoPreview = new YoutubeView(this.tvShowModel.get('collectionName'));
        },

        modalWindow: function(e){
            e.preventDefault();
            var episodeNumber = $(e.target).attr('id');
            var view= new ModalView(this.id, episodeNumber);
            setTimeout(function() {
                var modal = new Backbone.BootstrapModal({
                    showFooter: false,
                    content:view,
                }).open();
            }, 1000);
        }
    });

    return TvShowView;
});
