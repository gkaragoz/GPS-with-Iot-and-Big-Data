//Sakarya 40.6940° N, 30.4358° E
function initMap(){
    var options = {
    zoom:10,
    center:{
      lat:40.6940,
      lng:30.4358
      }
    }
    var map = new google.maps.Map(document.getElementById('map'), options);
  }
