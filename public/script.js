//Client side code
$(function() {

var socket = io(); //create an io connection
var map;
var markers = [];
var transitLayer;
var clearPolylines;
var icons;

var route1;
var route2;
var route3;
var route4;
var route5;
var route6;
var routeShuttle;

var oneArray
var oneNorthArray
var oneSouthArray

var twoArray
var twoNorthArray
var twoSouthArray

var threeArray
var threeNorthArray
var threeSouthArray

var fourArray
var fourNorthArray
var fourSouthArray

var fiveArray
var fiveNorthArray
var fiveSouthArray

var sixArray
var sixNorthArray
var sixSouthArray

var shuttleArray
var shuttleNorthArray
var shuttleSouthArray

var trainOnePath;
var trainTwoPath;
var trainThreePath;
var trainFourPath;
var trainFivePath;
var trainSixPath;
var trainShuttlePath;

var oneAll;
var oneNorth;
var oneSouth;

var twoAll;
var twoNorth;
var twoSouth;

var threeAll;
var threeNorth;
var threeSouth;

var fourAll;
var fourNorth;
var fourSouth;

var fiveAll;
var fiveNorth;
var fiveSouth;

var sixAll;
var sixNorth;
var sixSouth;

var shuttleAll;
var shuttleNorth;
var shuttleSouth;


$('img.menu-open').on('click', function() {
  $('div.nav').toggle();
  menuImageToggle(this);
})

$('button.clear').on('click', function() {
  clearPolylines();
})

$('button.transit').on('click', function() {
  toggleLayer();
})

$('div.info').on('click', function() {
  $('div.info-box').toggle();
})

$('img.close').on('click', function() {
  $('div.info-box').toggle();
})


var menuImageToggle = function(img){
  if (img.class!='menu-close'){
    img.src="/images/menu-close.png";
    img.class='menu-close';
  } else if(img.class == 'menu-close') {
    img.src= "/images/menu-open.png";
    img.class='menu-open'
  }
  return false;
}

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
$('select.four').change(function() {
  var lineSelected = $('option:selected.four').text();
    console.log('four selected:', lineSelected)
    if(lineSelected === 'Four All') {
      fourAll();
    } else if (lineSelected === 'Four North') {
      fourNorth();
    } else if (lineSelected === 'Four South') {
      fourSouth();
    }
});

//////// START: LINE 5 SELECTORS //////////
$('select.five').change(function() {
  var lineSelected = $('option:selected.five').text();
    console.log('five selected:', lineSelected)
    if(lineSelected === 'Five All') {
      fiveAll();
    } else if (lineSelected === 'Five North') {
      fiveNorth();
    } else if (lineSelected === 'Five South') {
      fiveSouth();
    }
});

//////// START: LINE 6 SELECTORS //////////
$('select.six').change(function() {
  var lineSelected = $('option:selected.six').text();
    console.log('six selected:', lineSelected)
    if(lineSelected === 'Six All') {
      sixAll();
    } else if (lineSelected === 'Six North') {
      sixNorth();
    } else if (lineSelected === 'Six South') {
      sixSouth();
    }
});

//////// START: LINE Shuttle SELECTORS //////////
$('select.shuttle').change(function() {
  var lineSelected = $('option:selected.shuttle').text();
    console.log('shuttle selected:', lineSelected)
    if(lineSelected === 'Shuttle All') {
      shuttleAll();
    } else if (lineSelected === 'Shuttle North') {
      shuttleNorth();
    } else if (lineSelected === 'Shuttle South') {
      shuttleSouth();
    }
});

  //grabs parsed MTA data and prints it
  socket.on('parsed_data', function(lineOne, stops1, lineTwo, stops2, lineThree, stops3, lineFour, stops4, lineFive, stops5, lineSix, stops6, lineShuttle, stopsShuttle){
    oneArray = [];
    oneNorthArray = [];
    oneSouthArray = [];

    twoArray = [];
    twoNorthArray = [];
    twoSouthArray = [];

    threeArray = [];
    threeNorthArray = [];
    threeSouthArray = [];

    fourArray = [];
    fourNorthArray = [];
    fourSouthArray = [];

    fiveArray = [];
    fiveNorthArray = [];
    fiveSouthArray = [];

    sixArray = [];
    sixNorthArray = [];
    sixSouthArray = [];

    shuttleArray = [];
    shuttleNorthArray = [];
    shuttleSouthArray = [];

///// START: LINE 1 FXNS ///////

    console.log('lineOne', lineOne, lineOne.length)
// remove duplicates from lineOne
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
    clearPolylines();
    drawOneLine()
      for (var i = 0; i < oneArray.length; i++) {
        addMarkerWithTimeout(oneArray[i], i * 200, 'red');
      }
    }


   oneNorth = function() {
    clearMarkers();
    clearPolylines();
    drawOneLine()
      for (var i = 0; i < oneNorthArray.length; i++) {
        addMarkerWithTimeout(oneNorthArray[i], i * 200, 'red');
      }
    }


   oneSouth = function() {
    clearMarkers();
    clearPolylines();
    drawOneLine()
      for (var i = 0; i < oneSouthArray.length; i++) {
        addMarkerWithTimeout(oneSouthArray[i], i * 200, 'red');
      }
    }

///// START: LINE 2 FXNS ///////

   console.log('lineTwo', lineTwo, lineTwo.length)
// remove duplicates from lineTwo
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
   clearPolylines();
   drawTwoLine();
     for (var i = 0; i < twoArray.length; i++) {
       addMarkerWithTimeout(twoArray[i], i * 200, 'red');
     }
  }

  twoNorth = function() {
   clearMarkers();
   clearPolylines();
   drawTwoLine();
     for (var i = 0; i < twoNorthArray.length; i++) {
       addMarkerWithTimeout(twoNorthArray[i], i * 200, 'red');
     }
  }

  twoSouth = function() {
   clearMarkers();
   clearPolylines();
   drawTwoLine();
     for (var i = 0; i < twoSouthArray.length; i++) {
       addMarkerWithTimeout(twoSouthArray[i], i * 200, 'red');
     }
  }

///// START: LINE 3 FXNS ///////

  console.log('lineThree', lineThree, lineThree.length)
  // remove duplicates from lineThree
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
  clearPolylines();
  drawThreeLine()
    for (var i = 0; i < threeArray.length; i++) {
      addMarkerWithTimeout(threeArray[i], i * 200, 'red');
    }
  }


  threeNorth = function() {
  clearMarkers();
  clearPolylines();
  drawThreeLine()
    for (var i = 0; i < threeNorthArray.length; i++) {
      addMarkerWithTimeout(threeNorthArray[i], i * 200, 'red');
    }
  }


  threeSouth = function() {
  clearMarkers();
  clearPolylines();
  drawThreeLine()
    for (var i = 0; i < threeSouthArray.length; i++) {
      addMarkerWithTimeout(threeSouthArray[i], i * 200, 'red');
    }
  }


///// START: LINE 4 FXNS ///////

  console.log('lineFour', lineFour, lineFour.length)
  // remove duplicates from lineFour
  var lineFourFiltered = lineFour.reduce(function(a,b){
    if(a.indexOf(b) < 0) a.push(b);
      return a;
    },[]);
  console.log('lineFourFiltered',lineFourFiltered, lineFourFiltered.length)

  for(var i=0; i<lineFourFiltered.length; i++){
    stops4.forEach(function(e,k){
    if(lineFourFiltered[i] == e.id && lineFourFiltered[i][3] === "N"){
      fourNorthArray.push(e.data)
    } else if (lineFourFiltered[i] == e.id && lineFourFiltered[i][3] === "S") {
      fourSouthArray.push(e.data)
    }
  })
  }

  for(var i=0; i<lineFourFiltered.length; i++){
   stops4.forEach(function(e,k){
   if(lineFourFiltered[i] == e.id){
     fourArray.push(e.data)
   }
  })
  }

  console.log('fourArray', fourArray, fourArray.length)
  console.log('fourNorthArray', fourNorthArray, fourNorthArray.length)
  console.log('fourSouthArray', fourSouthArray, fourSouthArray.length)


  fourAll = function() {
  clearMarkers();
  clearPolylines();
  drawFourLine()
    for (var i = 0; i < fourArray.length; i++) {
      addMarkerWithTimeout(fourArray[i], i * 200, 'green');
    }
  }

  fourNorth = function() {
  clearMarkers();
  clearPolylines();
  drawFourLine()
    for (var i = 0; i < fourNorthArray.length; i++) {
      addMarkerWithTimeout(fourNorthArray[i], i * 200, 'green');
    }
  }


  fourSouth = function() {
  clearMarkers();
  clearPolylines();
  drawFourLine()
    for (var i = 0; i < fourSouthArray.length; i++) {
      addMarkerWithTimeout(fourSouthArray[i], i * 200, 'green');
    }
  }



///// START: LINE 5 FXNS ///////

  console.log('lineFive', lineFive, lineFive.length)
  // remove duplicates from lineFive
  var lineFiveFiltered = lineFive.reduce(function(a,b){
    if(a.indexOf(b) < 0) a.push(b);
      return a;
    },[]);
  console.log('lineFiveFiltered',lineFiveFiltered, lineFiveFiltered.length)

  for(var i=0; i<lineFiveFiltered.length; i++){
    stops5.forEach(function(e,k){
    if(lineFiveFiltered[i] == e.id && lineFiveFiltered[i][3] === "N"){
      fiveNorthArray.push(e.data)
    } else if (lineFiveFiltered[i] == e.id && lineFiveFiltered[i][3] === "S") {
      fiveSouthArray.push(e.data)
    }
  })
  }

  for(var i=0; i<lineFiveFiltered.length; i++){
   stops5.forEach(function(e,k){
   if(lineFiveFiltered[i] == e.id){
     fiveArray.push(e.data)
   }
  })
  }

  console.log('fiveArray', fiveArray, fiveArray.length)
  console.log('fiveNorthArray', fiveNorthArray, fiveNorthArray.length)
  console.log('fiveSouthArray', fiveSouthArray, fiveSouthArray.length)


  fiveAll = function() {
  clearMarkers();
  clearPolylines();
  drawFiveLine()
    for (var i = 0; i < fiveArray.length; i++) {
      addMarkerWithTimeout(fiveArray[i], i * 200, 'green');
    }
  }

  fiveNorth = function() {
  clearMarkers();
  clearPolylines();
  drawFiveLine()
    for (var i = 0; i < fiveNorthArray.length; i++) {
      addMarkerWithTimeout(fiveNorthArray[i], i * 200, 'green');
    }
  }

  fiveSouth = function() {
  clearMarkers();
  clearPolylines();
  drawFiveLine()
    for (var i = 0; i < fiveSouthArray.length; i++) {
      addMarkerWithTimeout(fiveSouthArray[i], i * 200, 'green');
    }
  }



// ///// START: LINE 6 FXNS ///////

  console.log('lineSix', lineSix, lineSix.length)
  // remove duplicates from lineSix
  var lineSixFiltered = lineSix.reduce(function(a,b){
    if(a.indexOf(b) < 0) a.push(b);
      return a;
    },[]);
  console.log('lineSixFiltered',lineSixFiltered, lineSixFiltered.length)

  for(var i=0; i<lineSixFiltered.length; i++){
    stops6.forEach(function(e,k){
    if(lineSixFiltered[i] == e.id && lineSixFiltered[i][3] === "N"){
      sixNorthArray.push(e.data)
    } else if (lineSixFiltered[i] == e.id && lineSixFiltered[i][3] === "S") {
      sixSouthArray.push(e.data)
    }
  })
  }

  for(var i=0; i<lineSixFiltered.length; i++){
   stops6.forEach(function(e,k){
   if(lineSixFiltered[i] == e.id){
     sixArray.push(e.data)
   }
  })
  }

  console.log('sixArray', sixArray, sixArray.length)
  console.log('sixNorthArray', sixNorthArray, sixNorthArray.length)
  console.log('sixSouthArray', sixSouthArray, sixSouthArray.length)


  sixAll = function() {
  clearMarkers();
  clearPolylines();
  drawSixLine()
    for (var i = 0; i < sixArray.length; i++) {
      addMarkerWithTimeout(sixArray[i], i * 200, 'green');
    }
  }

  sixNorth = function() {
  clearMarkers();
  clearPolylines();
  drawSixLine()
    for (var i = 0; i < sixNorthArray.length; i++) {
      addMarkerWithTimeout(sixNorthArray[i], i * 200, 'green');
    }
  }

  sixSouth = function() {
  clearMarkers();
  clearPolylines();
  drawSixLine()
    for (var i = 0; i < sixSouthArray.length; i++) {
      addMarkerWithTimeout(sixSouthArray[i], i * 200, 'green');
    }
 }


// ///// START: LINE Shuttle FXNS ///////

  console.log('lineShuttle', lineShuttle, lineShuttle.length)
  // remove duplicates from lineShuttle
  var lineShuttleFiltered = lineShuttle.reduce(function(a,b){
    if(a.indexOf(b) < 0) a.push(b);
      return a;
    },[]);
  console.log('lineShuttleFiltered',lineShuttleFiltered, lineShuttleFiltered.length)

  for(var i=0; i<lineShuttleFiltered.length; i++){
    stopsShuttle.forEach(function(e,k){
    if(lineShuttleFiltered[i] == e.id && lineShuttleFiltered[i][3] === "N"){
      shuttleNorthArray.push(e.data)
    } else if (lineShuttleFiltered[i] == e.id && lineShuttleFiltered[i][3] === "S") {
      shuttleSouthArray.push(e.data)
    }
  })
  }

  for(var i=0; i<lineShuttleFiltered.length; i++){
   stopsShuttle.forEach(function(e,k){
   if(lineShuttleFiltered[i] == e.id){
     shuttleArray.push(e.data)
   }
  })
  }

  console.log('shuttleArray', shuttleArray, shuttleArray.length)
  console.log('shuttleNorthArray', shuttleNorthArray, shuttleNorthArray.length)
  console.log('shuttleSouthArray', shuttleSouthArray, shuttleSouthArray.length)


  shuttleAll = function() {
  clearMarkers();
  clearPolylines();
    drawShuttleLine()
    for (var i = 0; i < shuttleArray.length; i++) {
      addMarkerWithTimeout(shuttleArray[i], i * 200, 'gray');
    }
  }

  shuttleNorth = function() {
  clearMarkers();
  clearPolylines();
  drawShuttleLine()
    for (var i = 0; i < shuttleNorthArray.length; i++) {
      addMarkerWithTimeout(shuttleNorthArray[i], i * 200, 'gray');
    }
  }

  shuttleSouth = function() {
  clearMarkers();
  clearPolylines();
  drawShuttleLine()
    for (var i = 0; i < shuttleSouthArray.length; i++) {
      addMarkerWithTimeout(shuttleSouthArray[i], i * 200, 'gray');
    }
  }


////START: ADDITIONAL FXNS ////////

icons = {
  green: {
    icon: 'images/green.png'
    //https://www.iconfinder.com/icons/34211/green_icon#size=16
  },
  red: {
    icon: 'images/red.png'
    //https://www.iconfinder.com/icons/34214/circle_green_icon#size=16
  },
  gray: {
    icon: 'images/gray.png'
    //https://www.iconfinder.com/icons/34212/circle_grey_icon#size=16
  }
};

   function addMarkerWithTimeout(position, timeout, color) {
    window.setTimeout(function() {
      markers.push(new google.maps.Marker({
        position: position,
        map: map,
        icon: icons[color].icon,
        animation: google.maps.Animation.DROP
      }));
    }, timeout);
   }

//CLEAR MARKERS FXN //
   clearMarkers = function() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }

