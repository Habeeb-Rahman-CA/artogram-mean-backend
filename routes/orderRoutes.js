const express = require('express')
const router = express.Router()
const { checkout, getOrder, cancelOrder, deleteOrder, getArtistOrder, getAllOrders, verifyPayment } = require('../controller/orderController')
const { protect } = require('../middleware/authMiddleware')

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management APIs
 */

/**
 * @swagger
 * /api/order/checkout:
 *   post:
 *     summary: Checkout to store order details and address
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - addressId
 *             properties:
 *               addressId:
 *                 type: string
 *                 description: Address ID selected by user
 *     responses:
 *       200:
 *         description: Order successfully placed
 *       500:
 *         description: Failed to checkout the order
 */
router.route('/checkout').post(protect, checkout)

/**
 * @swagger
 * /api/order/payment:
 *   patch:
 *     summary: Verify payment for an order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentResponse
 *               - razorpayOrderId
 *             properties:
 *               paymentResponse:
 *                 type: object
 *                 description: Payment response object
 *               razorpayOrderId:
 *                 type: string
 *                 description: Razorpay Order ID
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *       500:
 *         description: Payment verification failed
 */
router.route('/payment').patch(protect, verifyPayment)

/**
 * @swagger
 * /api/order/:
 *   get:
 *     summary: Get orders based on user ID
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *       500:
 *         description: Failed to fetch orders
 */
router.route('/').get(protect, getOrder)

/**
 * @swagger
 * /api/order/cancel:
 *   patch:
 *     summary: Cancel an order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: Order ID to be cancelled
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *       500:
 *         description: Failed to cancel order
 */
router.route('/cancel').patch(protect, cancelOrder)

/**
 * @swagger
 * /api/order/artist:
 *   get:
 *     summary: Get orders for an artist
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *       500:
 *         description: No orders found for this artist
 */
router.route('/artist').get(protect, getArtistOrder)

/**
 * @swagger
 * /api/order/admin:
 *   get:
 *     summary: Get all orders for admin
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: All orders fetched successfully
 *       500:
 *         description: Failed to fetch orders
 */
router.route('/admin').get(protect, getAllOrders)

/**
 * @swagger
 * /api/order/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       500:
 *         description: Failed to delete order
 */
router.route('/:id').delete(protect, deleteOrder)

module.exports = router