var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Gps = require('./models/gps');
User = require('./models/user');

//Connect to Mongoose
mongoose.connect('mongodb://localhost/gpsdb', {
  useMongoClient: true,
  /* other options */
});
var db = mongoose.connection;

app.get('/', function(req, res){
  res.send('Please use /api/gps');
});

app.get('/api/gps', function(req, res){
  Gps.getGps(function(err, gps){
    if(err){
      throw err;
    }
    res.json(gps);
  });
});

app.get('/api/users', function(req, res){
  User.getUsers(function(err, users){
    if(err){
      throw err;
    }
    res.json(users);
  });
});

app.listen(3000);
console.log('Running on port 3000...');
