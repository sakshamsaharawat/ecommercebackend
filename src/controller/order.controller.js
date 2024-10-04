const orderService = require("../services/order.service");

const createOrder = async (req, res) => {
    const user = req.user;
    try {
        const createOrder = await orderService.createOrder(user, req.body);
        return res.status(200).send(createOrder)
    } catch (error) {
        return res.status(500).send({ error: error.mesaage })
    }
}

const findOrderById = async (req, res) => {
    const user = req.user;
    try {
        const findOrderById = await orderService.findOrderById(req.params.id);
        return res.status(200).send(findOrderById)
    } catch (error) {
        return res.status(500).send({ error: error.mesaage })
    }
}

const orderHistory = async (req, res) => {
    const user = req.user;
    try {
        const createOrder = await orderService.userOrderHistory(user._id);
        return res.status(201).send(createOrder)
    } catch (error) {
        return res.status(500).send({ error: error.mesaage })
    }
}

module.exports = { createOrder, findOrderById, orderHistory }