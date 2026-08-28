import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';
import '../styles/HeroSection.css';
import profileImg from '../../assets/profile.png';

/* Split a word into animated letter spans */
const AnimatedWord = ({ word, baseDelay = 0, className = '' }) => (
  <span className={`animated-word ${className}`}>
    {word.split('').map((char, i) => (
      <span
        key={i}
        className="butterfly-letter"
        style={{ animationDelay: `${baseDelay + i * 0.06}s` }}
      >
        {char}
      </span>
    ))}
  </span>
);

const HeroSection = ({ isLoaded }) => {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);

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

  useEffect(() => {
    if (isLoaded) {
      const t = setTimeout(() => setMounted(true), 100);
      return () => clearTimeout(t);
    }
  }, [isLoaded]);



  return (
    <section className="hero-section" ref={sectionRef}>
      {/* Premium Ambient Background Effects */}
      <div className="hero-background-effects">
        <div className="noise-overlay"></div>
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
      </div>

      <motion.div
        className="hero-bg-role"
        style={{ y: bgRoleY, opacity: bgRoleOpacity, scale: bgRoleScale }}
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
          scale: profileScale,
          opacity: profileOpacity,
          y: profileY,
          filter: useTransform(profileBlur, (v) => `blur(${v}px)`),
        }}
      >
        <div className={mounted ? 'hero-profile-enter' : ''}>
          <div className="hero-profile-3d">
            <img src={profileImg} alt="Profile" className="hero-profile-img" />
            <div className="hero-profile-shadow" />
          </div>
          <div className="hero-profile-label">
            <MapPin size={18} strokeWidth={2.5} /> COLOMBO, SRI LANKA
          </div>
        </div>
      </motion.div>

      {/* Text — butterfly letter-by-letter flutter, parallax drift on scroll */}
      <motion.div
        className="hero-overlay-text"
        style={{ y: textY, opacity: textOpacity, scale: textScale }}
      >

        <span className={`hero-hello hello-fly-in ${mounted ? 'visible' : ''}`}>
          Hello, I&apos;m
        </span>

        <h1 className="hero-name">
          {mounted && (
            <AnimatedWord word="Shashini" baseDelay={0.3} />
          )}
          <br />
          {mounted && (
            <AnimatedWord word="Rathnayake" baseDelay={0.85} />
          )}
        </h1>

        <p className={`hero-role-subtitle ${mounted ? 'visible' : ''}`}>
          Full Stack Developer&nbsp;&amp;&nbsp;UI/UX Designer
        </p>

        <a
          href="#projects"
          className={`hero-projects-btn ${mounted ? 'visible' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          View My Projects <span className="btn-arrow">↗</span>
        </a>
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