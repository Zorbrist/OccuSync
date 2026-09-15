const express = require('express');
const router = express.Router();

const custController = require('../controllers/custController');
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

router.use(authMiddleware, requireRole('CUSTOMER'));

router.get("/dashboard", custController.getCustomerDashboard);
router.get("/profile", custController.getCustomerProfile);

router.get("/services", custController.getCustomerServices);
router.get("/services/:id", custController.getCustomerService);

router.get("/orders", custController.getCustomerOrders);
router.get("/orders/:id", custController.getCustomerOrder);
router.post("/orders", custController.createCustomerOrder);

router.get("/notifications", custController.getCustomerNotifications);
router.put("/notifications/:id/read", custController.markNotificationAsRead);

// INVOICES
router.get("/invoices", custController.getCustomerInvoices);
router.get("/invoices/:id", custController.getCustomerInvoice);

// Add this right under your other invoice routes
router.post("/invoices/:id/pay", custController.payCustomerInvoice);

module.exports = router;