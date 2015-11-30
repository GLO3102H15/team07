define(['underscore',
    'backbone'
], function(_, Backbone) {

    var EpisodeModel = Backbone.Model.extend({
        urlRoot: function (id) {
            return 'https://umovie.herokuapp.com/tvShows/season/' + this.attributes.collectionId + "/episodes";
        },

        parse: function (response) {
            var resultatsEpisode = response;
            var i;
            for(i=0;i < resultatsEpisode.results.length;i++){
                var seconds = Math.floor(resultatsEpisode.results[i].trackTimeMillis / 1000);
                var minutes = Math.floor(seconds / 60);
                var seconds = seconds - (minutes * 60);
                resultatsEpisode.results[i].duration= minutes + 'm' + seconds+ 's';
            }
            return resultatsEpisode;
        }
    });

    return EpisodeModel;
});


