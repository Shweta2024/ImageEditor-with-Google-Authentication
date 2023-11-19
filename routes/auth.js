const passport = require('passport')
const router = require('express').Router()
require('../passport-config')


// initiate google-oauth login
// this shows the google login prompt
router.get('/',
    passport.authenticate('google', { scope: ['profile', 'email'] }
))


// callback route once user has authenticated successfully
router.get('/callback',
    passport.authenticate('google', {
        successRedirect: '/image/editor', // give access to editor route
        failureRedirect: '/' // back to login screen if there is a failure
}))

module.exports = router
