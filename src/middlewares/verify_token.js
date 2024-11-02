
const JWT = require('jsonwebtoken')

const { unAuthorized } = require('./handlerErrorHttp')

const verifyToken = (req, res, next) => {

    if (!req.headers.authorization) return unAuthorized(res)
        
    const token = req.headers.authorization.split(" ")[1] || String()

    JWT.verify(token, process.env.JWT_SECRET_KEY || String(), (err, payLoad) => {
        if (err) {
            return unAuthorized(res)
        } else {
            next();
        }
    })
}


module.exports = {
    verifyToken
}