const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const dns = require('dns');

// Custom DNS lookup that strictly forces IPv4 (family: 4) to fix Railway's ENETUNREACH IPv6 issue
const forceIPv4Lookup = (hostname, options, callback) => {
  return dns.lookup(hostname, { family: 4 }, callback);
};

// Create Nodemailer Transporter strictly forced to IPv4
const getTransporter = () => {
  const user = process.env.EMAIL_USER || 'adityaarundive@gmail.com';
  // Strip spaces from App Password (e.g. "snyu jgta psuw cojw" -> "snyujgtapsuwcojw")
  const pass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '';

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL
    auth: { user, pass },
    lookup: forceIPv4Lookup, // CRITICAL FIX: Forces DNS resolution to return IPv4 only (bypasses Railway IPv6 ENETUNREACH)
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

    // 3. Prepare Confirmation Auto-Reply Email to Viewer
    const mailToViewer = {
      from: 'Aditya Dive <onboarding@resend.dev>',
      to: [email],
      subject: `Thank you for contacting me, ${name}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; color: #1f2937;">
          <h2 style="color: #2563eb; margin-top: 0;">Thank You for Reaching Out!</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>I have received your message regarding <strong>"${subject}"</strong>. Thank you for connecting with me!</p>
          <p>I will review your message and respond as soon as possible.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="color: #4b5563; margin-bottom: 0;">Best regards,<br/><strong>Aditya Dive</strong><br/><a href="mailto:${recipientEmail}" style="color: #2563eb;">${recipientEmail}</a></p>
        </div>
      `,
      text: `Hi ${name},\n\nThank you for reaching out regarding "${subject}". I have received your message and will get back to you as soon as possible.\n\nBest regards,\nAditya Dive`
    };

    // 4. Send Notification Email & Viewer Auto-Reply using Resend API (Primary) or Nodemailer SMTP (Fallback)
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = require('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        // A. Send Notification to Aditya
        const { data: adminData, error: adminError } = await resend.emails.send({
          from: `${name} <onboarding@resend.dev>`,
          to: [recipientEmail],
          replyTo: email,
          subject: mailToAditya.subject,
          html: mailToAditya.html,
          text: mailToAditya.text
        });

        if (adminError) {
          console.error(`❌ Resend Admin Email Error: ${adminError.message || JSON.stringify(adminError)}`);
        } else {
          console.log(`✅ Notification Email Sent to Aditya via Resend API! ID: ${adminData?.id}`);
        }

        // B. Send Auto-Reply to Viewer
        const { data: viewerData, error: viewerError } = await resend.emails.send({
          from: 'Aditya Dive <onboarding@resend.dev>',
          to: [email],
          subject: mailToViewer.subject,
          html: mailToViewer.html,
          text: mailToViewer.text
        });

        if (viewerError) {
          console.error(`❌ Resend Viewer Auto-Reply Note/Error: ${viewerError.message || JSON.stringify(viewerError)}`);
        } else {
          console.log(`✅ Auto-Reply Email Sent to Viewer (${email})! ID: ${viewerData?.id}`);
        }
      } catch (resendErr) {
        console.error(`❌ Resend Exception: ${resendErr.message}`);
      }
    } else {
      try {
        const transporter = getTransporter();
        const info = await transporter.sendMail(mailToAditya);
        console.log(`✅ Notification Email Sent to Aditya! ID: ${info.messageId} | Response: ${info.response}`);
        
        // Try auto-reply via Nodemailer
        try {
          await transporter.sendMail({
            from: `"Aditya Dive" <${recipientEmail}>`,
            to: email,
            subject: mailToViewer.subject,
            html: mailToViewer.html,
            text: mailToViewer.text
          });
          console.log(`✅ Auto-Reply Sent to Viewer via Nodemailer!`);
        } catch (viewerMailErr) {
          console.error(`❌ Viewer Auto-Reply via Nodemailer failed: ${viewerMailErr.message}`);
        }
      } catch (mailErr) {
        console.error(`❌ Port 465 Failed: ${mailErr.message}. Retrying on Port 587...`);
        try {
          const user = process.env.EMAIL_USER || 'adityaarundive@gmail.com';
          const pass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '';
          const fallbackTransporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // STARTTLS
            auth: { user, pass },
            lookup: forceIPv4Lookup,
            connectionTimeout: 15000
          });
          const fallbackInfo = await fallbackTransporter.sendMail(mailToAditya);
          console.log(`✅ Notification Email Sent to Aditya via Port 587 Fallback! ID: ${fallbackInfo.messageId}`);
        } catch (fallbackErr) {
          console.error(`❌ Fallback Port 587 also failed: ${fallbackErr.message}`);
        }
      }
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
