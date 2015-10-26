var ActorView = Backbone.View.extend({
    initialize: function(obj) {
        this.templateScript = obj.templateScript;
        this.templateElement = $(obj.templateElement);

        this.render();
    },

    render: function() {
        var template = _.template(this.templateScript);
        var templateElement = this.templateElement;

        this.model.fetch({success: function(model) {
            templateElement.html(template(model.changed.results[0]));
        }});

        return this;
    }
});