import React, { useEffect, useRef, useState } from 'react';
import '../styles/AboutSection.css';
import resumePDF from '../../assets/resume.pdf';

const TABS = ['About', 'Skills', 'Education', 'Experience'];

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

const AboutPanel = () => {
  const [counts, setCounts] = useState({ exp: 0, projects: 0, certs: 0 });
  const panelRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const animate = (target, key, duration, delay = 0) => {
            setTimeout(() => {
              const start = performance.now();
              const frame = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                setCounts((prev) => ({ ...prev, [key]: Math.floor(ease * target) }));
                if (progress < 1) requestAnimationFrame(frame);
              };
              requestAnimationFrame(frame);
            }, delay);
          };

          animate(8, 'exp', 1400, 100);
          animate(7, 'projects', 1600, 250);
          animate(5, 'certs', 1800, 400);
        }
      },
      { threshold: 0.25 }
    );

    if (panelRef.current) observer.observe(panelRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="tab-panel-about" ref={panelRef}>

      <h2 className="about-title">
        I build the whole thing — <br />
        <span className="about-title-sub">
          the interface and what runs <span className="title-stroke">behind it.</span>
        </span>
      </h2>

      <div className="about-bio-block">
        <p className="about-bio">
          I&apos;m <span className="highlight-text">Shashini</span>, a full stack developer and UI/UX designer based in Sri Lanka. I like taking a project from a rough sketch in Figma to something people can actually click through and rely on, without losing sight of either half along the way.
        </p>

        <div className="about-quote-box">
          <p className="about-quote-text">
            &ldquo;Most of what I build starts from a real problem I&apos;ve noticed like someone tracking migraines who&apos;s tired of apps that don&apos;t get it. <span className="highlight-text">I&apos;d rather ship something useful than something that just looks good in a screenshot.</span>&rdquo;
          </p>
        </div>
      </div>

      <div className="about-bento-stats">
        <div className="bento-stat-card">
          <div className="bento-stat-top">
            <span className="bento-stat-num">{counts.exp}</span>
            <span className="bento-stat-unit">M</span>
          </div>
          <div className="bento-stat-label">Months Experience</div>
          <div className="bento-stat-sub">Hands-on Software Development</div>
        </div>

        <div className="bento-stat-card highlight-card">
          <div className="bento-stat-top">
            <span className="bento-stat-num">{counts.projects}</span>
            <span className="bento-stat-plus">+</span>
          </div>
          <div className="bento-stat-label">Projects Built</div>
          <div className="bento-stat-sub">Full Stack &amp; UI/UX Endeavors</div>
        </div>

        <div className="bento-stat-card">
          <div className="bento-stat-top">
            <span className="bento-stat-num">{counts.certs}</span>
            <span className="bento-stat-plus">+</span>
          </div>
          <div className="bento-stat-label">Certificates</div>
          <div className="bento-stat-sub">Google, Meta &amp; Academic Honors</div>
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
          <span>GitHub Profile</span>
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