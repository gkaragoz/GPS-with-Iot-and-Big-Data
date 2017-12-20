function initFirebase(){
  var data = {
    timestamp: 148420310123,
    lat: 40.775384,
    lng: 30.366367
  }

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDCcNAWv3tggQHNt1QN3-X-vjB_uQBC3R8",
    authDomain: "iot-gps-for-sau.firebaseapp.com",
    databaseURL: "https://iot-gps-for-sau.firebaseio.com",
    projectId: "iot-gps-for-sau",
    storageBucket: "iot-gps-for-sau.appspot.com",
    messagingSenderId: "195237350046"
  };
  firebase.initializeApp(config);

  // Get a reference to the auth service
  var auth = firebase.auth();

  firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      console.log("[info] User has been logged in: " + uid);
      data.sender = uid;
      // ...
    } else {
      // User is signed out.
      // ...
    }
    // ...
  });
}

function getFirebaseUserData(){
  var databaseRef = firebase.database().ref();
  databaseRef.on('value', function(snapshot) {
    if (snapshot.val() == null)
      return;

    var stringifiedData = JSON.stringify(snapshot.val());
    var dataSize = Object.keys(stringifiedData).length;
    var parsedData = JSON.parse(stringifiedData);

    var gps = parsedData.gps;
    var users = gps.users;

    for (var i = 0; i < users.length; i++) {
      var parsedLocations = [];
      var parsedActivities = [];

      var user = users[i];
      var email = user.email;
      var name = user.name;
      var age = user.age;
      var gender = user.gender;
      var activities = user.activities;

      for (var j = 0; j < activities.length; j++) {
        var activity = activities[j];
        var location = activity.locations;
        var totalDistance = activity.totalDistance;
        var totalTime = activity.totalTime;

        for (var k = 0; k < location.length; k++) {
          var lat = location[k].lat;
          var lng = location[k].lng;
          var timestamp = location[k].timestamp;

          var parsedLocation = new Location(lat, lng, timestamp);
          parsedLocations.push(parsedLocation);
        }
        var parsedActivity = new Activity(parsedLocations, totalDistance, totalTime);
        parsedActivities.push(parsedActivity);
        parsedLocations = [];
      }
      var user = new User(email, name, age, gender, parsedActivities);
      gpsUsers.push(user);
    }

    DrawEverything();

    console.log("[info] User datas have been got: " + dataSize + " byte");
    return parsedData;
  });
}

function writeFirebaseUserData(data) {
  // Get a reference to the database service
  var databaseRef = firebase.database().ref();
  var locationsRef = databaseRef.child('app/gps/' + data.sender);
  var newDataRef = locationsRef.push();
  newDataRef.set({
    timestamp: data.timestamp,
    lat: data.lat,
    lng: data.lng
  });
  console.log("[info] Data has been written: " + JSON.stringify(data));
}
