const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Create Nodemailer Transporter with explicit IPv4 and SSL settings for Railway deployment
const getTransporter = () => {
  const user = process.env.EMAIL_USER || 'adityaarundive@gmail.com';
  // Strip spaces from App Password (e.g. "snyu jgta psuw cojw" -> "snyujgtapsuwcojw")
  const pass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '';

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL
    auth: { user, pass },
    family: 4, // Force IPv4 to prevent IPv6 DNS timeouts on cloud servers
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000
  });
};

const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !subject) {
      return res.status(400).json({ error: 'Name, email, and subject are required' });
    }

    // 1. Save contact request to Database
    const result = await Contact.create(name, email, subject, message);

    const recipientEmail = process.env.EMAIL_USER || 'adityaarundive@gmail.com';

    // 2. Prepare Single Incoming Request Notification Email to Aditya
    const mailToAditya = {
      from: `"Portfolio Contact Form" <${recipientEmail}>`,
      to: recipientEmail,
      replyTo: email, // Click Reply in Gmail to respond directly to the sender
      subject: `New Contact Request: ${subject}`,
      text: `You have received a new contact request from your portfolio.\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Subject: ${subject}\n\n` +
            `Message:\n${message || 'No message provided.'}\n`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; color: #1f2937;">
          <h2 style="color: #2563eb; margin-top: 0;">New Incoming Contact Request</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 100px; color: #4b5563;">Name:</td>
              <td style="padding: 8px 0; color: #111827;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Subject:</td>
              <td style="padding: 8px 0; color: #111827;">${subject}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-weight: bold; color: #4b5563; margin-bottom: 8px;">Message:</p>
          <div style="background: #f9fafb; padding: 16px; border-left: 4px solid #2563eb; border-radius: 4px; white-space: pre-wrap; color: #374151;">${message || 'No message content provided.'}</div>
        </div>
      `
    };

    // 3. Send Notification Email
    try {
      const transporter = getTransporter();
      const info = await transporter.sendMail(mailToAditya);
      console.log(`✅ Notification Email Sent to Aditya! ID: ${info.messageId} | Response: ${info.response}`);
    } catch (mailErr) {
      console.error(`❌ Error sending notification email via Nodemailer: ${mailErr.message}`, mailErr);
    }

    // Return HTTP 201 response to client
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
