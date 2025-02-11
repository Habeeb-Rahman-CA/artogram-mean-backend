const express = require('express')
const router = express.Router()
const { getWishlist, addWishlist, deleteWishlist } = require('../controller/wishlistController')
const { protect } = require('../middleware/authMiddleware')

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist management APIs
 */

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     summary: Add an item to wishlist
 *     tags: [Wishlist]
 *     security:
 *       - BearerAuth: []
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
 *                 description: The ID of the user
 *               productId:
 *                 type: string
 *                 description: The ID of the product
 *     responses:
 *       200:
 *         description: New item added to wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: New item added to wishlist
 *                 alreadyExists:
 *                   type: boolean
 *                   example: false
 *                 wishlist:
 *                   type: object
 *       500:
 *         description: Failed to add to wishlist
 */
router.route('/').post(protect, addWishlist)

/**
 * @swagger
 * /api/wishlist/{id}:
 *   get:
 *     summary: Get all wishlist items for a user
 *     tags: [Wishlist]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Fetched wishlist items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Fetched all wishlist items
 *                 wishlist:
 *                   type: object
 *       500:
 *         description: Failed to fetch wishlist
 */
router.route('/:id').get(protect, getWishlist)

/**
 * @swagger
 * /api/wishlist/{wishlistId}/products/{productId}:
 *   delete:
 *     summary: Remove an item from wishlist
 *     tags: [Wishlist]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: wishlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the wishlist
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to be removed
 *     responses:
 *       200:
 *         description: Item removed from wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wishlist item removed
 *                 wishlist:
 *                   type: object
 *       500:
 *         description: Failed to remove item from wishlist
 */
router.route('/:wishlistId/products/:productId').delete(protect, deleteWishlist)

module.exports = router