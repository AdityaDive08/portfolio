require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this if you are not using Gmail
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

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

// Test DB Connection and Create/Fix Table
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
      // Fix for "Field 'id' doesn't have a default value" if the user created it manually without AUTO_INCREMENT
      await connection.query(`
        ALTER TABLE contacts MODIFY COLUMN id INT AUTO_INCREMENT
      `);
      console.log('Contacts table is ready!');

      await connection.query(`
        CREATE TABLE IF NOT EXISTS resume_downloads (
          id INT AUTO_INCREMENT PRIMARY KEY,
          company_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Resume downloads table is ready!');
    } catch (tableErr) {
      console.error('Error creating/fixing table:', tableErr);
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

    // Extract first name for a friendlier greeting
    const firstName = name.split(' ')[0];

    // Send Auto-reply to the Sender
    const mailToSender = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thank you for reaching out, ${firstName}!`,
      text: `Hi ${firstName},\n\nThank you for sending a connecting request!\n\nI have received your message regarding "${subject}" and will respond to you soon.\n\nBest Regards,\nAditya Dive`
    };

    // Send Notification to Aditya (You)
    const mailToAditya = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Sending to yourself
      subject: `New Contact Request: ${subject}`,
      text: `You have a new contact request from your portfolio.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    };

    try {
      // Send both emails asynchronously without waiting for them to finish before responding to the user
      transporter.sendMail(mailToSender).catch(console.error);
      transporter.sendMail(mailToAditya).catch(console.error);
    } catch (mailErr) {
      console.error('Error sending emails:', mailErr);
    }

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

app.post('/api/resume-download', async (req, res) => {
  try {
    const { companyName, email } = req.body;
    
    if (!companyName) {
      return res.status(400).json({ error: 'Company Name is required' });
    }

    const query = 'INSERT INTO resume_downloads (company_name, email) VALUES (?, ?)';
    const [result] = await pool.execute(query, [companyName, email || '']);

    res.status(201).json({ 
      success: true, 
      message: 'Details saved successfully!',
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error saving resume download details:', error);
    res.status(500).json({ error: error.message || 'Failed to save details. Please try again later.' });
  }
});

app.get('/api/resume-downloads', async (req, res) => {
  try {
    const query = 'SELECT * FROM resume_downloads ORDER BY downloaded_at DESC';
    const [rows] = await pool.execute(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching resume downloads:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch details.' });
  }
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
