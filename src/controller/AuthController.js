const userService = require('../services/user.service');
const jwtProvider = require('../config/jwtProvider')
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);

        const jwt = jwtProvider.generateToken(user._id)
        // await cartService.createUser(user)
        return res.status(200).send({ jwt, message: "register successfully" })
    } catch (error) {
        return res.status(500).send({ error: error.message })

    }
}
const login = async (req, res) => {
    const { password, email } = req.body;
    console.log(password)
    try {
        if (!email || !password) {
            return res.status(400).send({ message: "Email and password are required" });
        }

        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(404).send({ message: `User not found with email: ${email}` });
        }

        console.log(user);

        if (!user.password) {
            return res.status(400).send({ message: "User does not have a password set" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid password" });
        }

        // Generate JWT token
        const jwt = jwtProvider.generateToken(user._id);
        return res.status(200).send({ jwt, message: "Login successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: error.message });
    }
};


module.exports = { register, login }