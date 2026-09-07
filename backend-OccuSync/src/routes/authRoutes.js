const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/register/customer', authController.registerCustomer);
router.post('/register/business', authController.registerBusiness);

module.exports = router;