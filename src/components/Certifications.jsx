import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import { userData } from '../models/dataModel';

const Certifications = () => {
  return (
    <section id="certifications" className="section">
      <motion.div 
        className="section-heading"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>Certifications &amp; <span className="gradient-text">Publications</span></h2>
        <p className="section-subheading">Verified credentials and academic research accomplishments</p>
      </motion.div>
      
      <div className="certifications-grid">
        {userData.certifications.map((cert, idx) => (
          <motion.div 
            key={idx}
            className="cert-card glass-panel"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.45 }}
          >
            <div className="cert-icon-wrapper">
              <Award size={26} />
            </div>
            <div className="cert-content">
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              
              <div className="cert-meta-row">
                <div className="cert-date-chip">
                  <Calendar size={13} />
                  <span>{cert.date}</span>
                </div>
                {cert.link && cert.link !== '#' && (
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cert-view-link"
                  >
                    <span>View Certificate</span>
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .certifications-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .cert-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 26px;
          display: flex;
          align-items: flex-start;
          gap: 18px;
          box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cert-card:hover {
          transform: translateY(-4px);
          border-color: rgba(21, 88, 201, 0.4);
          box-shadow: 0 16px 32px -8px rgba(21, 88, 201, 0.12);
        }

        .cert-icon-wrapper {
          padding: 14px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 16px;
          color: var(--primary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cert-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .cert-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 6px;
          line-height: 1.35;
        }

        .cert-issuer {
          color: var(--text-muted);
          font-size: 0.92rem;
          font-weight: 500;
          margin-bottom: 16px;
        }

        .cert-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid #f1f5f9;
          gap: 10px;
          flex-wrap: wrap;
        }

        .cert-date-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: var(--text-muted);
          font-size: 0.82rem;
          font-weight: 500;
        }

        .cert-view-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: var(--primary-blue);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .cert-view-link:hover {
          color: var(--primary-hover);
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
};

export default Certifications;