var allUsers = [];
var availableUserNumber = 0;

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

function SendDummyData(no) {
  var data1 =
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
            }
          ],
          "totalDistance" : 6.2,
          "totalTime" : 27
        }
      ],
      "age" : "21",
      "email" : "gkaragoz96@gmail.com",
      "gender" : "Male",
      "name" : "Gökhan"
    };

    var data2 =
      {
        "activities" : [
          {
            "locations" : [
              {
                "timestamp" : 1513711345,
                "lat":40.742207,
                "lng":30.325448
              },
              {
                "timestamp" : 1513711346,
                "lat":40.741971,
                "lng":30.325309
              },
              {
                "timestamp" : 1513713452,
                "lat":40.741288,
                "lng":30.327390
              },
              {
                "timestamp" : 15137113463,
                "lat":40.742914,
                "lng":30.329407
              },
              {
                "timestamp" : 1513712342,
                "lat":40.743580,
                "lng":30.329321
              },
              {
                "timestamp" : 1513734532,
                "lat":40.743141,
                "lng":30.330587
              },
              {
                "timestamp" : 1513716643,
                "lat":40.744239,
                "lng":30.331274
              }
            ],
            "totalDistance" : 2.2,
            "totalTime" : 12
          }
        ],
        "age" : "23",
        "email" : "illegaldisease@gmail.com",
        "gender" : "Male",
        "name" : "Furkan"
      };

      var data3 =
        {
          "activities" : [
            {
              "locations" : [
                {
                  "timestamp" : 1513711345,
                  "lat":40.756420,
                  "lng":30.354253
                },
                {
                  "timestamp" : 1513711346,
                  "lat":40.756686,
                  "lng":30.356207
                },
                {
                  "timestamp" : 1513713452,
                  "lat":40.759740,
                  "lng":30.356716
                },
                {
                  "timestamp" : 15137113463,
                  "lat":40.761877,
                  "lng":30.357163
                },
                {
                  "timestamp" : 1513712342,
                  "lat":40.761592,
                  "lng":30.358951
                },
                {
                  "timestamp" : 1513734532,
                  "lat":40.761618,
                  "lng":30.360747
                },
                {
                  "timestamp" : 1513716643,
                  "lat":40.761964,
                  "lng":30.361712
                },
                {
                  "timestamp" : 1513716643,
                  "lat":40.760583,
                  "lng":30.362860
                }
              ],
              "totalDistance" : 8.2,
              "totalTime" : 25
            }
          ],
          "age" : "21",
          "email" : "umutsimsek96@gmail.com",
          "gender" : "Male",
          "name" : "Umut"
        };

    if (no == 1)
      writeFirebaseUserData(data1, availableUserNumber);
    else if (no == 2)
      writeFirebaseUserData(data2, availableUserNumber);
    else if (no == 3)
      writeFirebaseUserData(data3, availableUserNumber);


}
