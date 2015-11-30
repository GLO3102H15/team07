define([
    'underscore',
    'backbone'
], function(_, Backbone) {
        var SearchModel = Backbone.Model.extend({
            performSearch: function(value) {
                var self = this;
                var everySearchResults = {};
                $.get("https://umovie.herokuapp.com/search/actors?" + "q=" + value).done(function(data) {
                    if(data.resultCount == 0) {
                        return;
                    }
                    self.set({"actorsResult" :data.results});
                    $("#no-search-result").html('');
                }).fail(function() {
                    console.log("failed");
                });

                $.get("https://umovie.herokuapp.com/search/movies?" + "q=" + value).done(function(data) {
                    if(data.resultCount == 0) {
                        return;
                    }
                    self.set({"moviesResult" :data.results});
                    $("#no-search-result").html('');
                }).fail(function() {
                    console.log("failed");
                });

                $.get("https://umovie.herokuapp.com/search/tvshows/seasons?" + "q=" + value).done(function(data) {
                    if(data.resultCount == 0) {
                        return;
                    }
                    self.set({"tvshowsResult" :data.results});
                    $("#no-search-result").html('');
                }).fail(function() {
                    console.log("failed");
                });

            }
        })
    return SearchModel;
});
