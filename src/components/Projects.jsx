import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { userData } from '../data';

const Projects = () => {
  return (
    <section id="projects" className="section">
      <motion.div 
        className="section-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>Featured <span className="gradient-text">Projects</span></h2>
      </motion.div>
      
      <div className="projects-grid">
        {userData.projects.map((project, index) => (
          <motion.div 
            key={index}
            className="project-card glass-panel"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            style={{ overflow: 'hidden', padding: 0, transition: 'var(--transition)' }}
          >
            <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
              <img 
                src={project.image} 
                alt={project.title} 
                className="project-img"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
              />
            </div>
            <div style={{ padding: '25px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--secondary-glow)', background: 'rgba(59, 130, 246, 0.1)', padding: '4px 10px', borderRadius: '20px' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{project.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>{project.description}</p>
              
              <div style={{ display: 'flex', gap: '15px' }}>
                {project.github && (
                  <a href={project.github} className="project-link" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 600, transition: 'var(--transition)' }}>
                    <FaGithub size={18} /> Code
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} className="project-link" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 600, transition: 'var(--transition)' }}>
                    {/* <ExternalLink size={18} /> Live Demo */}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }
        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
        .project-card:hover { transform: translateY(-10px) !important; box-shadow: 0 15px 40px rgba(0,0,0,0.4); border-color: rgba(37, 99, 235, 0.3); }
        .project-card:hover .project-img { transform: scale(1.1); }
        .project-link:hover { color: var(--primary-glow); }
      `}</style>
    </section>
  );
};

export default Projects;
