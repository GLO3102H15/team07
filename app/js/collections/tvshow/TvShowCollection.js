define([
    'underscore',
    'backbone',
    'models/tvshow/TvShowModel'
], function(_, Backbone, TvShowModel) {
    var TvCollection = Backbone.Collection.extend({
        model: TvShowModel,
        //parse: function(response) {
        //    return response;
        //}
    });




    return TvCollection;
});

