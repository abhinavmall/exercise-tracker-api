const express = require('express');
const router = express.Router();
const mainController = require('../controllers/MainController');

// Homepage
router.get('/', mainController.mainPage);

// User routes
// Add user
router.post('/api/exercise/new-user', mainController.addUser);
// Get all users
router.get('/api/exercise/users', mainController.getAllUsers);

// Exercise routes
// Add exercise
router.post('/api/exercise/add', mainController.addExercise);
// Get Full exercise log - Also handle params
//router.get('/api/exercise/log', mainController.getExerciseLog);

module.exports = router;