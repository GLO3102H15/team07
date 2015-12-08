define([
    'jquery',
    'underscore',
    'backbone',
    'models/actor/ActorModel',
    'views/actor/FilmographyView',
    'text!templates/actor/actorTemplate.html'
], function($, _, Backbone, ActorModel, FilmographyView, actorTemplate){

    var ActorView = Backbone.View.extend({
        el: $("#page"),

        template: _.template(actorTemplate),

        initialize: function(model) {
            var self = this;
            this.model = model;
            this.artistId = this.id;
            this.model.fetch({
                success: function () {
                    self.render();
                }
            });

            return this;
        },

        render: function(){
            if(!this.model.attributes.primaryGenreName) { this.model.attributes.primaryGenreName = ""; }
            this.$el.html(this.template(this.model.toJSON()));

            this.filmographyView = new FilmographyView(this.artistId);

            //calling external api (not umovie's one) for photo and bio
            var movieDbApiUrl = "https://api.themoviedb.org/3";
            var movieDbApiKey = "?api_key=9ab7462331ecc3ac8351a0c1cb87eeb0";
            var movieDbApiImgPath = "https://image.tmdb.org/t/p/original";
            var actorNameQuery = "&query=" + this.model.attributes.artistName.split(' ').join('+');
            $.ajax({
                type: "GET",
                url: movieDbApiUrl + "/search/person" + movieDbApiKey + actorNameQuery,
                dataType: "jsonp",
                jsonpCallback: 'test',
                contentType: 'application/json',
                success: function(data) {
                    if (data.results[0]) {
                        if (data.results[0].profile_path) {
                            document.getElementById("actor-pic").src = movieDbApiImgPath + data.results[0].profile_path;
                            document.getElementById("actorBackground").setAttribute("style", "background-image: url(" + movieDbApiImgPath + data.results[0].profile_path + ")");
                        }
                        if (data.results[0].id) {
                            $.ajax({
                                type: "GET",
                                url: movieDbApiUrl + "/person/" + data.results[0].id + movieDbApiKey,
                                dataType: "jsonp",
                                jsonpCallback: 'test',
                                contentType: 'application/json',
                                success: function (bioData) {
                                    var bio = document.createElement("li");
                                    bio.textContent = bioData.biography;
                                    document.getElementById("actor-info").appendChild(bio);
                                }
                            });
                        }
                    }
                }
            });
            return this;
        }
    });

    return ActorView;
});