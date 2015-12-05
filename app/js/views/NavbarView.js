define([
    'jquery',
    'underscore',
    'backbone',
    'lib/jquery-ui/jquery-ui.min',
    'text!templates/navbar.html'
], function($, _, Backbone, ui, navbar_template) {
    var NavbarView = Backbone.View.extend({
        el: $("#navbar"),
        template: _.template(navbar_template),

        initialize: function() {
            _.bindAll(this, 'search');
        },

        events: {
            'input #search-container' : 'search'
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
            $(function () {
                var getData = function (request, response) {
                        $.getJSON(
                        "https://umovie.herokuapp.com/search/tvshows/seasons?q=" + request.term,
                        function (data1) {
                            $.getJSON(
                                "https://umovie.herokuapp.com/search/movies?q=" + request.term,
                                function (data2) {
                                    var data = [data1.results[0].collectionName, data2.results[0].trackName];
                                    response(data);
                                })
                        })
                };

                var selectItem = function (event, ui) {
                    $("#search-input-field").val(ui.item.value);
                    return false;
                };

                $("#search-input-field").autocomplete({
                    source: getData,
                    select: selectItem,
                    minLength: 2,
                    change: function() {
                        window.location.hash = encodeURI("#search/" + document.getElementById("search-input-field").value);
                    }
                });
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