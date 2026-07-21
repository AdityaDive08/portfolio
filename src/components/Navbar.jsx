import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { userData } from '../data';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = ['Home', 'About', 'Qualification', 'Skills', 'Projects', 'Certifications', 'Contact'];

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
          <a href="/Aditya_Dive_Resume.pdf" download="Aditya_Dive_Resume.pdf" className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
            Resume
          </a>
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
            <a 
              href="/Aditya_Dive_Resume.pdf" 
              download="Aditya_Dive_Resume.pdf" 
              onClick={() => setIsOpen(false)}
              className="btn btn-outline"
              style={{ marginTop: '10px', padding: '10px 25px' }}
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
