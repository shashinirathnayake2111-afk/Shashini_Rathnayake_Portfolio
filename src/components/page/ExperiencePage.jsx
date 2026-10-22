import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Calendar, MapPin, ShieldCheck, Accessibility, Layers, ArrowUpRight, FileText, Presentation } from 'lucide-react';
import '../styles/ExperiencePage.css';
import Footer from './Footer';
import resumePDF from '../../assets/resume.pdf';

const bankProjects = [
  {
    id: "01",
    tag: "Banking Solution · Frontend & UI/UX",
    title: "Entrepreneurship Project Management System",
    shortDesc: "An internal enterprise solution built for Regional Development Bank to manage entrepreneurial development initiatives, applicant evaluations, and funding pipelines.",
    responsibilities: [
      "Designed user journeys, low/high-fidelity wireframes, and interactive UI prototypes in Figma.",
      "Engineered clean, responsive, and lightweight frontend interfaces using HTML5, CSS3, and JavaScript.",
      "Personally conducted meetings with bank staff and presented the system, explaining the end-to-end operational workflow."
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Figma", "User Research", "Workflow Presentation"]
  },
  {
    id: "02",
    tag: "Enterprise Security · Access Governance & UI/UX",
    title: "User Creation & Access Management System",
    shortDesc: "A mission-critical internal security portal handling user provisioning, authentication, role-based authorization, and credential governance across bank departments.",
    responsibilities: [
      "Designed WCAG 2.1 accessibility-compliant UI in Figma with high contrast for non-technical administrative staff.",
      "Engineered frontend authentication workflows and Role-Based Access Control (RBAC) role governance.",
      "Created reusable UI component standards and successfully delivered the system into live production use."
    ],
    tech: ["Figma", "WCAG 2.1", "React.js", "RBAC Security", "Design Systems"]
  }
];

const impactHighlights = [
  {
    icon: <Presentation size={28} className="impact-icon" />,
    title: "Stakeholder Presentations & Workflows",
    desc: "Led walkthrough meetings directly with bank staff, effectively explaining system architectures and operational workflows."
  },
  {
    icon: <Layers size={28} className="impact-icon" />,
    title: "Figma UI/UX & Design Systems",
    desc: "Created structured wireframes, component libraries, and interactive prototypes tailored for banking operations."
  },
  {
    icon: <Accessibility size={28} className="impact-icon" />,
    title: "WCAG 2.1 Accessibility Standards",
    desc: "Engineered ergonomic, high-contrast user interfaces tested to minimize error rates for non-technical bank officers."
  },
  {
    icon: <ShieldCheck size={28} className="impact-icon" />,
    title: "Role-Based Access & Frontend Logic",
    desc: "Built secure frontend systems using HTML/CSS/JS and React, enforcing multi-tier permissions and data privacy."
  }
];

const ExperiencePage = ({ onContactClick }) => {
  useEffect(() => {
    document.title = "Experience | Shashini Rathnayake";
  }, []);

  return (
    <div className="experience-page-wrapper">
      {/* Ambient background glows */}
      <div className="experience-bg-orb exp-orb-1" />
      <div className="experience-bg-orb exp-orb-2" />
      <div className="experience-noise-overlay" />

      <div className="experience-container">

        {/* ── Page Hero Header ── */}
        <motion.div
          className="experience-hero"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="experience-eyebrow">
            <span className="eyebrow-line" />
            <span>CAREER &amp; INDUSTRY EXPERIENCE</span>
          </div>

          <h1 className="experience-main-title">
            WHERE I&apos;VE <span className="title-accent-gold">WORKED</span>
          </h1>

          <p className="experience-subtitle">
            Hands-on software engineering and UI/UX design inside enterprise banking systems,
            transforming complex financial workflows into accessible, high-performance digital tools.
          </p>
        </motion.div>

        {/* ── Main Company Spotlight: Regional Development Bank ── */}
        <motion.div
          className="company-spotlight-card"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="company-spotlight-top">
            <div className="company-badge-wrap">
              <span className="live-pill">
                <span className="live-dot" />
                1+ YEAR EXPERIENCE
              </span>
              <span className="tenure-badge">2024 – 2025</span>
            </div>

            <div className="company-heading-block">
              <div className="company-icon-frame">
                <Building2 size={36} strokeWidth={1.8} />
              </div>
              <div>
                <h2 className="company-title">Regional Development Bank</h2>
                <div className="company-meta-row">
                  <span className="company-role">Frontend Developer &amp; UI/UX Designer</span>
                  <span className="meta-sep">·</span>
                  <span className="company-location">
                    <MapPin size={14} className="inline-icon" /> Head Office, Sri Lanka
                  </span>
                  <span className="meta-sep">·</span>
                  <span className="company-duration">
                    <Calendar size={14} className="inline-icon" /> 1+ Year Hands-on
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="company-summary">
            At Regional Development Bank (RDB) Head Office, I contributed as both a <strong>Frontend Developer</strong> and <strong>UI/UX Designer</strong> across two internal enterprise solutions. My responsibilities covered stakeholder requirement gathering, Figma UI/UX prototyping, conducting presentation meetings with bank staff to explain end-to-end workflows, and engineering robust frontends in HTML, CSS, JavaScript, and React.
          </p>

          {/* Quick Metrics Bento */}
          <div className="experience-stats-grid">
            <div className="exp-stat-box">
              <span className="exp-stat-num">1<span className="gold-unit">+ Yr</span></span>
              <span className="exp-stat-label">Duration</span>
              <span className="exp-stat-desc">Full-time hands-on experience</span>
            </div>
            <div className="exp-stat-box">
              <span className="exp-stat-num">2<span className="gold-unit">+</span></span>
              <span className="exp-stat-label">Enterprise Systems</span>
              <span className="exp-stat-desc">Built for bank-wide internal operations</span>
            </div>
            <div className="exp-stat-box">
              <span className="exp-stat-num">WCAG<span className="gold-unit">2.1</span></span>
              <span className="exp-stat-label">Accessibility</span>
              <span className="exp-stat-desc">Tailored for non-technical bank staff</span>
            </div>
            <div className="exp-stat-box">
              <span className="exp-stat-num">RBAC<span className="gold-unit">Auth</span></span>
              <span className="exp-stat-label">Security Focus</span>
              <span className="exp-stat-desc">Multi-tier role authorization UI</span>
            </div>
          </div>
        </motion.div>

        {/* ── Enterprise Projects Section ── */}
        <div className="bank-projects-section">
          <div className="section-sub-header">
            <span className="sub-header-line" />
            <h3 className="sub-header-title">PROJECTS BUILT AT REGIONAL DEVELOPMENT BANK</h3>
          </div>

          <div className="bank-projects-grid">
            {bankProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                className="bank-project-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="project-card-header">
                  <span className="project-num">PROJECT {project.id}</span>
                  <span className="project-tag">{project.tag}</span>
                </div>

                <h4 className="project-title">{project.title}</h4>
                <p className="project-desc">{project.shortDesc}</p>

                <div className="project-key-list">
                  <span className="key-list-heading">KEY CONTRIBUTIONS:</span>
                  <ul>
                    {project.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-tech-pills">
                  {project.tech.map((t, tIdx) => (
                    <span key={tIdx} className="tech-pill">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Impact Highlights Bento Grid ── */}
        <div className="impact-section">
          <div className="section-sub-header">
            <span className="sub-header-line" />
            <h3 className="sub-header-title">KEY DESIGN &amp; ENGINEERING COMPETENCIES</h3>
          </div>

          <div className="impact-cards-grid">
            {impactHighlights.map((item, idx) => (
              <motion.div
                key={idx}
                className="impact-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="impact-icon-wrap">{item.icon}</div>
                <h4 className="impact-title">{item.title}</h4>
                <p className="impact-desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Bottom Call To Action ── */}
        <motion.div
          className="experience-cta-strip"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="cta-left">
            <h3 className="cta-title">Looking for a developer &amp; designer who bridges code with intuitive UI/UX?</h3>
            <p className="cta-sub">Let&apos;s build accessible, scalable, and beautifully crafted enterprise software together.</p>
          </div>
          <div className="cta-right">
            <a href={resumePDF} download="Shashini_Rathnayake_CV.pdf" className="btn-exp-download">
              <FileText size={16} />
              <span>Download CV</span>
            </a>
            <button className="btn-exp-contact" onClick={onContactClick}>
              <span>Let&apos;s Talk</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </motion.div>

      </div>

      <Footer onContactClick={onContactClick} />
    </div>
  );
};

export default ExperiencePage;
