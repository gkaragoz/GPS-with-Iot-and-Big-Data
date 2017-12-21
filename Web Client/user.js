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

  Draw() {
    var drawPath = [];

    var locations = this.GetLocations();
    var currentActivity = locations[0].activityID;

    if (locations == undefined)
    {
      console.log("Draw failed!");
      return;
    }

    for (var i = 0; i < locations.length; i++) {
      var activityID = locations[i].activityID;
        console.log(currentActivity);
        if (currentActivity == activityID) {
          drawPath.push({
            lat: locations[i].lat,
            lng: locations[i].lng
          });

          if (i == locations.length - 1)
          {
            createFlightDraw(drawPath, getRandomColor());
            drawPath = [];
            console.log("Drew something!");
          }
        }
        else {
          currentActivity = activityID;
          createFlightDraw(drawPath, getRandomColor());
          drawPath = [];
          console.log("Drew something!");
        }
    }
  }

  Marker() {
    var locations = this.GetLocations();
    var location = {
      lat: locations[0].lat,
      lng: locations[0].lng
    }
    var content = {
      "email": this.email,
      "name": this.name,
      "age": this.age,
      "gender": this.gender,
      "totalTime": this.totalTime,
      "totalDistance": this.totalDistance,
      "title": this.name + " (" + this.age + ")"
    };

    createMarker(location, content);
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
}
