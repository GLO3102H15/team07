define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
        var SearchModel = Backbone.Model.extend({
            initialize: function(obj) {
                this.set("results", ["no Results"]);
                this.set("filteredResults", []);
                this.set("filters", []);
                this.filterAttribute = obj.filterAttribute;
                this.fetchCallback = obj.fetchCallback;
            },

            performSearch: function(value) {
                var self = this;
                self.fetchCallback(self, value);
            },

            updateResults: function(results) {
                this.set({"results": results});
                this.set("filters", []);
            },

            filterResults: function() {
                var attribute = this.filterAttribute;
                this.set("byFilter", {});
                var genres = this.get("byFilter");
                this.get('results').forEach(function(element) {
                    if(!genres[element[attribute]]) {
                        genres[element[attribute]] = [];
                    }
                    genres[element[attribute]].push(element);
                });
                this.set("genres", Object.keys(genres));
            },

            forEachAvailableFilter: function(callback) {
                this.filterResults();
                this.get('genres').forEach(function(filter) {
                    callback(filter);
                });
            },

            addFilter: function(filterName) {
                var filters = this.get("filters");
                if($.inArray(filterName, filters) > -1) {
                    return;
                }
                filters.push(filterName);

                this.refreshFilteredResults();
            },

            removeFilter: function(filterName) {
                var filters = this.get("filters");
                var index = filters.indexOf(filterName);
                if (index !== -1) {
                    filters.splice(index, 1);
                }

                this.refreshFilteredResults();
            },

            refreshFilteredResults: function() {
                var filters = this.get("filters");
                var byFilter = this.get("byFilter");
                var shownResults = [];
                filters.forEach(function(filter) {
                    shownResults.push.apply(shownResults, byFilter[filter]);
                });
                this.set("filteredResults", shownResults);
            },

            resetFilters: function() {
                this.set("filters", []);
                this.set("filteredResults", this.get("results"));
            }
        });

    return SearchModel;
});
