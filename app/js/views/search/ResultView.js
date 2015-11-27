define([
    'jquery',
    'underscore',
    'backbone',
    'models/search/SearchModel'
], function($, _, Backbone, SearchModel) {
    var SearchResultsView = Backbone.View.extend({
        tagName: "ul",
        id: "results-list",
        initialize: function() {
            this.model.on("change:searchResults", this.displayResults, this);
        },
        displayResults: function(model, results) {
        }
    });

    return SearchResultsView;
});
