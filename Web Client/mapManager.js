function initMap(){
  //Map options
  //Sakarya 40.775384° N, 30.366367° E
  var options = {
    zoom:12,
    center:{lat:40.775384,lng:30.366367}
  }

  //New map
  var map = new google.maps.Map(document.getElementById('map'), options);

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
