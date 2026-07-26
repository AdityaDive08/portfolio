const mysql = require('mysql2/promise');
require('dotenv').config();

// Support Railway MySQL env vars (MYSQLHOST, MYSQLUSER, etc.)
// as well as custom DB_HOST, DB_USER, etc.
const pool = mysql.createPool({
  host:     process.env.MYSQLHOST     || process.env.DB_HOST,
  port:     process.env.MYSQLPORT     || process.env.DB_PORT || 3306,
  user:     process.env.MYSQLUSER     || process.env.DB_USER,
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
  database: process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE || process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL database!');
    
    // Create/Fix Contacts Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await connection.query(`ALTER TABLE contacts MODIFY COLUMN message TEXT NULL`);
    await connection.query(`ALTER TABLE contacts MODIFY COLUMN id INT AUTO_INCREMENT`);
    console.log('Contacts table is ready!');

    // Create/Fix Resume Downloads Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS resume_downloads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        company_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Resume downloads table is ready!');
    
    connection.release();
  } catch (err) {
    console.error(`Error connecting to MySQL database: ${err.message}`);
    console.error(`DB Config → host: ${process.env.MYSQLHOST || process.env.DB_HOST}, user: ${process.env.MYSQLUSER || process.env.DB_USER}, db: ${process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE || process.env.DB_NAME}`);
    process.exit(1); // Crash loudly so Railway shows the error in logs
  }
};

module.exports = { pool, initializeDatabase };
