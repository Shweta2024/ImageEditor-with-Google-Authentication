const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('./model/User')
require('dotenv').config()


// using Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function (accessToken, refreshToken, profile, cb) {
        // console.log(profile);
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        })
    }
))


// serialize & deserialize user
passport.serializeUser(function (user, done) {
    done(null, user);
})


passport.deserializeUser(function (user, done) {
    // const user = User.find({ googleId: id })
    done(null,user)
})