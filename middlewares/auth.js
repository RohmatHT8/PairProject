const session = require('express-session');

const isLoggedIn =(function(req,res,next){
    if(!req.session.userId){
        const error = `Please Login first...`
        res.redirect(`/login?errors=${error}`)
    }else{
        next()
    }
})

module.exports = {isLoggedIn}