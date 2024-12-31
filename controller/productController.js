const Product = require('../models/productModel')

//Create a product
const createProduct = async (req, res) => {
    const { name, category, img, desc, price } = req.body
    try {
        const product = new Product({ name, category, img, desc, price, createdBy: req.user.id })
        await product.save()
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json({ message: 'failed to create new product', err: err.message })
    }
}

//Get all the product
const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find().populate({ path: "createdBy", select: ["name" ] })
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json({message: 'failed to fetch', err: err.message})
    }
}

//Get product based on Id
const getProductById = async(req, res) =>{
    try {
        const product = await Product.findById(req.params.id).populate({path: "createdBy", select: ["name", "profilePic"]})
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json({message: 'failed to fetch', err: err.message})
    }
}

//Delete product by Id
const deleteProduct = async(req, res) => {
    
}

//Update product by Id

module.exports = { createProduct, getAllProduct, getProductById }