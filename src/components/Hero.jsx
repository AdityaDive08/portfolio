import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaReact, FaDatabase, FaNodeJs } from 'react-icons/fa';
import { SiLeetcode, SiExpress } from 'react-icons/si';
import { ArrowRight, MessageSquare, Sparkles, Server } from 'lucide-react';
import { userData } from '../models/dataModel';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } }
  };

  const socials = [
    { Icon: FaGithub, link: userData.socials?.github || "#", label: "GitHub" },
    { Icon: FaLinkedin, link: userData.socials?.linkedin || "#", label: "LinkedIn" },
    { Icon: SiLeetcode, link: "https://leetcode.com/u/adityadive2708/", label: "LeetCode" },
    { Icon: FaInstagram, link: "https://www.instagram.com/its_aditya_dive__/", label: "Instagram" },
    { Icon: FaEnvelope, link: "mailto:adityaarundive@gmail.com", label: "Email" }
  ];

  return (
    <section id="home" className="section hero-section">
      <div className="hero-container">
        
        {/* Text Content */}
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <p className="hero-greeting">
              <span className="wave-icon-wrapper">
                <img 
                  src="/waving-hand.png" 
                  alt="Waving Hand" 
                  className="wave-hand-img" 
                />
              </span>
              <span>Hello, I'm</span>
            </p>
            <h1 className="hero-name">
              {userData.name}
            </h1>
          </motion.div>

          <motion.h2 variants={itemVariants} className="hero-role">
            MCA Graduate &amp; <span className="gradient-text">Software Developer</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="hero-bio">
            {userData.bio}
          </motion.p>
          
          <motion.div variants={itemVariants} className="hero-cta-group">
            <a href="#projects" className="btn btn-primary">
              <span>View My Work</span>
              <ArrowRight size={17} />
            </a>
            <a href="#contact" className="btn btn-outline">
              <MessageSquare size={17} />
              <span>Contact Me</span>
            </a>
          </motion.div>
          
          {/* Social Links */}
          <motion.div variants={itemVariants} className="hero-socials-wrapper">
            {/* <span className="socials-label">Connect:</span> */}
            <div className="socials-list">
              {socials.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.link} 
                  target={(item.link !== "#" && !item.link.startsWith("mailto:")) ? "_blank" : "_self"} 
                  rel="noreferrer" 
                  aria-label={item.label}
                  className="hero-social-pill"
                >
                  <item.Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Profile Visual */}
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <div className="profile-card-wrapper">
            {/* Ambient soft glow */}
            <div className="ambient-blue-glow"></div>

            {/* Profile Frame */}
            <div className="profile-frame">
              <img 
                src="/adityadive.webp" 
                alt={userData.name} 
                className="profile-photo"
                onError={(e) => {
                  e.target.src = "https://ui-avatars.com/api/?name=Aditya+Dive&size=512&background=eff6ff&color=1558C9&bold=true";
                }}
              />
            </div>

            {/* Floating Tech Badges around the Circle */}
            <div className="floating-tech-badge badge-backend">
              <span className="tech-badge-icon icon-backend"><Server size={14} /></span>
              <span className="tech-badge-text">Backend Developer</span>
            </div>

            <div className="floating-tech-badge badge-node">
              <span className="tech-badge-icon icon-node"><FaNodeJs size={15} /></span>
              <span className="tech-badge-text">Node.js</span>
            </div>

            <div className="floating-tech-badge badge-react">
              <span className="tech-badge-icon icon-react"><FaReact size={15} /></span>
              <span className="tech-badge-text">React.js</span>
            </div>

            <div className="floating-tech-badge badge-express">
              <span className="tech-badge-icon icon-express"><SiExpress size={14} /></span>
              <span className="tech-badge-text">Express.js</span>
            </div>

            <div className="floating-tech-badge badge-sql">
              <span className="tech-badge-icon icon-sql"><FaDatabase size={13} /></span>
              <span className="tech-badge-text">SQL</span>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .hero-section {
          padding-top: 130px;
          padding-bottom: 70px;
          min-height: 90vh;
          display: flex;
          align-items: center;
        }

        .hero-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-content {
          flex: 1.2;
          max-width: 620px;
        }

        .hero-greeting {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--primary-blue);
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .wave-icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .wave-hand-img {
          width: 32px;
          height: 32px;
          object-fit: contain;
          display: inline-block;
          transform-origin: 75% 75%;
          animation: wave-continuous 1.8s ease-in-out infinite;
          user-select: none;
          vertical-align: middle;
        }

        @keyframes wave-continuous {
          0% { transform: rotate(0deg); }
          15% { transform: rotate(16deg); }
          30% { transform: rotate(-10deg); }
          45% { transform: rotate(16deg); }
          60% { transform: rotate(-6deg); }
          75% { transform: rotate(12deg); }
          90% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }

        .hero-name {
          font-size: 4rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 12px;
        }

        .hero-role {
          font-size: 1.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 20px;
          letter-spacing: -0.01em;
        }

        .hero-bio {
          font-size: 1.1rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 34px;
          max-width: 540px;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .hero-socials-wrapper {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .socials-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .socials-list {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hero-social-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          color: var(--text-secondary);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
        }

        .hero-social-pill:hover {
          background: var(--gradient-accent);
          color: #ffffff !important;
          border-color: transparent;
          transform: translateY(-3px);
          box-shadow: 0 8px 18px rgba(21, 88, 201, 0.3);
        }

        /* Profile Visual Side */
        .hero-visual {
          flex: 1;
          display: flex;
          justify-content: center;
          position: relative;
        }

        .profile-card-wrapper {
          position: relative;
          width: 380px;
          height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ambient-blue-glow {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(21, 88, 201, 0.22) 0%, rgba(56, 189, 248, 0.12) 50%, transparent 75%);
          filter: blur(35px);
          z-index: 0;
          animation: pulse-ambient 4s ease-in-out infinite alternate;
        }

        @keyframes pulse-ambient {
          0% { transform: scale(0.95); opacity: 0.7; }
          100% { transform: scale(1.1); opacity: 1; }
        }

        .profile-frame {
          position: relative;
          z-index: 1;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          padding: 6px;
          background: linear-gradient(135deg, #1558C9, #38bdf8, #818cf8);
          box-shadow: 0 20px 45px -10px rgba(21, 88, 201, 0.25);
          transition: transform 0.4s ease;
        }

        .profile-frame:hover {
          transform: scale(1.02);
        }

        .profile-photo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #ffffff;
          background: #f1f5f9;
        }

        /* Floating Tech Badges around Profile Circle */
        .floating-tech-badge {
          position: absolute;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 8px 15px;
          border-radius: 9999px;
          border: 1px solid rgba(226, 232, 240, 0.95);
          box-shadow: 0 8px 24px -4px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(21, 88, 201, 0.06);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          user-select: none;
          white-space: nowrap;
        }

        .floating-tech-badge:hover {
          transform: scale(1.08) !important;
          border-color: rgba(21, 88, 201, 0.45);
          box-shadow: 0 12px 28px -4px rgba(21, 88, 201, 0.22);
        }

        .tech-badge-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-backend { color: #1558C9; }
        .icon-node { color: #16a34a; }
        .icon-react { color: #0284c7; }
        .icon-express { color: #0f172a; }
        .icon-sql { color: #1558C9; }

        .tech-badge-text {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-main);
          letter-spacing: -0.2px;
        }

        /* Specific Positions Around The Circle */
        .badge-backend {
          top: -12px;
          left: 10px;
          animation: float-badge-1 3.4s ease-in-out infinite alternate;
        }

        .badge-node {
          top: 36px;
          right: -28px;
          animation: float-badge-2 3.8s ease-in-out infinite alternate;
        }

        .badge-react {
          top: 50%;
          left: -42px;
          animation: float-badge-3 4.2s ease-in-out infinite alternate;
        }

        .badge-express {
          bottom: 38px;
          right: -30px;
          animation: float-badge-4 3.6s ease-in-out infinite alternate;
        }

        .badge-sql {
          bottom: -14px;
          left: 28%;
          animation: float-badge-5 4.0s ease-in-out infinite alternate;
        }

        /* Smooth continuous floating animations */
        @keyframes float-badge-1 {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-7px) rotate(-1deg); }
        }

        @keyframes float-badge-2 {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-8px) rotate(1.5deg); }
        }

        @keyframes float-badge-3 {
          0% { transform: translateY(-50%) translateX(0px); }
          100% { transform: translateY(calc(-50% - 6px)) translateX(3px); }
        }

        @keyframes float-badge-4 {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-6px) rotate(-1deg); }
        }

        @keyframes float-badge-5 {
          0% { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(6px) translateX(3px); }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-container {
            flex-direction: column-reverse;
            text-align: center;
            gap: 40px;
          }
          .hero-content {
            max-width: 100%;
          }
          .hero-bio {
            margin: 0 auto 30px auto;
          }
          .hero-cta-group {
            justify-content: center;
          }
          .hero-socials-wrapper {
            justify-content: center;
          }
          .hero-name {
            font-size: 3.4rem;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding-top: 105px;
          }
          .hero-name {
            font-size: 2.8rem;
          }
          .hero-role {
            font-size: 1.45rem;
          }
          .profile-card-wrapper {
            width: 290px;
            height: 290px;
          }
          .profile-frame {
            width: 250px;
            height: 250px;
          }
          .floating-tech-badge {
            padding: 6px 11px;
          }
          .tech-badge-text {
            font-size: 0.78rem;
          }
          .badge-backend { top: -8px; left: 0px; }
          .badge-node { top: 25px; right: -15px; }
          .badge-react { top: 50%; left: -25px; }
          .badge-express { bottom: 25px; right: -20px; }
          .badge-sql { bottom: -10px; left: 24%; }
        }

        @media (max-width: 480px) {
          .hero-name {
            font-size: 2.3rem;
          }
          .hero-role {
            font-size: 1.25rem;
          }
          .hero-cta-group {
            flex-direction: column;
            width: 100%;
          }
          .hero-cta-group .btn {
            width: 100%;
          }
          .profile-card-wrapper {
            width: 240px;
            height: 240px;
          }
          .profile-frame {
            width: 210px;
            height: 210px;
          }
          .floating-tech-badge {
            padding: 5px 9px;
          }
          .tech-badge-text {
            font-size: 0.72rem;
          }
          .badge-backend { top: -6px; left: -5px; }
          .badge-node { top: 15px; right: -10px; }
          .badge-react { top: 50%; left: -15px; }
          .badge-express { bottom: 15px; right: -10px; }
          .badge-sql { bottom: -8px; left: 20%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;