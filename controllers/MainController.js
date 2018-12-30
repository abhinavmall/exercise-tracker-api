const mongoose = require('mongoose');
const User = mongoose.model('User');
const Exercise = mongoose.model('Exercise');
const userHandler = require('../handlers/UserHandler');
const exerciseHandler = require('../handlers/ExerciseHandler');

exports.mainPage = (req, res) => {
  res.sendFile('app/views/index.html',  {"root": '/'});
}

exports.addUser = (req, res) => {
  var userName = req.body.username;
  console.log('Username = ' + req.body.username);
  
  // Find whether already present.
  User.findOne(
    {username: userName},
    function(err, data){
      if(err) {
        console.log(err);
        res.json(err);
      }
      else {
        // Check whether it is present
        if (null == data) {
          console.log('User not found. Creating new one.');
          var user = new User();
          user.username = userName;
          user.save(function(err,data){
            res.json(data);
          });
        }
        else {
          console.log('Found user');
          res.json(data);
        }
      }
    });

}
/*
exports.getAllUsers = async(req, res) => {
}

exports.addExercise = async(req, res) => {
}

exports.getExerciseLog = async(req, res) => {
}

*/