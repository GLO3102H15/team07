define([
    'underscore',
    'backbone',
    'models/tvshow/EpisodeModel'
], function(_, Backbone, TvShowModel) {

    var TvCollection = Backbone.Collection.extend({
        model: TvShowModel,
    });

    return TvCollection;
});

