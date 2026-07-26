const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !subject) {
      return res.status(400).json({ error: 'Name, email, and subject are required' });
    }

    // Save to Database
    const result = await Contact.create(name, email, subject, message);

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
      to: process.env.EMAIL_USER,
      subject: `New Contact Request: ${subject}`,
      text: `You have a new contact request from your portfolio.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    };

    try {
      // Send both emails asynchronously
      transporter.sendMail(mailToSender).catch(err => console.error(`Error sending auto-reply: ${err.message}`));
      transporter.sendMail(mailToAditya).catch(err => console.error(`Error sending notification: ${err.message}`));
    } catch (mailErr) {
      console.error(`Error initiating email sending: ${mailErr.message}`);
    }

    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully!',
      id: result.insertId 
    });
  } catch (error) {
    console.error(`Error saving contact: ${error.message}`);
    res.status(500).json({ error: error.message || 'Failed to send message. Please try again later.' });
  }
};

module.exports = { submitContact };
