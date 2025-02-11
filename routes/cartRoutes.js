const express = require('express')
const router = express.Router()
const { addCart, getCartByUserId, deleteCartItem, checkout, } = require('../controller/cartController')
const { protect } = require('../middleware/authMiddleware')

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart management APIs
 */

/**
 * @swagger
 * /api/cart/:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     description: Adds a product to the user's shopping cart.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User's ID
 *               productId:
 *                 type: string
 *                 description: Product ID to be added
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *       500:
 *         description: Failed to add product to cart
 */
router.route('/').post(protect, addCart)

/**
 * @swagger
 * /api/cart/{id}:
 *   get:
 *     summary: Get cart by user ID
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     description: Fetches the cart for the given user ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 *       500:
 *         description: Cart not found or error occurred
 */
router.route('/:id').get(protect, getCartByUserId)

/**
 * @swagger
 * /api/cart/{cartId}/products/{productId}:
 *   delete:
 *     summary: Remove an item from cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     description: Deletes a specific product from the user's cart.
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID to remove
 *     responses:
 *       200:
 *         description: Cart item deleted successfully
 *       500:
 *         description: Failed to delete cart item
 */
router.route('/:cartId/products/:productId').delete(protect, deleteCartItem)

module.exports = router