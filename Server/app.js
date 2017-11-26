var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to Mongoose
mongoose.connect('mongodb://localhost/gpsdb', {
  useMongoClient: true,
  /* other options */
});
var db = mongoose.connection;

app.get('/', function(req, res){
  res.send('Please use /api/gps');
});

app.listen(3000);
console.log('Running on port 3000...');
