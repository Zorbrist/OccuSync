const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const { signAccessToken } = require('../config/auth');

//register customer
exports.registerCustomer = async (req, res, next) => {
  const client = await pool.connect();

  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      country,
      state,
      postcode,
      password
    } = req.body;

    // Check required fields
    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone ||
      !country ||
      !state ||
      !postcode ||
      !password
    ) {
      return res.status(400).json({
        message: 'All required fields must be provided'
      });
    }

    // Check password length
    if (password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if email already exists
    const existingUser = await client.query(
      'SELECT id FROM users WHERE email = $1',
      [normalizedEmail]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: 'Email already registered'
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Start transaction
    await client.query('BEGIN');

    // Create user
    const userResult = await client.query(
      `INSERT INTO users
        (email, password_hash, role)
       VALUES
        ($1, $2, 'CUSTOMER')
       RETURNING id, email, role`,
      [normalizedEmail, passwordHash]
    );

    const user = userResult.rows[0];

    // Create customer profile
    await client.query(
      `INSERT INTO customer_profiles
        (
          user_id,
          first_name,
          last_name,
          phone,
          country,
          state,
          postcode
        )
       VALUES
        ($1, $2, $3, $4, $5, $6, $7)`,
      [
        user.id,
        first_name.trim(),
        last_name.trim(),
        phone.trim(),
        country.trim(),
        state.trim(),
        postcode.trim()
      ]
    );

    // Save changes
    await client.query('COMMIT');

    return res.status(201).json({
      message: 'Customer registered successfully',
      user
    });

  } catch (error) {
    await client.query('ROLLBACK');
    next(error);

  } finally {
    client.release();
  }
};



// register business

exports.registerBusiness = async (req, res, next) => {
  const client = await pool.connect();

  try {
    const {
      business,
      owner,
      email,
      password
    } = req.body;

    // Check required sections
    if (!business || !owner || !email || !password) {
      return res.status(400).json({
        message: 'All required fields must be provided'
      });
    }

    // Check password
    if (password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if login email already exists
    const existingUser = await client.query(
      'SELECT id FROM users WHERE email = $1',
      [normalizedEmail]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: 'Email already registered'
      });
    }

    // Check business registration number
    const existingBusiness = await client.query(
      `SELECT id
       FROM businesses
       WHERE registration_no = $1`,
      [business.registration_no.trim()]
    );

    if (existingBusiness.rows.length > 0) {
      return res.status(409).json({
        message: 'Business registration number already exists'
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Start transaction
    await client.query('BEGIN');

    // 1. Create user account
    const userResult = await client.query(
      `INSERT INTO users
        (email, password_hash, role)
       VALUES
        ($1, $2, 'BUSINESS_OWNER')
       RETURNING id, email, role`,
      [normalizedEmail, passwordHash]
    );

    const user = userResult.rows[0];

    // 2. Create business
    const businessResult = await client.query(
      `INSERT INTO businesses
        (
          name,
          registration_no,
          industry,
          area_of_service,
          phone,
          email,
          state,
          postcode,
          country
        )
       VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, name, registration_no, phone, email`,
      [
        business.name.trim(),
        business.registration_no.trim(),
        business.industry.trim(),
        business.area_of_service
          ? business.area_of_service.trim()
          : null,
        business.phone.trim(),
        business.email.trim().toLowerCase(),
        business.state.trim(),
        business.postcode.trim(),
        business.country.trim(),
      ]
    );

    const newBusiness = businessResult.rows[0];

    // 3. Connect owner to business
    await client.query(
      `INSERT INTO business_members
        (user_id, business_id, role)
       VALUES
        ($1, $2, 'OWNER')`,
      [
        user.id,
        newBusiness.id
      ]
    );

    // Save changes
    await client.query('COMMIT');

    return res.status(201).json({
      message: 'Business registered successfully',
      user,
      business: newBusiness
    });

  } catch (error) {
    await client.query('ROLLBACK');
    next(error);

  } finally {
    client.release();
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({
        message: 'email and password are required'
      });
    }

    const result = await pool.query(
      `SELECT id, email, password_hash, role, created_at, updated_at
       FROM users
       WHERE email = $1`,
      [email.trim().toLowerCase()]
    );

    const user = result.rows[0];

    const passwordMatches = user
      ? await bcrypt.compare(password, user.password_hash)
      : false;

    if (!user || !passwordMatches) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // Create user object without password_hash
    const safeUser = {
      id: user.id,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at
    };

    // Create JWT
    const token = signAccessToken({
      sub: String(safeUser.id),
      email: safeUser.email,
      role: safeUser.role
    });

    // Send user + token
    res.json({
      message: 'Login successful',
      user: safeUser,
      token
    });

  } catch (error) {
    next(error);
  }
};