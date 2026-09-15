const pool = require('../config/db');

// Get customer dashboard
exports.getCustomerDashboard = async (req, res, next) => {
  try {
    // Get logged-in user's ID from auth middleware
    const userId = req.user.id;

    // Get customer profile
    const customerResult = await pool.query(
      `SELECT
        first_name,
        last_name,
        phone
       FROM customer_profiles
       WHERE user_id = $1`,
      [userId]
    );

    if (customerResult.rows.length === 0) {
      return res.status(404).json({
        message: 'Customer profile not found'
      });
    }

    const customer = customerResult.rows[0];

    // Get upcoming jobs
    const upcomingJobsResult = await pool.query(
      `SELECT
        jobs.id,
        services.name AS service_name,
        businesses.name AS business_name,
        jobs.status,
        jobs.date,
        jobs.time_slot
       FROM jobs
       JOIN services ON jobs.service_id = services.id
       JOIN businesses ON jobs.business_id = businesses.id
       WHERE jobs.customer_id = (SELECT id FROM customer_profiles WHERE user_id = $1)
       AND jobs.date >= CURRENT_DATE
       AND jobs.status NOT IN ('CANCELLED', 'COMPLETED')
       ORDER BY jobs.date ASC, jobs.time_slot ASC`,
      [userId]
    );

    // Get recent jobs
    const recentJobsResult = await pool.query(
      `SELECT
        jobs.id,
        services.name AS service_name,
        businesses.name AS business_name,
        jobs.status,
        jobs.date,
        jobs.time_slot
       FROM jobs
       JOIN services
         ON jobs.service_id = services.id
       JOIN businesses
         ON jobs.business_id = businesses.id
       WHERE jobs.customer_id = (
         SELECT id
         FROM customer_profiles
         WHERE user_id = $1
       )
      AND jobs.date < CURRENT_DATE
       ORDER BY jobs.date DESC, jobs.time_slot DESC
       LIMIT 5`,
      [userId]
    );

    // Get unpaid invoices
    const unpaidInvoicesResult = await pool.query(
      `SELECT
        invoices.id,
        invoices.job_id,
        invoices.total_amount,
        invoices.status,
        invoices.due_date
       FROM invoices
       JOIN jobs
         ON invoices.job_id = jobs.id
       WHERE jobs.customer_id = (
         SELECT id
         FROM customer_profiles
         WHERE user_id = $1
       )
       AND invoices.status IN ('ISSUED', 'OVERDUE')
       ORDER BY invoices.due_date ASC`,
      [userId]
    );

    // Return dashboard data
    return res.json({
      customer: {
        name: `${customer.first_name} ${customer.last_name}`,
        phone: customer.phone
      },
      upcoming_jobs: upcomingJobsResult.rows,
      recent_jobs: recentJobsResult.rows,
      unpaid_invoices: unpaidInvoicesResult.rows
    });

  } catch (error) {
    next(error);
  }
};


