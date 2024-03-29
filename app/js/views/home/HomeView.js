define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/home/homeTemplate.html'
], function($, _, Backbone, homeTemplate){

    var HomeView = Backbone.View.extend({
        el: $("#page"),

        initialize: function() {
            this.render();
        },

        render: function(){
            this.$el.html(homeTemplate);
        }

    });

    return HomeView;
});