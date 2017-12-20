var clientLocations = [];
var users = [];

function initApplication(){
  initMap();
  initFirebase();
  initCustomUIManager();

  getFirebaseUserData();
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
