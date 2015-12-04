define([
    'underscore',
    'backbone'
], function(_, Backbone) {
        var SearchModel = Backbone.Model.extend({
            performSearch: function(value) {
                var self = this;
                $.get("https://umovie.herokuapp.com/search/actors?" + "q=" + value).done(function(data) {
                    self.set({"actorsResult" :data.results});
                }).fail(function() {
                    console.log("failed");
                });

                $.get("https://umovie.herokuapp.com/search/movies?" + "q=" + value).done(function(data) {
                    self.set({"moviesResult" :data.results});
                }).fail(function() {
                    console.log("failed");
                });

                $.get("https://umovie.herokuapp.com/search/tvshows/seasons?" + "q=" + value).done(function(data) {
                    self.set({"tvshowsResult" :data.results});
                }).fail(function() {
                    console.log("failed");
                });

                $.get("https://umovie.herokuapp.com/search/users?" + "q=" + value).done(function(data) {
                    self.set({"usersResult" :data});
                }).fail(function() {
                    console.log("failed");
                });
            }
        })
    return SearchModel;
});
