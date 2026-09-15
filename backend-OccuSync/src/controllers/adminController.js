const pool = require('../config/db');

exports.getAdminDashboard = async (req, res) => {
  try {
    const [
      userOverview,
      businessAnalytics,
      serviceJobOverview,
      totalTransactionValue,
      latestJobs,
      pendingBusinesses,
      recentRegistrations,
    ] = await Promise.all([
      // 1. Total users, customers, and business providers
      pool.query(`
        SELECT
          COUNT(*) FILTER (
            WHERE role IN ('CUSTOMER', 'BUSINESS_PROVIDER')
          )::int AS total_users,

          COUNT(*) FILTER (
            WHERE role = 'CUSTOMER'
          )::int AS total_customers,

          COUNT(*) FILTER (
            WHERE role = 'BUSINESS_PROVIDER'
          )::int AS total_business_providers

        FROM users
      `),

      // 2. Each business and number of members under it
      pool.query(`
        SELECT
          b.id,
          b.name AS business_name,
          COUNT(bm.id)::int AS member_count

        FROM businesses b

        LEFT JOIN business_members bm
          ON bm.business_id = b.id

        GROUP BY b.id, b.name

        ORDER BY member_count DESC, b.name ASC
      `),

      // 3. Total services, completed jobs,
      //    and jobs not completed yet
      pool.query(`
        SELECT
          (
            SELECT COUNT(*)::int
            FROM services
          ) AS total_services,

          (
            SELECT COUNT(*)::int
            FROM jobs
            WHERE status = 'COMPLETED'
          ) AS jobs_completed,

          (
            SELECT COUNT(*)::int
            FROM jobs
            WHERE status IN ('PENDING', 'CONFIRMED')
          ) AS jobs_pending_or_confirmed
      `),

      // 4. Total transaction value
      //    This is NOT OccuSync revenue.
      //    It represents the total value of paid invoices.
      pool.query(`
        SELECT
          COALESCE(SUM(total_amount), 0)::numeric
            AS total_transaction_value
        FROM invoices
        WHERE status = 'PAID'
      `),

      // 5. Latest 5 jobs
      pool.query(`
        SELECT
          j.id,
          j.status,
          j.date,
          j.time_slot,

          b.name AS business_name,

          cp.first_name || ' ' || cp.last_name
            AS customer_name,

          s.name AS service_name

        FROM jobs j

        JOIN businesses b
          ON b.id = j.business_id

        JOIN customer_profiles cp
          ON cp.id = j.customer_id

        JOIN services s
          ON s.id = j.service_id

        ORDER BY j.created_at DESC

        LIMIT 5
      `),

      // 6. Businesses awaiting approval
      pool.query(`
        SELECT
          b.id,
          b.name,
          b.registration_no,
          b.industry,
          b.phone,
          b.email,
          b.state,
          b.postcode,
          b.country,
          b.approval_status,
          b.created_at

        FROM businesses b

        WHERE b.approval_status = 'PENDING'

        ORDER BY b.created_at DESC
      `),

      // 7. Users registered during the last 30 days
      pool.query(`
        SELECT
          DATE(created_at) AS date,
          COUNT(*)::int AS count

        FROM users

        WHERE created_at >= NOW() - INTERVAL '30 days'

        GROUP BY DATE(created_at)

        ORDER BY date ASC
      `),
    ]);

    res.json({
      user_overview: userOverview.rows[0],

      business_analytics: businessAnalytics.rows,

      service_job_overview: serviceJobOverview.rows[0],

      total_transaction_value:
        totalTransactionValue.rows[0].total_transaction_value,

      latest_jobs: latestJobs.rows,

      pending_businesses: pendingBusinesses.rows,

      recent_registrations: recentRegistrations.rows,
    });
  } catch (err) {
    console.error("getAdminDashboard error:", err);

    res.status(500).json({
      error: "Failed to load dashboard",
    });
  }
};

