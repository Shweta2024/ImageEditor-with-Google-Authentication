const router = require('express').Router()
const session = require('express-session')


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

module.exports = router
