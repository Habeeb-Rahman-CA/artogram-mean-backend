const express = require('express')
const router = express.Router()
const { addAddress, getAddress, deleteAddress } = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware')

router.route('/address').post(protect, addAddress).get(protect, getAddress)
router.route('/address/:id').delete(protect, deleteAddress)

module.exports = router