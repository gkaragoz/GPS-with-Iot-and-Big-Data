class User {
  constructor(email, name, age, gender, activities) {
    this.email = email;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.activities = activities;
  }

   Display() {
    console.log("Name: " + this.name);
    console.log("Age: " + this.age);
    console.log("Gender: " + this.gender);
    console.log("Email: " + this.email);
    console.log(this.activities.length + " Activities found:");
    for (var i = 0; i < this.activities.length; i++) {
      console.log("Activity " + (i+1) + ":");
      this.activities[i].Display();
    }
  }

  GetLocations() {
    var parsedLocations = [];
    for (var i = 0; i < this.activities.length; i++) {
      var locations = this.activities[i].locations;
      for (var j = 0; j < locations.length; j++) {
        var location = {
          activityID: Object.keys(this.activities)[i],
          lat: locations[j].lat,
          lng: locations[j].lng
        };
        parsedLocations.push(location);
      }
    }
    return parsedLocations;
  }

  GetActivitiesCount() {
    return this.activities.length;
  }

  GetLocationsCount() {
    return this.activities.GetLocationsCount();
  }
}
