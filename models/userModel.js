const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
    fullName: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    address: { type: String, default: '' },
    street: { type: String, default: '' },
    landmark: { type: String, default: '' },
    city: { type: String, default: '' },
    pincode: { type: String, default: '' },
    state: { type: String, default: '' },
})

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'customer', 'artist', 'employer'], default: 'customer' },
    bio: { type: String, default: '' },
    profilePic: { type: String, default: '' },
    coverPic: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    location: {type: String, default: ''},
    addresses: [addressSchema],
    gender: { type: String, enum: ['Male', 'Female', 'Other', 'Prefer not to say'], default: 'Prefer not to say' },
    createdAt: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('User', userSchema)