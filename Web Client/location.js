class Location {
  constructor(lat, lng, timestamp) {
    this.lat = lat;
    this.lng = lng;
    this.timestamp = timestamp;
  }

   Display() {
    console.log("Lat: " + this.lat);
    console.log("Lng: " + this.lng);
    console.log("Timestamp: " + this.timestamp);
  }
}
