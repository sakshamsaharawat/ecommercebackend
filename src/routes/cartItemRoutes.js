const express = require('express');
const router = express.Router();
const cartItemController = require('../controller/cartItem.controller');
const authenticate = require('../middleware/authenticate');

router.get("/:id", authenticate, cartItemController.updateCartItem);
router.delete('/:id', authenticate, cartItemController.removeCartItem);

module.exports = router