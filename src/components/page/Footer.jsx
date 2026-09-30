import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Footer.css';

const Footer = ({ onContactClick }) => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'About', to: '/about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
  ];

  const socials = [
    { label: 'GitHub', url: 'https://github.com/shashinirathnayake2111-afk' },
    { label: 'LinkedIn', url: 'https://linkedin.com' },
  ];

  return (
    <footer className="footer-section">
      <div className="footer-inner">

        {/* Top row */}
        <div className="footer-top">
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="footer-logo">Shashini<span className="footer-dot">.</span></span>
            <p className="footer-tagline">Full Stack Developer & UI/UX Designer</p>
          </motion.div>

          <motion.div
            className="footer-cta-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="footer-cta-label">Got a project in mind?</p>
            <button className="footer-cta-btn" onClick={onContactClick}>
              Let's talk <span className="footer-arrow">↗</span>
            </button>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Middle row */}
        <div className="footer-mid">
          <div className="footer-links-col">
            <span className="footer-col-label">Navigation</span>
            <ul className="footer-links">
              {navLinks.map((link) =>
                link.to ? (
                  <li key={link.label}>
                    <Link to={link.to} className="footer-link">{link.label}</Link>
                  </li>
                ) : (
                  <li key={link.label}>
                    <a href={link.href} className="footer-link">{link.label}</a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-label">Socials</span>
            <ul className="footer-links">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noreferrer" className="footer-link footer-social-link">
                    {s.label} <span className="footer-ext">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-status-col">
            <div className="footer-available">
              <span className="footer-status-dot"></span>
              <span className="footer-status-text">Available for work</span>
            </div>
            <p className="footer-location">Sri Lanka 🇱🇰</p>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom row */}
        <div className="footer-bottom">
          <span className="footer-copy">© {currentYear} Shashini Rathnayake. All rights reserved.</span>
          <span className="footer-made">Designed & Built with ♥</span>
        </div>

      </div>

      {/* Large watermark */}
      <div className="footer-watermark" aria-hidden="true">SR</div>
    </footer>
  );
};

export default Footer;
