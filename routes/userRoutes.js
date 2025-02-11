const express = require('express')
const router = express.Router()
const { addAddress, getAddress, deleteAddress, updateUser, uploadUserImage, getUser, getUserById, getAllArtist, getAllUser, getAllArtistExceptLogger, upgradeRoleRequest, getUpgradeRoleReq, upgradeRoleResponse, deleteUpgradeRoleNotif, getUpgradeRoleRes } = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware')
const upload = require('../middleware/multerConfig')

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management and authentication
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get logged-in user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched user.
 */

/**
 * @swagger
 * /api/user/admin:
 *   get:
 *     summary: Get all users except admin
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched users.
 */

/**
 * @swagger
 * /api/user/artist:
 *   get:
 *     summary: Get all artists
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched artists.
 */

/**
 * @swagger
 * /api/user/collab:
 *   get:
 *     summary: Get all artists except the logged-in artist
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched artists.
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched user.
 */

/**
 * @swagger
 * /api/user/upload:
 *   post:
 *     summary: Upload user image
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Image uploaded successfully.
 */

/**
 * @swagger
 * /api/user/profile:
 *   patch:
 *     summary: Update user details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile updated.
 */

/**
 * @swagger
 * /api/user/address:
 *   post:
 *     summary: Add an address to user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Address added successfully.
 *   get:
 *     summary: Get user's addresses
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Addresses fetched successfully.
 */

/**
 * @swagger
 * /api/user/address/{id}:
 *   delete:
 *     summary: Delete a user address
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address deleted successfully.
 */

/**
 * @swagger
 * /api/user/upgrade/request:
 *   post:
 *     summary: Request role upgrade
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Role upgrade request sent.
 *   get:
 *     summary: Get all unresponded role upgrade requests
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Requests fetched successfully.
 */

/**
 * @swagger
 * /api/user/upgrade/response:
 *   patch:
 *     summary: Respond to role upgrade request
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Role upgraded successfully.
 */

/**
 * @swagger
 * /api/user/upgrade/response/{id}:
 *   get:
 *     summary: Get user's role upgrade response
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role upgrade response fetched.
 */

/**
 * @swagger
 * /api/user/upgrade/reject/{id}:
 *   delete:
 *     summary: Reject a role upgrade request
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role upgrade request rejected.
 */

router.route('/').get(protect, getUser)
router.route('/admin').get(protect, getAllUser)
router.route('/artist').get(protect, getAllArtist)
router.route('/collab').get(protect, getAllArtistExceptLogger)
router.route('/profile').patch(protect, updateUser)
router.route('/upload').post(protect, upload.single('img'), uploadUserImage)
router.route('/address').post(protect, addAddress).get(protect, getAddress)
router.route('/upgrade/request').post(protect, upgradeRoleRequest).get(getUpgradeRoleReq)
router.route('/upgrade/response').patch(protect, upgradeRoleResponse)
router.route('/upgrade/response/:id').get(getUpgradeRoleRes)
router.route('/upgrade/reject/:id').delete(deleteUpgradeRoleNotif)
router.route('/:id').get(protect, getUserById)
router.route('/address/:id').delete(protect, deleteAddress)

module.exports = router