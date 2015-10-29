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

        initialize: function(id) {
            var movieViewScope = this;
            this.model = new MovieModel({id: id});
            this.model.fetch({
                success: function() {
                    movieViewScope.render();
                }
            });
        },

        render: function(){
            console.log(this.model.attributes);
            this.$el.html(this.template(this.model.attributes));
        }
    });

    return MovieView;
});