//CLEAR POLYLINES FXN //
//need to fix this function
    clearPolylines = function() {
      clearMarkers();
      if (trainOnePath) {
        trainOnePath.setMap(null)
      } else if (trainTwoPath) {
        trainTwoPath.setMap(null)
      } else if (trainThreePath) {
        trainThreePath.setMap(null)
      } else if (trainFourPath) {
        trainFourPath.setMap(null)
      } else if (trainFivePath) {
        trainFivePath.setMap(null)
      } else if (trainSixPath) {
        trainSixPath.setMap(null)
      } else if (trainShuttlePath) {
        trainShuttlePath.setMap(null)
      } else {
        console.log("All polylines cleared.")
      }
    }

// toggles transitLayer on and off
    toggleLayer = function(){
      if( transitLayer.getMap() ){
        transitLayer.setMap(null);
      } else {
        transitLayer.setMap(map);
      }
    }


  }); //io

  ////START: SHAPES1 ////////
  socket.on('shapes1', function(shapes1) {
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
      strokeWeight: 3
    });

    trainOnePath.setMap(map);
    }

  }); //socket shapes 1 close

////START: SHAPES2 ////////
  socket.on('shapes2', function(shapes2) {
    drawTwoLine = function() {
    route2 = shapes2
    var train2Coordinates = [];

    shapes2.forEach(function(e,k){
      train2Coordinates.push(e)
    });

    trainTwoPath = new google.maps.Polyline({
      path: train2Coordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });

    trainTwoPath.setMap(map);
    }

  }); //socket shapes 2 close

