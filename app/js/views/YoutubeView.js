define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) { //DONT PUT GAPI HERE

    var YoutubeView = Backbone.View.extend({
        initialize: function(title) {
            this.title = title;
            self = this;
            gapi.client.setApiKey("AIzaSyAk3A9qsL9qNj0luVAOaMNbgRDguRQDh0g");
            gapi.client.load("youtube", "v3", function () {
                self.render();
            });
        },

        search: function(title) {
            var request = gapi.client.youtube.search.list({
                part: "snippet",
                type: "video",
                q: title + " trailer",
                maxResults: 1,
                order: "relevance"
            });
            // execute the request
            request.execute(function (response) {
                $("#video-preview").html(
                    '<iframe class="video w100" width="480" height="270" src="//www.youtube.com/embed/' +
                    response.result.items[0].id.videoId +
                    '" frameborder="0" allowfullscreen></iframe>'
                );
                return this;
            });
        },

        render: function() {
            this.search(this.title);
            return this;
        }
    });

    return YoutubeView;
});