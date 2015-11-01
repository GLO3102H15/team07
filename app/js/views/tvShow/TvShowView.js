define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/tvShow/tvShowTemplate.html'
], function($, _, Backbone, tvShowTemplate){

    var TvShowView = Backbone.View.extend({
        el: $("#page"),

        render: function(){
            this.$el.html(tvShowTemplate);
        }
    });

    return TvShowView;
});
