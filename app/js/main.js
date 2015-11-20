require.config({
    paths: {
        jquery: 'vendor/jquery/dist/jquery.min',
        underscore: 'vendor/underscore/underscore-min',
        backbone: 'vendor/backbone/backbone-min',
        jqueryCookie: 'vendor/jquery.cookie/jquery.cookie',
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
    'vendor/google/gapi',
    'app'
], function($, Bootstrap, gapi, App) {
    App.initialize();
});