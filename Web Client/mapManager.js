//Map options object
var options;

//Map reference
var map;

function initMap(){
  //Set map options
  //Sakarya 40.775384° N, 30.366367° E
  options = {
    zoom:12,
    center:{lat:40.775384,lng:30.366367}
  }

  //Get new map instance
  map = new google.maps.Map(document.getElementById('map'), options);
}

//Add marker function
function addMapMarker(props){
  var marker = new google.maps.Marker({
    position:props.coords,
    map:map,
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
