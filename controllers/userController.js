class UserController {

    static home(req, res) {
        res.render('home')
    }

    static registerForm(req, res) {
        res.render('register')
    }

    static postRegister(req, res) {
        res.send(req.body)
    }

    static formLogin (req, res) {
        res.render('login')
    }

    static isLogin (req, res) {
        res.send(req.body)
    }

    static editProfile(req, res) {
        res.render('editProfile')
    }

    static postEditProfile(req, res) {
        const photo = req.file.filename 
        const {displayName, dateOfBirth} = req.body
        res.send(req.body)
    }

    static formAddPost(req, res) {
        res.render('addPost')
    }

    static addPost(req, res) {
        res.send(req.body)
    }

    static menagePost (req, res) {
        res.render('menagePost')
    }


}
module.exports = UserController