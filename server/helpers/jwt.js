const jsonwebtoken = require('jsonwebtoken')
const secretAdmin = process.env.JWT_SECRETADMIN

function signToken(payload) {
   return jsonwebtoken.sign(payload, secretAdmin)
}

function verifyToken(token) {
    return jsonwebtoken.verify(token, secretAdmin)
}

module.exports = { signToken, verifyToken }