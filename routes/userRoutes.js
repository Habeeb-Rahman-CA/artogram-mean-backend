const express = require('express')
const router = express.Router()
const { addAddress, getAddress, deleteAddress, updateUser, uploadUserImage, getUser, getUserById, getAllArtist } = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware')
const upload = require('../middleware/multerConfig')

router.route('/').get(protect, getUser)
router.route('/artist').get(protect, getAllArtist)
router.route('/profile').patch(protect, updateUser)
router.route('/upload').post(protect, upload.single('img'), uploadUserImage)
router.route('/address').post(protect, addAddress).get(protect, getAddress)
router.route('/:id').get(protect, getUserById)
router.route('/address/:id').delete(protect, deleteAddress)

module.exports = router