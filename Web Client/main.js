function initApplication(){
  initMap();
  initFirebase();
  initCustomUIManager();


  var marker = [
    {
      coords:{lat:40.748378,lng:30.418285}
    },
    {
      coords:{lat:40.743817,lng:30.338253},
      iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      content:'<h1>Sakarya University</h1>'
    },
    {
      coords:{lat:40.756025,lng:30.368216}
    }
  ];

  addMapMarker(marker[0]);
  addMapMarker(marker[1]);
  addMapMarker(marker[2]);

  getFirebaseUserData(1);
}
