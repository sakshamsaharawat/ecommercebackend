const express = require('express');
const router = express.Router();
const orderController = require('../controller/order.controller');
const authenticate = require('../middleware/authenticate');

router.get("/", authenticate, orderController.createOrder);
router.delete('/user', authenticate, orderController.orderHistory);
router.delete('/:id', authenticate, orderController.findOrderById);

module.exports = router