define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/resultTemplate.html'
], function($, _, Backbone, resultTemplate) {
    var ResultView = Backbone.View.extend({
        el: $("#page"),
        template: _.template(resultTemplate),

        initialize: function() {
            this.model.on("change:searchResults", this.displayResults, this);
        },
        displayResults: function(model, results) {
            $("#home-navbar").click();
            console.log(results);
            console.log("modele");
            console.log(model.toJSON());
            this.$el.html(this.template(model.toJSON()));
        }
    });

    return ResultView;
});
