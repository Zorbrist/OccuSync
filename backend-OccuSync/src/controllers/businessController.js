const crypto = require('crypto');
const pool = require('../config/db');

const {
  sendStaffInvitationEmail
} = require('../services/emailSerivice');


// =====================================================
// DASHBOARD
// =====================================================

exports.getBusinessDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Find the business belonging to the logged-in user
    const businessResult = await pool.query(
      `SELECT
        businesses.id,
        businesses.name,
        businesses.industry
       FROM businesses
       JOIN business_members
         ON businesses.id = business_members.business_id
       WHERE business_members.user_id = $1
       LIMIT 1`,
      [userId]
    );

    if (businessResult.rows.length === 0) {
      return res.status(404).json({
        message: 'Business not found'
      });
    }

    const business = businessResult.rows[0];
    const businessId = business.id;

    // Active orders
    const activeOrdersResult = await pool.query(
      `SELECT COUNT(*) AS count
       FROM jobs
       WHERE business_id = $1
       AND status IN (
         'PENDING',
         'CONFIRMED'
       )`,
      [businessId]
    );

    // Pending orders
    const pendingOrdersResult = await pool.query(
      `SELECT COUNT(*) AS count
       FROM jobs
       WHERE business_id = $1
       AND status = 'PENDING'`,
      [businessId]
    );

    // Completed orders this month
    const completedOrdersResult = await pool.query(
      `SELECT COUNT(*) AS count
       FROM jobs
       WHERE business_id = $1
       AND status = 'COMPLETED'
       AND date >= DATE_TRUNC('month', CURRENT_DATE)
       AND date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'`,
      [businessId]
    );

    // Monthly revenue
    const revenueResult = await pool.query(
      `SELECT COALESCE(SUM(payments.amount), 0) AS revenue
       FROM payments
       JOIN invoices
         ON payments.invoice_id = invoices.id
       JOIN jobs
         ON invoices.job_id = jobs.id
       WHERE jobs.business_id = $1
       AND invoices.status = 'PAID'
       AND invoices.updated_at >= DATE_TRUNC('month', CURRENT_DATE)
       AND invoices.updated_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'`,
      [businessId]
    );

    // Recent active orders
    const activeOrdersListResult = await pool.query(
      `SELECT
        jobs.id,
        services.name AS service_name,
        customer_profiles.first_name,
        customer_profiles.last_name,
        jobs.status,
        jobs.date,
        jobs.time_slot
       FROM jobs
       JOIN services
         ON jobs.service_id = services.id
       JOIN customer_profiles
         ON jobs.customer_id = customer_profiles.id
       WHERE jobs.business_id = $1
       AND jobs.status IN (
         'PENDING',
         'CONFIRMED'
       )
       ORDER BY jobs.date ASC, jobs.time_slot ASC
       LIMIT 5`,
      [businessId]
    );

    return res.json({
      business: {
        id: business.id,
        name: business.name,
        industry: business.industry
      },
      metrics: {
        active_orders: Number(activeOrdersResult.rows[0].count),
        pending_orders: Number(pendingOrdersResult.rows[0].count),
        completed_orders_this_month: Number(completedOrdersResult.rows[0].count),
        monthly_revenue: Number(revenueResult.rows[0].revenue)
      },
      active_orders: activeOrdersListResult.rows
    });

  } catch (error) {
    next(error);
  }
};


// =====================================================
// LISTINGS
// =====================================================

exports.getBusinessListings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const search = req.query.search || '';

    const result = await pool.query(
      `SELECT
        services.id,
        services.name,
        services.description,
        services.base_price,
        services.estimated_duration,

        (
          SELECT COUNT(*)
          FROM jobs
          WHERE jobs.service_id = services.id
        ) AS booking_count

       FROM services

       JOIN businesses
         ON services.business_id = businesses.id

       JOIN business_members
         ON businesses.id = business_members.business_id

       WHERE business_members.user_id = $1
       AND (
         services.name ILIKE $2
         OR services.description ILIKE $2
       )

       ORDER BY services.name ASC`,
      [userId, `%${search}%`]
    );

    return res.json({
      total_listings: result.rows.length,

      // Your current schema does not have an active/inactive
      // column, so all existing listings are treated as active.
      active_listings: result.rows.length,

      listings: result.rows
    });

  } catch (error) {
    next(error);
  }
};


