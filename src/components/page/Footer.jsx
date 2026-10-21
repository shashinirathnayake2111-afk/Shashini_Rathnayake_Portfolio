import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUp, Copy, Check, FileDown, Sparkles, Mail } from 'lucide-react';
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
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: false, duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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

  return (
    <footer className="footer-section">

      <div className="footer-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 110" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,0 L1440,0 L1440,65 C1200,30 960,95 720,60 C480,25 240,90 0,55 Z"
            fill="#04060a"
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

          {/* ── Social Links Row (Bottom Center) ── */}
          <div className="footer-social-row">
            <a
              href="https://www.linkedin.com/in/shashini-rathnayake-628983326/"
              target="_blank"
              rel="noreferrer"
              className="footer-social-pill"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/shashinirathnayake2111-afk"
              target="_blank"
              rel="noreferrer"
              className="footer-social-pill"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>

            <a
              href="mailto:shashinirathnayake2111@gmail.com"
              className="footer-social-pill"
              aria-label="Email"
            >
              <Mail size={14} />
              <span>Email</span>
            </a>
          </div>

          {/* ── Back to Top Button (Right) ── */}
          <button
            className="footer-back-to-top"
            onClick={handleScrollTop}
            aria-label="Scroll back to top"
          >
            <span className="btt-label">BACK TO TOP</span>
            <span className="btt-circle">
              <ArrowUp size={15} strokeWidth={2.5} />
            </span>
          </button>
        </div>

      </div>

      {/* Watermark */}
      <div className="footer-watermark" aria-hidden="true">SR</div>

    </footer>
  );
};

export default Footer;
