import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { userData } from '../data';

const Contact = () => {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('sent');
        e.target.reset();
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('idle');
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('idle');
      alert('Failed to send message. Please check if the backend server is running.');
    }
  };

  return (
    <section id="contact" className="section">
      <motion.div 
        className="section-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>Get In <span className="gradient-text">Touch</span></h2>
      </motion.div>
      
      <motion.div 
        className="glass-panel contact-layout"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ display: 'grid', gap: '50px', padding: '50px' }}
      >
        <div>
          <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>Let's Connect..!</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
            {/* I'm currently looking for internship opportunities and freelance projects.  */}
            Whether you have a question or just want to say hi, I'll try my best to get back to you..!
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <div style={{ color: 'var(--primary-glow)', background: 'rgba(37, 99, 235, 0.1)', padding: '12px', borderRadius: '50%' }}>
              <Mail size={24} />
            </div>
            <span>{userData.email}</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <div style={{ color: 'var(--primary-glow)', background: 'rgba(37, 99, 235, 0.1)', padding: '12px', borderRadius: '50%' }}>
              <MapPin size={24} />
            </div>
            <span>{userData.location}</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input type="text" name="name" placeholder="Your Name" required className="contact-input" />
          <input type="email" name="email" placeholder="Your Email" required className="contact-input" />
          <input type="text" name="subject" placeholder="Subject" required className="contact-input" />
          <textarea name="message" rows="5" placeholder="Your Message" required className="contact-input" />
          
          <button 
            type="submit" 
            className="btn btn-outline" 
            disabled={status !== 'idle'}
            style={{ alignSelf: 'flex-start', background: status === 'sent' ? '#10b981' : '' }}
          >
            {status === 'idle' && <><Send size={18} /> Send Message</>}
            {status === 'sending' && 'Sending...'}
            {status === 'sent' && <><CheckCircle size={18} /> Sent Successfully</>}
          </button>
        </form>
      </motion.div>

      <style>{`
        .contact-layout { grid-template-columns: 1fr 1.5fr; }
        @media (max-width: 991px) { .contact-layout { grid-template-columns: 1fr; padding: 30px; } }
        .contact-input {
          width: 100%; padding: 16px 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px; color: var(--text-main);
          font-family: var(--font-body); font-size: 1rem;
          transition: var(--transition);
        }
        .contact-input:focus { outline: none; border-color: var(--primary-glow); background: rgba(255, 255, 255, 0.05); }
      `}</style>
    </section>
  );
};

export default Contact;