exports.getBusinessListing = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const listingId = req.params.id;

    const result = await pool.query(
      `SELECT
        services.id,
        services.name,
        services.description,
        services.base_price,
        services.estimated_duration,

        (
          SELECT COUNT(*)
          FROM jobs
          WHERE jobs.service_id = services.id
        ) AS booking_count

       FROM services

       JOIN businesses
         ON services.business_id = businesses.id

       JOIN business_members
         ON businesses.id = business_members.business_id

       WHERE services.id = $1
       AND business_members.user_id = $2`,
      [listingId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Listing not found'
      });
    }

    return res.json(result.rows[0]);

  } catch (error) {
    next(error);
  }
};


exports.createBusinessListing = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const {
      name,
      description,
      base_price,
      estimated_duration
    } = req.body;

    if (
      !name ||
      base_price === undefined ||
      !estimated_duration
    ) {
      return res.status(400).json({
        message: 'name, base_price and estimated_duration are required'
      });
    }

    // Find the business
    const businessResult = await pool.query(
      `SELECT business_id
       FROM business_members
       WHERE user_id = $1
       LIMIT 1`,
      [userId]
    );

    if (businessResult.rows.length === 0) {
      return res.status(404).json({
        message: 'Business not found'
      });
    }

    const businessId = businessResult.rows[0].business_id;

    const result = await pool.query(
      `INSERT INTO services
        (
          business_id,
          name,
          description,
          base_price,
          estimated_duration
        )
       VALUES
        ($1, $2, $3, $4, $5)
       RETURNING
        id,
        business_id,
        name,
        description,
        base_price,
        estimated_duration,
        created_at`,
      [
        businessId,
        name.trim(),
        description ? description.trim() : null,
        base_price,
        estimated_duration
      ]
    );

    return res.status(201).json({
      message: 'Listing created successfully',
      listing: result.rows[0]
    });

  } catch (error) {
    next(error);
  }
};


exports.updateBusinessListing = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const listingId = req.params.id;

    const {
      name,
      description,
      base_price,
      estimated_duration
    } = req.body;

    const result = await pool.query(
      `UPDATE services
       SET
         name = COALESCE($1, name),
         description = COALESCE($2, description),
         base_price = COALESCE($3, base_price),
         estimated_duration = COALESCE($4, estimated_duration),
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       AND business_id = (
         SELECT business_id
         FROM business_members
         WHERE user_id = $6
         LIMIT 1
       )
       RETURNING
         id,
         business_id,
         name,
         description,
         base_price,
         estimated_duration,
         updated_at`,
      [
        name ? name.trim() : null,
        description !== undefined
          ? (description ? description.trim() : null)
          : null,
        base_price !== undefined ? base_price : null,
        estimated_duration !== undefined
          ? estimated_duration
          : null,
        listingId,
        userId
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Listing not found'
      });
    }

    return res.json({
      message: 'Listing updated successfully',
      listing: result.rows[0]
    });

  } catch (error) {
    next(error);
  }
};


exports.deleteBusinessListing = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const listingId = req.params.id;

    const result = await pool.query(
      `DELETE FROM services
       WHERE id = $1
       AND business_id = (
         SELECT business_id
         FROM business_members
         WHERE user_id = $2
         LIMIT 1
       )
       RETURNING id, name`,
      [listingId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Listing not found'
      });
    }

    return res.json({
      message: 'Listing deleted successfully',
      listing: result.rows[0]
    });

  } catch (error) {

    // A service cannot be deleted if existing jobs
    // still reference it because of ON DELETE RESTRICT.
    if (error.code === '23503') {
      return res.status(409).json({
        message: 'This listing cannot be deleted because it is linked to existing orders'
      });
    }

    next(error);
  }
};


// =====================================================
// CUSTOMER ORDERS
// =====================================================

