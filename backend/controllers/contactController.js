const Contact = require('../models/Contact');
const { Resend } = require('resend');

// Initialize Resend with API Key from environment variables
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  return new Resend(apiKey);
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
    const resend = getResendClient();

    // 1. Notification Email to Aditya (You) - contains replyTo set to sender's email
    const notificationEmail = {
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['adityaarundive@gmail.com'],
      replyTo: email,
      subject: `New Contact Request: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4F46E5;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #4F46E5; margin: 0;">
            ${message || 'No message content provided.'}
          </blockquote>
        </div>
      `
    };

    // 2. Auto-reply Email to the Sender
    const autoReplyEmail = {
      from: 'Aditya Dive <onboarding@resend.dev>',
      to: [email],
      subject: `Thank you for reaching out, ${firstName}!`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Hi ${firstName},</h2>
          <p>Thank you for sending a connecting request!</p>
          <p>I have received your message regarding <strong>"${subject}"</strong> and will respond to you as soon as possible.</p>
          <br/>
          <p>Best Regards,<br/><strong>Aditya Dive</strong></p>
        </div>
      `
    };

    try {
      // Send both emails using Resend asynchronously
      const results = await Promise.allSettled([
        resend.emails.send(notificationEmail),
        resend.emails.send(autoReplyEmail)
      ]);

      results.forEach((resItem, idx) => {
        const mailType = idx === 0 ? 'Notification to Aditya' : 'Auto-reply to Sender';
        if (resItem.status === 'fulfilled' && !resItem.value.error) {
          console.log(`✅ Resend: Sent ${mailType} successfully (ID: ${resItem.value.data?.id})`);
        } else {
          const err = resItem.reason || resItem.value?.error;
          console.error(`⚠️ Resend: ${mailType} note/error:`, err);
        }
      });
    } catch (mailErr) {
      console.error(`Error sending emails via Resend: ${mailErr.message}`);
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
