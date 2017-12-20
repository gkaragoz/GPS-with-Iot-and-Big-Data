class Activity {
  constructor(timestamp, lat, lng, totalDistance, totalTime) {
    this.timestamp = timestamp;
    this.lat = lat;
    this.lng = lng;
    this.totalDistance = totalDistance;
    this.totalTime = totalTime;
  }

  Display() {
    console.log("Timestamp: " + this.timestamp);
    console.log("Lat: " + this.lat);
    console.log("Lng: " + this.lng);
    console.log("Total Distance: " + this.totalDistance + " Kilometers");
    console.log("Total Time: " + this.totalTime + " Minutes");
  }
}
