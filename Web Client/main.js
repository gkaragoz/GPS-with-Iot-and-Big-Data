var clientLocations = [];
var gpsUsers = [];

function initApplication(){
  initMap();
  initFirebase();

  getFirebaseUserData();
}

function SendDummyData() {
  var data =
    {
        "activities" : [
          {
            "locations" : [
              {
                "timestamp" : 1513711345,
                "lat":40.743399,
                "lng":30.370077
              },
              {
                "timestamp" : 1513711346,
                "lat":40.744247,
                "lng":30.371341
              },
              {
                "timestamp" : 1513713452,
                "lat":40.745395,
                "lng":30.372351
              },
              {
                "timestamp" : 15137113463,
                "lat":40.746762,
                "lng":30.373596
              },
              {
                "timestamp" : 1513712342,
                "lat":40.747924,
                "lng":30.373740
              },
              {
                "timestamp" : 1513734532,
                "lat":40.748867,
                "lng":30.373867
              },
              {
                "timestamp" : 1513716643,
                "lat":40.749209,
                "lng":30.373939
              },
              {
                "timestamp" : 1513767113,
                "lat":40.749154,
                "lng":30.375960
              },
              {
                "timestamp" : 1513713453,
                "lat":40.748977,
                "lng":30.376339
              },
              {
                "timestamp" : 1513123333,
                "lat":40.749004,
                "lng":30.377042
              },
              {
                "timestamp" : 1513711345,
                "lat":40.747350,
                "lng":55.376916
              },
              {
                "timestamp" : 1513715466,
                "lat":42.745505,
                "lng":32.375869
              },
              {
                "timestamp" : 1513711567,
                "lat":42.745026,
                "lng":30.377944
              }
            ],
            "totalDistance" : 1234,
            "totalTime" : 2000
          }
        ],
        "age" : "21",
        "email" : "gokhangmailcom",
        "gender" : "male",
        "name" : "gokhan"
      };

  getFirebaseLastUserNumber(function (response){
    var userNumber = response;
    writeFirebaseUserData(data, userNumber);
  });
}

function DrawEverything () {
  var flightDraws = [];
  var currentActivityID = -1;
  for (var i = 0; i < gpsUsers.length; i++) {
    gpsUsers[i].Display();
    var locations = gpsUsers[i].GetLocations();

    console.log("ActivityID: " + locations[i].activityID);
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

  getFirebaseLastUserNumber();
}
