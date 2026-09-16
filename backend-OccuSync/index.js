require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Routes
const authRoutes = require('./src/routes/authRoutes');
const customerRoutes = require('./src/routes/customerRoutes');
const businessRoutes = require('./src/routes/businessRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Global Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'HEALTHY',
    timestamp: 'Server is healthy and running'
  });
});

// API Routes
app.use('/auth', authRoutes);
app.use('/customer', customerRoutes);
app.use('/business', businessRoutes);
app.use('/admin', adminRoutes);


// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'RESOURCE_NOT_FOUND',
      message: `Cannot ${req.method} ${req.originalUrl}. Please verify the endpoint URL and request method`, 
    }
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Error]', err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});


// Server Initialization
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});