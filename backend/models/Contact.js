const { pool } = require('../config/db');

class Contact {
  static async create(name, email, subject, message) {
    const query = 'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)';
    const [result] = await pool.execute(query, [name, email, subject, message || '']);
    return result;
  }
}

module.exports = Contact;
