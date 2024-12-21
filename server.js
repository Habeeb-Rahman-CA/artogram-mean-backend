const express = require('express')
const cors = require('cors');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();

connectDB()
const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 8000
app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`)
})