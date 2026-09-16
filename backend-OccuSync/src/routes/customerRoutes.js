const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

// All customer routes require a valid session + CUSTOMER role
router.use(authMiddleware, requireRole('CUSTOMER'));

// DASHBOARD
router.get('/dashboard', customerController.getCustomerDashboard);

// SERVICES
router.get('/services', customerController.getCustomerServices);
router.get('/services/:id', customerController.getCustomerService);

// ORDERS
router.get('/orders', customerController.getCustomerOrders);
router.get('/orders/:id', customerController.getCustomerOrder);
router.post('/orders', customerController.createCustomerOrder);

// PROPOSALS
router.patch(
  '/proposals/:proposal_id/status',
  customerController.updateProposalStatus
);


// NOTIFICATIONS
router.get('/notifications', customerController.getCustomerNotifications);
router.put(
  '/notifications/:id/read',
  customerController.markNotificationAsRead
);

// INVOICES
router.get('/invoices', customerController.getCustomerInvoices);
router.get('/invoices/:id', customerController.getCustomerInvoice);
router.post('/invoices/:id/pay', customerController.payCustomerInvoice);

module.exports = router;