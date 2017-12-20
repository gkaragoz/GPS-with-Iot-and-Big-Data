//Map options object
var options;

//Map reference
var map;

function initMap(){
  //Set map options
  //Sakarya 40.775384° N, 30.366367° E
  //Get new map instance
  var map = new google.maps.Map(document.getElementById('map', options), {
    zoom:12,
    center:{lat:40.775384,lng:30.366367}
  });
}

function createFlightDraw(locations, color) {
  var flightPlanCoordinates = [];

  for (var i = 0; i < locations.length; i++) {
    var coordinate = {lat: locations[i].lat, lng: locations[i].lng};
    flightPlanCoordinates.push(coordinate);
  }

  var centerLat = (flightPlanCoordinates[0].lat + flightPlanCoordinates[1].lat) / 2;
  var centerLng = (flightPlanCoordinates[0].lng + flightPlanCoordinates[1].lng) / 2;

  var map = new google.maps.Map(document.getElementById('map', options), {
    zoom:12,
    center:{lat:centerLat,lng:centerLng}
  });

  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: color,
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);
}

function setMapCenter(zoomLevel, location) {
  var map = new google.maps.Map(document.getElementById('map', options), {
    zoom:zoomLevel,
    center:{lat:location.lat,lng:location.lng}
  });
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateMapLocation() {
  //Return a number between Left value and Right value;
  var lat = (Math.random() * (40.800000 - 40.700000) + 40.700000);
  var lng = (Math.random() * (30.300000 - 30.400000) + 30.400000);

  var location = {
    "lat":lat,
    "lng":lng
  }

  console.log("Random value generated: " + "lat: " + lat + " lng: " + lng);
  return location;
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from);
}
