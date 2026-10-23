import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';
import { X, ExternalLink, Layers, Target, Lightbulb, Zap, Palette, Type } from 'lucide-react';
import '../styles/ProjectsSection.css';
import SahayaImg from '../../assets/projects/sahaya.png';
import LomieesImg from '../../assets/projects/lomiees.png';
import ForgeImg from '../../assets/projects/forge.png';
import RecoverImg from '../../assets/projects/recover.png';
import FinanceImg from '../../assets/projects/finance_tracker.jpg';
import BeanImg from '../../assets/projects/beancafe.png';

const projectData = [
  {
    id: 1,
    title: "Recover.lk",
    category: "UI/UX",
    categories: ["UI/UX"],
    type: "web",
    tag: "Healthcare UX",
    image: RecoverImg,
    summary: "Accessibility-first telehealth web application for migraine patients featuring doctor channeling, cognitive-safe dark UI, and sensory controls.",
    links: {
      figma: "https://www.figma.com/proto/ai3v7JTZ7ZkN2V4lNasmEo/Recover.lk?page-id=0%3A1&node-id=63-163&p=f&viewport=522%2C154%2C0.12&t=A8iyX7QuN1ZMuSAR-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=63%3A163",
      github: "https://github.com/shashinirathnayake2111-afk/Recover.lk"
    },
    caseStudy: {
      problem: "Migraine sufferers faced severe visual strain and confusion when managing treatments or booking doctors online during acute episodes, as standard clinical websites use harsh white backgrounds, bright flashes, and dense typography.",
      solution: "Engineered an accessibility-focused web application featuring doctor channeling, symptom severity tracking, a cognitive-safe dark mode toggle, and low-contrast soothing layouts designed to avoid sensory triggers.",
      challenges: "Balancing WCAG AAA contrast readability with gentle low-glare palettes that prevent optical strain during migraine auras, alongside streamlined booking flows requiring minimal cognitive effort.",
      techStack: ["User Research", "Figma", "Accessibility (WCAG)", "Wireframing", "Interactive Prototyping"],
      designSystem: {
        colors: [
          { name: "Obsidian Navy", hex: "#0B132B", role: "Dark Canvas" },
          { name: "Night Slate", hex: "#1C2541", role: "Surface Base" },
          { name: "Steel Indigo", hex: "#3A506B", role: "Secondary Focus" },
          { name: "Calm Cyan", hex: "#38BDF8", role: "Primary Accent" },
          { name: "Pure White", hex: "#F8FAFC", role: "Clinical Contrast" }
        ],
        typography: [
          { role: "Headings & Display", font: "Outfit", style: "Gentle rounded geometric sans" },
          { role: "Body & Telehealth UI", font: "Plus Jakarta Sans", style: "Ultra-legible, low eye-fatigue" }
        ]
      }
    }
  },
  {
    id: 2,
    title: "Sahaya.lk",
    category: "UI/UX",
    categories: ["UI/UX"],
    type: "mobile",
    tag: "Mobile App",
    image: SahayaImg,
    summary: "Emergency personal safety application for women and vulnerable groups featuring rapid one-tap SOS and real-time GPS location dispatch.",
    links: {
      figma: "https://www.figma.com/proto/Lmjj8NYAtiheZRg9SwmolG/Sahaya.lk?node-id=60-129&p=f&viewport=886%2C99%2C0.21&t=fUGS9LUvvaQxlXwZ-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=63%3A145&page-id=0%3A1"
    },
    caseStudy: {
      problem: "Women and vulnerable commuters faced high-stress emergency situations with no reliable single-action tool to immediately broadcast GPS coordinates and alert family or the nearest police station under duress.",
      solution: "Designed an intuitive mobile safety app featuring a prominent one-tap SOS trigger, real-time live GPS broadcast, automatic 30-second discreet ambient audio capture, and quick emergency helpline dialing.",
      challenges: "Designing an interface that can be triggered within milliseconds in panic or low-light conditions, while preventing accidental triggers through intuitive haptic confirmation.",
      techStack: ["Figma", "User Journey Mapping", "Mobile Wireframing", "Interactive Prototyping"],
      designSystem: {
        colors: [
          { name: "SOS Crimson", hex: "#DC2626", role: "Emergency Trigger" },
          { name: "Deep Maroon", hex: "#881337", role: "Secondary Guard" },
          { name: "Midnight Dark", hex: "#0F172A", role: "High-Contrast Base" },
          { name: "Alert Amber", hex: "#F59E0B", role: "Active Broadcasting" },
          { name: "Pure White", hex: "#FFFFFF", role: "Clarity Contrast" }
        ],
        typography: [
          { role: "Emergency Action", font: "Poppins", style: "Bold, instantaneous visual recognition" },
          { role: "Telemetry & Status", font: "Chakra Petch", style: "High-precision GPS coordinates & logs" }
        ]
      }
    }
  },
  {
    id: 3,
    title: "Bean Cafe",
    category: "UI/UX",
    categories: ["UI/UX"],
    type: "mobile",
    tag: "UI/UX Design",
    image: BeanImg,
    summary: "Artisanal coffee ordering & table reservation mobile app designed with bean roast personalization, live brewing status, and digital bean rewards.",
    links: {
      figma: "https://www.figma.com/proto/HujoDsKjzLU9OnmLvM8Cg2/Bean-Cafe?node-id=263-341&page-id=0%3A1&starting-point-node-id=263%3A341&t=H5vXhY8L9dUHxZPw-1"
    },
    caseStudy: {
      problem: "Specialty coffee lovers and busy morning commuters endure long cafe queues, cumbersome roast/milk customization menus, and easily misplaced paper loyalty cards that diminish customer retention.",
      solution: "Engineered a warm, sensory mobile ordering experience allowing users to customize brew strength, milk alternatives, and syrup notes, place skip-the-line pre-orders, book tables, and earn digital bean loyalty points.",
      challenges: "Infusing the digital interface with the cozy, artisanal sensory warmth of specialty cafe culture (espresso, latte crema, and wood tones) without sacrificing speed during peak morning coffee rushes.",
      techStack: ["Figma", "Design Systems", "Mobile Wireframing", "User Research", "Prototyping"],
      designSystem: {
        colors: [
          { name: "Dark Espresso", hex: "#3E2316", role: "Brand Core" },
          { name: "Rich Roast", hex: "#6F4E37", role: "Secondary Coffee" },
          { name: "Caramel Crema", hex: "#C67C4E", role: "Primary Ordering CTA" },
          { name: "Steamed Oat", hex: "#EAD7C5", role: "Surface Accent" },
          { name: "Froth Cream", hex: "#FFF9F2", role: "Light Contrast" }
        ],
        typography: [
          { role: "Artisanal Display", font: "Playfair Display / Serif", style: "Sophisticated boutique cafe branding" },
          { role: "Menu Navigation & UI", font: "Poppins", style: "Clean, frictionless ordering hierarchy" }
        ]
      }
    }
  },
  {
    id: 4,
    title: "ForgeX Fitness",
    category: "Full Stack / UI/UX",
    categories: ["Full Stack", "UI/UX"],
    type: "web",
    tag: "Full Stack / UI/UX",
    image: ForgeImg,
    summary: "High-energy fitness platform featuring custom workout logs, coach-guided diet plans, and real-time gym crowd traffic telemetry.",
    links: {
      figma: "https://www.figma.com/proto/48n3ngMXfR4CIYS1YkrCfh/Untitled?node-id=39-48&p=f&viewport=381%2C75%2C0.18&t=6EdjLAfq1DvFAplt-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=169%3A610&page-id=0%3A1",
      github: "https://github.com/shashinirathnayake2111-afk/ForgeX-Fitness-Website.git",
      live: "https://forge-x-fitness-website.vercel.app/"
    },
    caseStudy: {
      problem: "Gym members struggled to coordinate workouts with coach guidance, frequently arrived at overcrowded gym facilities during peak rush hours, and lacked an all-in-one web dashboard to track exercise sets and nutrition.",
      solution: "Developed a dynamic web application providing live gym traffic density meters, coach workout programs, structured macro diet plans, interactive set/rep tracking, and automatic schedule reminders.",
      challenges: "Integrating live gym traffic telemetry without lag, while creating an aggressive, high-energy dark UI that motivates athletes and remains readable on gym floor mobile devices.",
      techStack: ["React", "Tailwind CSS", "Node.js", "Figma", "Interactive Prototyping"],
      designSystem: {
        colors: [
          { name: "Warm Gold", hex: "#DA9B0C", role: "Primary Accent" },
          { name: "Dark Bronze", hex: "#282218", role: "Surface Depth" },
          { name: "Pure Noir", hex: "#000000", role: "Dominant Canvas" },
          { name: "Gunmetal Grey", hex: "#333537", role: "Card Surface" },
          { name: "Off White", hex: "#F3F3F0", role: "Crisp Typography" }
        ],
        typography: [
          { role: "Metrics & Timers", font: "Bebas Neue", style: "Aggressive athletic numbers & stats" },
          { role: "Dashboard & Coaching", font: "Poppins", style: "Clean, structured workout tables" }
        ]
      }
    }
  },
  {
    id: 5,
    title: "Lomiees Store",
    category: "Full Stack / UI/UX",
    categories: ["Full Stack", "UI/UX"],
    type: "web",
    tag: "E-Commerce / UI/UX",
    image: LomieesImg,
    summary: "Modern clothing e-commerce storefront with streamlined category navigation, interactive size selection, and friction-free checkout.",
    links: {
      figma: "https://www.figma.com/proto/RFj22fyDJfxZtQMBsDJWMU/Lomiees-Clouthing?node-id=2-2&p=f&viewport=501%2C92%2C0.11&t=WLN2iOpby0reg7zw-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2%3A2&page-id=0%3A1",
      github: "https://github.com/shashinirathnayake2111-afk/Lomiees-Website",
      live: "https://lomiees-website.vercel.app/"
    },
    caseStudy: {
      problem: "The Lomiees clothing brand needed an online fashion boutique that reflected modern minimalism while tackling cart drop-offs caused by complicated multi-step checkouts and slow catalog rendering.",
      solution: "Engineered a sleek responsive e-commerce web app with instant product filtering, interactive color/size variant pickers, an animated side-cart drawer, and a streamlined single-page checkout flow.",
      challenges: "Balancing high-resolution editorial fashion photography with rapid load performance, alongside creating luxury subtle micro-animations that feel premium yet lightweight.",
      techStack: ["React", "Node.js", "Tailwind CSS", "Figma", "UI/UX Design"],
      designSystem: {
        colors: [
          { name: "Obsidian Noir", hex: "#0A0D14", role: "Luxury Canvas" },
          { name: "Tailored Slate", hex: "#1E232E", role: "Surface Contrast" },
          { name: "Champagne Gold", hex: "#E6C9A8", role: "Signature Accent" },
          { name: "Warm Cashmere", hex: "#B89C7D", role: "Subtle Warmth" },
          { name: "Clean White", hex: "#F8F9FA", role: "Typography & Clarity" }
        ],
        typography: [
          { role: "Fashion Editorial", font: "Bebas Neue", style: "High-fashion editorial collection headers" },
          { role: "Commerce & Navigation", font: "Poppins", style: "Frictionless pricing & checkout" }
        ]
      }
    }
  }
];

