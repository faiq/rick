var express = require("express")
  , http = require("http")
  , path = require('path')
  , bodyParser = require('body-parser')
  , router = express()

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

