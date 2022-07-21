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
route.get('/profile/:id', UserController.editProfile)
route.post('/profile/:id', upload.single('photo'), UserController.postEditProfile)
route.get('/addPost/:id', UserController.formAddPost)
route.post('/addPost/:id', UserController.addPost)
route.get('/managePost/:id', UserController.menagePost)

module.exports = route