const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next) {
    // GET TOKEN
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).json('No token? Access Denied!')

    try{
        const verified = jwt.verify(
            token,
            config.get('jwToken')
        )
        req.user = verified.user
        next()
    } catch (e) {
        res.status(401).json('Invalid Token')
    }
}