exports.updateBusinessStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { approval_status } = req.body;

    if (!['APPROVED', 'REJECTED'].includes(approval_status)) {
      return res.status(400).json({
        message: 'Invalid approval status'
      });
    }

    const result = await pool.query(
      `UPDATE businesses
       SET approval_status = $1
       WHERE id = $2
       RETURNING
         id,
         name,
         registration_no,
         approval_status`,
      [approval_status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Business not found'
      });
    }

    res.json({
      message: `Business ${approval_status.toLowerCase()} successfully`,
      business: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};



exports.getAllUsers = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const offset = (page - 1) * limit;
    const { role, search } = req.query;

    const conditions = [];
    const values = [];

    if (role) {
      values.push(role);
      conditions.push(`u.role = $${values.length}`);
    }

    if (search) {
      values.push(`%${search}%`);
      conditions.push(`u.email ILIKE $${values.length}`);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    const countResult = await pool.query(
      `SELECT COUNT(*)::int AS total FROM users u ${whereClause}`,
      values
    );

    values.push(limit, offset);
    const usersResult = await pool.query(
      `SELECT u.id, u.email, u.role, u.created_at,
              COALESCE(cp.first_name, bmp.first_name) AS first_name,
              COALESCE(cp.last_name, bmp.last_name) AS last_name,
              COALESCE(cp.phone, bmp.phone) AS phone
       FROM users u
       LEFT JOIN customer_profiles cp ON cp.user_id = u.id
       LEFT JOIN business_member_profiles bmp ON bmp.user_id = u.id
       ${whereClause}
       ORDER BY u.created_at DESC
       LIMIT $${values.length - 1} OFFSET $${values.length}`,
      values
    );

    res.json({
      users: usersResult.rows,
      pagination: {
        page,
        limit,
        total: countResult.rows[0].total,
        total_pages: Math.ceil(countResult.rows[0].total / limit),
      },
    });
  } catch (err) {
    console.error("getAllUsers error:", err);
    res.status(500).json({ error: "Failed to load users" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const userResult = await pool.query(
      `SELECT id, email, role, created_at, updated_at
       FROM users
       WHERE id = $1`,
      [id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userResult.rows[0];

    if (user.role === "CUSTOMER") {
      const profileResult = await pool.query(
        `SELECT id, first_name, last_name, phone, address_line,
                state, postcode, country
         FROM customer_profiles
         WHERE user_id = $1`,
        [id]
      );
      user.profile = profileResult.rows[0] || null;
    } else if (user.role === "BUSINESS_PROVIDER") {
      const profileResult = await pool.query(
        `SELECT first_name, last_name, phone, profile_picture
         FROM business_member_profiles
         WHERE user_id = $1`,
        [id]
      );
      user.profile = profileResult.rows[0] || null;

      const membershipsResult = await pool.query(
        `SELECT bm.id AS membership_id, bm.role AS membership_role,
                b.id AS business_id, b.name AS business_name,
                b.approval_status
         FROM business_members bm
         JOIN businesses b ON b.id = bm.business_id
         WHERE bm.user_id = $1`,
        [id]
      );
      user.businesses = membershipsResult.rows;
    }

    res.json({ user });
  } catch (err) {
    console.error("getUserById error:", err);
    res.status(500).json({ error: "Failed to load user" });
  }
};


exports.updateUser = async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;
    const { email, role, profile } = req.body;

    await client.query("BEGIN");

    const existing = await client.query(
      `SELECT role FROM users WHERE id = $1 FOR UPDATE`,
      [id]
    );

    if (existing.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "User not found" });
    }

    const currentRole = existing.rows[0].role;

    const userFields = [];
    const userValues = [];

    if (email) {
      userValues.push(email);
      userFields.push(`email = $${userValues.length}`);
    }
    if (role) {
      userValues.push(role);
      userFields.push(`role = $${userValues.length}`);
    }

    if (userFields.length) {
      userFields.push(`updated_at = CURRENT_TIMESTAMP`);
      userValues.push(id);
      await client.query(
        `UPDATE users SET ${userFields.join(", ")} WHERE id = $${userValues.length}`,
        userValues
      );
    }

    if (profile && typeof profile === "object") {
      const effectiveRole = role || currentRole;
      const allowedFields =
        effectiveRole === "CUSTOMER"
          ? ["first_name", "last_name", "phone", "address_line", "state", "postcode", "country"]
          : effectiveRole === "BUSINESS_PROVIDER"
          ? ["first_name", "last_name", "phone", "profile_picture"]
          : [];

      const profileFields = [];
      const profileValues = [];

      for (const field of allowedFields) {
        if (profile[field] !== undefined) {
          profileValues.push(profile[field]);
          profileFields.push(`${field} = $${profileValues.length}`);
        }
      }

      if (profileFields.length) {
        profileFields.push(`updated_at = CURRENT_TIMESTAMP`);
        profileValues.push(id);
        const table =
          effectiveRole === "CUSTOMER" ? "customer_profiles" : "business_member_profiles";
        await client.query(
          `UPDATE ${table} SET ${profileFields.join(", ")} WHERE user_id = $${profileValues.length}`,
          profileValues
        );
      }
    }

    await client.query("COMMIT");

    const updated = await pool.query(
      `SELECT id, email, role, created_at, updated_at FROM users WHERE id = $1`,
      [id]
    );

    res.json({ user: updated.rows[0] });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("updateUser error:", err);
    res.status(500).json({ error: "Failed to update user" });
  } finally {
    client.release();
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully", id: result.rows[0].id });
  } catch (err) {
    console.error("deleteUser error:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
