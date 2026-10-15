import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUp, Copy, Check, FileDown, Sparkles } from 'lucide-react';
import '../styles/Footer.css';

const Footer = ({ onContactClick }) => {
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('shashinirathnayake2111@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socials = [
    { label: 'GitHub', url: 'https://github.com/shashinirathnayake2111-afk' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/shashini-rathnayake-dev/' },
    { label: 'Behance', url: 'https://www.behance.net/shashinirathnayke' },
  ];

  return (
    <footer className="footer-section">

      <div className="footer-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,45 C240,90 480,0 720,45 C960,90 1200,10 1440,45 L1440,0 L0,0 Z"
            fill="#050505"
          />
        </svg>
      </div>

      <div className="footer-inner">

        {/* ── Big CTA Hero ── */}
        <motion.div
          className="footer-hero"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >

          <h2 className="footer-headline">
            Let's build something <span className="footer-headline-accent">remarkable.</span>
          </h2>

          <div className="footer-cta-row">
            <button className="footer-cta-btn" onClick={onContactClick}>
              <span>Start a conversation</span>
              <span className="footer-arrow">↗</span>
            </button>

            <a
              href="/resume.pdf"
              download="Shashini_Rathnayake_CV.pdf"
              className="footer-cv-btn"
            >
              <FileDown size={16} />
              <span>Download CV</span>
            </a>
          </div>
        </motion.div>

        {/* ── Divider ── */}
        <div className="footer-divider" />

        {/* ── Bottom Bar ── */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-left">
            <span className="footer-copy">© {currentYear} Shashini Rathnayake</span>
          </div>

          <div className="footer-location-tag">
            <span>Based in Colombo, Sri Lanka</span>
          </div>
        </div>

      </div>

      {/* Watermark */}
      <div className="footer-watermark" aria-hidden="true">SR</div>

    </footer>
  );
};

export default Footer;
