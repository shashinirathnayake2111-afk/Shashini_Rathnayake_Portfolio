import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../styles/HeroSection.css';
import profileImg from '../../assets/profile.png';
import resumePdf from '../../assets/resume.pdf';

/* Split a word into animated letter spans */
const AnimatedWord = ({ word, baseDelay = 0, isMounted = false, className = '' }) => (
  <span className={`animated-word ${className}`}>
    {word.split('').map((char, i) => (
      <span
        key={i}
        className={`butterfly-letter ${isMounted ? 'animate-butterfly' : ''}`}
        style={{ animationDelay: isMounted ? `${baseDelay + i * 0.05}s` : '0s' }}
      >
        {char}
      </span>
    ))}
  </span>
);

const HeroSection = ({ isLoaded }) => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const profileScale = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const profileOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const profileY = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const profileBlur = useTransform(scrollYProgress, [0, 1], [0, 12]);

  const textY = useTransform(scrollYProgress, [0, 1], [0, -320]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  const bgRoleY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const bgRoleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgRoleScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  const bgImageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const bgImageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const bgImageOpacity = useTransform(scrollYProgress, [0, 0.8], [0.6, 0.1]);

  useEffect(() => {
    if (isLoaded) {
      const t = setTimeout(() => setMounted(true), 100);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [isLoaded]);

  return (
    <section className="hero-section" ref={sectionRef}>
      {/* Pure CSS Gradient Atmosphere Background */}
      <motion.div
        className="hero-cinematic-bg"
        style={{
          y: isMobile ? 0 : bgImageY,
          scale: isMobile ? 1 : bgImageScale,
          opacity: isMobile ? 0.95 : bgImageOpacity,
        }}
      >
        {/* Pure gradient atmosphere — no image needed */}
        <div className="hero-atmosphere" />

        <div className="hero-cinematic-vignette"></div>
      </motion.div>

      {/* Premium Ambient Background Effects */}
      <div className="hero-background-effects">
        <div className="noise-overlay"></div>
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
      </div>

      <motion.div
        className="hero-bg-role"
        style={{
          y: isMobile ? 0 : bgRoleY,
          opacity: isMobile ? 1 : bgRoleOpacity,
          scale: isMobile ? 1 : bgRoleScale,
        }}
      >
        {"BUILD. DESIGN. INSPIRE.".split('').map((char, index) => (
          <span key={index} className="bg-hover-letter">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </motion.div>

      <motion.div
        className="hero-profile-wrapper"
        style={{
          scale: isMobile ? 1 : profileScale,
          opacity: isMobile ? 1 : profileOpacity,
          y: isMobile ? 0 : profileY,
          filter: useTransform(profileBlur, (v) => isMobile ? 'none' : `blur(${v}px)`),
        }}
      >
        <div className={mounted ? 'hero-profile-enter' : 'hero-profile-initial'}>
          <div className="hero-profile-3d">
            <img src={profileImg} alt="Profile" className="hero-profile-img" />
            <div className="hero-profile-shadow" />
          </div>
          <div className="hero-profile-badge">
            <span className="badge-pulse-wrap">
              <span className="badge-ping" />
              <span className="badge-dot" />
            </span>
            <span className="badge-text">OPEN TO WORK</span>
          </div>
        </div>
      </motion.div>

      {/* Text — butterfly letter-by-letter flutter, parallax drift on scroll */}
      <motion.div
        className="hero-overlay-text"
        style={{
          y: isMobile ? 0 : textY,
          opacity: isMobile ? 1 : textOpacity,
          scale: isMobile ? 1 : textScale,
        }}
      >

        <div className={`hero-eyebrow-wrap hello-fly-in ${mounted ? 'visible' : ''}`}>
          <div className="hero-eyebrow-row">
            <span className="hero-eyebrow-line" />
            <span className="hero-hello">HELLO, I&apos;M</span>
          </div>
        </div>

        <h1 className="hero-name">
          <AnimatedWord word="Shashini" baseDelay={0.18} isMounted={mounted} className="name-first" />
          <span className="hero-name-space">&nbsp;</span>
          <br className="hero-name-br" />
          <AnimatedWord word="Rathnayake" baseDelay={0.5} isMounted={mounted} className="name-last" />
        </h1>

        <p className={`hero-role-subtitle ${mounted ? 'visible' : ''}`}>
          Full Stack Developer &nbsp;&amp;&nbsp; UI/UX Designer
        </p>

        <p className={`hero-description ${mounted ? 'visible' : ''}`}>
          Crafting intuitive digital experiences and robust full-stack applications with an eye for detail and performance.
        </p>

        <div className={`hero-action-row ${mounted ? 'visible' : ''}`}>
          <a
            href="#projects"
            className="hero-projects-btn"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Projects <span className="btn-arrow">↗</span>
          </a>

          <a
            href={resumePdf}
            download="Shashini_Rathnayake_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="hero-cv-btn"
            aria-label="Download CV"
          >
            <svg
              className="cv-icon"
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download CV</span>
          </a>
        </div>
      </motion.div>

      <div
        className={`scroll-down-indicator ${isLoaded ? 'scroll-enter' : ''}`}
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        role="button"
        aria-label="Scroll Down"
      >
        <div className="scroll-mouse">
          <div className="scroll-dot" />
        </div>
        <span className="scroll-label">EXPLORE</span>
      </div>

    </section>
  );
};

export default HeroSection;
