define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/navbar.html'
], function($, _, Backbone, navbar_template) {
    var NavbarView = Backbone.View.extend({
        el: $("#navbar"),
        template: _.template(navbar_template),

        initialize: function() {
            _.bindAll(this, 'search');
        },

        events: {
            'change #search-container' : 'search'
        },

        render: function() {
            this.$el.html(this.template());
            return this;
        },

        search: function(event) {
            var value = document.getElementById("search-input-field").value;
            $.get("https://umovie.herokuapp.com/unsecure/search/actors?" + "q=" + value).done(function(data) {
                if(data.resultCount == 0) {
                    return;
                }

                window.location.hash = 'actor/' + data.results[0].artistId.toString();
                document.getElementById("search-input-field").value = '';
                document.getElementById("search-input-field").blur();
            }).fail(function() {
                console.log("failed");
            });
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