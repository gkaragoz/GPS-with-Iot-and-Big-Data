function initApplication(){
  initMap();
  initFirebase();
  initCustomUIManager();

  getFirebaseUserData(1);
}
