const orderService = require("../services/order.service");

const createOrder = async (req, res) => {
    const user = req.user;
    try {
        const createOrder = await orderService.createOrder(user, req.body);
        return res.status(200).send(createOrder)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error.mesaage })
    }
}

const findOrderById = async (req, res) => {
    try {
        const orderId = req.params.id; 
        const order = await orderService.findOrderById(orderId);

        if (!order) {
            return res.status(404).send({ message: "Order not found" });
        }

        return res.status(200).send(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        return res.status(500).send({ error: error.message });
    }
};


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