var express = require('express');
///var geohash = require('geohash').GeoHash;
var morgan  = require('morgan');
var moment = require('moment');
var request = require('request');
var ProtoBuf = require("protobufjs"); // to parse mta data / https://github.com/dcodeIO/ProtoBuf.js/wiki/Installation
var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var react = require('react');
var app = express();
var stops = require('./public/stops.js')
var shapes1 = require('./public/shapes1.js')
var stops1 = require('./public/stops1.js')
var shapes2 = require('./public/shapes2.js')
var stops2 = require('./public/stops2.js')
// stops1.forEach(function(e,k){
//   console.log(e.id)
// });


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
      tripData = feed.entity
      var lineOne = feed.entity.filter(function(entity) {
        schedule = entity.trip_update
        return schedule && schedule.trip.route_id == 1 && schedule.stop_time_update[0].stop_id
      }).map(function(entity) {
        schedule = entity.trip_update
        return schedule.stop_time_update[0].stop_id
      });

      var lineTwo = feed.entity.filter(function(entity) {
        schedule = entity.trip_update
        return schedule && schedule.trip.route_id == 2 && schedule.stop_time_update[0].stop_id
      }).map(function(entity) {
        schedule = entity.trip_update
        return schedule.stop_time_update[0].stop_id
      });


          // for(var k=0; k<schedule.stop_time_update.length; k++){
          //   if(schedule.stop_time_update[k].arrival)
          //     schedule.stop_time_update[k].arrival['time'].low = moment.unix(schedule.stop_time_update[k].arrival['time'].low).format('YYYY-MM-DD HH:mm:ss');
          // };
          //
          // for(var k=0; k<schedule.stop_time_update.length; k++){
          //   if(schedule.stop_time_update[k].departure)
          //     schedule.stop_time_update[k].departure['time'].low = moment.unix(schedule.stop_time_update[k].departure['time'].low).format('YYYY-MM-DD HH:mm:ss');
          // };
// // need to fix this
//           for(var k=0; k<schedule.length; k++){
//             //throw schedule.stop_time_update[k].arrival['time'].low
//             if([k].vehicle.timestamp.low)
//               [k].vehicle.timestamp.low = moment.unix([k].vehicle.timestamp.low).format('YYYY-MM-DD HH:mm:ss');
//           };
//
//
//           for(var i=0; i<schedule.stop_time_update.length; i++){
//             for(var key in stops){
//               if (stops[schedule.stop_time_update[i].stop_id]) {
//                 schedule.stop_time_update[i].stop = stops[schedule.stop_time_update[i].stop_id]
//               }
//             }
//           }


      //this sends the data to the client
      socket.emit('parsed_data', lineOne, stops1, lineTwo, stops2);
      socket.emit('shapes1', shapes1)
      
      socket.emit('shapes2', shapes2)
      //console.log(lineOne)
    }
  });


  // data is in JSON format
  app.get('/data', function(req, res) {
    res.json(tripData);
  })


  app.get('/stops', function(req, res) {
    res.json(stops)
  })

  app.get('/schedule', function(req, res) {
    res.json(schedule)
  })


}) //io
