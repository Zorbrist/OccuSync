const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

// All admin routes require a valid session + ADMIN role
router.use(authMiddleware, requireRole('ADMIN'));

router.get("/dashboard", adminController.getAdminDashboard);
// Add this line where your other admin routes are defined
router.get("/profile", adminController.getAdminProfile);
router.patch('/businesses/:id/status', adminController.updateBusinessStatus)

// Business Route to update business
router.patch('/businesses/:id/status', adminController.updateBusinessStatus);

// User Routes
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;