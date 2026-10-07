import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Footer.css';

const Footer = ({ onContactClick }) => {
  const currentYear = new Date().getFullYear();

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
          <p className="footer-eyebrow">Available for new opportunities</p>
          <h2 className="footer-headline">
            Let's build something <span className="footer-headline-accent">remarkable.</span>
          </h2>
          <button className="footer-cta-btn" onClick={onContactClick}>
            Start a conversation <span className="footer-arrow">↗</span>
          </button>
        </motion.div>

        {/* ── Divider ── */}
        <div className="footer-divider" />

        {/* ── Bottom Bar ── */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-left">
            <span className="footer-copy">© {currentYear} Shashini Rathnayake · Colombo, Sri Lanka</span>
          </div>

          <div className="footer-socials-row">
            {socials.map((s, i) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
              >
                {s.label} <span className="footer-ext">↗</span>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Watermark */}
      <div className="footer-watermark" aria-hidden="true">SR</div>

    </footer>
  );
};

export default Footer;
