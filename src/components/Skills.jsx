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
      className="glass-panel skill-category"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      style={{ padding: '30px', transition: 'var(--transition)' }}
    >
      <h3 style={{ fontSize: '1.5rem', marginBottom: '25px', position: 'relative', paddingBottom: '10px' }}>
        {title}
        <span style={{ position: 'absolute', bottom: 0, left: 0, width: '50px', height: '3px', background: 'var(--gradient-accent)', borderRadius: '3px' }} />
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {skills.map((skill, idx) => {
          const Icon = Icons[skill.icon] || FaIcons[skill.icon] || Icons.Code;
          return (
            <div 
              key={idx} 
              className="skill-tag" 
              onClick={() => handleSkillClick(skill.name)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'rgba(255, 255, 255, 0.05)', padding: '10px 18px',
                borderRadius: '30px', fontSize: '0.95rem', fontWeight: 500,
                border: '1px solid rgba(255, 255, 255, 0.02)', transition: 'var(--transition)',
                cursor: 'pointer'
              }}
            >
              <Icon size={18} style={{ color: 'var(--secondary-glow)' }} />
              {skill.name}
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>Technical <span className="gradient-text">Skills</span></h2>
      </motion.div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        <SkillCategory title="Frontend" skills={userData.skills.frontend} delay={0.1} />
        <SkillCategory title="Backend & Database" skills={userData.skills.backend} delay={0.3} />
        <SkillCategory title="Tools & Others" skills={userData.skills.tools} delay={0.5} />
      </div>

      <style>{`
        .skill-category:hover { border-color: rgba(37, 99, 235, 0.5); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); transform: translateY(-5px); }
        .skill-tag:hover { background: rgba(37, 99, 235, 0.15); border-color: var(--primary-glow); color: #fff; transform: translateY(-2px); }
      `}</style>
    </section>
  );
};

export default Skills;
