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

        render: function(auth) {
            this.$el.empty();
            if(auth){
                var user = $.cookie('user');
                this.$el.html(this.template(user));
            }
            return this;
        },

        search: function(event) {
            window.location.hash = encodeURI("#search/" + document.getElementById("search-input-field").value);
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