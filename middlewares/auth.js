const session = require('express-session');

const isLoggedIn = route.use(function(req,res,next){
    if(!req.session.userId){
        const error = `Please Login`
        res.redirect(`/login?error=${error}`)
    }else{
        next()
    }
})

module.exports = {isLoggedIn}