const FILTERS = [
  { key: 'all', label: 'All Works' },
  { key: 'UI/UX', label: 'UI / UX Designs' },
  { key: 'Full Stack', label: 'Full Stack Development' },
];

/* ── GitHubIcon ── */
const IconGithub = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

/* ── LiveIcon ── */
const IconLive = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/* ── FigmaIcon ── */
const IconFigma = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M8 2h4a4 4 0 0 1 4 4 4 4 0 0 1-4 4H8V2z" />
    <path d="M8 10h4a4 4 0 0 1 4 4 4 4 0 0 1-4 4H8v-8z" />
    <path d="M8 18a4 4 0 0 1 4 4 4 4 0 0 1-4-4z" />
    <path d="M8 2a4 4 0 0 0-4 4 4 4 0 0 0 4 4V2z" />
    <path d="M8 10a4 4 0 0 0-4 4 4 4 0 0 0 4 4v-8z" />
  </svg>
);

/* ── Single Project Card ── */
const ProjectCard = ({ project, index, isCenter, onClick }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    VanillaTilt.init(el, {
      max: isCenter ? 10 : 6,
      speed: 900,
      glare: false,
      perspective: 1200,
      scale: isCenter ? 1.02 : 1.01,
      easing: 'cubic-bezier(.03,.98,.52,.99)',
      gyroscope: true,
    });

    return () => {
      if (el?.vanillaTilt) {
        el.vanillaTilt.destroy();
      }
    };
  }, [isCenter]);

  return (
    <div
      ref={cardRef}
      className={`pcard ${isCenter ? 'pcard--center' : 'pcard--side'}`}
      onClick={onClick}
    >
      {/* ── Running Border Glow along the perimeter only ── */}
      <div className="pcard__border-tracer-glow" aria-hidden="true" />
      <div className="pcard__border-tracer" aria-hidden="true" />

      {/* ── Image area with 4-side margin ── */}
      <div className="pcard__image-frame">
        <span className="pcard__index">0{index + 1}</span>
        <img
          src={project.image}
          alt={project.title}
          className="pcard__img"
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
          loading="lazy"
        />

        {/* ── Dark Overlay on Hover (Clean & Deep) ── */}
        <div className="pcard__overlay" aria-hidden="true">
          <div className="pcard__overlay-backdrop" />
          <div className="pcard__overlay-badge-wrap">
            <span className="pcard__overlay-badge">
              <span className="pcard__overlay-badge-text">Explore Case Study</span>
              <span className="pcard__overlay-badge-arrow">↗</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Info bar below image ── */}
      <div className="pcard__info">
        <div className="pcard__meta">
          <span className="pcard__category">{project.category}</span>
          <h3 className="pcard__title">{project.title}</h3>
        </div>

        {/* Quick link icons */}
        <div className="pcard__icons" onClick={e => e.stopPropagation()}>
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" className="pcard__icon-btn" title="GitHub">
              <IconGithub />
            </a>
          )}
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noreferrer" className="pcard__icon-btn" title="Live Site">
              <IconLive />
            </a>
          )}
          {project.links.figma && (
            <a href={project.links.figma} target="_blank" rel="noreferrer" className="pcard__icon-btn" title="Figma">
              <IconFigma />
            </a>
          )}
          <button className="pcard__icon-btn pcard__icon-btn--story" title="Case Study" onClick={onClick}>
            ↗
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Helper to check color luminance for auto text contrast ── */
const isLightColor = (hex) => {
  if (!hex) return false;
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  return (r * 299 + g * 587 + b * 114) / 1000 > 155;
};

