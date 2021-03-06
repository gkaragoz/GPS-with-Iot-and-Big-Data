//Map options object
var options;

//Map reference
var map;

function initMap(){
  //Set map options
  //Sakarya 40.775384° N, 30.366367° E
  //Get new map instance
  map = new google.maps.Map(document.getElementById('map', options), {
    zoom:12,
    center:{lat:40.775384,lng:30.366367}
  });

  initUI();
}

function initUI(){
  var getDataDiv = document.createElement('div');
  var centerControl = new getDataButton(getDataDiv, map);

  getDataDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(getDataDiv);
}

function createFlightDraw(locations, color) {
  var flightPlanCoordinates = [];
  for (var i = 0; i < locations.length; i++) {
    var coordinate = {lat: locations[i].lat, lng: locations[i].lng};
    flightPlanCoordinates.push(coordinate);
  }

  var centerLat = (flightPlanCoordinates[0].lat + flightPlanCoordinates[1].lat) / 2;
  var centerLng = (flightPlanCoordinates[0].lng + flightPlanCoordinates[1].lng) / 2;

  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: color,
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);
}

function createMarker(location, content) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    animation: google.maps.Animation.DROP,
    label: content.title,
    title: content.title,
  });

  var contentString = '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h1 id="firstHeading" class="firstHeading">' + content.title + '</h1>'+
              '<div id="bodyContent">'+
              '<p><b>E-Mail:\t' + content.email +
              '<p>Name:\t' + content.name + '</p>' +
              '<p>Age:\t' + content.age + '</p>' +
              '<p>Gender:\t' + content.gender + '</p>' +
              '<p>Total Time:\t' + content.totalTime + ' Minutes.' + '</p>' +
              '<p>Total Distance:\t' + content.totalDistance + ' Kilometers.' + '</p>' +
              '</div>'+
              '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }

    if (isInfoWindowOpen(infowindow)){
      infowindow.close();
    } else {
      infowindow.open(map, marker);
    }
  });

  console.log("Drew marker!");
  marker.setMap(map);
}

function isInfoWindowOpen(infoWindow){
    var map = infoWindow.getMap();
    return (map !== null && typeof map !== "undefined");
}

function getDataButton(controlDiv){
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to get datas from Firebase';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Get Data from Firebase';
  controlUI.appendChild(controlText);

  controlUI.addEventListener('click', function() {
    for (var i = 0; i < allUsers.length; i++) {
      allUsers[i].Display();
    }
  });
}

function setMapCenter(zoomLevel, location) {
  var map = new google.maps.Map(document.getElementById('map', options), {
    zoom:zoomLevel,
    center:{lat:location.lat,lng:location.lng}
  });
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

function getRandomInRange(from, to) {
    return (Math.random() * (to - from) + from);
}

function getRandomInRangeFixed(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}
