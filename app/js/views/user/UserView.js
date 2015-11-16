define([
    'jquery',
    'underscore',
    'backbone',
    'models/user/UserModel',
    'text!templates/user/userTemplate.html'
], function ($, _, Backbone, UserModel, UserTemplate) {

    var UserView = Backbone.View.extend({
        el: $("#page"),

        template: _.template(UserTemplate),

        initialize: function (model) {
            var userViewScope = this;
            this.model = model;
            this.model.fetch({success: function(){
                    userViewScope.render();
                }
            });
        },

        render: function () {
            var values = this.model.attributes;
            this.$el.html(this.template(values));
        }
    });

    return UserView;
});