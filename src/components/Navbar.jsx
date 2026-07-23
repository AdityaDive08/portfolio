import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { userData } from '../models/dataModel';
import { submitResumeDownload } from '../services/resumeService';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [resumeForm, setResumeForm] = useState({ companyName: '', email: '' });
  const [resumeLoading, setResumeLoading] = useState(false);
  const [resumeError, setResumeError] = useState('');

  const navLinks = ['Home', 'About', 'Qualification', 'Skills', 'Projects', 'Certifications', 'Contact'];

  const handleResumeDownload = async (e) => {
    e.preventDefault();
    if (!resumeForm.companyName.trim()) {
      setResumeError('Company Name is mandatory');
      return;
    }
    
    setResumeLoading(true);
    setResumeError('');
    try {
      await submitResumeDownload(resumeForm.companyName, resumeForm.email);
      
      // Trigger download
      const link = document.createElement('a');
      link.href = '/AdityaDive_Resume.pdf';
      link.download = 'AdityaDive_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setShowResumeModal(false);
      setResumeForm({ companyName: '', email: '' });
    } catch (err) {
      setResumeError(err.message);
    } finally {
      setResumeLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll Spy Logic
      const sections = navLinks.map(link => link.toLowerCase());
      let currentSection = '';
      
      if (window.scrollY < 100) {
        currentSection = '';
      } else {
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Check if section is currently visible in the upper part of viewport
            if (rect.top <= 150 && rect.bottom >= 150) {
              currentSection = section;
              break;
            }
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      padding: scrolled ? '15px 4%' : '20px 4%',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      zIndex: 1000,
      background: scrolled ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(15px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
      transition: 'all 0.3s ease'
    }}>
      <a href="#" style={{ 
        fontFamily: 'var(--font-heading)', 
        fontSize: '1.8rem', 
        fontWeight: 800,
        opacity: scrolled ? 1 : 0,
        pointerEvents: scrolled ? 'auto' : 'none',
        transition: 'opacity 0.3s ease'
      }}>
        {userData.name}<span style={{ color: 'var(--primary-glow)' }}>.</span>
      </a>

      {/* Desktop Nav */}
      <ul style={{ display: 'flex', gap: '5px', margin: 0, marginLeft: 'auto', alignItems: 'center' }} className="desktop-nav">
        {navLinks.map((link) => {
          const isActive = activeSection === link.toLowerCase();
          return (
            <li key={link}>
              <a 
                href={`#${link.toLowerCase()}`} 
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{ fontSize: '1rem', fontWeight: 500 }}
              >
                {link}
              </a>
            </li>
          );
        })}
        <li>
          <button onClick={() => setShowResumeModal(true)} className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
            Resume
          </button>
        </li>
      </ul>

      {/* Mobile Toggle */}
      <div className="mobile-toggle" style={{ display: 'none', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              background: 'rgba(0, 0, 0, 0.95)', backdropFilter: 'blur(10px)',
              padding: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.toLowerCase();
              return (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase()}`} 
                  onClick={() => setIsOpen(false)}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 500, 
                    width: '90%', 
                    textAlign: 'center',
                    marginBottom: '5px'
                  }}
                >
                  {link}
                </a>
              );
            })}
            <button 
              onClick={() => {
                setIsOpen(false);
                setShowResumeModal(true);
              }}
              className="btn btn-outline"
              style={{ marginTop: '10px', padding: '10px 25px' }}
            >
              Resume
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Modal */}
      {createPortal(
        <AnimatePresence>
          {showResumeModal && (
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
              onClick={() => setShowResumeModal(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                style={{
                  background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.1)',
                  padding: '30px', borderRadius: '20px', textAlign: 'center',
                  maxWidth: '400px', width: '90%'
                }}
                onClick={e => e.stopPropagation()}
              >
                <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Want my Resume?</h3>
                <form onSubmit={handleResumeDownload} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Company Name *</label>
                    <input 
                      type="text" 
                      value={resumeForm.companyName}
                      onChange={(e) => setResumeForm({...resumeForm, companyName: e.target.value})}
                      style={{ 
                        width: '100%', padding: '10px', borderRadius: '8px', 
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff'
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Email (Optional)</label>
                    <input 
                      type="email" 
                      value={resumeForm.email}
                      onChange={(e) => setResumeForm({...resumeForm, email: e.target.value})}
                      style={{ 
                        width: '100%', padding: '10px', borderRadius: '8px', 
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff'
                      }}
                    />
                  </div>
                  {resumeError && (
                    <p style={{ color: '#ff4d4d', fontSize: '0.85rem', margin: '0' }}>{resumeError}</p>
                  )}
                  <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '10px' }}>
                    <button type="button" onClick={() => setShowResumeModal(false)} className="btn btn-outline" disabled={resumeLoading}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={resumeLoading}>
                      {resumeLoading ? 'Loading...' : 'Download'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </nav>
  );
};

export default Navbar;
