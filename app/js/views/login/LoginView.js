define([
    'jquery',
    'underscore',
    'backbone',
    'lib/gravatar/gravatar',
    'text!templates/login/loginTemplate.html'
], function ($, _, Backbone, Gravatar, LoginTemplate) {
    var LoginView = Backbone.View.extend({
        el: $("#page"),
        template: _.template(LoginTemplate),

        events: {
            'submit': 'onLogin'
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        onLogin: function (e) {
            var view = this;
            var data = $(e.target).serialize();
            $.post("https://umovie.herokuapp.com/login", data, function (result) {
                result.avatar = Gravatar.generate(result.email);
                $.cookie('user', result, {expires: 1});
                location.assign("./");
            })
                .fail(function () {
                    $('.alert').html('Login failed.').fadeIn().delay(2000).fadeOut();
                });
            return false;
        }
    });

    return LoginView;
});
