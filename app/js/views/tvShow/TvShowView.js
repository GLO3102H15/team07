define([
    'jquery',
    'underscore',
    'backbone',
    'views/YoutubeView',
    'text!templates/tvShow/tvShowTemplate.html'
], function($, _, Backbone, YoutubeView, tvShowTemplate){

    var TvShowView = Backbone.View.extend({
        el: $("#page"),

        render: function(){
            this.$el.html(tvShowTemplate);
            this.videoPreview = new YoutubeView("Firefly");
        }
    });

    return TvShowView;
});
