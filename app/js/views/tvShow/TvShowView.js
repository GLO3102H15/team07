define([
    'jquery',
    'underscore',
    'backbone',
    'models/tvshow/TvShowModel',
    'views/YoutubeView',
    'views/tvShow/EpisodeView',
    'text!templates/tvShow/tvShowTemplate.html',
    'collections/tvshow/TvShowCollection'
], function($, _, Backbone, tvModel, YoutubeView, EpisodeView, tvShowTemplate, TvShowCollection){

    var TvShowView = Backbone.View.extend({
        el: $("#page"),

        template: _.template(tvShowTemplate),

        //render: function(){
        //    this.$el.html(tvShowTemplate);
        //    this.videoPreview = new YoutubeView("Firefly");
        //    //var posts = {"posts": this.model.toJSON()};
        //    //var template = _.template($("#tpl_SetView").html(), posts);
        //}
        //initialize: function () {
        //    // You'll see the `_.bindAll()` function in almost every `initialize`.
        //    // See this StackOverflow [answer](http://stackoverflow.com/a/6396224/884338 "JSONP") to why `_.bindAll()` is necessary.
        //    _.bindAll(this, 'render');
        //
        //    // Keep `this` in a variable to use in a different scope (as in `this.collection.bind()` ).
        //    var self = this;
        //
        //    // We want the view to render itself each time the model is changed.
        //    // We can bind to any events like this.
        //    //this.collection.bind('artistName', function () {
        //    //    self.render();
        //    //});
        //},

        initialize: function (tvmodel) {

            var tvShowViewScope = this;
            this.tvShowModel = tvmodel;

            //this.tvShows = new TvShowCollection(model);

            this.artistId = this.id;
            //this.episodeView = new EpisodeView(this.model.id);
            this.tvShowModel.fetch({
                success: function () {
                    tvShowViewScope.render();
                }
            });

            this.episodesView = new EpisodeView(this.artistId);

            return this;



        },

        render: function () {
            console.log("dans render view tv show");

            var values = this.tvShowModel;

            this.tvShowModel.attributes = this.tvShowModel.parse({results: [this.model.attributes]});
            this.$el.html(this.template(this.tvShowModel.toJSON()));
            console.log(this.tvShowModel.attributes);
            console.log(this.$el);


            console.log(values.longDescription);
            console.log(this.tvShowModel.longDescription);


            //this.$el.html(this.template(values));


            this.videoPreview = new YoutubeView(this.model.get('trackName'));
            return this;
        }
    });

    return TvShowView;
});
