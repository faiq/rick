var error = function (err, response, body) {
        console.log('ERROR [%s]', err);
    };
    var success = function (data) {
        console.log('Data [%s]', data);
    };

    var Twitter = require('twitter-node-client').Twitter;

    //Get this data from your twitter apps dashboard
    var config = {
        "consumerKey": "4Tp0rLjI44zBb6uBDliUumXoF",
        "consumerSecret": "Cy2zijcBlCloILZ5toCOavZpxjfLYgEIwXMeJXI2Tss24Z2NVh",
        "accessToken": "37560514-YhirZHsCo4n9t0JWPl6ox1ks66o4nXxqD1v2CQwX4",
        "accessTokenSecret": "2tMhp4BQOW7JHju7rlTSbTYhMbQLfCQX9oNZk7GLwv0hu",
    }

    var twitter = new Twitter(config);

    twitter.getUserTimeline({ screen_name: 'faiqus', count: '1'},
     function(error, success) {
    		console.log("hi")
    	});


