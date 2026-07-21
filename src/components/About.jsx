import React from 'react';
import { motion } from 'framer-motion';
import { userData } from '../data';
import * as Icons from 'lucide-react';

const About = () => {
  return (
    <>
    <section id="about" className="section">
      <motion.div 
        className="section-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>About <span className="gradient-text">Me</span></h2>
      </motion.div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
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
            When I'm not coding, I enjoy reading about the latest tech trends in artificial intelligence, web architecture and some core concepts.
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
        
        .timeline-container {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: rgba(37, 99, 235, 0.3);
          transform: translateX(-50%);
          z-index: 1;
        }
        .timeline-item {
          width: 100%;
          margin-bottom: 50px;
          position: relative;
          display: flex;
          z-index: 2;
        }
        .timeline-item:last-child {
          margin-bottom: 0;
        }
        .timeline-dot {
          position: absolute;
          left: 50%;
          top: 25px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--bg-dark);
          color: var(--primary-glow);
          transform: translateX(-50%);
          box-shadow: 0 0 15px rgba(37, 99, 235, 0.4);
          border: 2px solid var(--primary-glow);
          z-index: 3;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .timeline-content {
          width: calc(50% - 40px);
          padding: 30px;
          transition: var(--transition);
          text-align: left;
        }
        .timeline-content:hover {
          border-color: rgba(37, 99, 235, 0.8) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transform: translateY(-3px);
        }
        .timeline-content.left {
          border-right: 4px solid var(--primary-glow);
          margin-left: 0;
          margin-right: auto;
        }
        .timeline-content.right {
          border-left: 4px solid var(--primary-glow);
          margin-right: 0;
          margin-left: auto;
        }
        
        @media (max-width: 991px) {
          .timeline-line {
            left: 20px;
            transform: none;
          }
          .timeline-dot {
            left: 20px;
            transform: translateX(-50%);
          }
          .timeline-content {
            width: calc(100% - 60px);
            margin-left: 60px !important;
            border-right: 1px solid rgba(255, 255, 255, 0.05) !important;
            border-left: 4px solid var(--primary-glow) !important;
          }
        }
      `}</style>
    </section>
    
    <section id="qualification" className="section">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ width: '100%' }}
        >
          <div className="section-heading" style={{ marginBottom: '60px' }}>
            <h2>My <span className="gradient-text">Qualifications</span></h2>
          </div>
          
          <div className="timeline-container">
            <div className="timeline-line"></div>
            
            {userData.education?.map((edu, index) => {
              const isLeft = index % 2 === 0;
              const IconComponent = edu.icon && Icons[edu.icon] ? Icons[edu.icon] : Icons.Circle;
              
              return (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot">
                    <IconComponent size={18} />
                  </div>
                  <div className={`glass-panel timeline-content ${isLeft ? 'left' : 'right'}`}>
                    <h4 style={{ fontSize: '1.2rem', color: '#fff', margin: '0 0 10px 0' }}>{edu.degree}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: '0 0 5px 0' }}>{edu.institution}</p>
                    {edu.duration && (
                      <p style={{ color: 'var(--primary-glow)', fontSize: '0.85rem', fontWeight: 600, margin: '0 0 5px 0' }}>
                        {edu.duration}
                      </p>
                    )}
                    {edu.cgpa && (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                        <strong>CGPA:</strong> {edu.cgpa}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default About;
