const profile = require("../models/profile")

class UserController {

    static home(req, res) {
        res.render('home')
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
    static logOut(req,res){
        req.session.destroy((err) => {
            if (err) res.send(err)
            else {
                res.redirect('/login')
            }
        })
    }

    static editProfile(req, res) {
        const {id} = req.query
        
        profile.findOne({where:{UserId:+id}})
        .then(data=>{
            res.render('editProfile',{data})
        })
    }

    static postEditProfile(req, res) {
        const photo = req.file.filename
        const { displayName, dateOfBirth } = req.body
        // res.send(req.body)
        profile.update({displayName, dateOfBirth})
        .then(()=>{
            res.redirect('/')
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static formAddPost(req, res) {
        res.render('addPost')
    }

    static addPost(req, res) {
        res.send(req.body)
    }

    static menagePost(req, res) {
        res.render('menagePost')
    }


}
module.exports = UserController