const ResumeDownload = require('../models/ResumeDownload');

const trackDownload = async (req, res) => {
  try {
    const { companyName, email } = req.body;
    
    if (!companyName) {
      return res.status(400).json({ error: 'Company Name is required' });
    }

    const result = await ResumeDownload.create(companyName, email);

    res.status(201).json({ 
      success: true, 
      message: 'Details saved successfully!',
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error saving resume download details:', error);
    res.status(500).json({ error: error.message || 'Failed to save details. Please try again later.' });
  }
};

const getDownloads = async (req, res) => {
  try {
    const rows = await ResumeDownload.getAll();
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching resume downloads:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch details.' });
  }
};

module.exports = { trackDownload, getDownloads };
