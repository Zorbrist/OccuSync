const express = require('express');
const router = express.Router();

const businessController = require('../controllers/businessController');
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

router.use(authMiddleware, requireRole('SERVICE_PROVIDER'));

// Dashboard
router.get("/dashboard", businessController.getBusinessDashboard);

// Listings
router.get("/listings", businessController.getBusinessListings);
router.get("/listings/:id", businessController.getBusinessListing);
router.post("/listings", businessController.createBusinessListing);
router.put("/listings/:id", businessController.updateBusinessListing);
router.delete("/listings/:id", businessController.deleteBusinessListing);

// Customer Orders
router.get("/orders", businessController.getBusinessOrders);
router.get("/orders/:id", businessController.getBusinessOrder);
router.put("/orders/:id/status", businessController.updateBusinessOrderStatus);

// Notifications
router.get("/notifications", businessController.getBusinessNotifications);
router.put("/notifications/:id/read", businessController.markBusinessNotificationAsRead);
router.put("/notifications/read-all", businessController.markAllBusinessNotificationsAsRead);

module.exports = router;