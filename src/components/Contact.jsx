import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, Phone } from 'lucide-react';
import { userData } from '../models/dataModel';
import { submitContactForm } from '../services/contactService';

const Contact = () => {
  const [status, setStatus] = useState('idle');
  const [showThankYou, setShowThankYou] = useState(false);

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
      await submitContactForm(data);

      if (true) {
        setStatus('sent');
        e.target.reset();
        setShowThankYou(true);
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('idle');
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('idle');
      alert(`Error: ${error.message}`);
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
            I'm currently looking for job opportunities and freelance projects. 
            Whether you have a question or just want to say hi,
            I'll try my best to get back to you..!
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <div style={{ color: 'var(--primary-glow)', background: 'rgba(37, 99, 235, 0.1)', padding: '12px', borderRadius: '50%' }}>
              <Mail size={24} />
            </div>
            <span>{userData.email}</span>
          </div>
          
          {userData.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div style={{ color: 'var(--primary-glow)', background: 'rgba(37, 99, 235, 0.1)', padding: '12px', borderRadius: '50%' }}>
                <Phone size={24} />
              </div>
              <span>{userData.phone}</span>
            </div>
          )}
          
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
          <textarea name="message" rows="5" placeholder="Your Message" className="contact-input" />
          
          <button 
            type="submit" 
            className="btn btn-outline" 
            disabled={status !== 'idle'}
            style={{ alignSelf: 'center', background: status === 'sent' ? '#10b981' : '' }}
          >
            {status === 'idle' && <><Send size={18} /> Send Message</>}
            {status === 'sending' && 'Sending...'}
            {status === 'sent' && <><CheckCircle size={18} /> Sent Successfully</>}
          </button>
        </form>
      </motion.div>

      {/* Thank You Modal */}
      {createPortal(
        <AnimatePresence>
          {showThankYou && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(5px)',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                zIndex: 2000
              }}
              onClick={() => setShowThankYou(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                style={{
                  background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.1)',
                  padding: '40px 30px', borderRadius: '20px', textAlign: 'center',
                  maxWidth: '400px', width: '90%', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: '20px'
                }}
                onClick={e => e.stopPropagation()}
              >
                <div style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '20px', borderRadius: '50%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CheckCircle size={48} />
                </div>
                <h3 style={{ fontSize: '1.8rem', margin: 0, color: 'var(--text-main)' }}>Thank You!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: 0, lineHeight: 1.5 }}>
                  Your response has been saved successfully. I will get back to you soon!
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '10px' }}>
                  <button 
                    onClick={() => setShowThankYou(false)} 
                    className="btn btn-primary"
                    style={{ minWidth: '120px', alignSelf: 'center' }}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

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
