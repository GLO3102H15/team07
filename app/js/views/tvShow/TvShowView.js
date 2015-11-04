define([
    'jquery',
    'underscore',
    'backbone',
    'models/tvshow/TvShowModel',
    'views/YoutubeView',
    'views/tvShow/EpisodeView',
    'text!templates/tvShow/tvShowTemplate.html',
    'collections/tvshow/TvShowCollection'
], function($, _, Backbone, tvModel, YoutubeView, EpisodeView, tvShowTemplate, TvShowCollection){

    var TvShowView = Backbone.View.extend({
        el: $("#page"),

        template: _.template(tvShowTemplate),



        initialize: function (tvmodel) {
            var self = this;

            var tvShowViewScope = this;
            this.tvShowModel = tvmodel;

            //this.tvShows = new TvShowCollection(model);

            this.artistId = this.id;
            //this.episodeView = new EpisodeView(this.model.id);
            this.tvShowModel.fetch({
                success: function () {
                    tvShowViewScope.render();
                    this.episodesView = new EpisodeView(self.artistId);
                }
            });
            console.log(this.artistId);



            return this;



        },

        render: function () {
            console.log("dans render view tv show");

            var values = this.tvShowModel;


            this.$el.html(this.template(this.tvShowModel.toJSON()));

            console.log(this.$el);



            //this.$el.html(this.template(values));



            this.videoPreview = new YoutubeView(this.tvShowModel.get('trackName'));
            return this;
        }
    });

    return TvShowView;
});
