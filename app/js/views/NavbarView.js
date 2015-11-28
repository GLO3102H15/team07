define([
    'jquery',
    'underscore',
    'backbone',
    'views/search/SearchView',
    'views/search/ResultView',
    'models/search/SearchModel',
    'text!templates/navbar.html'
], function($, _, Backbone, SearchView, ResultView, SearchModel, navbar_template) {
    var NavbarView = Backbone.View.extend({
        el: $("#navbar"),
        template: _.template(navbar_template),

        initialize: function() {
            _.bindAll(this, 'search');
        },

        events: {
            'change #search-container' : 'search'
        },

        render: function(auth) {
            this.$el.empty();
            if(auth){
                var user = $.cookie('user');
                this.$el.html(this.template(user));
            }
            return this;
        },

        search: function(event) {
            var value = document.getElementById("search-input-field").value;
            var searchModel = new SearchModel();
            var searchView = new SearchView({ model: searchModel });
            var resultView = new ResultView({ model: searchModel });

            searchView.getResults(value);
        },

        home: function(event) {
            if(event) {
                jQuery(event.target.parentElement).addClass("active");
            }
            this.indexView.render();
        }
    });

    return NavbarView;
});