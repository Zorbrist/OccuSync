const express = require('express');
const router = express.Router();

const businessController = require('../controllers/businessController');
const authMiddleware = require('../middleware/authMiddleware');
const requireBusinessRole = require('../middleware/businessRoleMiddleware');
const requireRole = require('../middleware/roleMiddleware');

// All routes below require a valid session + BUSINESS_PROVIDER account type.
router.use(authMiddleware, requireRole('BUSINESS_PROVIDER'));

// Dashboard
router.get(
  '/dashboard',
  requireBusinessRole('OWNER'),
  businessController.getBusinessDashboard
);

// Listings
router.get(
  '/listings',
  requireBusinessRole('OWNER'),
  businessController.getBusinessListings
);
router.get(
  '/listings/:id',
  requireBusinessRole('OWNER'),
  businessController.getBusinessListing
);
router.post(
  '/listings',
  requireBusinessRole('OWNER'),
  businessController.createBusinessListing
);
router.put(
  '/listings/:id',
  requireBusinessRole('OWNER'),
  businessController.updateBusinessListing
);
router.delete(
  '/listings/:id',
  requireBusinessRole('OWNER'),
  businessController.deleteBusinessListing
);


// Customer Orders
router.get(
  '/orders',
  requireBusinessRole('OWNER'),
  businessController.getBusinessOrders
);
router.get(
  '/orders/:id',
  requireBusinessRole('OWNER'),
  businessController.getBusinessOrder
);
router.put(
  '/orders/:id/status',
  requireBusinessRole('OWNER'),
  businessController.updateBusinessOrderStatus
);
router.patch(
  '/orders/:id/assign',
  requireBusinessRole('OWNER'),
  businessController.assignOrderMember
);


// Jobs
router.patch(
  '/jobs/:job_id/assign',
  requireBusinessRole('OWNER'),
  businessController.assignJobToStaff
);

// Notifications
router.get(
  '/notifications',
  requireBusinessRole('OWNER', 'STAFF'),
  businessController.getBusinessNotifications
);
router.put(
  '/notifications/:id/read',
  requireBusinessRole('OWNER', 'STAFF'),
  businessController.markBusinessNotificationAsRead
);
router.put(
  '/notifications/read-all',
  requireBusinessRole('OWNER', 'STAFF'),
  businessController.markAllBusinessNotificationsAsRead
);


// PROPOSALS & AVAILABILITY
router.post(
  '/proposals',
  requireBusinessRole('OWNER', 'STAFF'),
  businessController.sendOrderProposal
);
router.post(
  '/availability',
  requireBusinessRole('OWNER', 'STAFF'),
  businessController.toggleAvailability
);


// STAFF MANAGEMENT
router.get(
  '/staff-tasks',
  requireBusinessRole('OWNER', 'STAFF'),
  businessController.getStaffWithTasks
);
router.post(
  '/staff/invite',
  requireBusinessRole('OWNER'),
  businessController.inviteStaff
);

// BUSINESS MEMBERS
router.get(
  '/members',
  requireBusinessRole('OWNER', 'STAFF'),
  businessController.getBusinessMembers
);

// ============================================================
// STAFF TASKS (self-service, STAFF only)
// ============================================================
router.get(
  '/tasks',
  requireBusinessRole('STAFF'),
  businessController.getStaffTasks
);
router.get(
  '/tasks/:job_id',
  requireBusinessRole('STAFF'),
  businessController.getStaffTaskDetails
);
router.get(
  '/tasks/:job_id/logs',
  requireBusinessRole('STAFF'),
  businessController.getStaffJobLogs
);
router.post(
  '/tasks/:job_id/logs',
  requireBusinessRole('STAFF'),
  businessController.addStaffJobLog
);
router.patch(
  '/tasks/:job_id/status',
  requireBusinessRole('STAFF'),
  businessController.updateStaffJobStatus
);
router.get(
  '/history',
  requireBusinessRole('STAFF'),
  businessController.getStaffJobHistory
);

// Add this line where your other business routes are defined
router.get("/profile", businessController.getBusinessProfile);

module.exports = router;