exports.getBusinessOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const status = req.query.status;

    let query = `
      SELECT
        jobs.id,
        services.id AS service_id,
        services.name AS service_name,

        customer_profiles.id AS customer_id,
        customer_profiles.first_name,
        customer_profiles.last_name,
        customer_profiles.phone,

        jobs.status,
        jobs.date,
        jobs.time_slot,

        proposals.status AS proposal_status,

        services.base_price

      FROM jobs

      JOIN services
        ON jobs.service_id = services.id

      JOIN customer_profiles
        ON jobs.customer_id = customer_profiles.id
        
      LEFT JOIN proposals
        ON jobs.id = proposals.job_id

      WHERE jobs.business_id = (
        SELECT business_id
        FROM business_members
        WHERE user_id = $1
        LIMIT 1
      )
    `;

    const values = [userId];

    if (status) {
      query += ` AND jobs.status = $2`;
      values.push(status);
    }

    query += `
      ORDER BY jobs.date DESC, jobs.time_slot DESC
    `;

    const result = await pool.query(query, values);

    return res.json(result.rows);

  } catch (error) {
    next(error);
  }
};


exports.getBusinessOrder = async (req, res, next) => {
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

    customer_profiles.id AS customer_id,
    customer_profiles.first_name,
    customer_profiles.last_name,
    customer_profiles.phone,

    jobs.status,
    jobs.date,
    jobs.time_slot,
    jobs.message,

    proposals.proposed_date,
    proposals.proposed_time,
    proposals.notes AS proposal_notes,
    proposals.status AS proposal_status,

    business_members.id AS assigned_member_id,
    business_members.role AS assigned_member_role

   FROM jobs

   JOIN services
     ON jobs.service_id = services.id

   JOIN customer_profiles
     ON jobs.customer_id = customer_profiles.id

   LEFT JOIN proposals
     ON proposals.job_id = jobs.id

   LEFT JOIN business_members
     ON jobs.assigned_member_id = business_members.id

   WHERE jobs.id = $1
   AND jobs.business_id = (
     SELECT business_id
     FROM business_members
     WHERE user_id = $2
     LIMIT 1
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


exports.updateBusinessOrderStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;
    const { status } = req.body;

    // Removed ASSIGNED and IN_PROGRESS to match DB check constraint
    const allowedStatuses = [
      'PENDING',
      'CONFIRMED',
      'COMPLETED',
      'CANCELLED'
    ];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid order status'
      });
    }

    // 1. Update the status and retrieve necessary data for the notification
    const result = await pool.query(
      `UPDATE jobs
       SET
         status = $1,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       AND business_id = (
         SELECT business_id
         FROM business_members
         WHERE user_id = $3
         LIMIT 1
       )
       RETURNING
         id AS job_id,
         status AS new_status,
         date,
         time_slot,
         updated_at,
         (SELECT user_id FROM customer_profiles WHERE id = jobs.customer_id) AS customer_user_id,
         (SELECT name FROM services WHERE id = jobs.service_id) AS service_name`,
      [status, orderId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    // 2. Extract returned data
    const { job_id, new_status, customer_user_id, service_name } = result.rows[0];

    // 3. Generate the automated notification message
    let notificationMessage = '';

    switch (new_status) {
      case 'CONFIRMED':
        notificationMessage = `Good news! Your service request for ${service_name} (Order #${job_id}) has been confirmed.`;
        break;

      case 'COMPLETED':
        notificationMessage = `Your order #${job_id} for ${service_name} is now complete!`;
        break;

      case 'CANCELLED':
        notificationMessage = `Notice: Your order #${job_id} for ${service_name} has been cancelled.`;
        break;
    }

    // 4. Insert the notification into the database
    if (notificationMessage) {
      await pool.query(
        `INSERT INTO notifications 
          (user_id, type, message, is_read)
         VALUES 
          ($1, $2, $3, false)`,
        [customer_user_id, 'ORDER_UPDATE', notificationMessage]
      );
    }

    // 5. Clean up the response object before sending it to the client
    const orderResponse = {
      id: job_id,
      status: new_status,
      date: result.rows[0].date,
      time_slot: result.rows[0].time_slot,
      updated_at: result.rows[0].updated_at
    };

    return res.json({
      message: 'Order status updated successfully',
      order: orderResponse
    });

  } catch (error) {
    next(error);
  }
};


