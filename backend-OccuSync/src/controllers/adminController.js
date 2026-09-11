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

module.exports = {
  getAdminDashboard,
  getJobsCalendar,
};