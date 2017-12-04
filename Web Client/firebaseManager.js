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

      writeUserData(data);
      getUserData(1);
      // ...
    } else {
      // User is signed out.
      // ...
    }
    // ...
  });

  function getUserData(postId){
    var databaseRef = firebase.database().ref();
    databaseRef.on('value', function(snapshot) {
      var data = JSON.stringify(snapshot.val());
      var user01 = JSON.parse(data);

      console.log(JSON.stringify(data));
    });
    console.log("[info] User data has been got!");
  }

  function writeUserData(data) {
    console.log("[info] " + JSON.stringify(data) + " will write!");

    // Get a reference to the database service
    var databaseRef = firebase.database().ref();
    var locationsRef = databaseRef.child('app/locations/' + data.sender);
    var newDataRef = locationsRef.push();
    newDataRef.set({
      timestamp: data.timestamp,
      lat: data.lat,
      lng: data.lng
    });
    console.log("[info] Data has been written!");
  }
}
