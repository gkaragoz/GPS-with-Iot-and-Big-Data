var allUsers = [];
var availableUserNumber = -1;

function initApplication(){
  initMap();
  initFirebase();

  getFirebaseUserData((response) => {
    parseData(response);
    console.log("Data received!");

    availableUserNumber = getAvailableUserNumber(allUsers);
    console.log("Available User Number is: " + availableUserNumber);

    for (var i = 0; i < allUsers.length; i++) {
      //allUsers[i].Display();
      allUsers[i].Draw();
      allUsers[i].Marker();
    };
  });
}

function getAvailableUserNumber(data) {
  return data.length;
}

function parseData(data) {
  allUsers = [];

  var parsedLocations = [];
  var parsedActivities = [];

  var gps = data.gps;
  var users = gps.users;

  if(users == undefined)
    return;

  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    var email = user.email;
    var name = user.name;
    var age = user.age;
    var gender = user.gender;
    var activities = user.activities;

    if(activities == undefined)
      return;

    for (var j = 0; j < activities.length; j++) {
      var activity = activities[j];
      var locations = activity.locations;
      var totalDistance = activity.totalDistance;
      var totalTime = activity.totalTime;

      if(locations == undefined)
        return;

      for (var k = 0; k < locations.length; k++) {
        var location = locations[k];
        var lat = location.lat;
        var lng = location.lng;
        var timestamp = location.timestamp;

        var parsedLocation = new Location(lat, lng, timestamp);
        parsedLocations.push(parsedLocation);
      }
      var parsedActivity = new Activity(parsedLocations, totalDistance, totalTime);
      parsedActivities.push(parsedActivity);
      parsedLocations = [];
    }
    var user = new User(email, name, age, gender, parsedActivities);
    allUsers.push(user);
    parsedActivities = [];
  }
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

    writeFirebaseUserData(data, availableUserNumber);
}
