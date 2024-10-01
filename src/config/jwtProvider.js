const jwt = require("jsonwebtoken")

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: "48h" })
console.log("+++++++++  ",token)

    return token;
}

const getUserIdFromToken = (token) => {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    return decodedToken.userId;
}

module.exports = { generateToken, getUserIdFromToken }