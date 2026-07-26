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
    console.error(`Error saving resume download details: ${error.message}`);
    res.status(500).json({ error: error.message || 'Failed to save details. Please try again later.' });
  }
};

module.exports = { trackDownload };
