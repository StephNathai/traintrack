var express = require('express');
var geohash = require('geohash').GeoHash;
var server = require('http').createServer(app);
//var googleKey = process.env.GOOGLE_TRAINTRACK_API_KEY

var app = express();

app.listen(3000)

app.get('/', function(req, res){
  res.render('index.ejs')
});
