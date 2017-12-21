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

function getFirebaseUserData(callback){
  var databaseRef = firebase.database().ref();
  databaseRef.on('value', function(snapshot) {
    if (snapshot.val() == null)
      return;

    var stringifiedData = JSON.stringify(snapshot.val());
    var dataSize = Object.keys(stringifiedData).length;
    var parsedData = JSON.parse(stringifiedData);

    console.log("[info] User datas have been got: " + dataSize + " byte");

    if (callback)
      callback(parsedData);
  });
}

function writeFirebaseUserData(data) {
  var userNumber = -1;
  firebase.database().ref('gps/users/' + userNumber).set(data);

  console.log("[info] Data has been written: " + JSON.stringify(data));
}
