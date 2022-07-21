const { User } = require('../models');
const bcrypt = require('bcryptjs');

class UserController {
    static registerForm(req, res) {
        req.render('/register')
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
    static loginForm(req, res) {
        res.render('/login')
    }
    static postLogin(req, res) {
        const { username, password } = req.body

        User.findOne({ where: { username } })
            .then(user => {
                if (user) {
                    const isValidPassword = bcrypt.compareSync(password, user.password)
                    if (isValidPassword) {
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
}
module.exports = UserController