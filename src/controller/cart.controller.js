const cartService = require("../services/cart.service");

const createCart = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ status: false, message: "User ID is required" });
        }

        const createdCart = await cartService.createCart(userId);
        return res.status(200).send(createdCart)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
};


const findUserCarts = async (req, res) => {
    const user = req.user;
    try {
        const cart = await cartService.findUserCart(user._id);
        return res.status(200).send(cart)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const addItemtoCart = async (req, res) => {
    const user = req.user;
    // console.log(req.user)
    try {
        const cartItem = await cartService.addCartItem(user._id, req.body);
        // console.log(cartItem)
        return res.status(200).send(cartItem);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

module.exports = { findUserCarts, addItemtoCart , createCart}