define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/login/loginTemplate.html'
], function($, _, Backbone, LoginTemplate) {
    var LoginView = Backbone.View.extend({
        el: $("#page"),
        template: _.template(LoginTemplate),

        events: {
            'submit': 'onLogin'
        },

        initialize: function () {
            this.render();
        },

        render: function() {
            this.$el.html(this.template());
            return this;
        },

        onLogin: function(e){
            var data = $(e.target).serialize();
            $.post("https://umovie.herokuapp.com/login", data, function(result){
                localStorage.setItem('user', JSON.stringify(result));
                location.assign("./");
            });
            return false;
        }
    });

    return LoginView;
});
