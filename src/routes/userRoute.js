const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController')

router.post("/userProfile", userController.getUserProfile);
router.get('/users',userController.getAllUsers)

module.exports = router