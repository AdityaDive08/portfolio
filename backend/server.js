require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./config/db');
const logger = require('./utils/logger');

// Import Routes
const contactRoutes = require('./routes/contactRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Set FRONTEND_URL in Railway env vars to your Vercel URL
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Initialize Database Connection and Tables
initializeDatabase();

// Mount Routes
app.use('/api/contact', contactRoutes);
app.use('/api/resume', resumeRoutes);

// Health Check Route (used by Railway to verify service is alive)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Base Route
app.get('/', (req, res) => {
  res.status(200).send('Backend is running with MVC architecture!');
});

// Start server
app.listen(port, '0.0.0.0', () => {
  logger.info(`Server is running on http://0.0.0.0:${port}`);
});
