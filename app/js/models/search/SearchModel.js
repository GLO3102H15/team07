define([
    'underscore',
    'backbone'
], function(_, Backbone) {
        var SearchModel = Backbone.Model.extend({
            performSearch: function(value) {
                var self = this;
                var actorsResult;
                var moviesResult;
                var tvShowsResult;
                $.get("https://umovie.herokuapp.com/search/actors?" + "q=" + value).done(function(data) {
                    if(data.resultCount == 0) {
                        return;
                    }
                    self.set({"searchResults" :data.results});
                }).fail(function() {
                    console.log("failed");
                });
            }
        })
    return SearchModel;
});
