var error = function (err, response, body) {
    console.log('ERROR [%s]', err)
}

var success = function (data) {
    console.log('Data [%s]', data)
}

var Twitter = require('twitter')

var config = {
    "consumer_key": "4Tp0rLjI44zBb6uBDliUumXoF",
    "consumer_secret": "Cy2zijcBlCloILZ5toCOavZpxjfLYgEIwXMeJXI2Tss24Z2NVh",
    "access_token_key": "37560514-YhirZHsCo4n9t0JWPl6ox1ks66o4nXxqD1v2CQwX4",
    "access_token_secret": "2tMhp4BQOW7JHju7rlTSbTYhMbQLfCQX9oNZk7GLwv0hu",
}

module.exports = function(name, cb) {
  var client = new Twitter(config)
  var tweet_array = []
  client.get('statuses/user_timeline', { screen_name: name, count: '5'}, function(error, tweets, response) {
  	if (error) return cb(error)
    Array.prototype.map.call(tweets, function(item) {
      tweet_array.push(item["text"])
  	})
    cb(null, tweet_array)
  })
}
