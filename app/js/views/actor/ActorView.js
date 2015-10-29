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

        initialize: function(id) {
            var actorViewScope = this;
            this.model = new ActorModel({id: id});
            this.model.fetch({
                success: function () {
                    actorViewScope.render();
                }
            });
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
        }
    });

    return ActorView;
});