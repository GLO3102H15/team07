define(['underscore',
    'backbone'
], function(_, Backbone) {

    var EpisodeModel = Backbone.Model.extend({
        urlRoot: function () {
            return 'https://umovie.herokuapp.com/tvShows/season/' + this.attributes.collectionId + "/episodes";
        },

        parse: function (response) {
            var resultatsEpisode = response;
            var i;
            for(i=0;i < resultatsEpisode.results.length;i++){
                var seconds = Math.floor(resultatsEpisode.results[i].trackTimeMillis / 1000);
                var minutes = Math.floor(seconds / 60);
                var hours = Math.floor(minutes / 60);
                minutes = minutes - (hours * 60);
                if(hours < 1){
                    resultatsEpisode.results[i].duration= minutes + ' min';
                }else{
                    resultatsEpisode.results[i].duration= hours+ ' hr '+ minutes + ' min';
                }
                resultatsEpisode.results[i].position = i;
            }
            return resultatsEpisode;
        }
    });

    return EpisodeModel;
});


