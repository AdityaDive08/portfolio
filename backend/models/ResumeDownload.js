const { pool } = require('../config/db');

class ResumeDownload {
  static async checkIfExists(companyName) {
    const query = 'SELECT id FROM resume_downloads WHERE LOWER(company_name) = ? LIMIT 1';
    const [rows] = await pool.execute(query, [companyName.toLowerCase().trim()]);
    return rows.length > 0;
  }

  static async create(companyName, email) {
    const query = 'INSERT INTO resume_downloads (company_name, email) VALUES (?, ?)';
    const [result] = await pool.execute(query, [companyName, email || '']);
    return result;
  }

  static async getAll() {
    const query = 'SELECT * FROM resume_downloads ORDER BY downloaded_at DESC';
    const [rows] = await pool.execute(query);
    return rows;
  }
}

module.exports = ResumeDownload;
