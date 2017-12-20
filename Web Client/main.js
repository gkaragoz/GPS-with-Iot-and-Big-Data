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

  var locations2 = [
    {lat:40.743399, lng:30.370077},
    {lat:40.744247, lng:30.371341},
    {lat:40.745395, lng:30.372351},
    {lat:40.746762, lng:30.373596},
    {lat:40.747924, lng:30.373740},
    {lat:40.748867, lng:30.373867},
    {lat:40.749209, lng:30.373939},
    {lat:40.749154, lng:30.375960},
    {lat:40.748977, lng:30.376339},
    {lat:40.749004, lng:30.377042},
    {lat:40.747350, lng:30.376916},
    {lat:40.745505, lng:30.375869},
    {lat:40.745026, lng:30.377944}
  ];

  var locations3 = [
    {lat:40.760085, lng:30.365061},
    {lat:40.765164, lng:30.371950},
    {lat:40.765739, lng:30.371039},
    {lat:40.766129, lng:30.363665},
    {lat:40.767440, lng:30.363787},
    {lat:40.767600, lng:30.371677},
    {lat:40.767715, lng:30.375349},
    {lat:40.771002, lng:30.380113}
  ];

  createFlightDraw(locations, Colors.GREEN);
  createFlightDraw(locations2, Colors.BLUE);
  createFlightDraw(locations3, Colors.RED);
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
