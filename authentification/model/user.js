const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    mail: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    isAdmin: {type: Boolean, default: false}
})

module.exports = mongoose.model('user', userSchema)
