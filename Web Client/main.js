var clientLocations = [];

function initApplication(){
  initMap();
  initFirebase();
  initCustomUIManager();

  getFirebaseUserData();
}
