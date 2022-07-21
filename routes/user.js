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
route.get('/addProfile/:id', UserController.addProfile)
route.post('/addProfile/:id', upload.single('photo'), UserController.postAddProfile)
route.get('/profile/:id', UserController.editProfile)
route.post('/profile/:id', upload.single('photo'), UserController.postEditProfile)
route.get('/addPost/:id', UserController.formAddPost)
route.post('/addPost/:id', upload.single('photo'),UserController.addPost)
route.get('/managePost/:id', UserController.managePost)
route.get('/managePost/:id/delete/:postId', UserController.deletePost)
route.get('/managePost/:id/edit/:postId', UserController.formEditPost)
route.post('/managePost/:id/edit/:postId', UserController.postEditPost)
route.get('/like/:postId', UserController.like)
route.get('/logout',UserController.logOut)

module.exports = route