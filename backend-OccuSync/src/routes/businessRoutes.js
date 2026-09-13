const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const authMiddleware = require('../middleware/authMiddleware');
const requireBusinessRole = require('../middleware/businessRoleMiddleware');
const requireRole = require('../middleware/roleMiddleware');

router.use(authMiddleware, requireRole('SERVICE_PROVIDER'));

// Dashboard
router.get("/dashboard", requireBusinessRole('OWNER', 'STAFF'), businessController.getBusinessDashboard);

// Listings
router.get("/listings", requireBusinessRole('OWNER', 'STAFF'), businessController.getBusinessListings);
router.get("/listings/:id", requireBusinessRole('OWNER', 'STAFF'), businessController.getBusinessListing);
router.post("/listings", requireBusinessRole('OWNER'), businessController.createBusinessListing);
router.put("/listings/:id", requireBusinessRole('OWNER'), businessController.updateBusinessListing);
router.delete("/listings/:id", requireBusinessRole('OWNER'), businessController.deleteBusinessListing);

// Customer Orders
router.get("/orders", requireBusinessRole('OWNER'), businessController.getBusinessOrders);
router.get("/orders/:id", requireBusinessRole('OWNER', 'STAFF'), businessController.getBusinessOrder);
router.put("/orders/:id/status", requireBusinessRole('OWNER', 'STAFF'), businessController.updateBusinessOrderStatus);

// Notifications
router.get("/notifications", requireBusinessRole('OWNER'), businessController.getBusinessNotifications);
router.put("/notifications/:id/read", requireBusinessRole('OWNER'), businessController.markBusinessNotificationAsRead);
router.put("/notifications/read-all", requireBusinessRole('OWNER'), businessController.markAllBusinessNotificationsAsRead);

// Staff Management
router.post("/staff/invite", requireBusinessRole('OWNER'), businessController.inviteStaff);

module.exports = router;