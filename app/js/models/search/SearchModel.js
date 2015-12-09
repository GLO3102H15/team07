define([
    'underscore',
    'backbone'
], function(_, Backbone) {
        var SearchModel = Backbone.Model.extend({
            initialize: function(obj) {
                this.set("results", []);
                this.set("shownResults", []);
                this.set("currentGenre", "all");
                this.fetchCallback = obj.fetchCallback;
            },

            performSearch: function(value) {
                var self = this;
                self.fetchCallback(self, value);
            },

            updateResults: function(results) {
                this.set({"results": results});
                this.set("currentGenre", "all");
            },

            sortGenres: function() {
                this.set("byGenres", {"all": this.get('results')});
                var genres = this.get('byGenres');
                this.get('results').forEach(function(element) {
                    if(!genres[element.primaryGenreName]) {
                        genres[element.primaryGenreName] = [];
                    }
                    genres[element.primaryGenreName].push(element);
                });
                this.set("genres", Object.keys(genres));
            },

            forEachGenre: function(callback) {
                this.sortGenres();
                this.get('genres').forEach(function(genre) {
                    callback(genre);
                });
            },

            filterByGenre: function(genre) {
                this.set("shownResults", this.get('byGenres')[genre]);
                this.set("currentGenre", genre);
            }
        });

    return SearchModel;
});
