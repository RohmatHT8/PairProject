const express = require('express');
const route = express.Router();
const UserController = require('../controllers/userController');
const path = require('path')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage:storage })

route.get('/', UserController.home)
route.get('/register', UserController.registerForm);
route.post('/register', UserController.postRegister)
route.get('/login', UserController.formLogin)
route.post('/login', UserController.isLogin)
route.get('/profile', UserController.editProfile)
route.post('/profile', upload.single('photo'), UserController.postEditProfile)

module.exports = route