// =====================================================
// NOTIFICATIONS
// =====================================================

exports.getBusinessNotifications = async (req, res, next) => {
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

    return res.json(result.rows);

  } catch (error) {
    next(error);
  }
};


exports.markBusinessNotificationAsRead = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const notificationId = req.params.id;

    const result = await pool.query(
      `UPDATE notifications
       SET is_read = TRUE
       WHERE id = $1
       AND user_id = $2
       RETURNING
         id,
         type,
         message,
         is_read,
         created_at`,
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


exports.markAllBusinessNotificationsAsRead = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `UPDATE notifications
       SET is_read = TRUE
       WHERE user_id = $1
       AND is_read = FALSE`,
      [userId]
    );

    return res.json({
      message: 'All notifications marked as read',
      updated_count: result.rowCount
    });

  } catch (error) {
    next(error);
  }
};


// =====================================================
// STAFF
// =====================================================

exports.inviteStaff = async (req, res, next) => {
  try {
    const businessId = req.business.id;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: 'Email is required'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Get business name for the invitation email
    const businessResult = await pool.query(
      `SELECT name
       FROM businesses
       WHERE id = $1`,
      [businessId]
    );

    if (businessResult.rows.length === 0) {
      return res.status(404).json({
        message: 'Business not found'
      });
    }

    const businessName = businessResult.rows[0].name;

    // Check whether this email already belongs to a user
    const existingUserResult = await pool.query(
      `SELECT id
       FROM users
       WHERE email = $1`,
      [normalizedEmail]
    );

    if (existingUserResult.rows.length > 0) {
      const existingUserId = existingUserResult.rows[0].id;

      // Check whether the user is already a member
      const existingMemberResult = await pool.query(
        `SELECT id
         FROM business_members
         WHERE user_id = $1
         AND business_id = $2`,
        [existingUserId, businessId]
      );

      if (existingMemberResult.rows.length > 0) {
        return res.status(409).json({
          message: 'This user is already a member of your business'
        });
      }
    }

    // Check for an existing pending invitation
    const existingInvitationResult = await pool.query(
      `SELECT id
       FROM staff_invitations
       WHERE email = $1
       AND business_id = $2
       AND accepted_at IS NULL
       AND expires_at > CURRENT_TIMESTAMP`,
      [normalizedEmail, businessId]
    );

    if (existingInvitationResult.rows.length > 0) {
      return res.status(409).json({
        message: 'An active invitation already exists for this email'
      });
    }

    // Generate secure invitation token
    const token = crypto.randomBytes(32).toString('hex');

    // Store only the hash in the database
    const tokenHash = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Invitation expires after 24 hours
    const expiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    );

    await pool.query(
      `INSERT INTO staff_invitations
        (
          business_id,
          email,
          token_hash,
          expires_at
        )
       VALUES
        ($1, $2, $3, $4)`,
      [
        businessId,
        normalizedEmail,
        tokenHash,
        expiresAt
      ]
    );

    // Create invitation URL
    const invitationUrl =
      `http://localhost:5173/register/staff?token=${token}`;

    // Send invitation email
    await sendStaffInvitationEmail({
      email: normalizedEmail,
      businessName,
      invitationUrl,
      expiresAt
    });

    return res.status(201).json({
      message: 'Staff invitation sent successfully',
      link: invitationUrl
    });

  } catch (error) {
    next(error);
  }
};


// =====================================================
// INQUIRIES & PROPOSALS
// =====================================================



