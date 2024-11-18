const jwt = require("jsonwebtoken")

const generateToken = (data) => {
    const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "48h" })

    return token;
}

const getUserIdFromToken = (token) => {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    return decodedToken.userId;
}

module.exports = { generateToken, getUserIdFromToken }