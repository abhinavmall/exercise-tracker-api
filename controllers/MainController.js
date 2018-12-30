const mongoose = require('mongoose');
const User = mongoose.model('User');
const Exercise = mongoose.model('Exercise');
const userHandler = require('../handlers/UserHandler');
const exerciseHandler = require('../handlers/ExerciseHandler');
const moment = require('moment'); 

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

exports.getAllUsers = (req, res) => {
  console.log('Get all users');
  
  User.find({}, function(err, users){
    if(err) {
      res.json({'error': err});
    }
    else {
      res.json(users);
    }
  });
}


exports.addExercise = (req, res) => {
  var userName = req.body.userId;
  var description = req.body.description;
  var date = req.body.date;
  var duration = req.body.duration;
  
  console.log('User name = ' + userName
             + ' desc = ' + description
             + ' date = ' + date
             + ' duration = ' + duration);
  
  // find user
  User.findOne(
    {username: userName},
    function(err, user){
      if(null == user) {
        console.log('user not found');
        res.json({'error':'user name not found'});
      }
      else {
        // Create exercise
        var exercise = new Exercise();
        exercise.userId = user._id;
        exercise.description = description;
        exercise.duration = duration;
        if(null != date && "" !== date){
          exercise.date = date;
        }
        else {
          var date = moment().format('YYYY-MM-DD');
          console.log('Date = ' + date);
          exercise.date = date;
        }
        exercise.save(function(err, data){
          if(err){
            console.log('error while saving', err);
            res.json({'error':'Please enter correct values'});
          }
          else{
            res.json(data);
          }
        });
      }
    });
}

/*
exports.getExerciseLog = async(req, res) => {
}

*/