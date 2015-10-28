define([
    'jquery',
    'underscore',
    'backbone',
    'models/actor/ActorModel',
    'text!templates/actor/actorTemplate.html'
], function($, _, Backbone, ActorModel, actorTemplate){

    var ActorView = Backbone.View.extend({
        el: $("#page"),

        template: _.template(actorTemplate),

        initialize: function() {
            this.model = new ActorModel();
            this.model.set("artistId", 347084658);
            this.model.fetch({});
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
        }

    });

    return ActorView;
});
/*
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

 var actor_model = new ActorModel();
 actor_model.set("artistId", 347084658);
 var actor_view = new ActorView({
 model: actor_model,
 templateScript: $("#actorInfoTemplate").html(),
 templateElement: $("#actorInfo")
 });
*/