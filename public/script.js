//Client side code
$(function() {

var socket = io(); //create an io connection
var map;
var markers = [];
var transitLayer;
var clearMap;

var route1;
var route2;
var route3;

var oneArray
var oneNorthArray
var oneSouthArray

var twoArray
var twoNorthArray
var twoSouthArray

var threeArray
var threeNorthArray
var threeSouthArray

var trainOnePath;
var trainTwoPath;
var trainThreePath;

var oneAll;
var oneNorth;
var oneSouth;

var twoAll;
var twoNorth;
var twoSouth;

var threeAll;
var threeNorth;
var threeSouth;


$('img.menu').on('click', function() {
  $('select').toggle();
})

//////// START: LINE 1 SELECTORS //////////
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

//////// START: LINE 2 SELECTORS //////////
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

//////// START: LINE 3 SELECTORS //////////
$('select.three').change(function() {
  var lineSelected = $('option:selected.three').text();
    console.log('three selected:', lineSelected)
    if(lineSelected === 'Three All') {
      threeAll();
    } else if (lineSelected === 'Three North') {
      threeNorth();
    } else if (lineSelected === 'Three South') {
      threeSouth();
    }
});

//////// START: LINE 4 SELECTORS //////////

  //grabs parsed MTA data and prints it
  socket.on('parsed_data', function(lineOne, stops1, lineTwo, stops2, lineThree, stops3){
    oneArray = [];
    oneNorthArray = [];
    oneSouthArray = [];
    twoArray = [];
    twoNorthArray = [];
    twoSouthArray = [];
    threeArray = [];
    threeNorthArray = [];
    threeSouthArray = [];

///// START: LINE 1 FXNS ///////

    console.log('lineOne', lineOne, lineOne.length)
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

///// START: LINE 2 FXNS ///////

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

///// START: LINE 3 FXNS ///////

  console.log('lineThree', lineThree, lineThree.length)
  // remove duplicates fom lineThree
  var lineThreeFiltered = lineThree.reduce(function(a,b){
    if(a.indexOf(b) < 0) a.push(b);
      return a;
    },[]);
  console.log('lineThreeFiltered',lineThreeFiltered, lineThreeFiltered.length)

  for(var i=0; i<lineThreeFiltered.length; i++){
    stops3.forEach(function(e,k){
    if(lineThreeFiltered[i] == e.id && lineThreeFiltered[i][3] === "N"){
      threeNorthArray.push(e.data)
    } else if (lineThreeFiltered[i] == e.id && lineThreeFiltered[i][3] === "S") {
      threeSouthArray.push(e.data)
    }
  })
  }

  for(var i=0; i<lineThreeFiltered.length; i++){
   stops3.forEach(function(e,k){
   if(lineThreeFiltered[i] == e.id){
     threeArray.push(e.data)
   }
  })
  }

  console.log('threeArray', threeArray, threeArray.length)
  console.log('threeNorthArray', threeNorthArray, threeNorthArray.length)
  console.log('threeSouthArray', threeSouthArray, threeSouthArray.length)


  threeAll = function() {
  clearMarkers();
    if (trainTwoPath) {
      trainTwoPath.setMap(null)
      drawThreeLine()
      for (var i = 0; i < threeArray.length; i++) {
        addMarkerWithTimeout(threeArray[i], i * 200);
      }
    } else {
    drawThreeLine()
    for (var i = 0; i < threeArray.length; i++) {
      addMarkerWithTimeout(threeArray[i], i * 200);
    }
  }
  }

  threeNorth = function() {
  clearMarkers();
    if (trainTwoPath) {
      trainTwoPath.setMap(null)
      drawThreeLine()
      for (var i = 0; i < threeNorthArray.length; i++) {
        addMarkerWithTimeout(threeNorthArray[i], i * 200);
      }
    } else {
    drawThreeLine()
    for (var i = 0; i < threeNorthArray.length; i++) {
      addMarkerWithTimeout(threeNorthArray[i], i * 200);
    }
  }
  }

  threeSouth = function() {
  clearMarkers();
    if (trainTwoPath) {
      trainTwoPath.setMap(null)
      drawThreeLine()
      for (var i = 0; i < threeSouthArray.length; i++) {
        addMarkerWithTimeout(threeSouthArray[i], i * 200);
      }
    } else {
    drawThreeLine()
    for (var i = 0; i < threeSouthArray.length; i++) {
      addMarkerWithTimeout(threeSouthArray[i], i * 200);
    }
   }
  }

///// START: LINE 4 FXNS ///////


////START: ADDITIONAL FXNS ////////

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

  ////START: SHAPES1 ////////
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

////START: SHAPES2 ////////
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

////START: SHAPES3 ////////
socket.on('shapes3', function(shapes3) {
  //console.log(shapes1)
  drawThreeLine = function() {
  route3 = shapes3
  var train3Coordinates = [];

  shapes3.forEach(function(e,k){
    train3Coordinates.push(e)
  });

  trainThreePath = new google.maps.Polyline({
    path: train3Coordinates,
    geodesic: true,
    strokeColor: '#0000FF',
    strokeOpacity: 1.0,
    strokeWeight: 5
  });

  trainThreePath.setMap(map);
  }

}); //socket shapes 3close

  ////START: SHAPES4 ////////

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
