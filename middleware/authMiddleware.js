const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
    const token = req.cookies.authToken
    if (!token) return res.status(500).json({ message: 'Unauthorized' })

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (err) {
        res.status(500).json({ message: 'Invalid token or token expired' })
    }
}

module.exports = { protect }