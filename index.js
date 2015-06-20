var express = require("express")
  , http = require("http")
  , path = require('path')
  , bodyParser = require('body-parser')
  , twitter = require('./twitter')
  , router = express()

var AlchemyAPI = require('./alchemyapi')
var alchemyapi = new AlchemyAPI()

demo_text = "AlchemyAPI has raised $2 million to extend the capabilities of its deep learning technology that applies artificial intelligence to read and understand web pages, text documents, emails, tweets, and other forms of content. Access Venture Partners led the Series A round, which the company will use to ramp up its sales and marketing, make hires and launch new services."

 
function sentiment(text) {
    alchemyapi.sentiment("text", text, {}, function(response) {
    console.log("Sentiment: " + response["docSentiment"]["type"])
    });
}

function keywords(text) {
    alchemyapi.keywords("text", text, {}, function(response) {
        var keywords_json = response["keywords"]
        var keywords = []
        Array.prototype.map.call(keywords_json, function(item) {
            keywords.push(item['text'])
        })
        console.log("Keywords: %s", keywords.toString())
    });
} 

function concepts(text) {
    alchemyapi.concepts("text", text, {}, function(response) {
        var concepts_json = response["concepts"]
        var concepts = []
        Array.prototype.map.call(concepts_json, function(item) {
            concepts.push(item['text'])
        })
        console.log("Concepts: %s", concepts.toString())
    });
}

sentiment(demo_text)
keywords(demo_text)
concepts(demo_text)

router.use(bodyParser.json())       
router.use(bodyParser.urlencoded({  
  extended: true
})) 

router.set('view engine', 'ejs')
router.use(express.static(path.join(__dirname + '/assets')))

router.get('/', function (req, res) {
  res.render('index')
})


http.createServer(router).listen('3000', '127.0.0.1')

