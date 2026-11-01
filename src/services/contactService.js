import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const submitContactForm = async (data) => {
  let emailjsResponse = null;

  // 1. Send email directly through EmailJS
  if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
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

    try {
      emailjsResponse = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    } catch (err) {
      console.error('EmailJS send error:', err);
      throw new Error(err?.text || 'Failed to send message via EmailJS. Please check your credentials.');
    }
  }

  // 2. Also save to Database (backend API) if available
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (dbErr) {
    console.warn('Backend database not reachable, but email was sent via EmailJS:', dbErr);
  }

  return emailjsResponse || { success: true };
};
