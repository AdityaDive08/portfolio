import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Library, School, BookOpen } from 'lucide-react';
import { userData } from '../data';

// Helper to get the correct icon component
const getIcon = (iconName) => {
  switch (iconName) {
    case 'GraduationCap': return <GraduationCap size={32} />;
    case 'Library': return <Library size={32} />;
    case 'School': return <School size={32} />;
    case 'BookOpen': return <BookOpen size={32} />;
    default: return <GraduationCap size={32} />;
  }
};

const Qualification = () => {
  return (
    <section id="qualification" className="section">
      <motion.div 
        className="section-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>My <span className="gradient-text">Qualification</span></h2>
      </motion.div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {userData.education.map((edu, idx) => (
          <motion.div 
            key={idx}
            className="glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            style={{ padding: '30px', transition: 'var(--transition)' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <div style={{ padding: '15px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '15px', color: 'var(--primary-glow)' }}>
                {getIcon(edu.icon)}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{edu.degree}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '15px', fontWeight: 500 }}>{edu.institution}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Qualification;
