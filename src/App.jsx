import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import './styles/index.css';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    // Force scroll to top on page reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <ScrollToTop />
      
      {/* Refined White & Blue Footer */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-left">
            <span className="footer-logo">AD<span className="dot">.</span></span>
            <p className="footer-text">
              &copy; {new Date().getFullYear()} Designed &amp; Developed by <strong>Aditya Dive</strong>.
            </p>
          </div>
          <div className="footer-right">
            <p className="footer-subtext">Crafted with modern React &amp; clean design principles</p>
          </div>
        </div>
        <style>{`
          .site-footer {
            background: #ffffff;
            border-top: 1px solid #e2e8f0;
            padding: 32px 8%;
            margin-top: 40px;
          }
          .footer-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap;
          }
          .footer-left {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .footer-logo {
            font-family: var(--font-heading);
            font-weight: 800;
            font-size: 1.1rem;
            color: var(--text-main);
          }
          .footer-logo .dot {
            color: var(--primary-blue);
          }
          .footer-text {
            color: var(--text-muted);
            font-size: 0.9rem;
            margin: 0;
          }
          .footer-text strong {
            color: var(--text-main);
            font-weight: 600;
          }
          .footer-subtext {
            color: var(--text-light);
            font-size: 0.85rem;
            margin: 0;
          }
          @media (max-width: 640px) {
            .footer-container {
              flex-direction: column;
              text-align: center;
              justify-content: center;
            }
            .footer-left {
              flex-direction: column;
              gap: 6px;
            }
          }
        `}</style>
      </footer>
    </>
  );
}

export default App;