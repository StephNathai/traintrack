<!DOCTYPE html>
<html>
  <head>
    <title>trainTrack</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <script src="/jquery-2.1.4.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
  </head>
  <body>
    <div id="map"></div>
    <script src="/socket.io/socket.io.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?&callback=initMap&signed_in=true" async defer></script>


    <script>
    //Client side code
    var socket = io(); //create an io connection
    socket.on('connect', function(){
      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.7127, lng: 74.0059}, //this is set to NYC lat and long
          zoom: 15
        });

      // this adds transit layer
        var transitLayer = new google.maps.TransitLayer();
        transitLayer.setMap(map);

      // this grabs the users location if they allow it
        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }

});



    </script>
  </body>
</html>
