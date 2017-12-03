var mongoose = require('mongoose');

//GPS Schema
var gpsSchema = mongoose.Schema({
  name:{
    type: String,
    required : true
  },
  create_date:{
    type: Date,
    default: Date.now
  }
});

var Gps = module.exports = mongoose.model('Gps', gpsSchema);

//Get GPS list
module.exports.getGps = function(callback, limit){
  Gps.find(callback).limit(limit);
}
