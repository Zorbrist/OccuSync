require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes');
const customerRoutes = require('./src/routes/custRoutes')
const businessRoutes = require('./src/routes/businessRoutes')
const adminRoutes = require('./src/routes/adminRoutes')
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

// Routes
app.use('/auth', authRoutes);
app.use('/customer', customerRoutes);
app.use('/business', businessRoutes);
app.use('/admin', adminRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});