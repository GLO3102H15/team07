define([
    'jquery',
    'underscore',
    'backbone',
    'lib/jquery-ui/jquery-ui.min',
    'models/tvshow/TvShowModel',
    'views/YoutubeView',
    'views/tvShow/EpisodeView',
    'views/tvShow/ModalView',
    'text!templates/tvShow/tvShowTemplate.html',
    'collections/tvshow/TvShowCollection',
    'lib/bootstrapModal/BootstrapModal'
], function($, _, Backbone, ui, tvModel, YoutubeView, EpisodeView, ModalView, tvShowTemplate, TvShowCollection,BootstrapModal){

    var TvShowView = Backbone.View.extend({
        el: $("#page"),

        events: {
            "click #episode" : "modalWindow",
            'input #episode-search-container' : 'search'
        },

        template: _.template(tvShowTemplate),
        initialize: function (tvmodel) {
            var self = this;
            var tvShowViewScope = this;

            this.tvShowModel = tvmodel;
            this.artistId = this.id;
            this.tvShowModel.fetch({
                success: function () {
                    tvShowViewScope.render();
                    this.episodesView = new EpisodeView(self.artistId);
                }
            });
            return this;
        },

        render: function () {
            this.$el.html(this.template(this.tvShowModel.toJSON()));
            this.videoPreview = new YoutubeView(this.tvShowModel.get('collectionName'));
        },

        modalWindow: function(e){
            e.preventDefault();
            var episodeNumber = $(e.target).parent().parent().attr('id');

            var view= new ModalView(this.id, episodeNumber);
            setTimeout(function() {
                var modal = new Backbone.BootstrapModal({
                    showFooter: false,
                    content:view
                }).open();
            }, 1000);
        },

        search: function(event) {
            var getData = function (request, response) {
                var list =[];
                $("div.episode-title").each(function() {
                    console.log($(this).html().search(request.term));
                    if($(this).html().toLowerCase().search(request.term.toLowerCase()) >= 0){
                        episode = { label: $(this).html(), value: $(this).parent().parent().attr('id')};
                        list.push(episode);
                    }
                });
                response(list)
            };

            var selectItem = function (event, ui) {
                $("#episode-search-input-field").val(ui.item.label);
                var episodeNumber = ui.item.value;
                var collId= window.location.href.replace(/.*\//, '');
                var view= new ModalView(collId, episodeNumber);
                setTimeout(function() {
                    var modal = new Backbone.BootstrapModal({
                        showFooter: false,
                        content:view
                    }).open();
                }, 1000);
                return false;
            };

            $("#episode-search-input-field").autocomplete({
                source: getData,
                select: selectItem,
                minLength: 2
            });
        }
    });

    return TvShowView;
});