exports.sendOrderProposal = async (req, res, next) => {
  const client = await pool.connect();

  try {
    const {
      job_id,
      proposed_date,
      proposed_time,
      message
    } = req.body;

    await client.query('BEGIN');

    // ============================================================
    // CREATE PROPOSAL
    // ============================================================

    await client.query(
      `INSERT INTO proposals
        (job_id, proposed_date, proposed_time, message)
       VALUES
        ($1, $2, $3, $4)`,
      [
        job_id,
        proposed_date,
        proposed_time,
        message
      ]
    );


    const customerResult = await client.query(
     `SELECT customer_profiles.user_id
      FROM jobs
      JOIN customer_profiles
        ON jobs.customer_id = customer_profiles.id
      WHERE jobs.id = $1`,
      [job_id]
    );

    if (customerResult.rows.length === 0) {
      throw new Error('Customer not found');
    }

    const customerUserId = customerResult.rows[0].user_id;

    // ============================================================
    // CREATE CUSTOMER NOTIFICATION
    // ============================================================

    await client.query(
      `INSERT INTO notifications
        (user_id, type, message)
       VALUES
        ($1, $2, $3)`,
      [
        customerUserId,
        'PROPOSAL',
        'A new date and time has been proposed for your service order.'
      ]
    );

    // ============================================================
    // COMMIT
    // ============================================================

    await client.query('COMMIT');

    return res.json({
      message: 'Proposal sent successfully'
    });

  } catch (error) {
    await client.query('ROLLBACK');
    next(error);

  } finally {
    client.release();
  }
};


// =====================================================
// CALENDAR AVAILABILITY
// =====================================================

exports.toggleAvailability = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { date, is_available } = req.body;

    const businessResult = await pool.query(
      `SELECT business_id
       FROM business_members
       WHERE user_id = $1
       LIMIT 1`,
      [userId]
    );

    const businessId = businessResult.rows[0].business_id;

    await pool.query(
      `INSERT INTO business_availability
        (business_id, blocked_date, is_available)
       VALUES ($1, $2, $3)
       ON CONFLICT (business_id, blocked_date) 
       DO UPDATE SET is_available = EXCLUDED.is_available`,
      [businessId, date, is_available]
    );

    return res.json({
      message: 'Availability updated'
    });

  } catch (error) {
    next(error);
  }
};


// =====================================================
// STAFF TASKS
// =====================================================

exports.getStaffWithTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const businessResult = await pool.query(
      `SELECT business_id
       FROM business_members
       WHERE user_id = $1
       LIMIT 1`,
      [userId]
    );

    if (businessResult.rows.length === 0) {
      return res.status(404).json({
        message: "Business not found"
      });
    }

    const businessId = businessResult.rows[0].business_id;

    // Get staff members and their assigned tasks
    const staffResult = await pool.query(
      `SELECT 
        bm.id AS member_id, 
        bmp.first_name, 
        bmp.last_name, 
        u.email, 
        bm.role,
        COALESCE(
          json_agg(
            json_build_object(
              'job_id', j.id,
              'service', s.name,
              'date', j.date
            )
          ) FILTER (WHERE j.id IS NOT NULL), '[]'
        ) AS assigned_tasks
       FROM business_members bm
       JOIN users u
         ON bm.user_id = u.id
       JOIN business_member_profiles bmp
         ON u.id = bmp.user_id
       LEFT JOIN jobs j
         ON j.assigned_member_id = bm.id
         AND j.status IN ('PENDING', 'CONFIRMED')
       LEFT JOIN services s
         ON j.service_id = s.id
       WHERE bm.business_id = $1
         AND bm.role = 'STAFF'
       GROUP BY
         bm.id,
         bmp.first_name,
         bmp.last_name,
         u.email,
         bm.role
       ORDER BY bmp.first_name, bmp.last_name`,
      [businessId]
    );

    // Get jobs that have not been assigned to any staff member
      const unassignedResult = await pool.query(
      `SELECT
        j.id AS job_id,
        s.name AS service,
        j.date
      FROM jobs j
      JOIN services s
        ON j.service_id = s.id
      WHERE j.business_id = $1
        AND j.assigned_member_id IS NULL
        AND j.status = 'CONFIRMED'
      ORDER BY j.date ASC`,
      [businessId]
    );

    return res.json({
      staff: staffResult.rows,
      unassigned_tasks: unassignedResult.rows
    });

  } catch (error) {
    next(error);
  }
};


// ============================================================
// GET BUSINESS MEMBERS
// ============================================================

