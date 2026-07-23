import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchResumeDownloads } from '../services/resumeService';

const Admin = () => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const data = await fetchResumeDownloads();
        setDownloads(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloads();
  }, []);

  return (
    <section className="section" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '2rem', margin: 0 }}>Resume <span className="gradient-text">Downloads</span></h2>
            <a href="/" className="btn btn-outline" style={{ textDecoration: 'none' }}>
              Back to Portfolio
            </a>
          </div>

          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading downloads...</p>
          ) : error ? (
            <p style={{ color: '#ff4d4d', textAlign: 'center' }}>{error}</p>
          ) : downloads.length === 0 ? (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: 0 }}>No one has downloaded your resume yet.</p>
            </div>
          ) : (
            <div className="glass-panel" style={{ overflowX: 'auto', padding: '0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                    <th style={{ padding: '20px', color: 'var(--primary-glow)', fontWeight: 600 }}>Company Name</th>
                    <th style={{ padding: '20px', color: 'var(--primary-glow)', fontWeight: 600 }}>Email</th>
                    <th style={{ padding: '20px', color: 'var(--primary-glow)', fontWeight: 600 }}>Downloaded At</th>
                  </tr>
                </thead>
                <tbody>
                  {downloads.map((download, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.3s' }}>
                      <td style={{ padding: '20px', color: '#fff' }}>{download.company_name}</td>
                      <td style={{ padding: '20px', color: 'var(--text-muted)' }}>{download.email || 'N/A'}</td>
                      <td style={{ padding: '20px', color: 'var(--text-muted)' }}>
                        {new Date(download.downloaded_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
      
      <style>{`
        table tr:hover {
          background: rgba(255, 255, 255, 0.03);
        }
      `}</style>
    </section>
  );
};

export default Admin;
