var clientLocations = [];
var gpsUsers = [];

function initApplication(){
  initMap();
  initFirebase();

  getFirebaseUserData();

  var locations = [
      {lat:40.742525, lng:30.334567},
      {lat:40.743956, lng:30.341433},
      {lat:40.744476, lng:30.345553},
      {lat:40.747467, lng:30.352076},
      {lat:40.747467, lng:30.356368},
      {lat:40.747728, lng:30.361518},
      {lat:40.749418, lng:30.363406},
      {lat:40.752929, lng:30.363577},
      {lat:40.756440, lng:30.364092}
  ];

  createFlightDraw(locations, Colors.GREEN);
}

        /////////////////////////////
        //////////CHECK THIS/////////
        /////////////////////////////
        // function containsObject(obj, arr) {
        //   var id = arr.length + 1;
        //   var found = arr.some(function (el) {
        //     return el.username === obj;
        //   });
        // }
        /////////////////////////////
        //////////CHECK THIS/////////
        /////////////////////////////
