const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'customer', 'artist', 'employer'], default: 'customer' },
    bio: { type: String, default: '' },
    profilePic: { type: String, default: '' },
    coverPic: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    location: { type: String, default: '' },
    gender: { type: String, enum: ['Male', 'Female', 'Other', 'Prefer not to say'], default: 'Prefer not to say' },
    createdAt: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('User', userSchema)