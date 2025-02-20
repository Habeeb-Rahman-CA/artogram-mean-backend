const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        price: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    address: {
        fullName: { type: String, default: '' },
        phoneNumber: { type: String, default: '' },
        address: { type: String, default: '' },
        street: { type: String, default: '' },
        landmark: { type: String, default: '' },
        city: { type: String, default: '' },
        pincode: { type: String, default: '' },
        state: { type: String, default: '' },
    },
    status: { type: String, enum: ['Placed', 'Shipped', 'Delivered', 'Cancelled'], default: 'Placed' },
    razorpayOrderId: { type: String },
    createdAt: { type: Date, default: Date.now() }
}, {
    timestamps: true
})
module.exports = mongoose.model('Order', orderSchema)