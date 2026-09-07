require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes');

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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});