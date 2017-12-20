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

    var parsedActivities = [];

    var stringifiedData = JSON.stringify(snapshot.val());
    var dataSize = Object.keys(stringifiedData).length;
    var parsedData = JSON.parse(stringifiedData);

    var gps = parsedData.gps;
    for (var i = 0; i < Object.keys(gps).length; i++) {
      var email = gps.user.email;
      var name = gps.user.name;
      var age = gps.user.age;
      var gender = gps.user.gender;
      var activities = gps.user.activity;

      for (var j = 0; j < Object.keys(activities).length; j++) {
        var activity = activities[j];
        var timestamp = Object.keys(activity)[j];
        var lat = activity[timestamp].lat;
        var lng = activity[timestamp].lng;
        var totalDistance = activity.totalDistance;
        var totalTime = activity.totalTime;

        var parsedActivity = new Activity(timestamp, lat, lng, totalDistance, totalTime);
        parsedActivities.push(parsedActivity);
      }
      var user = new User(email, name, age, gender, parsedActivities);
      users.push(user);
    }

    for (var i = 0; i < users.length; i++) {
      users[i].Display();
    }

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
