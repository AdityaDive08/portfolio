import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_7ts3xp2';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_a5z8bja';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'iNKwFYRRGmya5zuTv';

export const submitContactForm = async (data) => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('Email service is not configured. Please check your EmailJS credentials.');
  }

  const templateParams = {
    name: data.name,
    from_name: data.name,
    email: data.email,
    from_email: data.email,
    reply_to: data.email,
    title: data.subject || 'New Portfolio Inquiry',
    subject: data.subject || 'New Portfolio Inquiry',
    message: data.message,
    time: new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  };

  // 1. Send email directly through EmailJS
  let emailjsResponse;
  try {
    emailjsResponse = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
  } catch (err) {
    console.error('EmailJS send error:', err);
    const errorText = err?.text || err?.message || (typeof err === 'string' ? err : 'Failed to send message via EmailJS. Please try again.');
    throw new Error(errorText);
  }

  // 2. Also record to Database (backend API) if available (non-blocking)
  const API_URL = import.meta.env.VITE_API_URL;
  if (API_URL) {
    try {
      await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (dbErr) {
      console.warn('Backend database not reachable, but email was successfully sent via EmailJS:', dbErr);
    }
  }

  return emailjsResponse;
};
