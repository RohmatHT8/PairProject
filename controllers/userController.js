const { User } = require('../models');
const bcrypt = require('bcryptjs');

class UserController {
    static home(req,res){
        res.render('home')
    }
    static registerForm(req, res) {
        res.render('register')
    }
    static postRegister(req, res) {
        const { userName, password, firstName, lastName, email } = req.body

        User.create({ userName, password, firstName, lastName, email })
            .then(newUser => {
                res.redirect('/login')
            })
            .catch(err => {
                res.send(err)
            })
    }
    static formLogin(req, res) {
        res.render('login')
    }
    static postLogin(req, res) {
        const { userName, email, password } = req.body

        User.findOne({ where: { userName,email } })
            .then(user => {
                if (user) {
                    const isValidPassword = bcrypt.compareSync(password, user.password)
                    if (isValidPassword) {
                        req.session.userId = user.id
                        return res.redirect('/');
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
    static logOut(req, res) {
        req.session.destroy((err) => {
            if (err) res.send(err)
            else {
                res.redirect('/login')
            }
        })

    }
}
module.exports = UserController