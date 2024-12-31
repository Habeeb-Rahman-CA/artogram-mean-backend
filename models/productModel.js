const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ['Painting', 'Drawing', 'Sculpture', 'Photography', 'Digital Art'], required: true },
    img: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('Product', productSchema)