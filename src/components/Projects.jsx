import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { userData } from '../models/dataModel';

const ImageCarousel = ({ images, title, isHovered, imageFit = 'cover' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    let interval;
    if (isHovered && autoPlay && images.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 2200);
    }
    return () => clearInterval(interval);
  }, [isHovered, autoPlay, images.length]);

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="project-image-wrapper">
      <img 
        src={images[currentIndex]} 
        alt={title} 
        className="project-img"
        style={{ objectFit: imageFit }} 
      />
      {images.length > 1 && (
        <div className="carousel-dots-indicator">
          {images.map((_, i) => (
            <span 
              key={i} 
              className={`carousel-dot ${i === currentIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      )}
      {images.length > 1 && isHovered && (
        <>
          <button 
            onClick={prevImage}
            className="carousel-btn btn-left"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={nextImage}
            className="carousel-btn btn-right"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="project-card glass-panel"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ImageCarousel 
        images={project.images || [project.image]} 
        title={project.title} 
        isHovered={isHovered}
        imageFit={project.imageFit}
      />
      <div className="project-body">
        {/* Tags */}
        <div className="project-tags">
          {project.tags.map(tag => (
            <span key={tag} className="project-tag-pill">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="project-title">{project.title}</h3>

        {/* Description */}
        <p className="project-desc">{project.description}</p>

        {/* Footer Actions */}
        <div className="project-footer">
          <div className="project-actions">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noreferrer"
                className="project-code-btn"
              >
                <FaGithub size={16} />
                <span>Source Code</span>
              </a>
            )}
          </div>
          {project.duration && (
            <span className="project-duration-badge">
              <Calendar size={13} />
              <span>{project.duration}</span>
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const handleFilter = (e) => {
      setFilter(e.detail);
    };
    window.addEventListener('filterProjects', handleFilter);
    return () => window.removeEventListener('filterProjects', handleFilter);
  }, []);

  const filteredProjects = filter === 'All' 
    ? userData.projects 
    : userData.projects.filter(project => 
        project.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
      );

  return (
    <section id="projects" className="section">
      <motion.div 
        className="section-heading"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>Featured <span className="gradient-text">Projects</span></h2>
        <p className="section-subheading">A showcase of full stack web applications and software solutions</p>
      </motion.div>
      
      {/* Active Filter Pill */}
      <AnimatePresence>
        {filter !== 'All' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="filter-banner-wrapper"
          >
            <div className="filter-active-pill">
              <span>Showing projects tagged with: <strong>{filter}</strong></span>
              <button 
                onClick={() => setFilter('All')}
                className="filter-clear-btn"
                title="Clear filter"
              >
                <X size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="projects-grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <ProjectCard 
              key={`${project.title}-${filter}`}
              project={project} 
              index={index} 
            />
          ))
        ) : (
          <div className="no-projects-box">
            <p>No projects found matching "{filter}".</p>
            <button 
              onClick={() => setFilter('All')} 
              className="btn btn-outline"
            >
              View All Projects
            </button>
          </div>
        )}
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        @media (max-width: 1080px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 720px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }

        .project-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          overflow: hidden;
          padding: 0;
          box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-card:hover {
          transform: translateY(-6px);
          border-color: rgba(37, 99, 235, 0.35);
          box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.15);
        }

        .project-image-wrapper {
          width: 100%;
          height: 215px;
          position: relative;
          overflow: hidden;
          background: #f1f5f9;
          border-bottom: 1px solid #f1f5f9;
        }

        .project-img {
          width: 100%;
          height: 100%;
          transition: transform 0.5s ease;
        }

        .project-card:hover .project-img {
          transform: scale(1.03);
        }

        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          border: 1px solid #e2e8f0;
          color: var(--text-main);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.2s ease;
          box-shadow: 0 4px 10px rgba(15, 23, 42, 0.12);
        }

        .carousel-btn:hover {
          background: var(--primary-blue);
          color: #ffffff;
          border-color: transparent;
        }

        .btn-left {
          left: 10px;
        }

        .btn-right {
          right: 10px;
        }

        .carousel-dots-indicator {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 5;
        }

        .carousel-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
        }

        .carousel-dot.active {
          width: 16px;
          border-radius: 9999px;
          background: #2563eb;
        }

        .project-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 14px;
        }

        .project-tag-pill {
          font-size: 0.74rem;
          font-weight: 600;
          color: #1d4ed8;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          padding: 4px 10px;
          border-radius: 9999px;
          letter-spacing: 0.2px;
        }

        .project-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 10px;
          line-height: 1.35;
        }

        .project-desc {
          color: var(--text-muted);
          font-size: 0.94rem;
          line-height: 1.6;
          margin-bottom: 22px;
        }

        .project-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid #f1f5f9;
        }

        .project-code-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .project-code-btn:hover {
          color: var(--primary-blue);
        }

        .project-duration-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #1d4ed8;
          background: #eff6ff;
          padding: 4px 10px;
          border-radius: 9999px;
          border: 1px solid #bfdbfe;
        }

        /* Filter Banner */
        .filter-banner-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }

        .filter-active-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          color: #1e293b;
          padding: 8px 18px;
          border-radius: 9999px;
          font-size: 0.92rem;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08);
        }

        .filter-active-pill strong {
          color: var(--primary-blue);
        }

        .filter-clear-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #dbeafe;
          border: none;
          color: #1d4ed8;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-clear-btn:hover {
          background: #2563eb;
          color: #ffffff;
        }

        .no-projects-box {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
        }

        .no-projects-box p {
          color: var(--text-muted);
          font-size: 1.1rem;
          margin-bottom: 20px;
        }
      `}</style>
    </section>
  );
};

export default Projects;