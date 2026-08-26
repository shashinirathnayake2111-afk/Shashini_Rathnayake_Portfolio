import React, { useEffect, useRef, useState } from 'react';
import '../styles/AboutSection.css';
import resumePDF from '../../assets/resume.pdf';

/* ── Tab Definitions ── */
const TABS = ['About', 'Skills', 'Education', 'Experience'];

/* ── Skills Data ── */
const skillCategories = [
  {
    label: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'HTML/CSS', 'Framer Motion', 'Tailwind'],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'Express', 'Python', 'REST APIs', 'MySQL', 'MongoDB'],
  },
  {
    label: 'Design',
    skills: ['Figma', 'UI/UX Design', 'Prototyping', 'Design Systems', 'Wireframing'],
  },
  {
    label: 'Tools',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Firebase', 'Vercel'],
  },
];

/* ── Education Data ── */
const education = [
  {
    year: '2022 – Present',
    title: 'BSc (Hons) in Information Technology',
    place: 'Sri Lanka Institute of Information Technology',
    desc: 'Specializing in Software Engineering. Covering full-stack development, software architecture, databases, and UI/UX design.',
  },
  {
    year: '2023',
    title: 'Google UX Design Certificate',
    place: 'Google / Coursera',
    desc: 'Completed 7-course program covering empathy mapping, wireframing, prototyping, and usability testing.',
  },
  {
    year: '2022',
    title: 'Meta Front-End Developer Certificate',
    place: 'Meta / Coursera',
    desc: 'React, advanced HTML/CSS, responsive design, and front-end best practices.',
  },
];

/* ── Experience Data ── */
const experience = [
  {
    year: '2024 – 2025',
    title: 'Full Stack Developer Intern',
    place: 'XYZ Tech (Pvt) Ltd',
    desc: '8-month internship. Built and maintained web applications using React, Node.js, and MySQL. Collaborated in agile sprints and contributed to UI redesign projects.',
    tags: ['React', 'Node.js', 'MySQL'],
  },
  {
    year: '2023 – Present',
    title: 'Freelance UI/UX Designer',
    place: 'Self-employed',
    desc: 'Designed and delivered end-to-end UI/UX projects for local businesses — from research and wireframes to high-fidelity Figma prototypes.',
    tags: ['Figma', 'UI/UX', 'Prototyping'],
  },
  {
    year: '2023',
    title: 'Open Source Contributor',
    place: 'GitHub',
    desc: 'Contributed bug fixes and feature PRs to open-source React component libraries and documentation improvements.',
    tags: ['React', 'Open Source'],
  },
];

/* ── About Panel ── */
const AboutPanel = () => {
  const [counts, setCounts] = useState({ exp: 0, projects: 0, certs: 0 });
  const animated = useRef(false);

  const animateCounter = (target, key, duration = 1400) => {
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCounts((prev) => ({ ...prev, [key]: Math.floor(eased * target) }));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    if (animated.current) return;
    animated.current = true;
    animateCounter(8, 'exp', 1200);
    animateCounter(7, 'projects', 1600);
    animateCounter(5, 'certs', 2000);
  }, []);

  return (
    <div className="tab-panel-about">
      <div className="otw-badge">
        <span className="otw-dot" />
        <span className="otw-label">Open to Work</span>
      </div>

      <h2 className="about-title">
        Who I <span className="title-stroke">am.</span>
      </h2>
      <p className="about-subtitle">Full Stack Developer&nbsp;•&nbsp;UI/UX Designer&nbsp;•&nbsp;Creative Thinker</p>

      <p className="about-bio">
        I&apos;m a passionate <span className="highlight-text">Full Stack Developer &amp; UI/UX Designer</span> who
        believes great software isn&apos;t just functional — it&apos;s an experience that feels alive, intuitive, and beautiful.
      </p>
      <p className="about-bio">
        With a strong foundation in both frontend and backend, I love bridging the gap between engineering and design.
        Always eager to learn, build, and push creative boundaries.
      </p>

      <div className="about-stats-row">
        <div className="about-stat">
          <span className="about-stat-num">{counts.exp}</span>
          <span className="about-stat-desc">Months<br />Experience</span>
        </div>
        <div className="about-stat-divider" />
        <div className="about-stat">
          <span className="about-stat-num">{counts.projects}<span className="stat-plus">+</span></span>
          <span className="about-stat-desc">Projects<br />Built</span>
        </div>
        <div className="about-stat-divider" />
        <div className="about-stat">
          <span className="about-stat-num">{counts.certs}<span className="stat-plus">+</span></span>
          <span className="about-stat-desc">Certificates<br />Earned</span>
        </div>
      </div>

      <div className="about-actions">
        <a href={resumePDF} download="Shashini_Rathnayake_Resume.pdf" className="btn-primary">
          <span>Download CV</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </a>
        <a href="https://github.com/shashinirathnayake2111-afk" className="btn-secondary" target="_blank" rel="noreferrer">
          <span>GitHub</span>
          <span className="btn-arrow">↗</span>
        </a>
      </div>
    </div>
  );
};

