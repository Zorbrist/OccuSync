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

    // Active orders (Only PENDING and CONFIRMED are valid active statuses)
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

    // Completed orders this month (Using 'date' instead of 'scheduled_start')
    const completedOrdersResult = await pool.query(
      `SELECT COUNT(*) AS count
       FROM jobs
       WHERE business_id = $1
       AND status = 'COMPLETED'
       AND date >= DATE_TRUNC('month', CURRENT_DATE)
       AND date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'`,
      [businessId]
    );

    // Monthly revenue (Using invoices.status and invoices.updated_at since payments lacks these columns)
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

    // Recent active orders (Using 'date' and 'time_slot' instead of scheduled start/end)
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

        services.base_price

      FROM jobs

      JOIN services
        ON jobs.service_id = services.id

      JOIN customer_profiles
        ON jobs.customer_id = customer_profiles.id

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

        business_members.id AS assigned_member_id,
        business_members.role AS assigned_member_role

       FROM jobs

       JOIN services
         ON jobs.service_id = services.id

       JOIN customer_profiles
         ON jobs.customer_id = customer_profiles.id

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
    // Swapped scheduled_start/end and notes for date and time_slot
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