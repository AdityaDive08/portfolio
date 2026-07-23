import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { userData } from '../models/dataModel';

const Certifications = () => {
  return (
    <section id="certifications" className="section">
      <motion.div 
        className="section-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>My <span className="gradient-text">Certifications & Publications</span></h2>
      </motion.div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        {userData.certifications.map((cert, idx) => (
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
                <Award size={32} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{cert.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '15px', fontWeight: 500 }}>{cert.issuer}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <Calendar size={14} />
                    {cert.date}
                  </div>
                  {cert.link && cert.link !== '#' && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--secondary-glow)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
                      View <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
