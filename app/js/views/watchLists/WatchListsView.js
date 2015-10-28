define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/watchLists/watchListsTemplate.html'
], function($, _, Backbone, watchListsTemplate){

    var WatchListsView = Backbone.View.extend({
        el: $("#page"),

        render: function(){
            this.$el.html(watchListsTemplate);
        }

    });

    return WatchListsView;
});
