const Cart = require('../models/cartModel')

// @route POST /api/cart/
// @desc Add item to cart
const addCart = async (req, res) => {
    const { userId, productId } = req.body
    try {
        let cart = await Cart.findOne({ user: userId })
        if (!cart) {
            cart = new Cart({ user: userId, products: [] })
        }
        if (cart.products.includes(productId)) {
            return res.status(200).json({ message: 'Product already in cart', alreadyExists: true, cart });
        }
        cart.products.push(productId)
        await cart.save()
        res.status(200).json({ message: 'Product Added to Cart', alreadyExists: false, cart })
    } catch (err) {
        res.status(500).json({ message: 'failed to add cart', error: err.message })
    }
}

// @route GET /api/cart/:id
// @desc get cart based on user id
const getCartByUserId = async (req, res) => {
    try {
        const cart = await Cart.find({ user: req.user.id }).populate('products')
        if (!cart) {
            return res.status(500).json({ message: 'cart not found' })
        }
        res.status(200).json({ message: 'Cart fetched successfully', cart })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// @route DELETE /api/cart/:cartId/products/:productId
// @desc delete cart based on cart id and product id
const deleteCartItem = async (req, res) => {
    try {
        const { cartId, productId } = req.params
        const cart = await Cart.findByIdAndUpdate(cartId,
            { $pull: { products: productId } }, { new: true })
        res.status(200).json({ message: 'Cart item deleted', cart })
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete', err: err.message })
    }
}

module.exports = { addCart, getCartByUserId, deleteCartItem }