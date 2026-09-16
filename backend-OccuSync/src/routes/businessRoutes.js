const express = require("express");
const router = express.Router();
const businessController = require("../controllers/businessController");
const authMiddleware = require("../middleware/authMiddleware");
const requireBusinessRole = require("../middleware/businessRoleMiddleware");
const requireRole = require("../middleware/roleMiddleware");

router.use(authMiddleware, requireRole("BUSINESS_PROVIDER"));

// Dashboard
router.get(
  "/dashboard",
  requireBusinessRole("OWNER", "STAFF"),
  businessController.getBusinessDashboard,
);

// Listings
router.get(
  "/listings",
  requireBusinessRole("OWNER", "STAFF"),
  businessController.getBusinessListings,
);
router.get(
  "/listings/:id",
  requireBusinessRole("OWNER", "STAFF"),
  businessController.getBusinessListing,
);
router.post(
  "/listings",
  requireBusinessRole("OWNER"),
  businessController.createBusinessListing,
);
router.put(
  "/listings/:id",
  requireBusinessRole("OWNER"),
  businessController.updateBusinessListing,
);
router.delete(
  "/listings/:id",
  requireBusinessRole("OWNER"),
  businessController.deleteBusinessListing,
);

// Customer Orders
router.get(
  "/orders",
  requireBusinessRole("OWNER"),
  businessController.getBusinessOrders,
);
router.get(
  "/orders/:id",
  requireBusinessRole("OWNER", "STAFF"),
  businessController.getBusinessOrder,
);
router.put(
  "/orders/:id/status",
  requireBusinessRole("OWNER", "STAFF"),
  businessController.updateBusinessOrderStatus,
);

router.patch(
  "/jobs/:job_id/assign",
  businessController.assignJobToStaff
);

// Notifications
router.get(
  "/notifications",
  requireBusinessRole("OWNER", "STAFF"),
  businessController.getBusinessNotifications,
);
router.put(
  "/notifications/:id/read",
  requireBusinessRole("OWNER", "STAFF"),
  businessController.markBusinessNotificationAsRead,
);
router.put(
  "/notifications/read-all",
  requireBusinessRole("OWNER", "STAFF"),
  businessController.markAllBusinessNotificationsAsRead,
);

router.post('/proposals', requireBusinessRole("OWNER", "STAFF"), businessController.sendOrderProposal);
router.post('/availability', requireBusinessRole("OWNER", "STAFF"), businessController.toggleAvailability);

// Staff Tasks & Management
router.get('/staff-tasks', requireBusinessRole("OWNER", "STAFF"), businessController.getStaffWithTasks);
router.post(
  "/staff/invite",
  requireBusinessRole("OWNER"),
  businessController.inviteStaff,
);

// ============================================================
// BUSINESS MEMBERS
// ============================================================

router.get(
  '/members',
  businessController.getBusinessMembers
);

// ============================================================
// ASSIGN ORDER MEMBER
// ============================================================

router.patch(
  '/orders/:id/assign',
  businessController.assignOrderMember
);



router.get(
  "/tasks",
  requireBusinessRole("STAFF"),
  businessController.getStaffTasks,
);

router.get(
  "/tasks/:job_id",
  requireBusinessRole("STAFF"),
  businessController.getStaffTaskDetails,
);

router.get(
  "/tasks/:job_id/logs",
  requireBusinessRole("STAFF"),
  businessController.getStaffJobLogs,
);

router.post(
  "/tasks/:job_id/logs",
  requireBusinessRole("STAFF"),
  businessController.addStaffJobLog,
);

router.patch(
  "/tasks/:job_id/status",
  requireBusinessRole("STAFF"),
  businessController.updateStaffJobStatus,
);

router.get(
  "/history",
  requireBusinessRole("STAFF"),
  businessController.getStaffJobHistory,
);

// Add this line where your other business routes are defined
router.get("/profile", businessController.getBusinessProfile);

// ============================================================
// INVOICES
// ============================================================

router.get(
  "/invoices",
  requireBusinessRole("OWNER", "STAFF"),
  businessController.getBusinessInvoices
);

router.get(
  "/invoices/:id",
  requireBusinessRole("OWNER", "STAFF"),
  businessController.getBusinessInvoiceDetails
);

module.exports = router;