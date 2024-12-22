const mongoose = require('mongoose')

//MongoDB connection
const connectDB = async() =>{
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('Database is connected :', connect.connection.host, connect.connection.name)
    } catch (err) {
        console.log('Error to connecting MongoDB:', err.message)
        process.exit(1)
    }
}

module.exports = connectDB