/* ── Full Case Study Modal (Modern Magazine / Bento Showcase) ── */
const CaseStudyModal = ({ project, onClose }) => {
  if (!project) return null;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="case-study-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        data-lenis-prevent="true"
      >
        {/* Ambient cosmic orbs for background depth */}
        <div className="case-study-orb orb-gold" aria-hidden="true" />
        <div className="case-study-orb orb-indigo" aria-hidden="true" />

        <motion.div
          className="case-study-container"
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Sticky Navigation Bar */}
          <div className="case-study-topbar">
            <div className="case-study-breadcrumbs">
              <span className="case-study-num">PROJECT 0{project.id}</span>
              <span className="case-study-sep">/</span>
              <span className="case-study-pill">{project.tag || project.category}</span>
            </div>
            <button className="case-study-close-btn" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
          </div>

          {/* Hero Header */}
          <div className="case-study-hero">
            <div className="case-study-eyebrow">
              <span className="case-study-eyebrow-line" />
              <span className="case-study-eyebrow-text">IN-DEPTH CASE STUDY &amp; SYSTEM ARCHITECTURE</span>
            </div>
            <h1 className="case-study-title">{project.title}</h1>
            <p className="case-study-summary">{project.summary}</p>

            {/* Quick Action Link Pills */}
            <div className="case-study-actions">
              {project.links.figma && (
                <a href={project.links.figma} target="_blank" rel="noreferrer" className="case-action-btn btn-figma">
                  <IconFigma />
                  <span>Interactive Figma Prototype</span>
                  <ExternalLink size={13} className="action-arrow" />
                </a>
              )}
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noreferrer" className="case-action-btn btn-live">
                  <IconLive />
                  <span>View Live Deployment</span>
                  <ExternalLink size={13} className="action-arrow" />
                </a>
              )}
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noreferrer" className="case-action-btn btn-github">
                  <IconGithub />
                  <span>GitHub Repository</span>
                  <ExternalLink size={13} className="action-arrow" />
                </a>
              )}
            </div>
          </div>

          {/* Hero Visual Preview Showcase */}
          <div className="case-study-preview-frame">
            <div className="preview-frame-top">
              <div className="preview-dots">
                <span className="p-dot" />
                <span className="p-dot" />
                <span className="p-dot" />
              </div>
              <span className="preview-device-badge">
                {project.type === 'mobile' ? 'Mobile App Interface' : 'Web Application Platform'}
              </span>
            </div>
            <div className="preview-image-wrap">
              <img
                src={project.image}
                alt={project.title}
                className={`preview-hero-img ${project.type === 'mobile' ? 'is-mobile' : 'is-web'}`}
              />
            </div>
          </div>

          {/* Bento Narrative Cards Grid */}
          <div className="case-study-bento-grid">
            {/* 01. The Problem */}
            <div className="case-bento-card bento-problem">
              <div className="bento-card-header">
                <div className="bento-icon-wrap">
                  <Target size={20} />
                </div>
                <div>
                  <span className="bento-card-step">01. CONTEXT &amp; PROBLEM</span>
                  <h3 className="bento-card-title">The Challenge</h3>
                </div>
              </div>
              <p className="bento-card-body">{project.caseStudy.problem}</p>
            </div>

            {/* 02. The Solution */}
            <div className="case-bento-card bento-solution">
              <div className="bento-card-header">
                <div className="bento-icon-wrap">
                  <Lightbulb size={20} />
                </div>
                <div>
                  <span className="bento-card-step">02. STRATEGY &amp; DESIGN</span>
                  <h3 className="bento-card-title">The Solution</h3>
                </div>
              </div>
              <p className="bento-card-body">{project.caseStudy.solution}</p>
            </div>

            {/* 03. Key Hurdles */}
            <div className="case-bento-card bento-challenges">
              <div className="bento-card-header">
                <div className="bento-icon-wrap">
                  <Zap size={20} />
                </div>
                <div>
                  <span className="bento-card-step">03. EXECUTION &amp; ACCESSIBILITY</span>
                  <h3 className="bento-card-title">Key Challenges Overcome</h3>
                </div>
              </div>
              <p className="bento-card-body">{project.caseStudy.challenges}</p>
            </div>

            {/* 04. Technology & Tools */}
            <div className="case-bento-card bento-tech">
              <div className="bento-card-header">
                <div className="bento-icon-wrap">
                  <Layers size={20} />
                </div>
                <div>
                  <span className="bento-card-step">04. ARSENAL</span>
                  <h3 className="bento-card-title">Tech &amp; Design Stack</h3>
                </div>
              </div>
              <div className="case-tech-pills-row">
                {project.caseStudy.techStack.map((tech) => (
                  <span key={tech} className="case-tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* 05. Color Palette */}
            {project.caseStudy.designSystem?.colors && (
              <div className="case-bento-card bento-colors">
                <div className="bento-card-header">
                  <div className="bento-icon-wrap">
                    <Palette size={20} />
                  </div>
                  <div>
                    <span className="bento-card-step">05. VISUAL IDENTITY</span>
                    <h3 className="bento-card-title">Color Palette</h3>
                  </div>
                </div>
                {/* Buddhist-flag inspired vertical color stripes with horizontal text */}
                <div className="case-flag-palette">
                  {project.caseStudy.designSystem.colors.map((c, i) => {
                    const isLight = isLightColor(c.hex);
                    return (
                      <div
                        key={i}
                        className={`flag-stripe ${isLight ? 'is-light' : 'is-dark'}`}
                        style={{ backgroundColor: c.hex }}
                        title={`${c.name} (${c.hex}) - ${c.role}`}
                      >
                        <div className="flag-stripe-content">
                          <span className="flag-stripe-hex">{c.hex}</span>
                          <span className="flag-stripe-name">{c.name}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 06. Typography System */}
            {project.caseStudy.designSystem?.typography && (
              <div className="case-bento-card bento-typography">
                <div className="bento-card-header">
                  <div className="bento-icon-wrap">
                    <Type size={20} />
                  </div>
                  <div>
                    <span className="bento-card-step">06. TYPE SYSTEM</span>
                    <h3 className="bento-card-title">Typography &amp; Hierarchy</h3>
                  </div>
                </div>
                <div className="case-typography-list">
                  {project.caseStudy.designSystem.typography.map((t, i) => (
                    <div key={i} className="typography-item">
                      <div className="typography-item-top">
                        <span className="typography-item-role">{t.role}</span>
                        <span className="typography-item-font">{t.font}</span>
                      </div>
                      <p className="typography-item-style">{t.style}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Docked CTA Bar */}
          <div className="case-study-bottom-bar">
            <div className="bottom-bar-left">
              <span className="bottom-bar-label">Interested in similar work?</span>
              <span className="bottom-bar-sub">Let&apos;s build intuitive interfaces and resilient web apps together.</span>
            </div>
            <div className="bottom-bar-actions">
              {project.links.figma && (
                <a href={project.links.figma} target="_blank" rel="noreferrer" className="btn-bottom-primary">
                  <span>Explore Figma File</span>
                  <ExternalLink size={14} />
                </a>
              )}
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noreferrer" className="btn-bottom-secondary">
                  <span>GitHub Repository</span>
                  <ExternalLink size={14} />
                </a>
              )}
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noreferrer" className="btn-bottom-secondary">
                  <span>Launch Live Site</span>
                  <ExternalLink size={14} />
                </a>
              )}
              <button className="btn-bottom-close" onClick={onClose} aria-label="Close" title="Close Case Study">
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const SLIDE_DIR = { NONE: 0, LEFT: -1, RIGHT: 1 };

const ProjectsSection = () => {
  const [filter, setFilter] = useState('all');
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [direction, setDirection] = useState(SLIDE_DIR.NONE);
  const [isCursorGrabbing, setIsCursorGrabbing] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const lastWheelTimeRef = useRef(0);
  const currentDragOffsetRef = useRef(0);

  const filtered = projectData.filter(p => {
    if (filter === 'all') return true;
    if (p.categories && Array.isArray(p.categories)) {
      return p.categories.includes(filter);
    }
    return p.category === filter || (typeof p.category === 'string' && p.category.includes(filter));
  });

  const handleFilter = (key) => { setFilter(key); setActiveIdx(0); setDirection(SLIDE_DIR.NONE); };

  const go = (dir) => {
    setDirection(dir);
    setActiveIdx(i =>
      dir === SLIDE_DIR.LEFT
        ? (i + 1) % filtered.length
        : (i - 1 + filtered.length) % filtered.length
    );
  };

  const prev = () => go(SLIDE_DIR.RIGHT);
  const next = () => go(SLIDE_DIR.LEFT);

  /* Tactile live drag handlers */
  const handleDragStart = (clientX) => {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = clientX;
    currentDragOffsetRef.current = 0;
    setIsCursorGrabbing(true);
  };

  const handleDragMove = (clientX) => {
    if (!isDraggingRef.current) return;
    const diff = clientX - startXRef.current;
    if (Math.abs(diff) > 8) {
      hasDraggedRef.current = true;
    }
    // Real-time tactile feedback - card moves along with cursor/touch
    currentDragOffsetRef.current = diff * 0.72;
    setDragOffset(diff * 0.72);
  };

  const handleDragEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsCursorGrabbing(false);

    const threshold = 30;
    const offset = currentDragOffsetRef.current;
    if (offset < -threshold) {
      next();
    } else if (offset > threshold) {
      prev();
    }
    setDragOffset(0);
    currentDragOffsetRef.current = 0;
  };

  const handleDragEndRef = useRef(handleDragEnd);
  handleDragEndRef.current = handleDragEnd;

  const handleDragMoveRef = useRef(handleDragMove);
  handleDragMoveRef.current = handleDragMove;

  /* Global mouse listeners ensure smooth dragging even when cursor sweeps off cards */
  useEffect(() => {
    const onGlobalMouseMove = (e) => {
      if (isDraggingRef.current) {
        handleDragMoveRef.current(e.clientX);
      }
    };
    const onGlobalMouseUp = () => {
      if (isDraggingRef.current) {
        handleDragEndRef.current();
      }
    };

    window.addEventListener('mousemove', onGlobalMouseMove);
    window.addEventListener('mouseup', onGlobalMouseUp);
    return () => {
      window.removeEventListener('mousemove', onGlobalMouseMove);
      window.removeEventListener('mouseup', onGlobalMouseUp);
    };
  }, []);

  /* Only horizontal gestures (scroll left/right or trackpad swipe) change project cards.
     Vertical scrolling (page scroll up/down) passes through untouched so the page scrolls naturally. */
  const handleWheel = (e) => {
    // If the scroll has any vertical dominance, do NOT capture it — let the page scroll naturally
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 15) {
      return;
    }

    const now = Date.now();
    if (now - lastWheelTimeRef.current < 320) return;

    if (e.deltaX > 0) {
      // Horizontal scroll right / swipe left -> Next Card
      lastWheelTimeRef.current = now;
      next();
    } else if (e.deltaX < 0) {
      // Horizontal scroll left / swipe right -> Prev Card
      lastWheelTimeRef.current = now;
      prev();
    }
  };

  /* Direction-aware slide variants */
  const ENTER_X = direction === SLIDE_DIR.LEFT ? 300 : direction === SLIDE_DIR.RIGHT ? -300 : 0;
  const EXIT_X = direction === SLIDE_DIR.LEFT ? -300 : direction === SLIDE_DIR.RIGHT ? 300 : 0;

  const slideVariants = {
    enter: { x: ENTER_X, opacity: 0, scale: 0.88 },
    center: { x: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 280, damping: 30 } },
    exit: { x: EXIT_X, opacity: 0, scale: 0.88, transition: { duration: 0.26, ease: [0.32, 0, 0.67, 0] } },
  };

  /* Build the 3-card visible window: [left, center, right] */
  const visibleCards = [-1, 0, 1].map(offset => {
    const idx = (activeIdx + offset + filtered.length) % filtered.length;
    return { project: filtered[idx], originalIdx: projectData.indexOf(filtered[idx]), offset };
  });

  return (
    <section className="projects-showcase-section celestial-night-theme" id="projects">
      <div className="night-sky-stars" />
      <div className="celestial-nebula-glow glow-indigo" />
      <div className="celestial-nebula-glow glow-moonlight" />

      {/* ── Header ── */}
      <div className="projects-header-wrapper">
        <div className="projects-header-content">
          <motion.div
            className="projects-eyebrow"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="projects-eyebrow-line" />
            <span className="projects-eyebrow-text">WHAT I BUILD</span>
          </motion.div>

          <motion.h2
            className="projects-main-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            FEATURED <span className="title-accent-gold">WORKS</span>
          </motion.h2>
        </div>

        {/* ── Filter Tabs ── */}
        <div className="projects-filter-bar">
          {FILTERS.map(f => {
            const count = f.key === 'all'
              ? projectData.length
              : projectData.filter(p =>
                p.categories ? p.categories.includes(f.key) : (p.category === f.key || (typeof p.category === 'string' && p.category.includes(f.key)))
              ).length;

            return (
              <button
                key={f.key}
                className={`filter-btn ${filter === f.key ? 'active' : ''}`}
                onClick={() => handleFilter(f.key)}
              >
                {f.label}
                <span>({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3-Card Spotlight Carousel ── */}
      <div
        className="carousel-wrapper"
        onWheel={handleWheel}
      >
        <button className="carousel-nav carousel-nav--left" onClick={prev} aria-label="Previous">
          <span className="carousel-nav-icon">‹</span>
        </button>

        {/* Tactile drag & touch & wheel surface */}
        <div
          className="carousel-stage-wrap"
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
          style={{ cursor: isCursorGrabbing ? 'grabbing' : 'grab' }}
        >
          <motion.div
            className="carousel-stage"
            animate={{ x: dragOffset }}
            transition={isDraggingRef.current ? { duration: 0 } : { type: 'spring', stiffness: 340, damping: 30 }}
          >
            <AnimatePresence mode="popLayout" custom={direction}>
              {visibleCards.map(({ project, originalIdx, offset }) => (
                <motion.div
                  key={`${filter}-${project.id}-${offset}`}
                  className={`carousel-slot carousel-slot--${offset === 0 ? 'center' : offset < 0 ? 'left' : 'right'}`}
                  variants={offset === 0 ? slideVariants : undefined}
                  initial={offset === 0 ? 'enter' : { opacity: 0, scale: 0.85 }}
                  animate={offset === 0 ? 'center' : { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                  exit={offset === 0 ? 'exit' : { opacity: 0, scale: 0.85, transition: { duration: 0.25 } }}
                >
                  <ProjectCard
                    project={project}
                    index={originalIdx}
                    isCenter={offset === 0}
                    onClick={() => {
                      if (hasDraggedRef.current) return;
                      if (offset === 0) setSelectedProject(project);
                      else if (offset < 0) prev();
                      else next();
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <button className="carousel-nav carousel-nav--right" onClick={next} aria-label="Next">
          <span className="carousel-nav-icon">›</span>
        </button>
      </div>

      {/* ── Progress Dots ── */}
      <div className="carousel-dots">
        {filtered.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === activeIdx ? 'active' : ''}`}
            onClick={() => { setDirection(i > activeIdx ? SLIDE_DIR.LEFT : SLIDE_DIR.RIGHT); setActiveIdx(i); }}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Counter ── */}
      <div className="carousel-counter">
        <span className="counter-current">{String(activeIdx + 1).padStart(2, '0')}</span>
        <span className="counter-sep">/</span>
        <span className="counter-total">{String(filtered.length).padStart(2, '0')}</span>
      </div>

      {/* Drag hint */}
      <div className="carousel-drag-hint">
        <span>← SWIPE / DRAG TO EXPLORE →</span>
      </div>

      {/* Modal */}
      {selectedProject && (
        <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

export default ProjectsSection;


