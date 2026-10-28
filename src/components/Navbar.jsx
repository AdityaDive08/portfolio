import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, FileText, ChevronRight, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { userData } from '../models/dataModel';
import { submitResumeDownload } from '../services/resumeService';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [resumeForm, setResumeForm] = useState({ companyName: '', email: '' });
  const [resumeLoading, setResumeLoading] = useState(false);
  const [resumeError, setResumeError] = useState('');

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Qualification', id: 'qualification' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Certifications', id: 'certifications' },
    { name: 'Contact', id: 'contact' },
  ];

  const closeResumeModal = () => {
    setShowResumeModal(false);
    setResumeForm({ companyName: '', email: '' });
    setResumeError('');
    setResumeLoading(false);
  };

  const handleResumeDownload = async (e) => {
    e.preventDefault();
    const trimmedCompanyName = resumeForm.companyName.trim();
    if (!trimmedCompanyName) {
      setResumeError('Company Name is mandatory');
      return;
    }
    
    // Check client browser side (localStorage)
    const downloadedCompanies = JSON.parse(localStorage.getItem('downloaded_companies') || '[]');
    if (downloadedCompanies.map(c => c.toLowerCase()).includes(trimmedCompanyName.toLowerCase())) {
      setResumeError('Resume already present with this company name');
      return;
    }
    
    setResumeLoading(true);
    setResumeError('');
    try {
      await submitResumeDownload(trimmedCompanyName, resumeForm.email);
      
      downloadedCompanies.push(trimmedCompanyName);
      localStorage.setItem('downloaded_companies', JSON.stringify(downloadedCompanies));

      const link = document.createElement('a');
      link.href = '/AdityaDive_Resume.pdf';
      link.download = 'AdityaDive_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      closeResumeModal();
    } catch (err) {
      setResumeError(err.message || 'Error processing download');
    } finally {
      setResumeLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // Scroll Spy Logic
      const sections = navLinks.map(link => link.id);
      let current = 'home';
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 120) {
            current = sectionId;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Full-width screen-fit navbar */}
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-inner">
          {/* Brand Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, 'home')}
            className="navbar-brand"
          >
            <span className="brand-name">
              {userData.name}
              <span className="brand-dot">.</span>
            </span>
          </a>

          {/* Desktop Nav Links (No horizontal scroller, fits screen cleanly) */}
          <nav className="desktop-navigation">
            <ul className="nav-items-list">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id} className="nav-item">
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleLinkClick(e, link.id)}
                      className={`nav-anchor ${isActive ? 'is-active' : ''}`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavBackground"
                          className="active-nav-pill"
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        />
                      )}
                      <span className="nav-text">{link.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions: Resume + Mobile Hamburger */}
          <div className="navbar-actions">
            <button 
              onClick={() => setShowResumeModal(true)} 
              className="navbar-resume-btn"
              title="Download Aditya's Resume"
            >
              <Download size={15} />
              <span>Resume</span>
            </button>

            <button 
              className="mobile-toggle-btn" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Screen fit) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="mobile-menu-drawer"
            >
              <div className="mobile-menu-content">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={(e) => handleLinkClick(e, link.id)}
                      className={`mobile-menu-link ${isActive ? 'is-active' : ''}`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight size={16} className="mobile-chevron" />
                    </a>
                  );
                })}
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    setShowResumeModal(true);
                  }}
                  className="btn btn-primary mobile-resume-action"
                >
                  <Download size={16} />
                  <span>Download Resume</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Resume Modal */}
      {createPortal(
        <AnimatePresence>
          {showResumeModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-scrim"
              onClick={closeResumeModal}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="modal-card"
                onClick={e => e.stopPropagation()}
              >
                <div className="modal-header">
                  <div className="modal-icon-badge">
                    <FileText size={24} />
                  </div>
                  <h3>Download Resume</h3>
                  <p>Please enter your details to view or download my professional resume.</p>
                </div>

                <form onSubmit={handleResumeDownload} className="modal-form">
                  <div className="form-group">
                    <label>
                      Company / Organization Name <span className="required-star">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Google, Aquil Tech, or Individual"
                      value={resumeForm.companyName}
                      onChange={(e) => setResumeForm({...resumeForm, companyName: e.target.value})}
                      className="form-control"
                      required
                      autoFocus
                    />
                  </div>

                  <div className="form-group">
                    <label>Work Email <span className="optional-tag">(optional)</span></label>
                    <input 
                      type="email" 
                      placeholder="name@company.com"
                      value={resumeForm.email}
                      onChange={(e) => setResumeForm({...resumeForm, email: e.target.value})}
                      className="form-control"
                    />
                  </div>

                  {resumeError && (
                    <div className="form-error-box">
                      {resumeError}
                    </div>
                  )}

                  <div className="modal-actions">
                    <button 
                      type="button" 
                      onClick={closeResumeModal} 
                      className="btn btn-outline" 
                      disabled={resumeLoading}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      disabled={resumeLoading}
                    >
                      {resumeLoading ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Download size={16} />
                          Download PDF
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Styled Scoped CSS for Screen-fit Navbar */}
      <style>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 1000;
          background: rgba(248, 250, 252, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid transparent;
          transition: all 0.25s ease;
        }

        .site-header.is-scrolled {
          background: rgba(255, 255, 255, 0.95);
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05);
        }

        .header-inner {
          max-width: 1240px;
          margin: 0 auto;
          width: 100%;
          padding: 18px 5%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          transition: padding 0.25s ease;
        }

        .site-header.is-scrolled .header-inner {
          padding: 13px 5%;
        }

        /* Brand */
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .brand-name {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.25rem;
          color: var(--text-main);
          letter-spacing: -0.02em;
        }

        .brand-dot {
          color: var(--primary-blue);
        }

        /* Desktop Nav List (Screen-fit, neatly centered/aligned) */
        .desktop-navigation {
          display: flex;
          align-items: center;
        }

        .nav-items-list {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          display: inline-block;
        }

        .nav-anchor {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 8px 14px;
          border-radius: 9999px;
          color: var(--text-secondary);
          font-size: 0.92rem;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .nav-anchor:hover {
          color: var(--primary-blue);
        }

        .nav-anchor.is-active {
          color: #ffffff !important;
          font-weight: 600;
        }

        .active-nav-pill {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          box-shadow: 0 3px 10px rgba(37, 99, 235, 0.3);
          z-index: 0;
        }

        .nav-text {
          position: relative;
          z-index: 1;
        }

        /* Right actions */
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .navbar-resume-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 18px;
          border-radius: 9999px;
          background: #eff6ff;
          color: var(--primary-blue);
          border: 1.5px solid #bfdbfe;
          font-family: var(--font-body);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .navbar-resume-btn:hover {
          background: var(--gradient-accent);
          color: #ffffff;
          border-color: transparent;
          transform: translateY(-1.5px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .mobile-toggle-btn {
          display: none;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: var(--text-main);
          width: 38px;
          height: 38px;
          border-radius: 10px;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mobile-toggle-btn:hover {
          background: #eff6ff;
          color: var(--primary-blue);
        }

        /* Mobile Drawer */
        .mobile-menu-drawer {
          overflow: hidden;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08);
        }

        .mobile-menu-content {
          padding: 16px 5% 24px 5%;
          display: flex;
          flex-direction: column;
          gap: 4px;
          max-width: 1240px;
          margin: 0 auto;
        }

        .mobile-menu-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .mobile-menu-link:hover,
        .mobile-menu-link.is-active {
          background: #eff6ff;
          color: var(--primary-blue);
          font-weight: 600;
        }

        .mobile-chevron {
          color: var(--text-light);
        }

        .mobile-resume-action {
          margin-top: 12px;
          width: 100%;
          justify-content: center;
          padding: 12px;
        }

        /* Modal Styles */
        .modal-scrim {
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

        .modal-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 32px;
          width: 100%;
          max-width: 440px;
          box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.2);
          text-align: left;
        }

        .modal-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .modal-icon-badge {
          width: 54px;
          height: 54px;
          border-radius: 16px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          color: var(--primary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px auto;
        }

        .modal-header h3 {
          font-size: 1.45rem;
          color: var(--text-main);
          margin-bottom: 8px;
        }

        .modal-header p {
          color: var(--text-muted);
          font-size: 0.92rem;
          line-height: 1.5;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-group label {
          display: block;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 6px;
        }

        .required-star {
          color: var(--primary-blue);
        }

        .optional-tag {
          font-weight: 400;
          color: var(--text-light);
          font-size: 0.8rem;
        }

        .form-control {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1.5px solid #cbd5e1;
          background: #f8fafc;
          color: var(--text-main);
          font-family: var(--font-body);
          font-size: 0.95rem;
          transition: all 0.2s ease;
          outline: none;
        }

        .form-control:focus {
          border-color: var(--primary-blue);
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
        }

        .form-error-box {
          padding: 10px 14px;
          border-radius: 10px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .modal-actions .btn {
          flex: 1;
          padding: 11px 18px;
        }

        /* Responsive Breakpoints */
        @media (max-width: 960px) {
          .nav-anchor {
            padding: 7px 10px;
            font-size: 0.86rem;
          }
        }

        @media (max-width: 860px) {
          .desktop-navigation {
            display: none;
          }
          .navbar-resume-btn {
            display: none;
          }
          .mobile-toggle-btn {
            display: flex;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;