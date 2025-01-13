const User = require('../models/userModel')
const cloudinary = require('../config/cloudinaryConfig')

// @route GET /api/user
// @desc Get logged user based on id
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json({ message: 'fetched current user', user })
    } catch (err) {
        res.status(500).json({ message: 'failed to get user', err: err.message })
    }
}
// @route GET /api/user/admin
// @desc Get All user except admin
const getAllUser = async (req, res) => {
    try {
        const user = await User.find({ role: { $ne: 'admin' } })
        res.status(200).json({ message: 'fetch all users except admin', user })
    } catch (err) {
        res.status(500).json({ message: 'failed to fetch all user', err: err.message })
    }
}

// @route GET /api/user/artist
// @desc Get all artist
const getAllArtist = async (req, res) => {
    try {
        const user = await User.find({ role: 'artist' }).limit(10)
        res.status(200).json({ message: 'fetch all artist', user })
    } catch (err) {
        res.status(500).json({ message: 'failed to fetch all artist' })
    }
}

// @route GET /api/user/collab
// @desc get all artist except logged artist for collab
const getAllArtistExceptLogger = async (req, res) => {
    try {
        const user = await User.find({ _id: { $ne: req.user.id } })
        res.status(200).json({message: 'fetched successfully', user})
    } catch (err) {
        res.status(500).json({ message: 'failed to fetch artist' })
    }
}

// @route GET /api/user/:id
// @desc Get user based on id
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json({ message: 'fetched user by id', user })
    } catch (err) {
        res.status(500).json({ message: 'failed to get user id' })
    }
}

// @route POST /api/user/upload
// @desc Uplaod user image to cloudinary
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

// @route PATCH /api/user/profile
// @desc Update user details
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

// @route POST /api/user/address
// @desc Add address to user
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

// @route GET /api/user/address
// @desc Get address of user
const getAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json({ message: 'fetched all the data', addresses: user.addresses })
    } catch (err) {
        res.status(500).json({ message: 'failed to fetch', err: err.message })
    }
}

// @route DELETE /api/user/address/:id
// @desc Delete address of user
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

module.exports = { addAddress, getAddress, deleteAddress, updateUser, uploadUserImage, getUser, getAllUser, getUserById, getAllArtist, getAllArtistExceptLogger }