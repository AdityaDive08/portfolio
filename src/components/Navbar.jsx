import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { userData } from '../data';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Certifications', 'Contact'];

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      padding: scrolled ? '15px 8%' : '20px 8%',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      zIndex: 1000,
      background: scrolled ? 'rgba(9, 9, 11, 0.85)' : 'transparent',
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
        {userData.name.split(' ')[0]}<span style={{ color: 'var(--primary-glow)' }}>.</span>
      </a>

      {/* Desktop Nav */}
      <ul style={{ display: 'flex', gap: '30px', margin: 0 }} className="desktop-nav">
        {navLinks.map((link) => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`} style={{ fontSize: '1rem', fontWeight: 500, transition: 'color 0.3s' }}>
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Toggle */}
      <div className="mobile-toggle" style={{ display: 'none', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </div>

      <style>{`
        .desktop-nav a:hover { color: var(--secondary-glow); }
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
              background: 'rgba(9, 9, 11, 0.95)', backdropFilter: 'blur(10px)',
              padding: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            {navLinks.map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                onClick={() => setIsOpen(false)}
                style={{ padding: '15px', fontSize: '1.1rem', fontWeight: 500, width: '100%', textAlign: 'center' }}
              >
                {link}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
