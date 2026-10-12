import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Calendar, MapPin, ShieldCheck, Accessibility, Layers, ArrowUpRight, FileText, CheckCircle2 } from 'lucide-react';
import '../styles/ExperiencePage.css';
import Footer from './Footer';
import resumePDF from '../../assets/resume.pdf';

const bankProjects = [
  {
    id: "01",
    tag: "Banking Solution · Full Stack & UI/UX",
    title: "Entrepreneurship Project Management System",
    shortDesc: "A complete enterprise solution designed and engineered for Regional Development Bank to manage entrepreneurial development initiatives, applicant evaluations, and funding pipelines.",
    responsibilities: [
      "Led end-to-end user research, user flows, and low-fidelity wireframing to high-fidelity Figma prototypes.",
      "Developed responsive, modern React.js frontend interfaces tailored for bank officers.",
      "Implemented role-based access control (RBAC) and streamlined complex application workflows.",
      "Delivered an intuitive dashboard enabling transparent project tracking and automated status updates."
    ],
    tech: ["React.js", "Figma", "JavaScript", "REST APIs", "CSS3 / Modern UI", "User Research"]
  },
  {
    id: "02",
    tag: "Enterprise Security · Access Governance",
    title: "User Creation & Access Management System",
    shortDesc: "A mission-critical internal security portal handling user provisioning, authentication, role-based authorization, and credential governance across bank departments.",
    responsibilities: [
      "Engineered secure authentication and authorization workflows with strict role-based access.",
      "Crafted WCAG accessibility-compliant UI specifically designed for smooth adoption by non-technical staff.",
      "Created reusable UI component systems and design tokens in Figma for rapid enterprise development.",
      "Successfully launched the live system to non-technical bank staff with comprehensive usability testing."
    ],
    tech: ["React.js", "WCAG 2.1 Accessibility", "Figma", "Security UI", "Design Systems", "Prototyping"]
  }
];

const impactHighlights = [
  {
    icon: <ShieldCheck size={28} className="impact-icon" />,
    title: "Role-Based Access Control",
    desc: "Architected secure authentication workflows, multi-tiered permission levels, and data privacy safeguards for sensitive banking operations."
  },
  {
    icon: <Accessibility size={28} className="impact-icon" />,
    title: "WCAG Accessibility Compliance",
    desc: "Designed interfaces with clear typographic hierarchy and high-contrast accessibility standards to empower non-technical bank staff."
  },
  {
    icon: <Layers size={28} className="impact-icon" />,
    title: "High-Fidelity Design Systems",
    desc: "Created structured Figma component libraries, responsive design standards, and interactive prototypes bridging design and engineering."
  },
  {
    icon: <CheckCircle2 size={28} className="impact-icon" />,
    title: "Live Production Launch",
    desc: "Delivered two full-stack internal enterprise systems directly into production use at Regional Development Bank Head Office."
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
            <span>CAREER & INDUSTRY EXPERIENCE</span>
          </div>

          <h1 className="experience-main-title">
            WHERE I&apos;VE <span className="title-accent-gold">WORKED</span>
          </h1>

          <p className="experience-subtitle">
            Hands-on software engineering and UI/UX architecture inside enterprise banking systems,
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
                8 MONTHS EXPERIENCE
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
                    <Calendar size={14} className="inline-icon" /> 8 Months Hands-on
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="company-summary">
            At Regional Development Bank (RDB) Head Office, I led the UI/UX design, frontend development,
            and responsive engineering for two full stack internal systems. My work spanned initial user research,
            role-based access requirements, low to high-fidelity wireframing and interactive Figma prototyping,
            through to production-ready React.js implementation and deployment to non-technical bank staff.
          </p>

          {/* Quick Metrics Bento */}
          <div className="experience-stats-grid">
            <div className="exp-stat-box">
              <span className="exp-stat-num">8<span className="gold-unit">M</span></span>
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
            <h3 className="sub-header-title">KEY ENGINEERING &amp; DESIGN COMPETENCIES</h3>
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
            <h3 className="cta-title">Looking for a developer who understands real enterprise systems?</h3>
            <p className="cta-sub">Let&apos;s build scalable, beautifully designed software together.</p>
          </div>
          <div className="cta-right">
            <a href={resumePDF} download className="btn-exp-download">
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
