define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/login/signupTemplate.html'
], function($, _, Backbone, SignupTemplate) {
    var LoginView = Backbone.View.extend({
        el: $("#page"),
        template: _.template(SignupTemplate),

        events: {
            'submit': 'onSignup'
        },

        initialize: function () {
            this.render();
        },

        render: function() {
            this.$el.html(this.template());
            return this;
        },

        onSignup: function(e){
            var data = $(e.target).serialize();
            $.post("https://umovie.herokuapp.com/signup", data, function(){
                $.post("https://umovie.herokuapp.com/login", data, function(result) {
                    $.cookie('user', result);
                    location.assign("./");
                });
            });
            return false;
        }
    });

    return LoginView;
});
