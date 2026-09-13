const pool = require('../config/db');

const requireBusinessRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;

      const result = await pool.query(
        `SELECT
          business_id,
          role
         FROM business_members
         WHERE user_id = $1
         LIMIT 1`,
        [userId]
      );

      if (result.rows.length === 0) {
        return res.status(403).json({
          message: 'You are not a member of a business'
        });
      }

      const membership = result.rows[0];

      if (!allowedRoles.includes(membership.role)) {
        return res.status(403).json({
          message: 'You do not have permission to perform this action'
        });
      }

      req.business = {
        id: membership.business_id,
        role: membership.role
      };

      next();

    } catch (error) {
      next(error);
    }
  };
};

module.exports = requireBusinessRole;