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
            var actorView = this;
            this.model = new ActorModel({id: id});
            this.model.fetch({
                success: function () {
                    actorView.render();
                }
            });
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
        }
    });

    return ActorView;
});