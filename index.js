var express = require('express');
var geohash = require('geohash').GeoHash;
var morgan  = require('morgan');
var app     = express();
//var googleKey = process.env.GOOGLE_TRAINTRACK_API_KEY

var server = app.listen(3000)
var io     = require('socket.io')(server);

app.use(morgan('combined'));
app.use( express.static( 'public') );

io.on('connection', function(socket) {

  console.log("A new user has connected");
  socket.emit('connect');



}) //io