exports.getBusinessMembers = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const businessResult = await pool.query(
      `SELECT business_id
       FROM business_members
       WHERE user_id = $1
       LIMIT 1`,
      [userId]
    );

    if (businessResult.rows.length === 0) {
      return res.status(404).json({
        message: 'Business not found'
      });
    }

    const businessId = businessResult.rows[0].business_id;

    const result = await pool.query(
      `SELECT
        bm.id AS member_id,
        bmp.first_name,
        bmp.last_name,
        u.email

       FROM business_members bm

       JOIN users u
         ON bm.user_id = u.id

       JOIN business_member_profiles bmp
         ON bm.user_id = bmp.user_id

       WHERE bm.business_id = $1
       AND bm.role = 'STAFF'

       ORDER BY bmp.first_name, bmp.last_name`,
      [businessId]
    );

    return res.json(result.rows);

  } catch (error) {
    next(error);
  }
};


// ============================================================
// ASSIGN ORDER MEMBER
// ============================================================

exports.assignOrderMember = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;
    const { member_id } = req.body;

    if (!member_id) {
      return res.status(400).json({
        message: 'Member is required'
      });
    }

    // Check that logged-in user is an OWNER
    const ownerResult = await pool.query(
      `SELECT business_id
       FROM business_members
       WHERE user_id = $1
       AND role = 'OWNER'
       LIMIT 1`,
      [userId]
    );

    if (ownerResult.rows.length === 0) {
      return res.status(403).json({
        message: 'Only the business owner can assign members'
      });
    }

    const businessId = ownerResult.rows[0].business_id;

    // Check that selected member belongs to this business
    const memberResult = await pool.query(
      `SELECT id
       FROM business_members
       WHERE id = $1
       AND business_id = $2
       AND role = 'STAFF'
       LIMIT 1`,
      [member_id, businessId]
    );

    if (memberResult.rows.length === 0) {
      return res.status(404).json({
        message: 'Staff member not found'
      });
    }

    // Assign member to order
    const result = await pool.query(
      `UPDATE jobs
       SET assigned_member_id = $1
       WHERE id = $2
       AND business_id = $3
       RETURNING
         id,
         assigned_member_id`,
      [member_id, orderId, businessId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    return res.json({
      message: 'Order assigned successfully',
      order: result.rows[0]
    });

  } catch (error) {
    next(error);
  }
};


