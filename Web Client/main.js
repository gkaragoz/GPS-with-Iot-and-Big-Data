function initMap(){
  //Map options
  //Sakarya 40.6940° N, 30.4358° E
  var options = {
    zoom:10,
    center:{lat:40.6940,lng:30.4358}
  }

  //New map
  var map = new google.maps.Map(document.getElementById('map'), options);

  //Listen for click on map
  google.maps.event.addListener(map, 'click',
  function(event){
    //Add marker
    addMarker({coords:event.latLng});
  });

  //Array of markers
  var markers = [
    {
      coords:{lat:40.743817,lng:30.338253},
      iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      content:'<h1>Sakarya University</h1>'
    },
    {
      coords:{lat:40.553817,lng:30.338253}
    },
    {
      coords:{lat:40.853817,lng:30.455253}
    }
  ];

  //Loop through markers
  for(var i=0; i<markers.length; i++){
    addMarker(markers[i]);
  }

  //Add marker function
  function addMarker(props){
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
}