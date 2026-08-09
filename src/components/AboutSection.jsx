import React, { useEffect, useRef, useState } from 'react';
import './AboutSection.css';
import ProfileSketch from './ProfileSketch';
import resumePDF from '../assets/resume.pdf';

const techStack = ['React', 'Node.js', 'TypeScript', 'Python', 'MySQL', 'Figma'];

const AboutSection = () => {
  const sectionRef = useRef(null);
  const tiltCardRef = useRef(null);
  const hasAnimated = useRef(false);
  const [counts, setCounts] = useState({ exp: 0, projects: 0, certs: 0 });

  useEffect(() => {
    const card = tiltCardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -10;
      const rotY = ((x - cx) / cx) * 10;
      card.style.setProperty('--rot-x', `${rotX}deg`);
      card.style.setProperty('--rot-y', `${rotY}deg`);
    };

    const handleMouseLeave = () => {
      card.style.setProperty('--rot-x', '0deg');
      card.style.setProperty('--rot-y', '0deg');
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const animateCounter = (target, key, duration = 1600) => {
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCounts(prev => ({ ...prev, [key]: Math.floor(eased * target) }));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (!hasAnimated.current && entry.target.classList.contains('stats-trigger')) {
              hasAnimated.current = true;
              animateCounter(8, 'exp', 1200);
              animateCounter(7, 'projects', 1600);
              animateCounter(5, 'certs', 2000);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal-item');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section" id="about" ref={sectionRef}>

      <div className="ambient-mesh">
        <div className="mesh-blob blue-blob"></div>
        <div className="mesh-blob purple-blob"></div>
        <div className="mesh-blob cyan-blob"></div>
      </div>

      {/* ── Auto Pencil Drawing Sketch ── */}
      <ProfileSketch className="about-bg-sketch reveal-item" style={{ '--delay': '0.5s' }} />

      <div className="particles-field" aria-hidden="true">
        {[...Array(18)].map((_, i) => (
          <span key={i} className="particle" style={{
            '--px': `${(i * 37 + 11) % 100}%`,
            '--py': `${(i * 53 + 7) % 100}%`,
            '--ps': `${2 + (i % 4)}px`,
            '--pd': `${5 + (i % 7)}s`,
            '--pdelay': `${(i * 0.7) % 6}s`,
          }} />
        ))}
      </div>

      <div className="about-container">

        <div className="about-split reveal-item" style={{ '--delay': '0s' }}>

          <div className="about-left">

            <div className="otw-badge">
              <span className="otw-dot"></span>
              <span className="otw-label">Open to Work</span>
            </div>

            <h2 className="about-title">
              BEYOND THE <span className="text-pink">CODE.</span>
            </h2>
            <p className="about-subtitle">Full Stack Developer&nbsp;•&nbsp;UI/UX Designer&nbsp;•&nbsp;Creative Thinker</p>

            <p className="about-bio">
              I'm a passionate <span className="highlight-pink">Full Stack Developer & UI/UX Designer</span> who believes great software isn't just functional — it's an experience that feels alive, intuitive, and beautiful.
            </p>
            <p className="about-bio">
              With a strong foundation in both frontend and backend, I love bridging the gap between engineering and design. Always eager to learn, build, and push creative boundaries.
            </p>

            <div className="tech-pills">
              {techStack.map((t) => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>

            <div className="about-actions">
              <a href={resumePDF} download="Shashini_Rathnayake_Resume.pdf" className="btn-primary">Download CV</a>
              <a href="https://github.com/shashinirathnayake2111-afk" className="btn-secondary" target="_blank" rel="noreferrer">
                GitHub&nbsp;↗
              </a>
            </div>
          </div>

          <div className="about-right">
            <div className="card-float-wrapper">
              <div className="card-3d" ref={tiltCardRef}>
                <div className="card-border-glow"></div>

                <div className="code-block">
                  <div className="code-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <div className="code-body">
                    <div className="code-line"><span className="ck">const</span> <span className="cv">shashini</span> = {'{'}</div>
                    <div className="code-line pl"><span className="ck">role</span>: <span className="cs">"Full Stack Dev"</span>,</div>
                    <div className="code-line pl"><span className="ck">passion</span>: <span className="cs">"UI/UX Design"</span>,</div>
                    <div className="code-line pl"><span className="ck">status</span>: <span className="cg">"Open to Work ✓"</span>,</div>
                    <div className="code-line pl"><span className="ck">building</span>: <span className="cs">"something great"</span> 🚀</div>
                    <div className="code-line">{'}'}</div>
                  </div>
                </div>

                <div className="card-mini-badges">
                  <span className="mini-badge">⚡ Fast Learner</span>
                  <span className="mini-badge">🎨 Design‑First</span>
                  <span className="mini-badge">🚀 Builder</span>
                </div>

                <div className="c-orb c-orb-1"></div>
                <div className="c-orb c-orb-2"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-strip-card reveal-item stats-trigger" style={{ '--delay': '0.25s' }}>
          <div className="stats-strip">

            <div className="strip-stat">
              <div className="stat-number text-purple">{counts.exp}</div>
              <div className="stat-label">
                <span className="stat-unit">Months</span>
                <span className="stat-desc">Industry Experience<br />(Internship)</span>
              </div>
            </div>

            <div className="strip-divider"></div>

            <div className="strip-stat">
              <div className="stat-number text-gradient">{counts.projects}+</div>
              <div className="stat-label">
                <span className="stat-unit">Projects</span>
                <span className="stat-desc">Built &amp; Deployed</span>
              </div>
            </div>

            <div className="strip-divider"></div>

            <div className="strip-stat">
              <div className="stat-number text-pink">{counts.certs}+</div>
              <div className="stat-label">
                <span className="stat-unit">Certificates</span>
                <span className="stat-desc">Professional &amp; Online Courses</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
