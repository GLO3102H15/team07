function init() {
    gapi.client.setApiKey("AIzaSyAk3A9qsL9qNj0luVAOaMNbgRDguRQDh0g");
    gapi.client.load("youtube", "v3", function() {
    });
}

function search(title) {

    var request = gapi.client.youtube.search.list({
        part: "snippet",
        type: "video",
        q: title+" trailer",
        maxResults: 1,
        order: "relevance"
    });
    // execute the request
    request.execute(function(response) {
        id = response.result.items[0].id.videoId;
        console.log(id);
        return id
    });


}