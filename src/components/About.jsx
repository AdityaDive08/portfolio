import React from 'react';
import { motion } from 'framer-motion';
import { userData } from '../models/dataModel';
import * as Icons from 'lucide-react';

const About = () => {
  return (
    <>
      <section id="about" className="section">
        <motion.div 
          className="section-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>About <span className="gradient-text">Me</span></h2>
          <p className="section-subheading">A quick glimpse into my background, focus, and drive</p>
        </motion.div>
        
        <div className="about-container">
          <motion.div 
            className="about-card glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="about-title">My Journey in Tech</h3>
            <p className="about-text">
              I have completed my Master's degree in Information Technology with a strong passion for building modern web applications and solving real-world problems through clean code. I enjoy turning complex challenges into intuitive, high-performance, and practical user experiences.
            </p>
            <p className="about-text">
              Beyond coding, I actively follow the latest advancements in artificial intelligence, cloud architectures, system design, and modern frontend frameworks. I strongly value continuous learning and strive to evolve every day as a versatile software engineer.
            </p>
            
            <div className="about-stats-grid">
              {userData.stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="about-stat-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.4 }}
                >
                  <h4 className="stat-number gradient-text">{stat.value}</h4>
                  <p className="stat-label">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Qualification Section */}
      <section id="qualification" className="section qualification-section">
        <motion.div 
          className="section-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>My <span className="gradient-text">Qualifications</span></h2>
          <p className="section-subheading">Education milestones and professional internship journey</p>
        </motion.div>
        
        <div className="qualification-container">
          <div className="timeline-container">
            <div className="timeline-line"></div>
            
            {userData.education?.map((edu, index) => {
              const isLeft = index % 2 === 0;
              const IconComponent = edu.icon && Icons[edu.icon] ? Icons[edu.icon] : Icons.Circle;
              
              return (
                <motion.div 
                  key={index} 
                  className={`timeline-item ${isLeft ? 'timeline-left' : 'timeline-right'}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="timeline-dot">
                    <IconComponent size={18} />
                  </div>
                  <div className="glass-panel timeline-card">
                    <div className="timeline-header-row">
                      <h4 className="timeline-degree">{edu.degree || edu.role}</h4>
                      {edu.duration && (
                        <span className="timeline-badge">
                          {edu.duration}
                        </span>
                      )}
                    </div>
                    <p className="timeline-institution">{edu.institution || edu.company}</p>
                    
                    {edu.cgpa && (
                      <p className="timeline-cgpa">
                        <span className="cgpa-label">Score / CGPA:</span> <strong>{edu.cgpa}</strong>
                      </p>
                    )}
                    
                    {edu.project && (
                      <div className="timeline-project-row">
                        <a 
                          href={edu.projectUrl || '#projects'} 
                          target={edu.projectUrl ? '_blank' : '_self'}
                          rel={edu.projectUrl ? 'noopener noreferrer' : undefined}
                          className="project-redirect"
                        >
                          <span>Project: <strong>{edu.project}</strong></span>
                          <Icons.ArrowRight size={14} className="redirect-arrow" />
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        .about-container {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
        }

        .about-card {
          padding: 48px;
          text-align: center;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.05);
        }

        .about-title {
          font-size: 2rem;
          color: var(--text-main);
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }

        .about-text {
          color: var(--text-muted);
          font-size: 1.05rem;
          line-height: 1.75;
          margin-bottom: 22px;
          text-align: center;
        }

        .about-stats-grid {
          display: flex;
          justify-content: center;
          gap: 25px;
          flex-wrap: wrap;
          margin-top: 36px;
          padding-top: 32px;
          border-top: 1px solid #f1f5f9;
        }

        .about-stat-item {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 20px 32px;
          border-radius: 16px;
          transition: all 0.25s ease;
          min-width: 170px;
        }

        .about-stat-item:hover {
          transform: translateY(-4px);
          border-color: var(--primary-blue);
          box-shadow: 0 8px 20px -4px rgba(37, 99, 235, 0.12);
          background: #ffffff;
        }

        .stat-number {
          font-size: 2.6rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 4px;
        }

        .stat-label {
          margin: 0;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        /* Qualifications Timeline */
        .qualification-container {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
        }

        .timeline-container {
          position: relative;
          width: 100%;
          margin: 0 auto;
          padding: 20px 0;
        }

        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, #bfdbfe 0%, #3b82f6 50%, #bfdbfe 100%);
          transform: translateX(-50%);
          z-index: 1;
        }

        .timeline-item {
          width: 100%;
          margin-bottom: 45px;
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
          top: 22px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ffffff;
          color: var(--primary-blue);
          transform: translateX(-50%);
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15), 0 4px 10px rgba(15, 23, 42, 0.08);
          border: 2px solid var(--primary-blue);
          z-index: 3;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 0.25s ease;
        }

        .timeline-item:hover .timeline-dot {
          transform: translateX(-50%) scale(1.12);
        }

        .timeline-card {
          width: calc(50% - 45px);
          padding: 26px 30px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          text-align: left;
          transition: all 0.25s ease;
        }

        .timeline-card:hover {
          border-color: rgba(37, 99, 235, 0.4);
          box-shadow: 0 12px 28px -6px rgba(37, 99, 235, 0.12);
          transform: translateY(-3px);
        }

        .timeline-left .timeline-card {
          margin-left: 0;
          margin-right: auto;
          border-right: 4px solid var(--primary-blue);
        }

        .timeline-right .timeline-card {
          margin-right: 0;
          margin-left: auto;
          border-left: 4px solid var(--primary-blue);
        }

        .timeline-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }

        .timeline-degree {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-main);
          margin: 0;
        }

        .timeline-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 9999px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          color: #1d4ed8;
          font-size: 0.78rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .timeline-institution {
          color: var(--text-muted);
          font-size: 0.98rem;
          font-weight: 500;
          margin: 0 0 10px 0;
        }

        .timeline-cgpa {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin: 0 0 6px 0;
        }

        .cgpa-label {
          color: var(--text-light);
        }

        .timeline-project-row {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid #f1f5f9;
        }

        .project-redirect {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--primary-blue);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .project-redirect:hover {
          color: var(--primary-hover);
        }

        .project-redirect .redirect-arrow {
          transition: transform 0.2s ease;
        }

        .project-redirect:hover .redirect-arrow {
          transform: translateX(4px);
        }

        /* Responsive Timeline */
        @media (max-width: 860px) {
          .about-card {
            padding: 30px 20px;
          }
          .timeline-line {
            left: 20px;
            transform: none;
          }
          .timeline-dot {
            left: 20px;
            transform: translateX(-50%);
          }
          .timeline-item:hover .timeline-dot {
            transform: translateX(-50%) scale(1.1);
          }
          .timeline-card {
            width: calc(100% - 60px);
            margin-left: 60px !important;
            margin-right: 0 !important;
            border-right: 1px solid #e2e8f0 !important;
            border-left: 4px solid var(--primary-blue) !important;
          }
        }
      `}</style>
    </>
  );
};

export default About;