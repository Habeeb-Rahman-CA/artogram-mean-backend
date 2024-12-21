require('dotenv').config();
const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const connectDB = require('./config/dbConnection');

//connecting express and database
connectDB()
const app = express()

//middlewares
app.use(cors({origin: 'http://localhost:4200', credentials: true}))
app.use(express.json())
app.use(cookieParser())

console.log(process.env.NODE_ENV === 'production')

const port = process.env.PORT || 8000
app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`)
})