exports.assignJobToStaff = async (req, res, next) => {
  try {
    const { job_id } = req.params;
    const { member_id } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      `UPDATE jobs
       SET assigned_member_id = $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
         AND business_id = (
           SELECT business_id
           FROM business_members
           WHERE user_id = $3
           LIMIT 1
         )
       RETURNING id, assigned_member_id`,
      [member_id, job_id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.json({
      message: "Job assigned successfully",
      job: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};


// ===============================
// STAFF TASKS
// ===============================

exports.getStaffTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT
        j.id AS job_id,
        s.id AS service_id,
        s.name AS service_name,
        s.description AS service_description,
        cp.id AS customer_id,
        cp.first_name,
        cp.last_name,
        cp.phone,
        j.status,
        j.date,
        j.time_slot
       FROM jobs j
       JOIN services s
         ON j.service_id = s.id
       JOIN customer_profiles cp
         ON j.customer_id = cp.id
       JOIN business_members bm
         ON j.assigned_member_id = bm.id
       WHERE bm.user_id = $1
         AND j.status = 'CONFIRMED'
       ORDER BY j.date ASC, j.time_slot ASC`,
      [userId]
    );

    return res.json(result.rows);

  } catch (error) {
    next(error);
  }
};


// ===============================
// STAFF TASK DETAILS
// ===============================

exports.getStaffTaskDetails = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { job_id } = req.params;

    const result = await pool.query(
      `SELECT
        j.id AS job_id,
        j.status,
        j.date,
        j.time_slot,

        s.id AS service_id,
        s.name AS service_name,
        s.description AS service_description,
        s.base_price,

        cp.id AS customer_id,
        cp.first_name,
        cp.last_name,
        cp.phone,
        cp.address_line,
        cp.state,
        cp.postcode,
        cp.country

       FROM jobs j

       JOIN services s
         ON j.service_id = s.id

       JOIN customer_profiles cp
         ON j.customer_id = cp.id

       JOIN business_members bm
         ON j.assigned_member_id = bm.id

       WHERE j.id = $1
         AND bm.user_id = $2`,
      [job_id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    return res.json(result.rows[0]);

  } catch (error) {
    next(error);
  }
};


// ===============================
// GET JOB LOGS
// ===============================

exports.getStaffJobLogs = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { job_id } = req.params;

    const jobResult = await pool.query(
      `SELECT j.id
       FROM jobs j
       JOIN business_members bm
         ON j.assigned_member_id = bm.id
       WHERE j.id = $1
         AND bm.user_id = $2`,
      [job_id, userId]
    );

    if (jobResult.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    const result = await pool.query(
      `SELECT *
       FROM job_logs
       WHERE job_id = $1
       ORDER BY created_at DESC`,
      [job_id]
    );

    return res.json(result.rows);

  } catch (error) {
    next(error);
  }
};


// ===============================
// ADD JOB LOG
// ===============================

exports.addStaffJobLog = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { job_id } = req.params;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Log message is required"
      });
    }

    const jobResult = await pool.query(
      `SELECT j.id
       FROM jobs j
       JOIN business_members bm
         ON j.assigned_member_id = bm.id
       WHERE j.id = $1
         AND bm.user_id = $2`,
      [job_id, userId]
    );

    if (jobResult.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    const result = await pool.query(
      `INSERT INTO job_logs
        (job_id, message)
       VALUES
        ($1, $2)
       RETURNING *`,
      [job_id, message.trim()]
    );

    return res.status(201).json(result.rows[0]);

  } catch (error) {
    next(error);
  }
};


// ===============================
// UPDATE STAFF JOB STATUS
// ===============================

exports.updateStaffJobStatus = async (req, res, next) => {
  const client = await pool.connect();

  try {
    const userId = req.user.id;
    const { job_id } = req.params;
    const { status } = req.body;

    if (!["COMPLETED", "CANCELLED"].includes(status)) {
      return res.status(400).json({
        message: "Invalid job status"
      });
    }

    await client.query("BEGIN");

    // Get the job and verify it belongs to this staff member
    const jobResult = await client.query(
      `SELECT
        j.id,
        j.status,
        j.business_id,
        j.service_id,
        s.name AS service_name,
        s.base_price
       FROM jobs j
       JOIN services s
         ON j.service_id = s.id
       JOIN business_members bm
         ON j.assigned_member_id = bm.id
       WHERE j.id = $1
         AND bm.user_id = $2
         AND bm.role = 'STAFF'
       FOR UPDATE`,
      [job_id, userId]
    );

    if (jobResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        message: "Task not found"
      });
    }

    const job = jobResult.rows[0];

    // Staff can only update a confirmed job
    if (job.status !== "CONFIRMED") {
      await client.query("ROLLBACK");

      return res.status(400).json({
        message: "Only confirmed jobs can be updated"
      });
    }

    // Update job status
    const updatedJobResult = await client.query(
      `UPDATE jobs
       SET status = $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING
         id AS job_id,
         status,
         date,
         time_slot`,
      [status, job_id]
    );

    // Only create an invoice when the job is completed
    if (status === "COMPLETED") {
      // Check that an invoice does not already exist
      const existingInvoiceResult = await client.query(
        `SELECT id
         FROM invoices
         WHERE job_id = $1`,
        [job_id]
      );

      if (existingInvoiceResult.rows.length === 0) {
        // Create invoice
        const invoiceResult = await client.query(
          `INSERT INTO invoices
            (
              business_id,
              job_id,
              status,
              issue_date,
              due_date,
              total_amount
            )
           VALUES
            (
              $1,
              $2,
              'ISSUED',
              CURRENT_DATE,
              CURRENT_DATE + INTERVAL '7 days',
              $3
            )
           RETURNING
             id,
             job_id,
             status,
             issue_date,
             due_date,
             total_amount`,
          [
            job.business_id,
            job_id,
            job.base_price
          ]
        );

        const invoice = invoiceResult.rows[0];

        // Create invoice item
        await client.query(
          `INSERT INTO invoice_items
            (
              invoice_id,
              description,
              sub_total
            )
           VALUES
            (
              $1,
              $2,
              $3
            )`,
          [
            invoice.id,
            job.service_name,
            job.base_price
          ]
        );
      }
    }

    await client.query("COMMIT");

    return res.json({
      message:
        status === "COMPLETED"
          ? "Job completed and invoice created"
          : "Job cancelled",
      job: updatedJobResult.rows[0]
    });

  } catch (error) {
    await client.query("ROLLBACK");
    next(error);
  } finally {
    client.release();
  }
};


// ===============================
// STAFF JOB HISTORY
// ===============================

exports.getStaffJobHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT
        j.id AS job_id,
        s.id AS service_id,
        s.name AS service_name,
        s.description AS service_description,

        cp.id AS customer_id,
        cp.first_name,
        cp.last_name,
        cp.phone,

        j.status,
        j.date,
        j.time_slot

       FROM jobs j

       JOIN services s
         ON j.service_id = s.id

       JOIN customer_profiles cp
         ON j.customer_id = cp.id

       JOIN business_members bm
         ON j.assigned_member_id = bm.id

       WHERE bm.user_id = $1
         AND j.status IN ('COMPLETED', 'CANCELLED')

       ORDER BY j.date DESC, j.time_slot DESC`,
      [userId]
    );

    return res.json(result.rows);

  } catch (error) {
    next(error);
  }
};

exports.getStaffJobLogs = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { job_id } = req.params;

    // Verify the job is assigned to this staff member
    const jobResult = await pool.query(
      `SELECT j.id
       FROM jobs j
       JOIN business_members bm
         ON j.assigned_member_id = bm.id
       WHERE j.id = $1
         AND bm.user_id = $2
         AND bm.role = 'STAFF'`,
      [job_id, userId]
    );

    if (jobResult.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    const result = await pool.query(
      `SELECT
        id,
        job_id,
        user_id,
        photo_url,
        notes,
        created_at
       FROM job_logs
       WHERE job_id = $1
       ORDER BY created_at DESC`,
      [job_id]
    );

    return res.json(result.rows);

  } catch (error) {
    next(error);
  }
};

