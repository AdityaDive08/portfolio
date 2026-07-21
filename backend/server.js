require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test DB Connection and Create Table
pool.getConnection()
  .then(async connection => {
    console.log('Connected to MySQL database!');
    try {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS contacts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          subject VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Contacts table is ready!');
    } catch (tableErr) {
      console.error('Error creating table:', tableErr);
    } finally {
      connection.release();
    }
  })
  .catch(err => {
    console.error('Error connecting to MySQL database:', err.message);
  });

// Routes
app.get('/', (req, res) => {
  res.status(200).send('Backend is running!');
});
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)';
    const [result] = await pool.execute(query, [name, email, subject, message]);

    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully!',
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: error.message || 'Failed to send message. Please try again later.' });
  }
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
