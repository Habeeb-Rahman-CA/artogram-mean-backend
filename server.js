require('dotenv').config();
const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const connectDB = require('./config/dbConnection');
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')

//connecting express and database
connectDB()
const app = express()

//middlewares
app.use(cors({ origin: 'http://localhost:4200', credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})