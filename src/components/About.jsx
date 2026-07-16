import React from 'react';
import { motion } from 'framer-motion';
import { userData } from '../data';

const About = () => {
  return (
    <section id="about" className="section">
      <motion.div 
        className="section-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>About <span className="gradient-text">Me</span></h2>
      </motion.div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>My Journey in Tech</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '20px' }}>
            Currently pursuing my Master's Degree in Information Technology, I have developed a strong foundation in computer science principles and software development. I am constantly exploring new technologies and building projects to skillsUp.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '40px' }}>
            When I'm not coding, I enjoy participating in hackathons, contributing to open-source projects, and reading about the latest tech trends in artificial intelligence and web architecture.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
            {userData.stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="glass-panel stat-box"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                style={{ padding: '20px 30px', transition: 'var(--transition)' }}
              >
                <h4 style={{ fontSize: '2.5rem' }} className="gradient-text">{stat.value}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 500 }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .stat-box:hover { transform: translateY(-5px) !important; border-color: var(--primary-glow); }
      `}</style>
    </section>
  );
};

export default About;
