const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');
const router = express.Router();

router.post('/register/customer', authController.registerCustomer);
router.post('/register/business', authController.registerBusiness);
router.post('/login', authController.login);
router.post('/register/staff', authController.registerStaff);

router.get(
  '/admin',
  authMiddleware,
  requireRole('ADMIN'),
  (req, res) => {
    res.json({ message: 'Welcome Admin!' });
  }
);

router.get(
  '/business',
  authMiddleware,
  requireRole('BUSINESS_OWNER', 'STAFF'),
  (req, res) => {
    res.json({ message: 'Welcome Business User!' });
  }
);

router.get(
  '/customer',
  authMiddleware,
  requireRole('CUSTOMER'),
  (req, res) => {
    res.json({ message: 'Welcome Customer!' });
  }
);



module.exports = router;