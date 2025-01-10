const User = require('../models/userModel')
const cloudinary = require('../config/cloudinaryConfig')

//User profile API
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json({ message: 'fetched current user', user })
    } catch (err) {
        res.status(500).json({ message: 'failed to get user', err: err.message })
    }
}

const getAllArtist = async (req, res) => {
    try {
        const user = await User.find({ role: 'artist' }).limit(10)
        res.status(200).json({ message: 'fetch all artist', user })
    } catch (err) {
        res.status(500).json({ message: 'failed to fetch all artist' })
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json({ message: 'fetched user by id', user })
    } catch (err) {
        res.status(500).json({ message: 'failed to get user id' })
    }
}

const uploadUserImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'user',
            resource_type: 'auto'
        })
        res.status(200).json({ img: result.secure_url })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateUser = async (req, res) => {
    const { name, bio, profilePic, coverPic, gender, phoneNumber, location } = req.body.user
    try {
        const user = await User.findByIdAndUpdate(req.user.id, {
            name: name,
            bio: bio,
            profilePic: profilePic,
            coverPic: coverPic,
            phoneNumber: phoneNumber,
            gender: gender,
            location: location
        }, { new: true })
        res.status(200).json({ message: 'user profile updated', updated: user })
    } catch (err) {
        res.status(500).json({ message: 'Failed to update the user' })
    }
}

//User Address API
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
    try {
        const userId = req.user.id
        const addressId = req.params.id
        const user = await User.findByIdAndUpdate(userId,
            { $pull: { addresses: { _id: addressId } } },
            { new: true }
        )
        res.status(200).json({ message: "deleted successfully", user })
    } catch (err) {
        res.status(500).json({ message: 'failed to delete', err: err.message })
    }
}

module.exports = { addAddress, getAddress, deleteAddress, updateUser, uploadUserImage, getUser, getUserById, getAllArtist }