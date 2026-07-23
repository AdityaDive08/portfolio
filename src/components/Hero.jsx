import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { userData } from '../data';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="home" className="section" style={{ paddingTop: '100px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '50px' }}>
        
        {/* Content */}
        <motion.div 
          style={{ flex: '1 1 500px' }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h3 variants={itemVariants} className="hero-greeting">
            Hello, I'm
          </motion.h3>
          <motion.h1 variants={itemVariants} className="hero-title">
            {userData.name}
          </motion.h1>
          <motion.h2 variants={itemVariants} className="hero-subtitle">
            <span dangerouslySetInnerHTML={{ __html: userData.role.replace('Software Engineer', '<span class="gradient-text">Software Engineer</span>') }} />
          </motion.h2>
          <motion.p variants={itemVariants} className="hero-bio">
            {userData.bio}
          </motion.p>
          
          <motion.div variants={itemVariants} className="hero-buttons">
            <a href="#projects" className="btn btn-outline">View My Work</a>
            <a href="#contact" className="btn btn-outline">Contact Me</a>
          </motion.div>
          
          <motion.div variants={itemVariants} className="hero-socials">
            {[
              { Icon: FaGithub, link: userData.socials?.github || "#" },
              { Icon: FaLinkedin, link: userData.socials?.linkedin || "#" },
              { Icon: SiLeetcode, link: "https://leetcode.com/u/adityadive2708/" },
              { Icon: FaInstagram, link: "https://www.instagram.com/its_aditya_dive__/" },
              { Icon: FaEnvelope, link: "mailto:adityaarundive@gmail.com" }
            ].map((item, idx) => (
              <a key={idx} href={item.link} target={(item.link !== "#" && !item.link.startsWith("mailto:")) ? "_blank" : "_self"} rel="noreferrer" style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                width: '45px', height: '45px', background: 'var(--bg-card)',
                border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '50%',
                color: 'var(--text-muted)', transition: 'var(--transition)'
              }} className="social-icon">
                <item.Icon size={20} />
              </a>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Image */}
        <motion.div 
          style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: 'spring' }}
        >
          <div className="animated-circle" style={{
            position: 'relative',
            width: '350px', height: '350px', 
            borderRadius: '50%',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.02)'
          }}>
            <div className="circle-border" style={{
               position: 'absolute',
               width: '150%', height: '150%',
               background: 'conic-gradient(from 0deg, transparent 60%, var(--secondary-glow) 80%, var(--primary-glow) 100%)',
               zIndex: 1
            }} />
            <img src="/profile.jpg" alt={userData.name} style={{
              position: 'relative',
              zIndex: 2,
              width: 'calc(100% - 16px)', height: 'calc(100% - 16px)', 
              objectFit: 'cover',
              borderRadius: '50%',
              backgroundColor: '#fff',
              border: '5px solid var(--bg-dark)'
            }} 
            onError={(e) => {
              e.target.src = "https://ui-avatars.com/api/?name=Aditya+Dive&size=512&background=000000&color=3b82f6";
            }}
            />
          </div>
        </motion.div>
      </div>

      <style>{`
        .hero-greeting { color: var(--secondary-glow); font-size: 1.2rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; }
        .hero-title { font-size: 4.5rem; margin-bottom: 15px; }
        .hero-subtitle { font-size: 2rem; color: var(--text-muted); margin-bottom: 25px; font-weight: 500; }
        .hero-bio { color: var(--text-muted); font-size: 1.1rem; max-width: 500px; margin-bottom: 35px; }
        .hero-buttons { display: flex; gap: 20px; margin-bottom: 40px; }
        .hero-socials { display: flex; gap: 20px; }

        .social-icon:hover { background: var(--gradient-accent) !important; color: #fff !important; transform: translateY(-5px); }
        .circle-border { animation: spin-360 2.5s linear infinite; }
        @keyframes spin-360 {
          100% { transform: rotate(360deg); }
        }
        .animated-circle img { transition: transform 0.5s ease; }
        .animated-circle:hover img { transform: scale(1.02); }
        
        @media (max-width: 991px) {
          #home > div { text-align: center; justify-content: center; }
          .hero-bio { margin: 0 auto 35px auto; }
          .hero-buttons { justify-content: center; }
          .hero-socials { justify-content: center; flex-wrap: wrap; }
          .social-icon { margin: 0; }
        }
        
        @media (max-width: 768px) {
          .hero-title { font-size: 3.5rem; }
          .hero-subtitle { font-size: 1.5rem; }
          .animated-circle { width: 280px !important; height: 280px !important; }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: 2.5rem; }
          .hero-subtitle { font-size: 1.2rem; }
          .hero-bio { font-size: 1rem; }
          .hero-buttons { flex-direction: row; justify-content: center; gap: 10px; }
          .hero-buttons .btn { width: auto; max-width: none; text-align: center; padding: 10px 15px; font-size: 0.9rem; }
          .animated-circle { width: 240px !important; height: 240px !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
