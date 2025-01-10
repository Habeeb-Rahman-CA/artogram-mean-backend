const express = require('express')
const router = express.Router()
const { addAddress, getAddress, deleteAddress, updateUser, uploadUserImage } = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware')
const upload = require('../middleware/multerConfig')

router.route('/address').post(protect, addAddress).get(protect, getAddress)
router.route('/address/:id').delete(protect, deleteAddress)
router.route('/profile').patch(protect, updateUser)
router.route('/upload').post(protect, upload.single('img'), uploadUserImage)

module.exports = router