exports.addStaffJobLog = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { job_id } = req.params;
    const { notes, photo_url } = req.body;

    if (!notes || !notes.trim()) {
      return res.status(400).json({
        message: "Notes are required"
      });
    }

    // Verify the job is assigned to this staff member
    const jobResult = await pool.query(
      `SELECT j.id
       FROM jobs j
       JOIN business_members bm
         ON j.assigned_member_id = bm.id
       WHERE j.id = $1
         AND bm.user_id = $2
         AND bm.role = 'STAFF'`,
      [job_id, userId]
    );

    if (jobResult.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    const result = await pool.query(
      `INSERT INTO job_logs
        (job_id, user_id, photo_url, notes)
       VALUES
        ($1, $2, $3, $4)
       RETURNING
        id,
        job_id,
        user_id,
        photo_url,
        notes,
        created_at`,
      [
        job_id,
        userId,
        photo_url || null,
        notes.trim()
      ]
    );

    return res.status(201).json({
      message: "Job log added successfully",
      log: result.rows[0]
    });

  } catch (error) {
    next(error);
  }
};

// Add this to your businessController.js
exports.getBusinessProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Fetch user, their specific profile, and their business name
    const result = await pool.query(
      `SELECT 
         u.email, 
         u.role,
         bmp.first_name,
         bmp.last_name,
         bmp.phone,
         b.name AS business_name
       FROM users u
       LEFT JOIN business_member_profiles bmp ON bmp.user_id = u.id
       LEFT JOIN business_members bm ON bm.user_id = u.id
       LEFT JOIN businesses b ON b.id = bm.business_id
       WHERE u.id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Business profile not found' });
    }

    const row = result.rows[0];

    return res.json({
      name: `${row.first_name} ${row.last_name}`.trim() || 'Vendor',
      email: row.email,
      role: row.role,
      businessName: row.business_name || 'Unassigned Business',
      phone: row.phone
    });
  } catch (error) {
    next(error);
  }
};