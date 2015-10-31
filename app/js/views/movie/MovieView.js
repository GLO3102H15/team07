define([
    'jquery',
    'underscore',
    'backbone',
    'models/movie/MovieModel',
    'text!templates/movie/movieTemplate.html'
], function($, _, Backbone, MovieModel, movieTemplate){

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
            console.log(this.model.toJSON());
        }
    });

    return MovieView;
});