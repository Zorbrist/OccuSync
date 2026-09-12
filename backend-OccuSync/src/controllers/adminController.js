const pool = require('../config/db');

const getAdminDashboard = async (req, res, next) => {
  try {
    const [
      userCountsResult,
      businessCountResult,
      customerCountResult,
      serviceCountResult,
      newUsersResult,
      jobStatusResult,
      revenueResult,
      invoiceStatusResult,
      overdueInvoicesResult,
      recentJobsResult,
      recentPaymentsResult,
      topBusinessesResult,
    ] = await Promise.all([
      // Users grouped by role (CUSTOMER / SERVICE_PROVIDER / ADMIN)
      pool.query(`
        SELECT role, COUNT(*)::int AS count
        FROM users
        GROUP BY role
      `),

      // Total registered businesses
      pool.query(`SELECT COUNT(*)::int AS count FROM businesses`),

      // Total customer profiles
      pool.query(`SELECT COUNT(*)::int AS count FROM customer_profiles`),

      // Total services offered across all businesses
      pool.query(`SELECT COUNT(*)::int AS count FROM services`),

      // New user signups in the last 30 days
      pool.query(`
        SELECT COUNT(*)::int AS count
        FROM users
        WHERE created_at >= NOW() - INTERVAL '30 days'
      `),

      // Job pipeline breakdown by status
      pool.query(`
        SELECT status, COUNT(*)::int AS count
        FROM jobs
        GROUP BY status
      `),

      // Total revenue collected (completed payments), plus breakdown by method
      pool.query(`
        SELECT
          method,
          COALESCE(SUM(amount), 0)::numeric(12,2) AS total,
          COUNT(*)::int AS count
        FROM payments
        WHERE status = 'COMPLETED'
        GROUP BY method
      `),

      // Invoice breakdown by status
      pool.query(`
        SELECT status, COUNT(*)::int AS count, COALESCE(SUM(total_amount), 0)::numeric(12,2) AS total
        FROM invoices
        GROUP BY status
      `),

      // Invoices that are overdue (past due date, not paid/cancelled)
      pool.query(`
        SELECT COUNT(*)::int AS count, COALESCE(SUM(total_amount), 0)::numeric(12,2) AS total
        FROM invoices
        WHERE due_date < CURRENT_DATE
          AND status NOT IN ('PAID', 'CANCELLED')
      `),

      // 10 most recently created jobs, with readable context
      pool.query(`
        SELECT
          j.id,
          j.status,
          j.scheduled_start,
          j.scheduled_end,
          b.name AS business_name,
          s.name AS service_name,
          cp.first_name || ' ' || cp.last_name AS customer_name,
          j.created_at
        FROM jobs j
        JOIN businesses b ON b.id = j.business_id
        JOIN services s ON s.id = j.service_id
        JOIN customer_profiles cp ON cp.id = j.customer_id
        ORDER BY j.created_at DESC
        LIMIT 10
      `),

      // 10 most recent payments, with invoice/business context
      pool.query(`
        SELECT
          p.id,
          p.amount,
          p.method,
          p.status,
          p.paid_at,
          i.id AS invoice_id,
          b.name AS business_name
        FROM payments p
        JOIN invoices i ON i.id = p.invoice_id
        JOIN businesses b ON b.id = i.business_id
        ORDER BY p.created_at DESC
        LIMIT 10
      `),

      // Top 5 businesses by number of jobs handled
      pool.query(`
        SELECT
          b.id,
          b.name,
          COUNT(j.id)::int AS job_count
        FROM businesses b
        JOIN jobs j ON j.business_id = b.id
        GROUP BY b.id, b.name
        ORDER BY job_count DESC
        LIMIT 5
      `),
    ]);

    // --- Shape the response ---

    const usersByRole = userCountsResult.rows.reduce((acc, row) => {
      acc[row.role] = row.count;
      return acc;
    }, { CUSTOMER: 0, SERVICE_PROVIDER: 0, ADMIN: 0 });

    const totalUsers = Object.values(usersByRole).reduce((a, b) => a + b, 0);

    const jobsByStatus = jobStatusResult.rows.reduce((acc, row) => {
      acc[row.status] = row.count;
      return acc;
    }, { PENDING: 0, CONFIRMED: 0, ASSIGNED: 0, IN_PROGRESS: 0, COMPLETED: 0, CANCELLED: 0 });

    const totalJobs = Object.values(jobsByStatus).reduce((a, b) => a + b, 0);

    const revenueByMethod = revenueResult.rows.reduce((acc, row) => {
      acc[row.method] = { total: Number(row.total), count: row.count };
      return acc;
    }, {});

    const totalRevenue = revenueResult.rows.reduce(
      (sum, row) => sum + Number(row.total),
      0
    );

    const invoicesByStatus = invoiceStatusResult.rows.reduce((acc, row) => {
      acc[row.status] = { count: row.count, total: Number(row.total) };
      return acc;
    }, {});

    const totalInvoices = invoiceStatusResult.rows.reduce(
      (sum, row) => sum + row.count,
      0
    );

    return res.status(200).json({
      success: true,
      data: {
        overview: {
          totalUsers,
          usersByRole,
          newUsersLast30Days: newUsersResult.rows[0].count,
          totalBusinesses: businessCountResult.rows[0].count,
          totalCustomers: customerCountResult.rows[0].count,
          totalServices: serviceCountResult.rows[0].count,
        },
        jobs: {
          total: totalJobs,
          byStatus: jobsByStatus,
        },
        revenue: {
          total: totalRevenue,
          byMethod: revenueByMethod,
        },
        invoices: {
          total: totalInvoices,
          byStatus: invoicesByStatus,
          overdue: {
            count: overdueInvoicesResult.rows[0].count,
            total: Number(overdueInvoicesResult.rows[0].total),
          },
        },
        recentJobs: recentJobsResult.rows,
        recentPayments: recentPaymentsResult.rows,
        topBusinesses: topBusinessesResult.rows,
      },
    });
  } catch (error) {
    // Delegate to the app's error-handling middleware
    next(error);
  }
};


