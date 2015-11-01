define([
    'jquery',
    'underscore',
    'backbone',
    'models/movie/MovieModel',
    'views/YoutubeView',
    'text!templates/movie/movieTemplate.html'
], function($, _, Backbone, MovieModel, YoutubeView, movieTemplate){

    var MovieView = Backbone.View.extend({
        el: $("#page"),

        template: _.template(movieTemplate),

        initialize: function(model) {
            var movieViewScope = this;
            this.model = model;
            this.model.fetch({
                success: function() {
                    movieViewScope.render();
                }
            });
        },

        render: function(){
            this.$el.html(this.template(this.model.attributes));

            this.videoPreview = new YoutubeView(this.model.attributes.title);
        }
    });

    return MovieView;
});