class Activity {
  constructor(locations, totalDistance, totalTime) {
    this.locations = locations;
    this.totalDistance = totalDistance;
    this.totalTime = totalTime;
  }

  Display() {
    for (var i = 0; i < this.locations.length; i++) {
      this.locations[i].Display();
    }
    console.log("Total Distance: " + this.totalDistance + " Kilometers");
    console.log("Total Time: " + this.totalTime + " Minutes");
  }

  GetLocationsCount() {
    return this.locations.length;
  }
}
