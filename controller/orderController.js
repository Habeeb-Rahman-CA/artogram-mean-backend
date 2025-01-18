const Razorpay = require('razorpay')
const Cart = require('../models/cartModel')
const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const { User } = require('../models/userModel')
const crypto = require('crypto')

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// @route POST /api/order/checkout
// @desc checkout api to store the order details and address
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
        const totalAmount = cart[0].products.reduce((sum, product) => sum + parseFloat(product.price), 0)
        const razorpayOrder = await razorpay.orders.create({
            amount: totalAmount * 100,
            currency: 'INR',
            receipt: `order_${Date.now()}`,
            notes: { userId: userId }
        }).catch(err => {
            console.log(err);
        });
        const order = new Order({
            user: userId,
            items: cart[0].products.map((product) => ({
                product: product._id,
                price: product.price
            })),
            total: totalAmount,
            address: selectedAddress,
            status: 'Placed',
            razorpayOrderId: razorpayOrder.id
        })
        await order.save()
        await Cart.findOneAndUpdate({ user: userId }, { products: [] })
        res.status(200).json({ message: 'Order successfully placed', order, razorpayOrderId: razorpayOrder.id, amount: razorpayOrder.amount, currency: razorpayOrder.currency })
    } catch (err) {
        res.status(500).json({ message: 'failed to checkout the order', err: err.message })
    }
}

// @route PATCH /api/order/payment
// @desc verify the payment to ship the order
const verifyPayment = async (req, res) => {
    const { paymentResponse, razorpayOrderId } = req.body;
    const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpayOrderId}|${paymentResponse.razorpay_payment_id}`)
        .digest('hex');
    if (generatedSignature === paymentResponse.razorpay_signature) {
        await Order.findOneAndUpdate({ razorpayOrderId }, { status: 'Shipped' });
        return res.status(200).json({ message: 'Payment verified successfully!' });
    }
    return res.status(500).json({ message: 'Payment verification failed!' });
}

// @route GET /api/order/
// @desc Get orders based on user id
const getOrder = async (req, res) => {
    try {
        const userId = req.user.id
        const orders = await Order.find({ user: userId }).populate('items.product')
        res.status(200).json({ message: 'fetch all the orders', orders })
    } catch (err) {
        res.status(500).json({ message: 'failed to fetch', err: err.message })
    }
}

// @route GET /api/order/admin
// @desc get all orders for admin
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json({ message: 'fetch entire orders', orders })
    } catch (err) {
        res.status(500).json({ message: 'failed to fetch', err: err.message })
    }
}

// @route GET /api/order/artist
// @desc get orders based on artist id
const getArtistOrder = async (req, res) => {
    try {
        const artistId = req.user.id
        const products = await Product.find({ createdBy: artistId }).select('_id')
        const productIds = products.map((product) => product._id)
        const orders = await Order.find({ 'items.product': { $in: productIds } }).populate({
            path: 'items.product', select: ['_id', 'name', 'price', 'createdBy']
        })
        if (orders.length === 0) {
            return res.status(500).json({ message: 'No order is found for this artist' })
        }
        const filteredOrder = orders.map(order => {
            const filteredItems = order.items.filter(item => item.product.createdBy.toString() === artistId)
            return {
                _id: order._id,
                user: order.user,
                items: filteredItems,
                total: filteredItems.reduce((sum, item) => sum + item.price, 0),
                status: order.status,
                createdAt: order.createdAt,
                address: order.address,
            }
        })
        res.status(200).json({ message: 'Order fetched successfully', filteredOrder })
    } catch (err) {
        res.status(500).json({ message: 'failed to fetch', err: err.message })
    }
}

// @route PATCH /api/order/cancel
// @desc Update the order for cancellation
const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body
        const order = await Order.findByIdAndUpdate(orderId,
            { status: 'Cancelled' },
            { new: true }
        )
        res.status(200).json({ message: 'Order is cancelled' })
    } catch (err) {
        res.status(500).json({ message: 'failed to cancel', err: err.message })
    }
}

// @route DELETE /api/order/:id
// @desc Delete order based on id
const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Order deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: 'failed to delete order', err: err.message })
    }
}

module.exports = { checkout, getOrder, cancelOrder, deleteOrder, getAllOrders, getArtistOrder, verifyPayment }