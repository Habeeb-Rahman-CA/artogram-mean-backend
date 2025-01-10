const Wishlist = require('../models/wishlistModel')

// @route POST /api/wishlist
// @desc add item to wishlist
const addWishlist = async (req, res) => {
    const { userId, productId } = req.body
    try {
        let wishlist = await Wishlist.findOne({ user: userId })
        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [] })
        }
        if (wishlist.products.includes(productId)) {
            return res.status(200).json({ message: 'product is already on the wishlist', alreadyExists: true, wishlist })
        }
        wishlist.products.push(productId)
        await wishlist.save()
        res.status(200).json({ message: 'New item added to wishlist', alreadyExists: false, wishlist })
    } catch (err) {
        res.status(500).json({ message: 'failed to add to wishlist', error: err.message })
    }
}

// @route GET /api/wishlist/:id
// @desc get wishlist items
const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.find({ user: req.params.id }).populate('products')
        if (!wishlist) {
            res.status(500).json({ message: 'wishlist not found' })
        }
        res.status(200).json({ message: 'fetched all the wishlist', wishlist })
    } catch (err) {
        res.status(500).json({ message: 'failed to fetch', err: err.message })
    }
}

// @route DELETE /api/wishlist/:wishlistId/products/:productId
// @desc remove item from wishlist
const deleteWishlist = async (req, res) => {
    try {
        const { wishlistId, productId } = req.params
        const wishlist = await Wishlist.findByIdAndUpdate(wishlistId,
            { $pull: { products: productId } }, { new: true }
        )
        res.status(200).json({ message: 'wishlist deleted', wishlist })
    } catch (err) {
        res.status(500).json({ message: 'failed to delete wishlist', err: err.message })
    }
}

module.exports = { addWishlist, getWishlist, deleteWishlist }