define([
    'underscore',
    'backbone'
], function(_, Backbone) {
        var SearchModel = Backbone.Model.extend({

            performSearch: function(value) {
                $.get("https://umovie.herokuapp.com/search/actors?" + "q=" + value).done(function(data) {
                    if(data.resultCount == 0) {
                        return;
                    }
                    console.log("This is what the api returned : ");
                    console.log(data);
                }).fail(function() {
                    console.log("failed");
                });
            },
            _searchComplete: function(results) {
                this.set("searchResults", results);
            }
        })
    return SearchModel;
});
