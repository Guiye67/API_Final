const jwt = require("jsonwebtoken")
const config = require("../config")
const tokenKey = config.TOKEN_KEY

const create = (client) => {
    return jwt.sign({client: client}, tokenKey, {expiresIn:"1d"});
}

const verify = (req, res, next) => {
    try {
        let headerToken
        if (req.headers['authorization'].split(" ").length > 1)
            headerToken = req.headers['authorization'].split(" ")[1]
        else
            headerToken = req.headers['authorization']
            
        if (headerToken == null || !jwt.verify(headerToken, tokenKey))
            return res.status(401).json({ message: 'Unauthorized (invalid token)' })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    next()
}

module.exports = {
    create, 
    verify
}