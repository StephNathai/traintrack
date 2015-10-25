var express = require('express');
///var geohash = require('geohash').GeoHash;
///var morgan  = require('morgan');
var request = require('request');
var ProtoBuf = require("protobufjs"); // to parse mta data / https://github.com/dcodeIO/ProtoBuf.js/wiki/Installation
var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var app     = express();
///var googleKey = process.env.GOOGLE_TRAINTRACK_API_KEY

var server = app.listen(3000)
var io     = require('socket.io')(server);

///app.use(morgan('combined'));
app.use( express.static( 'public') );

io.on('connection', function(socket) {

  console.log("A new user has connected");

// this grabs the data and parses it
// https://developers.google.com/transit/gtfs-realtime/code-samples#javascript_nodejs
  var requestSettings = {
    method: 'GET',
    url: 'http://datamine.mta.info/files/k38dkwh992dk/gtfs',
    encoding: null
  };
  request(requestSettings, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
      // http://datamine.mta.info/sites/all/files/pdfs/GTFS-Realtime-NYC-Subway%20version%201%20dated%207%20Sep.pdf
      feed.entity.forEach(function(entity) {
        if (entity.vehicle) {
          //console.log(entity.trip_update);
          var schedule = entity.vehicle
          //this sends the data to the client
          socket.emit('parsed_data', schedule);
        }
      });
    }
  });



}) //io
