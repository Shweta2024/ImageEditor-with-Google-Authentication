const express = require('express')
const ejs = require('ejs')
const loginRoute = require('./routes/login')
const dotenv = require('dotenv')

const PORT = process.env.PORT || 5000
dotenv.config()

const app = express()
app.set('view engine', 'ejs')
app.use(loginRoute)

app.listen(PORT, (req, res) => {
    console.log(`server started at port: ${PORT}`)
})
