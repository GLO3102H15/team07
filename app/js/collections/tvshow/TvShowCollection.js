define([
    'underscore',
    'backbone',
    'models/tvshow/EpisodeModel'
], function(_, Backbone, TvShowModel) {
    var TvCollection = Backbone.Collection.extend({
        model: TvShowModel,
        //parse: function(response) {
        //    return response;
        //}
    });




    return TvCollection;
});

