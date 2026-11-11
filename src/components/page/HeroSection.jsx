import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';
import '../styles/HeroSection.css';
import profileImg from '../../assets/profile.png';

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

        {/* Living Moonlight Aura & Drifting Mist */}
        <div className="moon-pulse-glow"></div>
        <div className="drifting-cloud-layer"></div>

        {/* Twinkling Stardust Elements */}
        <div className="sky-stars">
          <span className="star star-1" style={{ top: '15%', left: '15%', '--d': '3.2s' }}></span>
          <span className="star star-2" style={{ top: '22%', left: '82%', '--d': '4.5s' }}></span>
          <span className="star star-3" style={{ top: '10%', left: '50%', '--d': '2.8s' }}></span>
          <span className="star star-4" style={{ top: '32%', left: '28%', '--d': '3.9s' }}></span>
          <span className="star star-5" style={{ top: '18%', left: '88%', '--d': '5.1s' }}></span>
          <span className="star star-6" style={{ top: '38%', left: '76%', '--d': '3.4s' }}></span>
          <span className="star star-7" style={{ top: '8%', left: '72%', '--d': '4.1s' }}></span>
          <span className="star star-8" style={{ top: '28%', left: '10%', '--d': '3.6s' }}></span>
          <span className="star star-9" style={{ top: '45%', left: '18%', '--d': '4.8s' }}></span>
          <span className="star star-10" style={{ top: '48%', left: '86%', '--d': '3.1s' }}></span>
          <span className="star star-11" style={{ top: '5%', left: '32%', '--d': '2.5s' }}></span>
          <span className="star star-12" style={{ top: '2%', left: '85%', '--d': '4.0s' }}></span>
        </div>

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
          <div className="hero-profile-label">
            <MapPin size={isMobile ? 20 : 18} strokeWidth={2.5} /> COLOMBO, SRI LANKA
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
          <br />
          <AnimatedWord word="Rathnayake" baseDelay={0.5} isMounted={mounted} className="name-last" />
        </h1>

        <p className={`hero-role-subtitle ${mounted ? 'visible' : ''}`}>
          UI/UX Designer&nbsp;&amp;&nbsp;Full Stack Developer
        </p>

        <p className={`hero-description ${mounted ? 'visible' : ''}`}>
          I Design and build beautiful and user-friendly websites and mobile applications.
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
            View My Projects <span className="btn-arrow">↗</span>
          </a>

          <div className="hero-social-links">
            <a href="https://www.linkedin.com/in/shashini-rathnayake-628983326/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hero-social-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="https://github.com/shashinirathnayake2111-afk" target="_blank" rel="noreferrer" aria-label="GitHub" className="hero-social-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="mailto:shashinirathnayake2111@gmail.com" aria-label="Email" className="hero-social-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
              </svg>
            </a>
          </div>
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
