const Cart = require('../models/cartModel')

//POST (Product added to cart)
const addCart = async (req, res) => {
    const { userId, productId } = req.body
    try {
        let cart = await Cart.findOne({ user: userId })
        if (!cart) {
            cart = new Cart({ user: userId, products: [] })
        }
        if (!cart.products.includes(productId)) {
            cart.products.push(productId)
        }
        await cart.save()
        res.status(200).json({ message: 'Product Added to Cart', cart })
    } catch (err) {
        res.status(500).json({ message: 'failed to add cart', error: err.message })
    }
}

module.exports = { addCart }