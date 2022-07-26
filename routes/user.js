const express = require('express');
const route = express.Router();
const {isLoggedIn} = require('../middlewares/auth');
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
route.use(isLoggedIn)
route.get('/home', UserController.homeLoggedIn)
route.get('/addProfile', UserController.addProfile)
route.post('/addProfile', upload.single('photo'), UserController.postAddProfile)
route.get('/profile', UserController.editProfile)
route.post('/profile', upload.single('photo'), UserController.postEditProfile)
route.get('/addPost', UserController.formAddPost)
route.post('/addPost', upload.single('photo'),UserController.addPost)
route.get('/managePost', UserController.managePost)
route.get('/managePost/delete/:postId', UserController.deletePost)
route.get('/managePost/edit/:postId', UserController.formEditPost)
route.post('/managePost/edit/:postId', UserController.postEditPost)
route.get('/like/:postId', UserController.like)
route.get('/logout',UserController.logOut)

module.exports = route