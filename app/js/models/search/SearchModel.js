define([
    'underscore',
    'backbone'
], function(_, Backbone) {
        var SearchModel = Backbone.Model.extend({
            initialize: function(obj) {
                this.set("results", []);
                this.fetchCallback = obj.fetchCallback;
            },

            performSearch: function(value) {
                var self = this;

                self.fetchCallback(self, value);
            }
        });

    return SearchModel;
});
