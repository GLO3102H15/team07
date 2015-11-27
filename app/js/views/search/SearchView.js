define([
    'jquery',
    'underscore',
    'backbone',
    'models/search/SearchModel'
], function($, _, Backbone, SearchModel) {
    var SearchFormView = Backbone.View.extend({
        tagName: "form",
        id: "flight-options",

        initialize: function () {
            var self = this;
            this.model = new SearchModel();
        },

        getResults: function(value) {
            this.model.performSearch(value);
        }
    });

    return SearchFormView;
});