/* ── Skills Panel ── */
const SkillsPanel = () => (
  <div className="tab-panel-skills">
    {skillCategories.map((cat) => (
      <div className="skill-category" key={cat.label}>
        <div className="skill-cat-label">{cat.label}</div>
        <div className="skill-pills">
          {cat.skills.map((s, i) => (
            <span className="skill-pill" key={s} style={{ '--spd': `${i * 0.06}s` }}>{s}</span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

/* ── Timeline Item ── */
const TimelineItem = ({ year, title, place, desc, tags, index }) => (
  <div className="timeline-item" style={{ '--tid': `${index * 0.12}s` }}>
    <div className="timeline-left">
      <div className="timeline-year">{year}</div>
    </div>
    <div className="timeline-connector">
      <div className="timeline-dot" />
      <div className="timeline-line" />
    </div>
    <div className="timeline-body">
      <div className="timeline-title">{title}</div>
      <div className="timeline-place">{place}</div>
      <p className="timeline-desc">{desc}</p>
      {tags && (
        <div className="timeline-tags">
          {tags.map((t) => <span className="timeline-tag" key={t}>{t}</span>)}
        </div>
      )}
    </div>
  </div>
);

/* ── Education Panel ── */
const EducationPanel = () => (
  <div className="tab-panel-timeline">
    {education.map((e, i) => (
      <TimelineItem key={i} index={i} {...e} />
    ))}
  </div>
);

/* ── Experience Panel ── */
const ExperiencePanel = () => (
  <div className="tab-panel-timeline">
    {experience.map((e, i) => (
      <TimelineItem key={i} index={i} {...e} />
    ))}
  </div>
);

const PANELS = [AboutPanel, SkillsPanel, EducationPanel, ExperiencePanel];

/* ── Main Component ── */
const AboutSection = () => {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleTabClick = (i) => {
    if (i === active) return;
    setActive(i);
    setAnimKey((k) => k + 1);
  };

  const PanelComponent = PANELS[active];

  return (
    <section className="about-section" id="about" ref={sectionRef}>

      {/* Background watermark */}
      <div className="about-watermark" aria-hidden="true">
        {TABS[active].toUpperCase()}
      </div>

      <div className={`aww-layout ${visible ? 'aww-visible' : ''}`}>

        {/* ── Left Tab Rail ── */}
        <nav className="tab-rail" aria-label="Section navigation">

          <div className="tab-rail-section-label">02 / PROFILE</div>

          <ul className="tab-list">
            {TABS.map((tab, i) => (
              <li key={tab}>
                <button
                  className={`tab-btn ${active === i ? 'tab-btn--active' : ''}`}
                  onClick={() => handleTabClick(i)}
                  aria-current={active === i ? 'true' : undefined}
                >
                  <span className="tab-btn-index">0{i + 1}</span>
                  <span className="tab-btn-name">{tab}</span>
                  <span className="tab-btn-line" />
                </button>
              </li>
            ))}
          </ul>

          <div className="tab-rail-counter">
            <span className="trc-active">0{active + 1}</span>
            <span className="trc-sep"> — </span>
            <span className="trc-total">0{TABS.length}</span>
          </div>
        </nav>

        {/* ── Content Panel ── */}
        <div className="panel-area">
          <div key={animKey} className="panel-enter">
            <PanelComponent />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;