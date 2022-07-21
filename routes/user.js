const express = require('express');
const UserController = require('../controllers/userController');
const route = express.Router();


route.get('/register', UserController.registerForm);
route.post('/register',UserController.postRegister)