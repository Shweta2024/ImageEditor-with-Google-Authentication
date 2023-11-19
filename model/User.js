const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')

// create user schema
const userSchema = new mongoose.Schema({
    googleId: String
})

userSchema.plugin(findOrCreate)

// export the User model
module.exports = new mongoose.model("User", userSchema)