////START: SHAPES3 ////////
socket.on('shapes3', function(shapes3) {
  drawThreeLine = function() {
  route3 = shapes3
  var train3Coordinates = [];

  shapes3.forEach(function(e,k){
    train3Coordinates.push(e)
  });

  trainThreePath = new google.maps.Polyline({
    path: train3Coordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  });

  trainThreePath.setMap(map);
  }

}); //socket shapes 3 close

////START: SHAPES4 ////////
socket.on('shapes4', function(shapes4) {
  drawFourLine = function() {
  route4 = shapes4
  var train4Coordinates = [];

  shapes4.forEach(function(e,k){
    train4Coordinates.push(e)
  });

  trainFourPath = new google.maps.Polyline({
    path: train4Coordinates,
    geodesic: true,
    strokeColor: '#007D00',
    strokeOpacity: 1.0,
    strokeWeight: 3
  });

  trainFourPath.setMap(map);
  }

}); //socket shapes 4 close


////START: SHAPES5 ////////
socket.on('shapes5', function(shapes5) {
  drawFiveLine = function() {
  route5 = shapes5
  var train5Coordinates = [];

  shapes5.forEach(function(e,k){
    train5Coordinates.push(e)
  });

  trainFivePath = new google.maps.Polyline({
    path: train5Coordinates,
    geodesic: true,
    strokeColor: '#007D00',
    strokeOpacity: 1.0,
    strokeWeight: 3
  });

  trainFivePath.setMap(map);
  }

}); //socket shapes 5 close

