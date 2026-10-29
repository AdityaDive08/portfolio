import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import * as FaIcons from 'react-icons/fa';
import { userData } from '../models/dataModel';

const SkillCategory = ({ title, skills, delay }) => {
  const handleSkillClick = (skillName) => {
    window.dispatchEvent(new CustomEvent('filterProjects', { detail: skillName }));
    window.location.hash = '#projects';
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      className="glass-panel skill-category-card"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="skill-category-header">
        <h3 className="skill-category-title">{title}</h3>
        <span className="skill-category-bar" />
      </div>
      
      <div className="skills-grid">
        {skills.map((skill, idx) => {
          const Icon = Icons[skill.icon] || FaIcons[skill.icon] || Icons.Code;
          return (
            <div 
              key={idx} 
              className="skill-tag" 
              onClick={() => handleSkillClick(skill.name)}
              title={`Click to filter projects using ${skill.name}`}
            >
              <span className="skill-icon-wrapper">
                <Icon size={17} />
              </span>
              <span className="skill-name-text">{skill.name}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="section">
      <motion.div 
        className="section-heading"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>Technical <span className="gradient-text">Skills</span></h2>
        <p className="section-subheading">Technologies and tools I use to bring ideas to reality</p>
      </motion.div>
      
      <div className="skills-container">
        <SkillCategory title="Frontend" skills={userData.skills.frontend} delay={0.1} />
        <SkillCategory title="Backend & Database" skills={userData.skills.backend} delay={0.2} />
        <SkillCategory title="Tools & DevOps" skills={userData.skills.tools} delay={0.3} />
      </div>

      <style>{`
        .skills-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .skill-category-card {
          padding: 34px 28px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .skill-category-card:hover {
          border-color: rgba(21, 88, 201, 0.4);
          box-shadow: 0 16px 32px -8px rgba(21, 88, 201, 0.12);
          transform: translateY(-4px);
        }

        .skill-category-header {
          position: relative;
          padding-bottom: 14px;
          margin-bottom: 22px;
        }

        .skill-category-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-main);
          letter-spacing: -0.01em;
        }

        .skill-category-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 42px;
          height: 3px;
          background: var(--gradient-accent);
          border-radius: 9999px;
        }

        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .skill-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 0.92rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          user-select: none;
        }

        .skill-icon-wrapper {
          color: var(--primary-blue);
          display: flex;
          align-items: center;
          transition: color 0.2s ease;
        }

        .skill-tag:hover {
          background: var(--gradient-accent);
          border-color: transparent;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(21, 88, 201, 0.28);
        }

        .skill-tag:hover .skill-icon-wrapper {
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .skills-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;