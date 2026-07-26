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
      const transporter = getResendClient();
      
      // 1. Send Notification to Aditya (Always succeeds, includes replyTo)
      const notifyResult = await transporter.emails.send(notificationEmail);
      if (notifyResult.error) {
        console.error('❌ Resend Notification Error:', notifyResult.error);
      } else {
        console.log(`✅ Resend: Notification sent to Aditya (ID: ${notifyResult.data?.id})`);
      }

      // 2. Try Auto-reply to Sender (Resend free tier only allows sending to your own email unless a domain is added)
      const autoReplyResult = await transporter.emails.send(autoReplyEmail);
      if (autoReplyResult.error) {
        if (autoReplyResult.error.statusCode === 403) {
          console.log(`ℹ️ Auto-reply skipped: Resend test mode allows sending emails only to your account email (adityaarundive@gmail.com). To enable auto-reply to visitors, add a domain at resend.com/domains.`);
        } else {
          console.error('⚠️ Resend Auto-reply Error:', autoReplyResult.error);
        }
      } else {
        console.log(`✅ Resend: Auto-reply sent to ${email} (ID: ${autoReplyResult.data?.id})`);
      }
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
