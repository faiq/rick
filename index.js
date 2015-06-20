var express = require("express")
  , http = require("http")
  , path = require('path')
  , bodyParser = require('body-parser')
  , twitter = require('./twitter')
  , router = express()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.set('view engine', 'ejs')
router.use(express.static(path.join(__dirname + '/assets')))

router.get('/', function (req, res) {
  res.render('index')
})

router.post('/submit', function (req, res) {
  twitter(req.body.twitterhandle, function (err, arr){ 
    res.send(arr) 
  })
})

http.createServer(router).listen('3000', '127.0.0.1')

