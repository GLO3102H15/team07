require.config({
    paths: {
        jquery: 'vendor/jquery/dist/jquery.min',
        underscore: 'vendor/underscore/underscore-min',
        backbone: 'vendor/backbone/backbone-min',
        text: 'vendor/text/text',
        bootstrap: 'vendor/bootstrap/dist/js/bootstrap.min',
        templates: '../templates'
    },

    shim: {
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

require([
    'jquery',
    'bootstrap',
    'app'
], function($, Bootstrap, App) {
    App.initialize();
});
