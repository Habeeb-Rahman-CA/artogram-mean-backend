const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'customer', 'artist', 'employer'], default: 'customer' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

module.exports = mongoose.model('User', userSchema)