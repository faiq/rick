var express = require("express")
  , http = require("http")
  , path = require('path')
  , bodyParser = require('body-parser')
  , twitter = require('./twitter')
  , router = express()
  , AlchemyAPI = require('./alchemyapi')
  , alchemyapi = new AlchemyAPI()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))
 
function sentiment(text, cb) {
    alchemyapi.sentiment("text", text, {}, function(response) {
    cb(response["docSentiment"]["type"])
    });
}

function keywords(text, cb) {
    alchemyapi.keywords("text", text, {}, function(response) {
        var keywords_json = response["keywords"]
        var keywords = []
        Array.prototype.map.call(keywords_json, function(item) {
            keywords.push(item['text'])
        })
        cb(keywords.toString())
    });
} 

function concepts(text, cb) {
    alchemyapi.concepts("text", text, {}, function(response) {
        var concepts_json = response["concepts"]
        var concepts = []
        Array.prototype.map.call(concepts_json, function(item) {
            concepts.push(item['text'])
        })
        cb(concepts.toString())
    });
}

router.set('view engine', 'ejs')
router.use(express.static(path.join(__dirname + '/assets')))

router.get('/', function (req, res) {
  res.render('index')
})

router.post('/submit', function (req, res) {
  twitter(req.body.twitterhandle, function (err, arr){ 
    if (err) res.send(err)
    var tweets = arr.toString().replace (/,/g, " ")
    console.log(tweets)
    concepts(tweets, function (concept) { 
      res.send(concept)
    })
  })
})

http.createServer(router).listen('3000', '127.0.0.1')