// Get all services
exports.getCustomerServices = async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT
        services.id,
        services.name,
        services.description,
        services.base_price,
        services.estimated_duration,
        businesses.id AS business_id,
        businesses.name AS business_name,
        businesses.industry,
        businesses.state,
        businesses.postcode,
        businesses.country
       FROM services
       JOIN businesses
         ON services.business_id = businesses.id
       ORDER BY services.name ASC`
    );

    return res.json({
      count: result.rowCount,
      services: result.rows
    });

  } catch (error) {
    next(error);
  }
};

// Get a single service
exports.getCustomerService = async (req, res, next) => {
	try {
		const serviceId = req.params.id;

		const result = await pool.query(
			`SELECT
        services.id,
        services.name,
        services.description,
        services.base_price,
        services.estimated_duration,
        businesses.id AS business_id,
        businesses.name AS business_name,
        businesses.industry,
        businesses.state,
        businesses.postcode,
        businesses.country,
        businesses.phone,
        businesses.email
       FROM services
       JOIN businesses
         ON services.business_id = businesses.id
       WHERE services.id = $1`,
			[serviceId]
		);

		if (result.rows.length === 0) {
			return res.status(404).json({
				message: 'Service not found'
			});
		}

		return res.json(result.rows[0]);

	} catch (error) {
		next(error);
	}
};

// ORDERSS 

exports.getCustomerOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;

 const result = await pool.query(
  `SELECT
    jobs.id,
    services.name AS service_name,
    services.description AS service_description,
    businesses.id AS business_id,
    businesses.name AS business_name,
    jobs.status,
    jobs.date,
    jobs.time_slot,
    proposals.id AS proposal_id,
    proposals.status AS proposal_status,
    proposals.proposed_date,
    proposals.proposed_time,
    proposals.message,
    proposals.notes AS proposal_notes

   FROM jobs

   JOIN services
     ON jobs.service_id = services.id

   JOIN businesses
     ON jobs.business_id = businesses.id

   LEFT JOIN proposals
     ON proposals.job_id = jobs.id

   WHERE jobs.customer_id = (
     SELECT id
     FROM customer_profiles
     WHERE user_id = $1
   )

   ORDER BY jobs.date DESC, jobs.time_slot DESC`,
  [userId]
);

    return res.json(result.rows);

  } catch (error) {
    next(error);
  }
};


exports.getCustomerOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;

    const result = await pool.query(
      `SELECT
        jobs.id,

        services.id AS service_id,
        services.name AS service_name,
        services.description AS service_description,
        services.base_price,

        businesses.id AS business_id,
        businesses.name AS business_name,
        businesses.phone AS business_phone,
        businesses.email AS business_email,

        jobs.status,
        jobs.date,
        jobs.time_slot,

       FROM jobs

       JOIN services
         ON jobs.service_id = services.id

       JOIN businesses
         ON jobs.business_id = businesses.id


       WHERE jobs.id = $1
       AND jobs.customer_id = (
         SELECT id
         FROM customer_profiles
         WHERE user_id = $2
       )`,
      [orderId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    return res.json(result.rows[0]);

  } catch (error) {
    next(error);
  }
};


exports.updateProposalStatus = async (req, res, next) => {
  const client = await pool.connect();

  try {
    const { proposal_id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    if (!["ACCEPTED", "REJECTED"].includes(status)) {
      return res.status(400).json({
        message: "Invalid proposal status"
      });
    }

    await client.query("BEGIN");

    // 1. Get proposal + verify that it belongs to this customer
    const proposalResult = await client.query(
      `SELECT
        proposals.id,
        proposals.job_id,
        proposals.status,
        jobs.business_id,
        jobs.customer_id,
        customer_profiles.user_id AS customer_user_id
       
       FROM proposals

       JOIN jobs
         ON proposals.job_id = jobs.id

       JOIN customer_profiles
         ON jobs.customer_id = customer_profiles.id

       WHERE proposals.id = $1
         AND customer_profiles.user_id = $2

       FOR UPDATE`,
      [proposal_id, userId]
    );

    if (proposalResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        message: "Proposal not found"
      });
    }

    const proposal = proposalResult.rows[0];

    // 2. Prevent responding to an already processed proposal
    if (proposal.status !== "PENDING") {
      await client.query("ROLLBACK");

      return res.status(400).json({
        message: "This proposal has already been processed"
      });
    }

    // 3. Update proposal status
    await client.query(
      `UPDATE proposals
       SET
         status = $1,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $2`,
      [status, proposal_id]
    );

    // 4. If accepted, confirm the job
    if (status === "ACCEPTED") {
      await client.query(
        `UPDATE jobs
         SET
           status = 'CONFIRMED',
           date = (
             SELECT proposed_date
             FROM proposals
             WHERE id = $1
           ),
           time_slot = (
             SELECT proposed_time
             FROM proposals
             WHERE id = $1
           ),
           updated_at = CURRENT_TIMESTAMP
         WHERE id = $2`,
        [proposal_id, proposal.job_id]
      );
    }

    // 5. Update customer's existing proposal notification
    await client.query(
      `UPDATE notifications
       SET
         message = $1,
         is_read = FALSE
       WHERE user_id = $2
         AND type = 'PROPOSAL'
         AND is_read = FALSE
         AND message = 'A new date and time has been proposed for your service order.'`,
      [
        status === "ACCEPTED"
          ? "You accepted the proposed date and time for your service order."
          : "You declined the proposed date and time for your service order.",
        userId
      ]
    );

    // 6. Get business owner/staff users
    const businessMembersResult = await client.query(
      `SELECT user_id
       FROM business_members
       WHERE business_id = $1`,
      [proposal.business_id]
    );

    // 7. Notify business members
    const businessMessage =
      status === "ACCEPTED"
        ? "A customer accepted your proposed date and time for a service order."
        : "A customer declined your proposed date and time for a service order.";

    for (const member of businessMembersResult.rows) {
      await client.query(
        `INSERT INTO notifications
          (user_id, type, message)
         VALUES
          ($1, $2, $3)`,
        [
          member.user_id,
          "PROPOSAL",
          businessMessage
        ]
      );
    }

    await client.query("COMMIT");

    return res.json({
      message:
        status === "ACCEPTED"
          ? "Proposal accepted and order confirmed"
          : "Proposal declined"
    });

  } catch (error) {
    await client.query("ROLLBACK");
    next(error);
  } finally {
    client.release();
  }
};


exports.createCustomerOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { service_id, date, time_slot, message } = req.body;

    if (!service_id) {
      return res.status(400).json({ message: 'service_id is required' });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const customerResult = await pool.query(
      `SELECT id FROM customer_profiles WHERE user_id = $1`, [userId]
    );

    if (customerResult.rows.length === 0) {
      return res.status(404).json({ message: 'Customer profile not found' });
    }

    const customerId = customerResult.rows[0].id;

    // Fetch service and join business_members to find the OWNER's user_id
    const serviceResult = await pool.query(
      `SELECT s.id, s.name, s.business_id, bm.user_id AS business_owner_id
       FROM services s
       JOIN business_members bm ON s.business_id = bm.business_id AND bm.role = 'OWNER'
       WHERE s.id = $1`, 
      [service_id]
    );

    if (serviceResult.rows.length === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const service = serviceResult.rows[0];

    // 1. Create job / booking
    const jobResult = await pool.query(
      `INSERT INTO jobs
        (business_id, customer_id, service_id, status, date, time_slot, message)
       VALUES
        ($1, $2, $3, 'PENDING', $4, $5, $6)
       RETURNING id, business_id, customer_id, service_id, status, date, time_slot, message, created_at`,
      [
        service.business_id,
        customerId,
        service.id,
        date || null,
        time_slot || null,
        message
      ]
    );



    // 3. Notification for Customer
    await pool.query(
      `INSERT INTO notifications (user_id, type, message, is_read)
       VALUES ($1, $2, $3, false)`,
      [
        userId,
        'ORDER_UPDATE',
        `Your service request for ${service.name} (Order #${jobResult.rows[0].id}) has been successfully placed and is pending confirmation.`
      ]
    );

    // 4. Notification for Business Owner
    if (service.business_owner_id) {
      await pool.query(
        `INSERT INTO notifications (user_id, type, message, is_read)
         VALUES ($1, $2, $3, false)`,
        [
          service.business_owner_id,
          'NEW_BOOKING_REQUEST',
          `You received a new request for ${service.name} (Order #${jobResult.rows[0].id}).`
        ]
      );
    }

    return res.status(201).json({
      message: 'Order created successfully',
      order: jobResult.rows[0]
    });

  } catch (error) {
    next(error);
  }
};