const getJobsCalendar = async (req, res, next) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({
        success: false,
        message: 'Both "start" and "end" query params (YYYY-MM-DD) are required.',
      });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: '"start" and "end" must be valid dates (YYYY-MM-DD).',
      });
    }

    const result = await pool.query(
      `
        SELECT
          j.id,
          j.status,
          j.scheduled_start,
          j.scheduled_end,
          b.name AS business_name,
          s.name AS service_name,
          cp.first_name || ' ' || cp.last_name AS customer_name
        FROM jobs j
        JOIN businesses b ON b.id = j.business_id
        JOIN services s ON s.id = j.service_id
        JOIN customer_profiles cp ON cp.id = j.customer_id
        WHERE j.scheduled_start >= $1
          AND j.scheduled_start < $2
        ORDER BY j.scheduled_start ASC
      `,
      [startDate.toISOString(), endDate.toISOString()]
    );

    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

// GET /admin/users
const getAllUsers = async (req, res, next) => {
    try {
        const { search = '' } = req.query;

        const searchTerm = `%${search}%`;

        const summaryQuery = `
            SELECT
                (
                    SELECT COUNT(*)
                    FROM users
                )::int AS total_users,

                (
                    SELECT COUNT(*)
                    FROM users
                    WHERE role = 'CUSTOMER'
                )::int AS total_customers,

                (
                    SELECT COUNT(*)
                    FROM business_members
                    WHERE role = 'OWNER'
                )::int AS total_owners,

                (
                    SELECT COUNT(*)
                    FROM business_members
                    WHERE role = 'STAFF'
                )::int AS total_staff;
        `;

        const customersQuery = `
            SELECT
                u.id,
                u.email,
                u.role,
                u.created_at,
                cp.id AS customer_id,
                cp.first_name,
                cp.last_name,
                cp.phone,
                cp.country,
                cp.state,
                cp.postcode
            FROM users u
            JOIN customer_profiles cp
                ON cp.user_id = u.id
            WHERE u.role = 'CUSTOMER'
                AND (
                    u.email ILIKE $1
                    OR cp.first_name ILIKE $1
                    OR cp.last_name ILIKE $1
                    OR cp.phone ILIKE $1
                )
            ORDER BY cp.first_name ASC;
        `;

        const businessOwnersQuery = `
            SELECT
                u.id AS user_id,
                u.email AS user_email,
                u.created_at,

                bm.id AS member_id,
                bm.role AS member_role,

                b.id AS business_id,
                b.name AS business_name,
                b.email AS business_email,
                b.phone AS business_phone,
                b.registration_no,
                b.industry,
                b.area_of_service,
                b.state,
                b.postcode,
                b.country

            FROM business_members bm

            JOIN users u
                ON u.id = bm.user_id

            JOIN businesses b
                ON b.id = bm.business_id

            WHERE bm.role = 'OWNER'
                AND (
                    u.email ILIKE $1
                    OR b.name ILIKE $1
                    OR b.email ILIKE $1
                    OR b.phone ILIKE $1
                )

            ORDER BY b.name ASC;
        `;

        const businessStaffQuery = `
            SELECT
                u.id AS user_id,
                u.email AS user_email,
                u.created_at,

                bm.id AS member_id,
                bm.role AS member_role,

                b.id AS business_id,
                b.name AS business_name,
                b.email AS business_email,
                b.phone AS business_phone,
                b.registration_no,
                b.industry,
                b.area_of_service,
                b.state,
                b.postcode,
                b.country

            FROM business_members bm

            JOIN users u
                ON u.id = bm.user_id

            JOIN businesses b
                ON b.id = bm.business_id

            WHERE bm.role = 'STAFF'
                AND (
                    u.email ILIKE $1
                    OR b.name ILIKE $1
                    OR b.email ILIKE $1
                    OR b.phone ILIKE $1
                )

            ORDER BY b.name ASC;
        `;

        const [
            summary,
            customers,
            businessOwners,
            businessStaff
        ] = await Promise.all([
            pool.query(summaryQuery),
            pool.query(customersQuery, [searchTerm]),
            pool.query(businessOwnersQuery, [searchTerm]),
            pool.query(businessStaffQuery, [searchTerm])
        ]);

        res.status(200).json({
            success: true,
            data: {
                summary: summary.rows[0],
                customers: customers.rows,
                business_owners: businessOwners.rows,
                business_staff: businessStaff.rows
            }
        });

    } catch (error) {
        next(error);
    }
};
// GET /admin/users/:id
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userQuery = `
      SELECT
        id,
        email,
        role,
        created_at
      FROM users
      WHERE id = $1;
    `;

    const userResult = await pool.query(userQuery, [id]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = userResult.rows[0];

    let details = null;

    // Customer details
    if (user.role === 'CUSTOMER') {
      const customerQuery = `
        SELECT
          id,
          user_id,
          first_name,
          last_name,
          phone,
          country,
          state,
          postcode,
          created_at,
          updated_at
        FROM customer_profiles
        WHERE user_id = $1;
      `;

      const result = await pool.query(customerQuery, [id]);

      details = result.rows[0] || null;
    }

    // Business owner/staff details
    if (user.role === 'SERVICE_PROVIDER') {
      const businessQuery = `
        SELECT
          bm.id AS member_id,
          bm.role AS member_role,

          b.id AS business_id,
          b.name AS business_name,
          b.registration_no,
          b.industry,
          b.area_of_service,
          b.phone AS business_phone,
          b.email AS business_email,
          b.state,
          b.postcode,
          b.country

        FROM business_members bm

        JOIN businesses b
          ON b.id = bm.business_id

        WHERE bm.user_id = $1;
      `;

      const result = await pool.query(businessQuery, [id]);

      details = result.rows;
    }

    res.status(200).json({
      success: true,
      data: {
        user,
        details
      }
    });

  } catch (error) {
    next(error);
  }
};

