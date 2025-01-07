const Cart = require('../models/cartModel')
const Order = require('../models/orderModel')
const User = require('../models/userModel')

//POST (checkout the cart)
const checkout = async (req, res) => {
    try {
        const userId = req.user.id
        const { addressId } = req.body
        const cart = await Cart.find({ user: userId }).populate('products')
        if (!cart || cart[0].products.length === 0) {
            return res.status(500).json({ message: 'cart is empty' })
        }
        const user = await User.findById(userId)
        const selectedAddress = user.addresses.id(addressId)
        if (!selectedAddress) {
            return res.status(500).json({ message: 'Invalid Address' })
        }
        const order = new Order({
            user: userId,
            items: cart[0].products.map((product) => ({
                product: product._id,
                price: product.price
            })),
            total: cart[0].products.reduce((sum, product) => sum + parseFloat(product.price), 0),
            address: selectedAddress,
            status: 'Placed'
        })
        await order.save()
        await Cart.findOneAndUpdate({ user: userId }, { products: [] })
        res.status(200).json({ message: 'Order successfully placed', order })
    } catch (err) {
        res.status(500).json({ message: 'failed to checkout the order', err: err.message })
    }
}

const getOrder = async (req, res) => {
    try {
        const userId = req.user.id
        const orders = await Order.find({ user: userId }).populate('items.product')
        res.status(200).json({ message: 'fetch all the orders', orders })
    } catch (err) {
        res.status(500).json({ message: 'failed to fetch', })
    }
}

const getAllOrders = async(req,res) => {
    try {
        const orders = await Order.find()
        res.status(200).json({message: 'fetch entire orders', orders})
    } catch (err) {
        res.status(500).json({message: 'failed to fetch'})
    }
}

const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body
        const order = await Order.findByIdAndUpdate(orderId,
            { status: 'Cancelled' },
            { new: true }
        )
        res.status(200).json({ message: 'Order is cancelled' })
    } catch (err) {
        res.status(500).json({ message: 'failed to cancel' })
    }
}

const deleteOrder = async(req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Order deleted successfully"})
    } catch (err) {
        res.status(500).json({message: 'failed to delete order'})
    }
}

module.exports = { checkout, getOrder, cancelOrder, deleteOrder, getAllOrders }