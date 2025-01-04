const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
    country: { type: String, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    street: { type: String, required: true },
    landmark: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true }
})

module.exports = mongoose.model('Address', addressSchema)