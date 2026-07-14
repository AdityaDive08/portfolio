import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
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
          <motion.h3 variants={itemVariants} style={{ color: 'var(--secondary-glow)', fontSize: '1.2rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>
            Hello, I'm
          </motion.h3>
          <motion.h1 variants={itemVariants} style={{ fontSize: '4.5rem', marginBottom: '15px' }}>
            {userData.name}
          </motion.h1>
          <motion.h2 variants={itemVariants} style={{ fontSize: '2rem', color: 'var(--text-muted)', marginBottom: '25px', fontWeight: 500 }}>
            <span dangerouslySetInnerHTML={{ __html: userData.role.replace('Software Engineer', '<span class="gradient-text">Software Engineer</span>') }} />
          </motion.h2>
          <motion.p variants={itemVariants} style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '500px', marginBottom: '35px' }}>
            {userData.bio}
          </motion.p>
          
          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-outline">Contact Me</a>
          </motion.div>
          
          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '20px' }}>
            {[FaGithub, FaLinkedin, FaTwitter].map((Icon, idx) => (
              <a key={idx} href="#" style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                width: '45px', height: '45px', background: 'var(--bg-card)',
                border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '50%',
                color: 'var(--text-muted)', transition: 'var(--transition)'
              }} className="social-icon">
                <Icon size={20} />
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
              e.target.src = "https://ui-avatars.com/api/?name=Aditya+Dive&size=512&background=18181b&color=06b6d4";
            }}
            />
          </div>
        </motion.div>
      </div>

      <style>{`
        .social-icon:hover { background: var(--gradient-accent) !important; color: #fff !important; transform: translateY(-5px); }
        .circle-border { animation: spin-360 2.5s linear infinite; }
        @keyframes spin-360 {
          100% { transform: rotate(360deg); }
        }
        .animated-circle img { transition: transform 0.5s ease; }
        .animated-circle:hover img { transform: scale(1.02); }
        @media (max-width: 991px) {
          #home > div { text-align: center; justify-content: center; }
          .social-icon { margin: 0 auto; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
