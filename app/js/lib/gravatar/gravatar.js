define([
    'md5'
], function(md5){
    var generate = function(email){
        var hashedEmail = md5(email.trim().toLowerCase());
        return "http://www.gravatar.com/avatar/" + hashedEmail;
    };

    return {
        generate: generate
    };
});