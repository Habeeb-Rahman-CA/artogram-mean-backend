const bcyrpt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// Register
const register = async(req, res) => {
    const {name, email, password} = req.body
    try {
        const hashedPassword = await bcyrpt.hash(password, 10)
        const user = new User({name, email, password: hashedPassword})
        await user.save()
        res.status(200).json({message: 'User registered'})
    } catch (err) {
        res.status(500).json({message: "Something went wrong"})
    }
}

// Login
const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if (!user) return res.status(500).json({message: "User not found"})
        
        const isPasswordValid = await bcyrpt.compare(password, user.password)
        if(!isPasswordValid) return res.status(500).json({message: "Invalid Credential"})

        const token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn: '1h'})

        res.cookie('authToken', token, {
            httpOnly: true
        })

        res.status(200).json({message: 'User logged in'})
    } catch (err) {
        res.status(500).json({message: 'Login failed'})
    }
}

const logout = async(req, res) =>{
    res.clearCookie('authToken')
    res.status(200).json({message: 'User logged out'})
}