//Client side code
$(function() {


var socket = io(); //create an io connection
var map;
var route1;
var route2;
var oneArray
var oneNorthArray
var oneSouthArray
var twoArray
var twoNorthArray
var twoSouthArray
var markers = [];
var transitLayer;
var trainOnePath
var trainTwoPath;
var clearMap;



$('img.menu').on('click', function() {
  $('select').toggle();
})

$('select.one').change(function() {
  var lineSelected = $('option:selected.one').text();
    console.log('one selected:', lineSelected)
    if(lineSelected === 'One All') {
      oneAll();
    } else if (lineSelected === 'One North') {
      oneNorth();
    } else if (lineSelected === 'One South') {
      oneSouth();
    }
});

$('select.two').change(function() {
  var lineSelected = $('option:selected.two').text();
    console.log('two selected:', lineSelected)
    if(lineSelected === 'Two All') {
      twoAll();
    } else if (lineSelected === 'Two North') {
      twoNorth();
    } else if (lineSelected === 'Two South') {
      twoSouth();
    }
});







  //grabs parsed MTA data and prints it
  socket.on('parsed_data', function(lineOne, stops1, lineTwo, stops2){
    console.log('lineOne', lineOne, lineOne.length)
    oneArray = [];
    oneNorthArray = [];
    oneSouthArray = [];
    twoArray = [];
    twoNorthArray = [];
    twoSouthArray = [];


// remove duplicates fom lineOne
    var lineOneFiltered = lineOne.reduce(function(a,b){
      if(a.indexOf(b) < 0) a.push(b);
        return a;
      },[]);
    console.log('lineOneFiltered',lineOneFiltered, lineOneFiltered.length)

    for(var i=0; i<lineOneFiltered.length; i++){
      stops1.forEach(function(e,k){
      if(lineOneFiltered[i] == e.id && lineOneFiltered[i][3] === "N"){
        oneNorthArray.push(e.data)
      } else if (lineOneFiltered[i] == e.id && lineOneFiltered[i][3] === "S") {
        oneSouthArray.push(e.data)
      }
    })
   }

   for(var i=0; i<lineOneFiltered.length; i++){
     stops1.forEach(function(e,k){
     if(lineOneFiltered[i] == e.id){
       oneArray.push(e.data)
     }
   })
  }

   console.log('oneArray', oneArray, oneArray.length)
   console.log('oneNorthArray', oneNorthArray, oneNorthArray.length)
   console.log('oneSouthArray', oneSouthArray, oneSouthArray.length)


   oneAll = function() {
    clearMarkers();
      if (trainTwoPath) {
        trainTwoPath.setMap(null)
        drawOneLine()
        for (var i = 0; i < oneArray.length; i++) {
          addMarkerWithTimeout(oneArray[i], i * 200);
        }
      } else {
      drawOneLine()
      for (var i = 0; i < oneArray.length; i++) {
        addMarkerWithTimeout(oneArray[i], i * 200);
      }
    }
  }

   oneNorth = function() {
    clearMarkers();
      if (trainTwoPath) {
        trainTwoPath.setMap(null)
        drawOneLine()
        for (var i = 0; i < oneNorthArray.length; i++) {
          addMarkerWithTimeout(oneNorthArray[i], i * 200);
        }
      } else {
      drawOneLine()
      for (var i = 0; i < oneNorthArray.length; i++) {
        addMarkerWithTimeout(oneNorthArray[i], i * 200);
      }
    }
   }

   oneSouth = function() {
    clearMarkers();
      if (trainTwoPath) {
        trainTwoPath.setMap(null)
        drawOneLine()
        for (var i = 0; i < oneSouthArray.length; i++) {
          addMarkerWithTimeout(oneSouthArray[i], i * 200);
        }
      } else {
      drawOneLine()
      for (var i = 0; i < oneSouthArray.length; i++) {
        addMarkerWithTimeout(oneSouthArray[i], i * 200);
      }
     }
   }

   console.log('lineTwo', lineTwo, lineTwo.length)
// remove duplicates fom lineTwo
   var lineTwoFiltered = lineTwo.reduce(function(a,b){
     if(a.indexOf(b) < 0) a.push(b);
       return a;
     },[]);
   console.log('lineTwoFiltered',lineTwoFiltered, lineTwoFiltered.length)

   for(var i=0; i<lineTwoFiltered.length; i++){
     stops2.forEach(function(e,k){
     if(lineTwoFiltered[i] == e.id && lineTwoFiltered[i][3] === "N"){
       twoNorthArray.push(e.data)
     } else if (lineTwoFiltered[i] == e.id && lineTwoFiltered[i][3] === "S") {
       twoSouthArray.push(e.data)
     }
   })
  }

  for(var i=0; i<lineTwoFiltered.length; i++){
    stops2.forEach(function(e,k){
    if(lineTwoFiltered[i] == e.id){
      twoArray.push(e.data)
    }
  })
 }

  console.log('twoArray', twoArray, twoArray.length)
  console.log('twoNorthArray', twoNorthArray, twoNorthArray.length)
  console.log('twoSouthArray', twoSouthArray, twoSouthArray.length)


  twoAll = function() {
   clearMarkers();
   if (trainOnePath) {
     trainOnePath.setMap(null)
     drawTwoLine();
     for (var i = 0; i < twoArray.length; i++) {
       addMarkerWithTimeout(twoArray[i], i * 200);
     }
   } else {
   drawTwoLine();
   for (var i = 0; i < twoArray.length; i++) {
     addMarkerWithTimeout(twoArray[i], i * 200);
   }
  }
  }

  twoNorth = function() {
   clearMarkers();
   if (trainOnePath) {
     trainOnePath.setMap(null)
     drawTwoLine();
     for (var i = 0; i < twoNorthArray.length; i++) {
       addMarkerWithTimeout(twoNorthArray[i], i * 200);
     }
   } else {
   drawTwoLine();
   for (var i = 0; i < twoNorthArray.length; i++) {
     addMarkerWithTimeout(twoNorthArray[i], i * 200);
   }
  }
}

  twoSouth = function() {
   clearMarkers();
   if (trainOnePath) {
     trainOnePath.setMap(null)
     drawTwoLine();
     for (var i = 0; i < twoSouthArray.length; i++) {
       addMarkerWithTimeout(twoSouthArray[i], i * 200);
     }
   } else {
   drawTwoLine();
   for (var i = 0; i < twoSouthArray.length; i++) {
     addMarkerWithTimeout(twoSouthArray[i], i * 200);
   }
  }
}


   function addMarkerWithTimeout(position, timeout) {
    window.setTimeout(function() {
      markers.push(new google.maps.Marker({
        position: position,
        map: map,
        animation: google.maps.Animation.DROP
      }));
    }, timeout);
   }

   clearMarkers = function() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }


  }); //io

  socket.on('shapes1', function(shapes1) {
    //console.log(shapes1)
    drawOneLine = function() {
    route1 = shapes1
    var train1Coordinates = [];

    shapes1.forEach(function(e,k){
      train1Coordinates.push(e)
    });

    trainOnePath = new google.maps.Polyline({
      path: train1Coordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 5
    });

    trainOnePath.setMap(map);
    }

  }); //socket shapes 1 close

  socket.on('shapes2', function(shapes2) {
    //console.log(shapes1)
    drawTwoLine = function() {
    route2 = shapes2
    var train2Coordinates = [];

    shapes2.forEach(function(e,k){
      train2Coordinates.push(e)
    });

    trainTwoPath = new google.maps.Polyline({
      path: train2Coordinates,
      geodesic: true,
      strokeColor: '#0000FF',
      strokeOpacity: 1.0,
      strokeWeight: 5
    });

    trainTwoPath.setMap(map);
    }

  }); //socket shapes 2close

    // combined geo-location and layer-transit to compile Google map
    // https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
    // https://developers.google.com/maps/documentation/javascript/examples/layer-transit
    window.initMap = function() {

      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7127, lng: -74.0059}, //this is set to NYC lat and long
        zoom: 13,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_RIGHT
        }
      });

    //this adds transit layer
      transitLayer = new google.maps.TransitLayer();


    // this grabs the users location if they allow it
      var infoWindow = new google.maps.InfoWindow({map: map});

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

// toggles transitLayer on and off
    toggleLayer = function(){
      if( transitLayer.getMap() ){
        transitLayer.setMap(null);
      } else {
        transitLayer.setMap(map);
      }
    }

//need to fix this function
    clearMap = function() {
      clearMarkers();
      if( transitLayer.getMap() ){
        transitLayer.setMap(null);
      }

      else if (trainTwoPath) {
        trainTwoPath.setMap(null)
      }

      else if (trainOnePath) {
        trainOnePath.setMap(null)
    }
    }


  })//closure
