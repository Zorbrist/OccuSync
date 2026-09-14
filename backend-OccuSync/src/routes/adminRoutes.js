const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController')
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

router.use(authMiddleware, requireRole('ADMIN'));

router.get("/dashboard", adminController.getAdminDashboard );

router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

router.patch('/businesses/:id/status', adminController.updateBusinessStatus)

module.exports = router;