// PUT /admin/users/:id
const updateUser = async (req, res, next) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;

    const {
      email,

      // Customer
      first_name,
      last_name,
      phone,
      country,
      state,
      postcode,

      // Business
      business_name,
      registration_no,
      industry,
      area_of_service,
      business_email,
      business_phone
    } = req.body;

    await client.query('BEGIN');

    // Check user
    const userResult = await client.query(
      `
      SELECT id, role
      FROM users
      WHERE id = $1;
      `,
      [id]
    );

    if (userResult.rows.length === 0) {
      await client.query('ROLLBACK');

      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = userResult.rows[0];

    // Update login email
    if (email !== undefined) {
      await client.query(
        `
        UPDATE users
        SET
          email = $1,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $2;
        `,
        [email, id]
      );
    }

    // Update customer
    if (user.role === 'CUSTOMER') {
      await client.query(
        `
        UPDATE customer_profiles
        SET
          first_name = COALESCE($1, first_name),
          last_name = COALESCE($2, last_name),
          phone = COALESCE($3, phone),
          country = COALESCE($4, country),
          state = COALESCE($5, state),
          postcode = COALESCE($6, postcode),
          updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $7;
        `,
        [
          first_name,
          last_name,
          phone,
          country,
          state,
          postcode,
          id
        ]
      );
    }

    // Update business
    if (user.role === 'SERVICE_PROVIDER') {
      const businessResult = await client.query(
        `
        SELECT business_id
        FROM business_members
        WHERE user_id = $1
        LIMIT 1;
        `,
        [id]
      );

      if (businessResult.rows.length > 0) {
        const businessId = businessResult.rows[0].business_id;

        await client.query(
          `
          UPDATE businesses
          SET
            name = COALESCE($1, name),
            registration_no = COALESCE($2, registration_no),
            industry = COALESCE($3, industry),
            area_of_service = COALESCE($4, area_of_service),
            phone = COALESCE($5, phone),
            email = COALESCE($6, email),
            state = COALESCE($7, state),
            postcode = COALESCE($8, postcode),
            country = COALESCE($9, country),
            updated_at = CURRENT_TIMESTAMP
          WHERE id = $10;
          `,
          [
            business_name,
            registration_no,
            industry,
            area_of_service,
            business_phone,
            business_email,
            state,
            postcode,
            country,
            businessId
          ]
        );
      }
    }

    await client.query('COMMIT');

    res.status(200).json({
      success: true,
      message: 'User updated successfully'
    });

  } catch (error) {
    await client.query('ROLLBACK');
    next(error);

  } finally {
    client.release();
  }
};

// DELETE /admin/users/:id
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM users
      WHERE id = $1
      RETURNING id;
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.status(200).json({
      message: 'User deleted successfully'
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminDashboard,
  getJobsCalendar,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};