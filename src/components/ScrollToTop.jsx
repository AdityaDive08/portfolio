import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="scroll-to-top-btn"
          aria-label="Scroll back to top"
        >
          <ArrowUp size={20} />
          <style>{`
            .scroll-to-top-btn {
              position: fixed;
              bottom: 28px;
              right: 28px;
              width: 46px;
              height: 46px;
              border-radius: 50%;
              background: linear-gradient(135deg, #2563eb, #1d4ed8);
              color: #ffffff;
              border: 1px solid rgba(255, 255, 255, 0.3);
              outline: none;
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
              box-shadow: 0 8px 20px rgba(37, 99, 235, 0.35);
              z-index: 999;
              transition: box-shadow 0.2s ease;
            }
            .scroll-to-top-btn:hover {
              box-shadow: 0 12px 28px rgba(37, 99, 235, 0.45);
            }
          `}</style>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;