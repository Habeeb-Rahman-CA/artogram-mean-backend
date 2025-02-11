const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerConfig");
const {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProduct,
  updateProduct,
  getProductByUserId,
  uploadImage,
  getProductByArtistId,
} = require("../controller/productController");
const { protect } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management APIs
 */

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     description: Retrieve a list of all products.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all products
 *       500:
 *         description: Failed to fetch products
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     description: Add a new product to the database.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               img:
 *                 type: string
 *               desc:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product successfully created
 *       500:
 *         description: Failed to create product
 *
 */
router.route("/").get(protect, getAllProduct).post(protect, createProduct);

/**
 * @swagger
 *  /api/product/upload:
 *   post:
 *     summary: Upload product image
 *     tags: [Products]
 *     description: Upload an image to Cloudinary for a product.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Image successfully uploaded
 *       500:
 *         description: Failed to upload image
 *
 */
router.route("/upload").post(protect, upload.single("img"), uploadImage);

/**
 * @swagger
 * /api/product/user:
 *   get:
 *     summary: Get products by user
 *     tags: [Products]
 *     description: Retrieve all products created by the logged-in user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Products successfully retrieved
 *       404:
 *         description: No products found for this user
 *       500:
 *         description: Failed to fetch products
 *
 */
router.route("/user").get(protect, getProductByUserId);

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     description: Retrieve a product along with suggested and popular products.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product successfully retrieved
 *       500:
 *         description: Failed to fetch product
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     description: Modify the details of a product.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               img:
 *                 type: string
 *               desc:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product successfully updated
 *       500:
 *         description: Failed to update product
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     description: Remove a product from the database.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product successfully deleted
 *       500:
 *         description: Failed to delete product
 *
 */
router
  .route("/:id")
  .get(protect, getProductById)
  .delete(protect, deleteProduct)
  .put(protect, updateProduct);

/**
 * @swagger
 * /api/product/artist/{id}:
 *   get:
 *     summary: Get products by artist ID
 *     tags: [Products]
 *     description: Retrieve all products created by a specific artist.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Products successfully retrieved
 *       404:
 *         description: No products found for this artist
 *       500:
 *         description: Failed to fetch products
 */
router.route("/artist/:id").get(protect, getProductByArtistId);

module.exports = router;
