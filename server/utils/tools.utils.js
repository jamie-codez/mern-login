const jsonWebToken = require("jsonwebtoken");

const getResponse = (code, message, payload) => {
    return {
        code: code,
        message: message,
        payload: payload
    }
}

const generateTokens = (payload) => {
    return {access_token: jsonWebToken.sign(payload, process.env.JWT_SECRET)}
}

module.exports = {getResponse,generateTokens}