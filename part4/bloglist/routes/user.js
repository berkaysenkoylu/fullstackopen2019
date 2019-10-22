const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

// Fetch all users
router.get('', userController.getAllUsers);

// Create a new user
router.post('/signup', userController.createUser);

// Log in the existing user
router.post('/login', userController.loginUser);

// Delete the user with a given id
router.delete('/:id', userController.deleteUser);

module.exports = router;