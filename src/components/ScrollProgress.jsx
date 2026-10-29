import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3.5px',
        background: 'linear-gradient(90deg, #1558C9, #38bdf8, #1047a5)',
        transformOrigin: '0%',
        zIndex: 9999,
        boxShadow: '0 1px 8px rgba(21, 88, 201, 0.35)'
      }}
    />
  );
};

export default ScrollProgress;