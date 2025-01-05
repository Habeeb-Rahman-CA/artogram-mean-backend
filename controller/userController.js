const User = require('../models/userModel')

const addAddress = async (req, res) => {
    try {
        const { fullName, phoneNumber, address, street, landmark, city, pincode, state } = req.body
        const user = await User.findById(req.user.id)
        user.addresses.push({ fullName, phoneNumber, address, street, landmark, city, pincode, state })
        await user.save()
        res.status(200).json({ message: 'Added new address', user: user.addresses })
    } catch (err) {
        res.status(500).json({ message: 'failed to add address', err: err.message })
    }
}

const getAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json({ message: 'fetched all the data', addresses: user.addresses })
    } catch (err) {
        res.status(500).json({ message: 'failed to fetch', err: err.message })
    }
}

const deleteAddress = async (req, res) => {
    console.log('hey');
    try {
        const userId = req.user.id
        const addressId  = req.params.id
        const user = await User.findByIdAndUpdate(userId,
            { $pull: { addresses: { _id: addressId } } },
            { new: true }
        )
        res.status(200).json({message: "deleted successfully", user})
    } catch (err) {
        res.status(500).json({ message: 'failed to delete', err: err.message })
    }
}

module.exports = { addAddress, getAddress, deleteAddress }