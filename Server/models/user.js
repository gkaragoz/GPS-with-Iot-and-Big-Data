var mongoose = require('mongoose');

//User Schema
var userSchema = mongoose.Schema({
  name:{
    type: String,
    required : true
  },
  create_date:{
    type: Date,
    default: Date.now
  }
});

var User = module.exports = mongoose.model('User', userSchema);

//Get Users list
module.exports.getUsers = function(callback, limit){
  User.find(callback).limit(limit);
}
