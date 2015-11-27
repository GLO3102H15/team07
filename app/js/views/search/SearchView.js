define([
    'jquery',
    'underscore',
    'backbone',
    'models/search/SearchModel'
], function($, _, Backbone, SearchModel) {
    var SearchFormView = Backbone.View.extend({
        tagName: "form",
        id: "flight-options",
        events: {
            "click input": "getResults"
        },

        initialize: function () {
            var self = this;
            this.model = new SearchModel();
        },

        getResults: function() {
            this.model.performSearch();
        }
    });

    return SearchFormView;
});
