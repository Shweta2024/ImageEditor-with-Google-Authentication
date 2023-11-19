const router = require('express').Router()
const session = require('express-session')
const isLoggedIn = require('../middleware/isLoggedIn')


// render the login page with functionality to login with google
router.get('/', (req, res) => {
    res.render('index')
})


// handle the logout funtionality 
// destory session and redirect to login page(i.e. root route)
router.get('/logout', (req, res) => {
    req.logOut(function (err) {
        if (err) {
            console.log(err)
        }
        req.session.destroy(() => {
            res.redirect('/')
        })
    })
})


// successfull redirect to editor route 
router.get('/editor', isLoggedIn, (req, res) => {
    res.render('editor')
})

module.exports = router
