const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController')
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

router.use(authMiddleware, requireRole('ADMIN'));

router.get("/dashboard", adminController.getAdminDashboard );
router.get('/jobs/calendar', adminController.getJobsCalendar);

module.exports = router;