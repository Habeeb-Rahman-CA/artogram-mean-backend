require('dotenv').config();
const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const connectDB = require('./config/dbConnection');
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const wishlistRoutes = require('./routes/wishlistRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const jobRoutes = require('./routes/jobRoutes')
const path = require('path')
const {swaggerUi, specs} = require("./middleware/swagger")

//connecting express and database
connectDB()
const app = express()

//middlewares
app.use(cors({ origin: 'http://localhost:4200', credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
//file upload
const _dirname = path.resolve()
app.use('/uploads', express.static(path.join(_dirname, "/uploads")))


app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/wishlist', wishlistRoutes)
app.use('/api/user', userRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/job', jobRoutes)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})