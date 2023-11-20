// include required dependencies
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const dotenv = require('dotenv')
const session = require('express-session')
const loginLogoutRoute = require('./routes/index')
const authRoute = require('./routes/auth')
const imageRoute = require('./routes/image')
const ejs = require('ejs')
require('./passport-config')
const PORT = process.env.PORT || 5000
dotenv.config()

const app = express()

app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))


// connect to DB
mongoose.connect(process.env.DB_CONNECTION_STRING)


// use session & initialize passport
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize()) // initialize is a function inside passport, it set some of the basics
app.use(passport.session())


// use all routes
app.use('/auth/google', authRoute)
app.use('/', loginLogoutRoute)
app.use('/image', imageRoute)


app.listen(PORT, (req, res) => {
    console.log(`server started at port: ${PORT}`)
})