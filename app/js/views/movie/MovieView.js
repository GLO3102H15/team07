define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie/movieTemplate.html'
], function($, _, Backbone, movieTemplate){

    var MovieView = Backbone.View.extend({
        el: $("#page"),

        render: function(){
            this.$el.html(movieTemplate);
        }

    });

    return MovieView;
});