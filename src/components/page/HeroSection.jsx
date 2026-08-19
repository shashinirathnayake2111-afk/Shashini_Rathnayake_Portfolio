import React, { useState, useEffect } from 'react';
import '../styles/HeroSection.css';
import profileImg from '../../assets/profile.png';

const roles = ['UI/UX DESIGNER', 'FULL STACK DEVELOPER', 'SOFTWARE ENGINEER'];

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
  const [currentRole, setCurrentRole] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only trigger animations when loading screen is completely finished
    if (isLoaded) {
      const t = setTimeout(() => setMounted(true), 100);
      return () => clearTimeout(t);
    }
  }, [isLoaded]);

  useEffect(() => {
    // Only start the role carousel after the initial load is complete
    if (!isLoaded) return;

    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setAnimating(false);
      }, 500);
    }, 3500);
    
    return () => clearInterval(interval);
  }, [isLoaded]);

  return (
    <section className="hero-section">
      <div className={`hero-bg-role ${animating ? 'fade-out' : 'fade-in'} ${isLoaded ? 'bg-enter' : ''}`}>
        {roles[currentRole]}
      </div>

      {/* Profile image — flutter in from above */}
      <div className={`hero-profile-wrapper ${mounted ? 'hero-profile-enter' : ''}`}>
        <div className="hero-profile-3d">
          <img src={profileImg} alt="Profile" className="hero-profile-img" />
          <div className="hero-profile-shadow" />
        </div>
        <div className="hero-profile-label">PROFILE</div>
      </div>

      {/* Text — butterfly letter-by-letter flutter */}
      <div className="hero-overlay-text">
        {/* "Hello, I'm" — slides up as one */}
        <span className={`hero-hello hello-fly-in ${mounted ? 'visible' : ''}`}>
          Hello, I&apos;m
        </span>

        <h1 className="hero-name">
          {/* "Shashini" letters flutter in */}
          {mounted && (
            <AnimatedWord word="Shashini" baseDelay={0.3} />
          )}
          <br />
          {/* "Rathnayake" letters flutter in with extra delay */}
          {mounted && (
            <AnimatedWord word="Rathnayake" baseDelay={0.85} />
          )}
        </h1>
      </div>

      {/* Scroll Down Indicator */}
      <div
        className={`scroll-down-indicator ${isLoaded ? 'scroll-enter' : ''}`}
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        role="button"
        aria-label="Scroll Down"
      >
        <div className="scroll-mouse">
          <div className="scroll-dot" />
        </div>
        <span className="scroll-label">SCROLL DOWN</span>
      </div>
    </section>
  );
};

export default HeroSection;