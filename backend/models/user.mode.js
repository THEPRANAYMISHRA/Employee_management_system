const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: String,
    password: String
})

let UserModel = mongoose.model("user", userSchema)

module.exports = UserModel;

