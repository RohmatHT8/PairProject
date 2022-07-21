const {Profile,User,Category, Post} = require("../models");
const bcrypt = require('bcryptjs');
const getTime = require('../helper/helper')
const {Op} = require('sequelize')

class UserController {

    static home(req,res){
        let data = {};
        Post.findAll({include:User})
         .then(post => {
            data.post = post
            return Category.findAll()
         })
         .then(category => {
            data.category = category
            res.render('home', data)
         })
         .catch(err => {
            res.send(err)
         })
    }

    static homeLoggedIn(req, res) {
        const {sort, Search } = req.query
        const userId = req.session.userId
        console.log(userId)
        let data = {}
        User.findByPk(userId,{include:Profile})
         .then(user => {
           data.user = user
           return Category.findAll()
        })
        .then(category => {
            data.category = category
            return Post.findAll({include:User,
                where: {
                    title : {
                        [Op.iLike]:'%bai%'
                    }
                }
            })
        })
        .then(post => {
            data.post = post
            res.render('homeLoggedIn', data)
        })
        .catch(err => {
            res.send(err)
         })
    }

    static like (req, res) {
      const {postId} = req.params
      Post.increment({like: 1}, {
        where : {
            id:postId
        }
      })
      .then(() => {
        res.redirect('/home')
      })
      .catch(err => {
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

    static addProfile(req, res) {
        const {id} = req.params
        User.findByPk(id, {include:Profile})
        .then(user=>{
            res.render('addProfile',{user})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static postAddProfile(req, res) {
        const photo = req.file.filename
        const {id} = req.params
        const { displayName, dateOfBirth } = req.body
        Profile.create({ displayName, dateOfBirth, profilePicture:photo, UserId:id})
          .then(()=>{
            res.redirect('/home')
          })
          .catch(err => {
            res.send(err)
          })
    }

    static editProfile(req, res) {
        const {id} = req.params
        User.findByPk(id, {include:Profile})
        .then(user=>{
            res.render('editProfile',{user})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static postEditProfile(req, res) {
        const photo = req.file.filename
        const { displayName, dateOfBirth } = req.body
        const {id} = req.params
        Profile.update({displayName, dateOfBirth, profilePicture:photo},{where:{UserId:+id}})
        .then(()=>{
            res.redirect('/home')
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static formAddPost(req, res) {
        const {id} = req.params
        let data = {};
        User.findByPk(id, {include:Profile})
        .then(user => {
            data.user = user
            return Category.findAll()
        })
        .then(category=> {
            data.category = category
            res.render('addPost', data)
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
        .then(() => {
            res.redirect('/home')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static managePost(req, res) {
        const {id} = req.params
        let data = {};
        User.findByPk(id, {include:Profile})
            .then(user => {
              data.user = user
              return Post.findAll({include : Category,
                where: {
                UserId: {
                   [Op.eq] : +id
                 }
                }
              })
            })
            .then(post => {
              data.post = post
              res.render('managePost', {post:data.post, user:data.user, getTime})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static formEditPost (req, res) {
        const {id} = req.params
        const {postId} = req.params
        let data = {};
        User.findByPk(id, {include:Profile})
        .then(user => {
            data.user = user
            return Category.findAll()
        })
        .then(category=> {
            data.category = category
            return Post.findByPk(postId, {include:Category})
        })
        .then(post => {
            data.post = post
            res.render('editPost', data)
        })
        .catch(err=>{
            res.send(err)
        })
    } 


    static postEditPost (req, res) {
        const {postId, id} = req.params
        const {title, CategoryId, description} = req.body
        Post.update({title, CategoryId, description}, {
            where : {
                id:postId
            }
        })
        .then(() => {
            res.redirect(`/managePost/${id}`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static deletePost(req,res){
        const postId = req.params.postId
        const id = req.params.id

        Post.destroy({where:{id:+postId}})
        .then(()=>{
            res.redirect(`/managePost/${id}`)
        })
        .catch(err=>{
            res.send(err)
        })
    }

}
module.exports = UserController