// ////START: SHAPES6 ////////
socket.on('shapes6', function(shapes6) {
  drawSixLine = function() {
  route6 = shapes6
  var train6Coordinates = [];

  shapes6.forEach(function(e,k){
    train6Coordinates.push(e)
  });

  trainSixPath = new google.maps.Polyline({
    path: train6Coordinates,
    geodesic: true,
    strokeColor: '#007D00',
    strokeOpacity: 1.0,
    strokeWeight: 3
  });

  trainSixPath.setMap(map);
  }

}); //socket shapes 6 close

////START: SHAPES SHUTTLE ////////
socket.on('shapesShuttle', function(shapesShuttle) {
  drawShuttleLine = function() {
  routeShuttle = shapesShuttle
  var trainShuttleCoordinates = [];

  shapesShuttle.forEach(function(e,k){
    trainShuttleCoordinates.push(e)
  });

  trainShuttlePath = new google.maps.Polyline({
    path: trainShuttleCoordinates,
    geodesic: true,
    strokeColor: '#787878',
    strokeOpacity: 1.0,
    strokeWeight: 3
  });

  trainShuttlePath.setMap(map);
  }

}); //socket shapes Shuttle close

    // combined geo-location and layer-transit to compile Google map
    // https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
    // https://developers.google.com/maps/documentation/javascript/examples/layer-transit
    window.initMap = function() {

      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.75529, lng: -73.987495}, //this is set to NYC lat and long
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: false
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
          infoWindow.setContent('You are here.');
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
                            'Sorry, we couldn\'t find your location.' :
                            'Sorry, your browser doesn\'t support geolocation.');
    }



});// wrap closure
