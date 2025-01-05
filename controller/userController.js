const User = require('../models/userModel')

const addAddress = async (req, res) => {
    try {
        const { fullName, phoneNumber, address, street, landmark, city, pincode, state } = req.body
        const user = await User.findById(req.body.id)
        user.addresses.push({ fullName, phoneNumber, address, street, landmark, city, pincode, state })
        await user.save()
        res.status(200).json({ message: 'Added new address', user: user.addresses })
    } catch (err) {
        res.status(500).json({ message: 'failed to add address', err: err.message })
    }
}

const getAddress = async(req, res) =>{
    try {
        const user = await user.findById(req.user.id)
        res.status(200).json({message: 'fetched all the data', addresses: user.addresses})
        } catch (err) {
        res.status(500).json({message: 'failed to fetch', err: err.message})
    }
}

module.exports = { addAddress, getAddress }