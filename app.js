const express = require('express')
const loginRoute = require('./routes/login')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const ejs = require('ejs')


const PORT = process.env.PORT || 5000
dotenv.config()

const app = express()
app.set('view engine', 'ejs')

mongoose.connect(process.env.DB_CONNECTION_STRING)

app.use(loginRoute)

app.listen(PORT, (req, res) => {
    console.log(`server started at port: ${PORT}`)
})
