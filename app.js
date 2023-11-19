const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const dotenv = require('dotenv')
const session = require('express-session')
const authRoute = require('./routes/auth')
const ejs = require('ejs')
require('./passport-config')
const PORT = process.env.PORT || 5000
dotenv.config()

const app = express()

app.set('view engine', 'ejs')
mongoose.connect(process.env.DB_CONNECTION_STRING)

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize()) // initialize is a function inside passport, it set some of the basics
app.use(passport.session())

app.use('/auth/google', authRoute)
app.use('/', require('./routes/index'))

app.listen(PORT, (req, res) => {
    console.log(`server started at port: ${PORT}`)
})