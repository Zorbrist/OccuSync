const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT || 5433),
  database: process.env.PGDATABASE || 'occusync',
  user: process.env.PGUSER || 'occusync',
  password: process.env.PGPASSWORD || 'occusync_dev',
  ssl: process.env.PGSSL === 'true'
    ? { rejectUnauthorized: false }
    : false
});

module.exports = pool;