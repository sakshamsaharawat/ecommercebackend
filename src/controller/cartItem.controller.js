const cartItemService = require("../services/CartItem.service")

const updateCartItem = async (req, res) => {
    const user = req.user;
    try {
        const updatedCartItem = await cartItemService.updatedCartItem(user._id, req.params.id, req.body);
        return res.status(200).send(updatedCartItem)
    } catch (error) {
        return res.status(500).send({ error: error.message })

    }

}

const removeCartItem = async (req, res) => {
    const user = req.user;
    try {
        await cartItemService.removeCartItem(user._id, req.params.id);
        return res.status(200).send({ messart: "cart item removed successfully" })
    } catch (error) {
        return res.status(500).send({ error: error.message })

    }

}

module.exports = { updateCartItem, removeCartItem }