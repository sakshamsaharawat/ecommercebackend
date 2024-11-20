const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart.controller');
const authenticate = require('../middleware/authenticate');

router.post("/create", authenticate, cartController.createCart);
router.get("/", authenticate, cartController.findUserCarts);
router.post('/add', authenticate, cartController.addItemtoCart);

module.exports = router