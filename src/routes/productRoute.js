const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');
const authenticate = require('../middleware/authenticate');

router.post("/get-all",productController.getAllProducts);
router.get('/:id', authenticate, productController.findProductById);

module.exports = router