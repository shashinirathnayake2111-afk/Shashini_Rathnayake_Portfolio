import React, { useEffect, useRef } from 'react';
import './AboutSection.css';

const AboutSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Trigger when even 10% is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    const elements = sectionRef.current.querySelectorAll('.bento-card');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      {/* Immersive Blue/Purple Ambient Background */}
      <div className="ambient-mesh">
        <div className="mesh-blob blue-blob"></div>
        <div className="mesh-blob purple-blob"></div>
        <div className="mesh-blob cyan-blob"></div>
      </div>

      <div className="about-container">
        
        {/* Header */}
        <div className="about-header bento-card reveal-up">
          <h2 className="about-title">
            BEYOND THE <span className="text-pink">CODE.</span>
          </h2>
          <p className="about-subtitle">Full Stack Developer & UI/UX Designer</p>
        </div>

        <div className="bento-grid">
          
          {/* Card 1: Main Bio (Large) */}
          <div className="bento-card bio-card reveal-up delay-1">
            <div className="card-glow"></div>
            <h3 className="card-title">Hello, I'm Shashini</h3>
            <p className="card-text">
              I specialize in crafting digital experiences that are not just functional, but <span className="highlight-pink">visually breathtaking</span>. My approach combines deep technical logic with a keen eye for modern design aesthetics.
            </p>
            <p className="card-text">
              I am currently looking for opportunities to bring my unique blend of engineering and design to a forward-thinking team.
            </p>
            <div className="bento-actions">
              <button className="bento-btn primary-btn">Download CV</button>
              <a href="https://github.com/shashinirathnayake2111-afk" className="bento-btn secondary-btn" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>

          {/* Card 2: Industry Experience */}
          <div className="bento-card stat-card exp-card reveal-up delay-2">
            <div className="card-glow"></div>
            <div className="stat-number text-purple">8</div>
            <div className="stat-label">
              <span className="stat-unit">Months</span>
              <span className="stat-desc">Industry Experience<br/>(Internship)</span>
            </div>
          </div>

          {/* Card 3: Self Learning */}
          <div className="bento-card stat-card learn-card reveal-up delay-3">
            <div className="card-glow"></div>
            <div className="stat-number text-pink">1+</div>
            <div className="stat-label">
              <span className="stat-unit">Year</span>
              <span className="stat-desc">Intensive Self-Learning<br/>& Upskilling</span>
            </div>
          </div>

          {/* Card 4: Projects (Wide) */}
          <div className="bento-card projects-card reveal-up delay-4">
            <div className="card-glow"></div>
            <div className="projects-content">
              <div className="projects-left">
                <div className="stat-number text-gradient">7+</div>
                <div className="stat-label">
                  <span className="stat-unit">Total Projects</span>
                  <span className="stat-desc">Built & Deployed</span>
                </div>
              </div>
              <div className="projects-right">
                <div className="project-pill">2 Enterprise</div>
                <div className="project-pill">5 Personal</div>
                <div className="project-pill">UI/UX</div>
                <div className="project-pill">Full Stack</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
