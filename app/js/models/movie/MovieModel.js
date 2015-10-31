var Movie = Backbone.Model.extend({
    urlRoot: 'https://umovie.herokuapp.com/unsecure/movies/',
    defaults: {
        id: 0,
        releaseDate: "1970-01-01T00:00:00Z",
        primaryGenreName: "",
        trackViewUrl: "",
        shortDescription: "",
        longDescription: "",
        contentAdvisoryRating: "",
        trackName: ""
    },
    parse: function(data){
        return data.results[0];
    }
});

var movie = new Movie();
movie.set("id", 1039586890);
movie.fetch({
    success: function(){
        console.info("hello");
    }
});
