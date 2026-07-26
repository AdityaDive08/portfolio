const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Nodemailer Transporter Setup
const getTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '';
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
    connectionTimeout: 10000
  });
};

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
    const emailUser = process.env.EMAIL_USER;

    // Send Auto-reply to the Sender
    const mailToSender = {
      from: `"${emailUser}" <${emailUser}>`,
      to: email,
      subject: `Thank you for reaching out, ${firstName}!`,
      text: `Hi ${firstName},\n\nThank you for sending a connecting request!\n\nI have received your message regarding "${subject}" and will respond to you soon.\n\nBest Regards,\nAditya Dive`
    };

    // Send Notification to Aditya (You)
    const mailToAditya = {
      from: `"${emailUser}" <${emailUser}>`,
      to: emailUser,
      subject: `New Contact Request: ${subject}`,
      text: `You have a new contact request from your portfolio.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    };

    try {
      const transporter = getTransporter();
      // Send both emails asynchronously in parallel with logging
      const results = await Promise.allSettled([
        transporter.sendMail(mailToSender),
        transporter.sendMail(mailToAditya)
      ]);

      results.forEach((res, idx) => {
        const mailType = idx === 0 ? 'auto-reply' : 'notification';
        if (res.status === 'fulfilled') {
          console.log(`✅ Sent ${mailType} successfully: ${res.value.messageId}`);
        } else {
          console.error(`❌ Failed sending ${mailType}:`, res.reason);
        }
      });
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
