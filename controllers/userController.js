const { Profile, User, Category, Post } = require("../models");
const bcrypt = require('bcryptjs');
const getTime = require('../helper/helper')
const { Op } = require('sequelize')

class UserController {

    static home(req, res) {
        let data = {};
        Post.findAll({ include: User })
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
        const { sort, Search } = req.query
        const userId = req.session.userId

        let where = {}
        if (Search) {
            where = {
                title: {
                    [Op.iLike]: `%${Search}%`
                }
            }
        }
        if (sort) {
            where = {
                CategoryId: sort
            }
        }

        let data = {}
        User.findByPk(userId, { include: Profile })
            .then(user => {
                data.user = user
                return Category.findAll()
            })
            .then(category => {
                data.category = category
                return Post.findAll({
                    include: [User, Category],
                    where
                })
            })
            .then(post => {
                data.post = post
                return Post.postCount(userId)
            })
            .then(count=>{
                data.count=count[0].dataValues.postCount
                res.render('homeLoggedIn', data)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static like(req, res) {
        const { postId } = req.params
        Post.increment({ like: 1 }, {
            where: {
                id: postId
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
        const { errors } = req.query
        res.render('register', { errors })
    }

    static postRegister(req, res) {
        const { userName, password, firstName, lastName, email } = req.body

        User.create({ userName, password, firstName, lastName, email })
            .then(() => {
                res.redirect('/login')
            })
            .catch(err => {
                const errors = err.errors.map(el => el.message)
                if (err.name === "SequelizeValidationError") {
                    res.redirect(`/register?errors=${errors}`)
                } else {
                    res.send(err)
                }
            })
    }

    static formLogin(req, res) {
        const { errors } = req.query
        res.render('login', { errors })
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
                        return res.redirect(`/login?errors=${error}`)
                    }
                } else {
                    const error = `invalid username/password`
                    return res.redirect(`/login?errors=${error}`)
                }
            })
    }
    static logOut(req, res) {
        req.session.destroy((err) => {
            if (err) res.send(err)
            else {
                res.redirect('/login')
            }
        })
    }

    static addProfile(req, res) {
        const userId = req.session.userId
        const { errors } = req.query
        User.findByPk(userId, { include: Profile })
            .then(user => {
                res.render('addProfile', { user,errors })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static postAddProfile(req, res) {
        const photo = req.file.filename
        const userId = req.session.userId
        const { displayName, dateOfBirth } = req.body
        Profile.create({ displayName, dateOfBirth, profilePicture: photo, UserId: userId })
            .then(() => {
                res.redirect('/home')
            })
            .catch(err => {
                const errors = err.errors.map(el => el.message)
                if (err.name === "SequelizeValidationError") {
                    res.redirect(`/addProfile?errors=${errors}`)
                } else {
                    res.send(err)
                }
            })
    }

    static editProfile(req, res) {
        const userId =req.session.userId
        User.findByPk(userId, { include: Profile })
            .then(user => {
                res.render('editProfile', { user })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static postEditProfile(req, res) {
        const photo = req.file.filename
        const { displayName, dateOfBirth } = req.body
        const userId = req.session.userId
        Profile.update({ displayName, dateOfBirth, profilePicture: photo }, { where: { UserId: userId } })
            .then(() => {
                res.redirect('/home')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static formAddPost(req, res) {
        const userId = req.session.userId
        const { errors } = req.query
        let data = {};
        User.findByPk(userId, { include: Profile })
            .then(user => {
                data.user = user
                return Category.findAll()
            })
            .then(category => {
                data.category = category
                // res.send(data)
                res.render('addPost', {data,errors})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addPost(req, res) {
        const userId = req.session.userId
        const photo = req.file.filename
        const { title, description, CategoryId } = req.body

        Post.create({ title, description, CategoryId, imageUrl: photo, UserId: userId })
            .then(() => {
                res.redirect('/home')
            })
            .catch(err => {
                const errors = err.errors.map(el => el.message)
                if (err.name === "SequelizeValidationError") {
                    res.redirect(`/addPost?errors=${errors}`)
                } else {
                    res.send(err)
                }
            })
    }

    static managePost(req, res) {
        const userId = req.session.userId
        let data = {};
        User.findByPk(userId, { include: Profile })
            .then(user => {
                data.user = user
                return Post.findAll({
                    include: Category,
                    where: {
                        UserId: {
                            [Op.eq]: userId
                        }
                    }
                })
            })
            .then(post => {
                data.post = post
                res.render('managePost', { post: data.post, user: data.user, getTime })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static formEditPost(req, res) {
        const userId = req.session.userId
        const { postId } = req.params
        let data = {};
        User.findByPk(userId, { include: Profile })
            .then(user => {
                data.user = user
                return Category.findAll()
            })
            .then(category => {
                data.category = category
                return Post.findByPk(postId, { include: Category })
            })
            .then(post => {
                data.post = post
                res.render('editPost', data)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static postEditPost(req, res) {
        const { postId } = req.params

        const { title, CategoryId, description } = req.body
        Post.update({ title, CategoryId, description }, {
            where: {
                id: postId
            }
        })
            .then(() => {
                res.redirect(`/managePost`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static deletePost(req, res) {
        const postId = req.params.postId

        Post.destroy({ where: { id: +postId } })
            .then(() => {
                res.redirect(`/managePost`)
            })
            .catch(err => {
                res.send(err)
            })
    }

}
module.exports = UserController