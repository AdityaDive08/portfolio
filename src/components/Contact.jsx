import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, Phone, Clock, ArrowRight } from 'lucide-react';
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
      setStatus('sent');
      e.target.reset();
      setShowThankYou(true);
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error:', error);
      setStatus('idle');
      alert(`Error sending message: ${error.message}`);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <motion.div 
        className="section-heading"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>Get In <span className="gradient-text">Touch</span></h2>
        <p className="section-subheading">Have an opportunity, question, or project? Let's connect!</p>
      </motion.div>
      
      <motion.div 
        className="contact-card glass-panel"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Column: Contact Info */}
        <div className="contact-info-col">
          <div className="contact-info-header">
            <h3>Let's build something great together</h3>
            <p>
              I'm actively seeking software developer opportunities and challenging web development projects. Feel free to reach out directly or drop a message via the form!
            </p>
          </div>
          
          <div className="contact-details-list">
            <a href={`mailto:${userData.email}`} className="contact-detail-item">
              <div className="contact-icon-box">
                <Mail size={20} />
              </div>
              <div className="contact-detail-text">
                <span className="detail-label">Email Me</span>
                <span className="detail-value">{userData.email}</span>
              </div>
            </a>
            
            {userData.phone && (
              <a href={`tel:${userData.phone}`} className="contact-detail-item">
                <div className="contact-icon-box">
                  <Phone size={20} />
                </div>
                <div className="contact-detail-text">
                  <span className="detail-label">Call / WhatsApp</span>
                  <span className="detail-value">{userData.phone}</span>
                </div>
              </a>
            )}
            
            <div className="contact-detail-item">
              <div className="contact-icon-box">
                <MapPin size={20} />
              </div>
              <div className="contact-detail-text">
                <span className="detail-label">Location</span>
                <span className="detail-value">{userData.location}</span>
              </div>
            </div>

            <div className="contact-detail-item">
              <div className="contact-icon-box">
                <Clock size={20} />
              </div>
              <div className="contact-detail-text">
                <span className="detail-label">Response Time</span>
                <span className="detail-value">Usually within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column: Contact Form */}
        <div className="contact-form-col">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="input-group">
                <label>Your Name <span className="req">*</span></label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="e.g. John Doe" 
                  required 
                  className="contact-field" 
                />
              </div>
              <div className="input-group">
                <label>Your Email <span className="req">*</span></label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="name@example.com" 
                  required 
                  className="contact-field" 
                />
              </div>
            </div>

            <div className="input-group">
              <label>Subject <span className="req">*</span></label>
              <input 
                type="text" 
                name="subject" 
                placeholder="Job Opportunity / Project Collaboration" 
                required 
                className="contact-field" 
              />
            </div>

            <div className="input-group">
              <label>Message <span className="req">*</span></label>
              <textarea 
                name="message" 
                rows="5" 
                placeholder="Hi Aditya, I came across your portfolio and would like to talk about..." 
                required
                className="contact-field contact-textarea" 
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary submit-btn" 
              disabled={status !== 'idle'}
            >
              {status === 'idle' && (
                <>
                  <Send size={17} />
                  <span>Send Message</span>
                </>
              )}
              {status === 'sending' && (
                <span>Sending Message...</span>
              )}
              {status === 'sent' && (
                <>
                  <CheckCircle size={17} />
                  <span>Message Sent!</span>
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>

      {/* Thank You Modal */}
      {createPortal(
        <AnimatePresence>
          {showThankYou && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="thankyou-modal-scrim"
              onClick={() => setShowThankYou(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="thankyou-modal-card"
                onClick={e => e.stopPropagation()}
              >
                <div className="thankyou-icon-circle">
                  <CheckCircle size={44} />
                </div>
                <h3>Message Received!</h3>
                <p>
                  Thank you for reaching out. Your response has been securely saved, and I will get back to you as soon as possible.
                </p>
                <button 
                  onClick={() => setShowThankYou(false)} 
                  className="btn btn-primary thankyou-close-btn"
                >
                  Awesome, thanks!
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <style>{`
        .contact-card {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: 48px;
          padding: 48px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          box-shadow: 0 10px 40px -10px rgba(15, 23, 42, 0.06);
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }

        .contact-info-header h3 {
          font-size: 1.85rem;
          color: var(--text-main);
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .contact-info-header p {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.65;
          margin-bottom: 30px;
        }

        .contact-details-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-detail-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          text-decoration: none;
          color: inherit;
          transition: all 0.2s ease;
        }

        .contact-detail-item:hover {
          background: #eff6ff;
          border-color: #bfdbfe;
          transform: translateX(4px);
        }

        .contact-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          color: var(--primary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .contact-detail-text {
          display: flex;
          flex-direction: column;
        }

        .detail-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-value {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-main);
        }

        /* Form Column */
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-group label {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .req {
          color: var(--primary-blue);
        }

        .contact-field {
          width: 100%;
          padding: 13px 18px;
          background: #f8fafc;
          border: 1.5px solid #cbd5e1;
          border-radius: 12px;
          color: var(--text-main);
          font-family: var(--font-body);
          font-size: 0.95rem;
          transition: all 0.2s ease;
          outline: none;
        }

        .contact-field:focus {
          border-color: var(--primary-blue);
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
        }

        .contact-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          margin-top: 6px;
          padding: 13px 28px;
          align-self: flex-start;
        }

        /* Modal Styles */
        .thankyou-modal-scrim {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }

        .thankyou-modal-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 40px 32px;
          text-align: center;
          max-width: 420px;
          width: 100%;
          box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .thankyou-icon-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #16a34a;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .thankyou-modal-card h3 {
          font-size: 1.6rem;
          color: var(--text-main);
          margin: 0;
        }

        .thankyou-modal-card p {
          color: var(--text-muted);
          font-size: 0.96rem;
          line-height: 1.6;
          margin: 0;
        }

        .thankyou-close-btn {
          margin-top: 8px;
          min-width: 180px;
        }

        @media (max-width: 900px) {
          .contact-card {
            grid-template-columns: 1fr;
            padding: 32px 24px;
            gap: 36px;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
          .submit-btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;