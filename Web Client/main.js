var clientLocations = [];
var gpsUsers = [];

function initApplication(){
  initMap();
  initFirebase();

  getFirebaseUserData();
  listenFirebase();
}

function DrawEverything () {
  var flightDraws = [];
  var currentActivityID = -1;
  for (var i = 0; i < gpsUsers.length; i++) {
    gpsUsers[i].Display();
    var locations = gpsUsers[i].GetLocations();
    if (locations.length <= 1)
      continue;

    if (currentActivityID == locations[i].activityID)
    {
      flightDraws.push({
        "lat":locations[i].lat,
        "lng":locations[i].lng
      });
    }
    else {
      currentActivityID = locations[i].activityID;
      createFlightDraw(locations, getRandomColor());
    }
  }
}
