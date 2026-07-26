const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Create Nodemailer Transporter with explicit IPv4 and SSL settings for Railway compatibility
const getTransporter = () => {
  const user = process.env.EMAIL_USER;
  // Automatically strip spaces from App Password (e.g. "snyu jgta psuw cojw" -> "snyujgtapsuwcojw")
  const pass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '';

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL port 465
    auth: { user, pass },
    family: 4, // CRITICAL FOR RAILWAY: Force IPv4 connection to prevent IPv6 DNS timeouts on cloud servers
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

    // 1. Save to Database
    const result = await Contact.create(name, email, subject, message);

    // Extract first name for a friendly greeting
    const firstName = name.split(' ')[0];
    const emailUser = process.env.EMAIL_USER;

    // 2. Prepare Notification Email (Sent to Aditya)
    const mailToAditya = {
      from: `"${name}" <${emailUser}>`,
      to: emailUser,
      replyTo: email, // Directly reply to visitor from Gmail
      subject: `New Contact Request: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #2563eb;">New Portfolio Contact Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f3f4f6; padding: 15px; border-left: 4px solid #2563eb; margin: 0; white-space: pre-wrap;">${message || 'No message content provided.'}</blockquote>
        </div>
      `
    };

    // 3. Prepare Auto-Reply Email (Sent to Visitor)
    const mailToSender = {
      from: `"Aditya Dive" <${emailUser}>`,
      to: email,
      subject: `Thank you for reaching out, ${firstName}!`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2>Hi ${firstName},</h2>
          <p>Thank you for sending a connecting request!</p>
          <p>I have received your message regarding <strong>"${subject}"</strong> and will respond to you soon.</p>
          <br/>
          <p>Best Regards,<br/><strong>Aditya Dive</strong></p>
        </div>
      `
    };

    // 4. Send Emails via Nodemailer
    try {
      const transporter = getTransporter();
      
      const results = await Promise.allSettled([
        transporter.sendMail(mailToAditya),
        transporter.sendMail(mailToSender)
      ]);

      results.forEach((resItem, idx) => {
        const mailType = idx === 0 ? 'Notification to Aditya' : `Auto-reply to ${email}`;
        if (resItem.status === 'fulfilled') {
          console.log(`✅ Nodemailer: Sent ${mailType} successfully! (Response: ${resItem.value.response})`);
        } else {
          console.error(`❌ Nodemailer: Failed sending ${mailType}:`, resItem.reason?.message || resItem.reason);
        }
      });
    } catch (mailErr) {
      console.error(`Error executing Nodemailer sendMail: ${mailErr.message}`);
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
