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
app.use(cors());
app.use(express.json());

// Initialize Database Connection and Tables
initializeDatabase();

// Mount Routes
app.use('/api/contact', contactRoutes);
app.use('/api/resume', resumeRoutes); // Note: I'm changing this to /api/resume to encompass both download and downloads endpoints

// Base Route
app.get('/', (req, res) => {
  res.status(200).send('Backend is running with MVC architecture!');
});

// Start server
app.listen(port, '0.0.0.0', () => {
  logger.info(`Server is running on http://0.0.0.0:${port}`);
});