// notifications

exports.getCustomerNotifications = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT
        id,
        type,
        message,
        is_read,
        created_at
       FROM notifications
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    return res.json({
  count: result.rowCount,
  notifications: result.rows
});

  } catch (error) {
    next(error);
  }
};

exports.markNotificationAsRead = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const notificationId = req.params.id;

    const result = await pool.query(
      `UPDATE notifications
       SET is_read = TRUE
       WHERE id = $1
       AND user_id = $2
       RETURNING id, type, message, is_read, created_at`,
      [notificationId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Notification not found'
      });
    }

    return res.json({
      message: 'Notification marked as read',
      notification: result.rows[0]
    });

  } catch (error) {
    next(error);
  }
};

// INVOICES

// Get all invoices for the logged-in customer
exports.getCustomerInvoices = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT
        invoices.id,
        invoices.job_id,
        invoices.total_amount,
        invoices.status,
        invoices.due_date,
        services.name AS service_name,
        businesses.name AS business_name
       FROM invoices
       JOIN jobs
         ON invoices.job_id = jobs.id
       JOIN services
         ON jobs.service_id = services.id
       JOIN businesses
         ON jobs.business_id = businesses.id
       WHERE jobs.customer_id = (
         SELECT id
         FROM customer_profiles
         WHERE user_id = $1
       )
       ORDER BY invoices.due_date DESC`,
      [userId]
    );

    return res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

// Get details for a specific invoice
exports.getCustomerInvoice = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const invoiceId = req.params.id;

    const result = await pool.query(
      `SELECT
        invoices.id AS invoice_id,
        invoices.total_amount,
        invoices.status AS invoice_status,
        invoices.due_date,
        invoices.created_at AS invoice_date,
        jobs.id AS job_id,
        jobs.date,
        jobs.time_slot,
        services.name AS service_name,
        services.description AS service_description,
        services.base_price,
        businesses.name AS business_name,
        businesses.phone AS business_phone,
        businesses.email AS business_email
       FROM invoices
       JOIN jobs
         ON invoices.job_id = jobs.id
       JOIN services
         ON jobs.service_id = services.id
       JOIN businesses
         ON jobs.business_id = businesses.id
       WHERE invoices.id = $1
       AND jobs.customer_id = (
         SELECT id
         FROM customer_profiles
         WHERE user_id = $2
       )`,
      [invoiceId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Invoice not found'
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

exports.payCustomerInvoice = async (req, res, next) => {
  try {
    const invoiceId = req.params.id;
    const { method = 'ONLINE_BANKING', photo_url } = req.body; 

    // 1. Update the invoice status to PAID and retrieve the total_amount
    const invoiceResult = await pool.query(
      `UPDATE invoices 
       SET status = 'PAID', updated_at = CURRENT_TIMESTAMP
       WHERE id = $1 AND status != 'PAID'
       RETURNING id, job_id, total_amount`,
      [invoiceId]
    );

    if (invoiceResult.rows.length === 0) {
      return res.status(400).json({ message: 'Invoice not found or already paid' });
    }

    // Extract the amount from the updated invoice
    const amountToPay = invoiceResult.rows[0].total_amount;

    // 2. Record the transaction in the payments table WITH the amount
    await pool.query(
      `INSERT INTO payments (invoice_id, amount, method, photo_url) 
       VALUES ($1, $2, $3, $4)`,
      [invoiceId, amountToPay, method, photo_url || null] 
    );

    return res.json({ 
      message: 'Payment processed successfully',
      invoice: invoiceResult.rows[0]
    });
  } catch (error) {
    next(error);
  }
};