function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 3,
    styles: [{
      featureType: 'poi',
      stylers: [{ visibility: 'off' }]  // Turn off points of interest.
    }, {
      featureType: 'transit.station',
      stylers: [{ visibility: 'off' }]  // Turn off bus stations, train stations, etc.
    }],
    disableDoubleClickZoom: true
  });

  // Create the DIV to hold the control and call the makeInfoBox() constructor
  // passing in this DIV.
  var infoBoxDiv = document.createElement('div');
  var infoBox = new makeInfoBox(infoBoxDiv, map);
  infoBoxDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoBoxDiv);
}

function makeInfoBox(controlDiv, map) {
   // Set CSS for the control border.
   var controlUI = document.createElement('div');
   controlUI.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
   controlUI.style.backgroundColor = '#fff';
   controlUI.style.border = '2px solid #fff';
   controlUI.style.borderRadius = '2px';
   controlUI.style.marginBottom = '22px';
   controlUI.style.marginTop = '10px';
   controlUI.style.textAlign = 'center';
   controlDiv.appendChild(controlUI);

   // Set CSS for the control interior.
   var controlText = document.createElement('div');
   controlText.style.color = 'rgb(25,25,25)';
   controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
   controlText.style.fontSize = '100%';
   controlText.style.padding = '6px';
   controlText.innerText = 'The map shows all clicks made in the last 10 minutes.';
   controlUI.appendChild(controlText);
 }
