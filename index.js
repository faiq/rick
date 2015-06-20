var express = require("express")
  , http = require("http")
  , path = require('path')
  , bodyParser = require('body-parser')
  , router = express()

router.use(bodyParser.json())       
router.use(bodyParser.urlencoded({  
  extended: true
})) 

router.use(express.static(path.join(__dirname, '/assets')))
router.get('/', function (req, res) { 
  res.send('index.html')
})

