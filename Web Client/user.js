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
  
  GetActivitiesCount() {
    return this.activities.length;
  }
}
