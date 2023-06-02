const getResponse = (code, message, payload) => {
    return {
        code: code,
        message: message,
        payload: payload
    }
}

module.exports = {getResponse}