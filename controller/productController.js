const Product = require('../models/productModel')
const cloudinary = require('../config/cloudinaryConfig')

//GET (Get all the product)
const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find().populate({ path: "createdBy", select: ["name"] })
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json({ message: 'failed to fetch', err: err.message })
    }
}

//GET (Get product based on Id)
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate({ path: "createdBy", select: ["name", "profilePic"] })
        const suggestedProduct = await Product.find({
            category: product.category,
            _id: { $ne: req.params.id }
        }).limit(10).populate({ path: "createdBy", select: ["name"] })
        const popularProduct = await Product.find({
            _id: { $ne: req.params.id }
        }).limit(10).populate({ path: "createdBy", select: ["name"] })
        res.status(200).json({ product, suggestedProduct, popularProduct })
    } catch (err) {
        res.status(500).json({ message: 'failed to fetch', err: err.message })
    }
}

//GET (Get product based on User ID)
const getProductByUserId = async (req, res) => {
    try {
        const product = await Product.find({ createdBy: req.user.id })
        if (!product.length) {
            return res.status(404).json({ message: "No products found for this user." });
        }
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json({ message: 'failed to fetch', err: err.message })
    }
}

//GET(Get product based on Artist Id)
const getProductByArtistId = async (req, res) => {
    try {
        const product = await Product.find({ createdBy: req.params.id }).populate('createdBy').limit(10)
        if (!product.length) {
            return res.status(404).json({ message: "No products found for this user." });
        }
        res.status(200).json({ message: 'Product fetched', product })
    } catch (err) {
        res.status(500).json({ message: 'failed to fetch', err: err.message })
    }
}

//POST (Create a product)
const createProduct = async (req, res) => {
    const { name, category, img, desc, price, } = req.body
    try {
        const product = new Product({ name, category, img, desc, price, createdBy: req.user.id })
        await product.save()
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json({ message: 'failed to create new product', err: err.message })
    }
}

//POST (Upload Image to Cloudinary)
const uploadImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'products',
            resource_type: 'auto'
        })
        res.status(200).json({ img: result.secure_url })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//PUT (Update product by Id)
const updateProduct = async (req, res) => {
    const { name, category, img, desc, price } = req.body
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, {
            name: name,
            category: category,
            img: img,
            desc: desc,
            price: price
        }, { new: true })
        res.status(200).json({ message: 'Updated Successfully', updated: product })
    } catch (err) {
        res.status(500).json({ message: 'failed to update', err: err.message })
    }
}

//DELETE (Delete the product based on ID)
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'product deleted successfully' })
    } catch (err) {
        res.status(500).json({ message: 'failed to delete', err: err.message })
    }
}

module.exports = { createProduct, getAllProduct, getProductById, deleteProduct, updateProduct, getProductByUserId, uploadImage, getProductByArtistId }