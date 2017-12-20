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

  var flightPlanCoordinates = [
    {lat: 40.775384, lng: 30.366367},
    {lat: 21.291, lng: -157.821},
    {lat: -18.142, lng: 178.431},
    {lat: -27.467, lng: 153.027}
  ];
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);
}

//Add marker function
function addMapMarker(props){
  var marker = new google.maps.Marker({
    position:props.coords,
    map:map,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10,
      fillColor: getRandomColor(),
    fillOpacity: 0.8,
    scale: 10,
    strokeColor: getRandomColor(),
    strokeWeight: 1
    }
    //icon:props.iconImage
  });

  //Check for custom icon
  if(props.iconImage){
    //Set icon image
    marker.setIcon(props.iconImage);
  }

  //Check content for info window
  if (props.content){
    var infoWindow = new google.maps.InfoWindow({
      content:props.content
    });

    marker.addListener('click', function(){
      infoWindow.open(map, marker);
    });
  }
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
