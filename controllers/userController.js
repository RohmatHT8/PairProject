const {Profile,User,Category, Post} = require("../models");
const bcrypt = require('bcryptjs');

class UserController {

    static home(req,res){

        let values
        Post.findAll({include:User})
        .then(post=>{
            values =post
            return Category.findAll()
        })
        .then(category=>{
            res.send(values)
            // res.render('home',{values,category})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static homeLoggedIn(req, res) {
        const{id} = req.params

        let data;
        Profile.findOne({include:User},{where:{UserId:+id}})
        .then(profile=>{
            data=profile
            return Category.findAll()
        })
        .then(category=>{
            // res.send(data)
            res.render('homeLoggedIn',{data,category})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static registerForm(req, res) {
        res.render('register')
    }

    static postRegister(req, res) {
        const { userName, password, firstName, lastName, email } = req.body

        User.create({ userName, password, firstName, lastName, email })
            .then(() => {
                res.redirect('/login')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static formLogin(req, res) {
        res.render('login')
    }

    static isLogin(req, res) {
        const { userName, email, password } = req.body

        User.findOne({ where: { userName, email } })
            .then(user => {
                if (user) {
                    const isValidPassword = bcrypt.compareSync(password, user.password)
                    if (isValidPassword) {
                        req.session.userId = user.id
                        return res.redirect('/home');
                    } else {
                        const error = `invalid username/password`
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = `invalid username/password`
                    return res.redirect(`/login?error=${error}`)
                }
            })
    }
    static logOut(req,res){
        req.session.destroy((err) => {
            if (err) res.send(err)
            else {
                res.redirect('/login')
            }
        })
    }

    static editProfile(req, res) {
        const {id} = req.params
        console.log(req.params);
        Profile.findOne({include:User},{where:{UserId:+id}})
        .then(data=>{
            // res.send([data])
            res.render('editProfile',{data})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static postEditProfile(req, res) {
        const photo = req.file.filename
        const { displayName, dateOfBirth } = req.body
        const {id} = req.params
        // console.log(req.params.id,photo);
        // res.send(req.body)
        Profile.update({displayName, dateOfBirth, profilePicture:photo},{where:{UserId:+id}})
        .then(()=>{
            res.redirect('/')
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static formAddPost(req, res) {
        const {id} = req.params

        let data;
        Profile.findOne({include:User},{where:{UserId:+id}})
        .then(profile=>{
            data=profile
            return Category.findAll()
        })
        .then(category=>{ 
            // res.send(data.User)
            res.render('addPost', {data,category})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static addPost(req, res) {
        const userId = req.session.userId
        const photo = req.file.filename
        const {title,description,CategoryId} = req.body
        
        Post.create({title,description,CategoryId,imageUrl:photo,UserId:userId})
        .then(()=>{
            res.redirect('/home')
        })
    }

    static managePost(req, res) {
        res.render('managePost')
    }

    static deletePost(req,res){
        const postId = req.params.storeId
        const id = req.params.id

        Post.destroy({where:{id:+postId}})
        .then(()=>{
            res.redirect('')
        })
        .catch(err=>{
            res.send(err)
        })
    }

}
module.exports = UserController