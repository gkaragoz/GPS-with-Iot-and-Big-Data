function initCustomUIManager() {
  // Create the DIV to hold the control and call the SendData()
  // constructor passing in this DIV.
  var sendDataDiv = document.createElement('div');
  var sendData = new SendData(sendDataDiv);

  var getDataDiv = document.createElement('div');
  var getData = new GetData(getDataDiv);

  sendDataDiv.index = 1;
  getDataDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(sendDataDiv);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(getDataDiv);
}

/**
 * The SendData sends data to Firebase realtime database.
 * This constructor takes the control DIV as an argument.
 * @constructor
 */
function SendData(controlDiv) {
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to send data to firebase.';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Send Data';
  controlUI.appendChild(controlText);

  var dummyData = {
    sender: "DUMMY_SENDER",
    timestamp: 148420310123,
    lat: 40.775384,
    lng: 30.366367
  };

  // Setup the click event listeners: simply send the data to Firebase.
  controlUI.addEventListener('click', function() {
    writeFirebaseUserData(dummyData);
  });
}

/**
 * The SendData sends data to Firebase realtime database.
 * This constructor takes the control DIV as an argument.
 * @constructor
 */
function GetData(controlDiv) {
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to get data from firebase.';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Get Data';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply send the data to Firebase.
  controlUI.addEventListener('click', function() {
    getFirebaseUserData(0);
  });
}
