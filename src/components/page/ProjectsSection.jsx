import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';
import '../styles/ProjectsSection.css';
import SahayaImg from '../../assets/projects/sahaya.png';
import LomieesImg from '../../assets/projects/lomiees.png';
import ForgeImg from '../../assets/projects/forge.png';
import RecoverImg from '../../assets/projects/recover.png';
import FinanceImg from '../../assets/projects/finance_tracker.jpg';

const projectData = [
  {
    id: 1,
    title: "ForgeX Fitness",
    category: "Full Stack",
    type: "web",
    tag: "Full Stack",
    image: ForgeImg,
    summary: "A modern fitness platform with workout tracking, coach diet plans, and live gym traffic monitoring.",
    links: {
      figma: "https://www.figma.com/proto/48n3ngMXfR4CIYS1YkrCfh/Untitled?node-id=39-48&p=f&viewport=381%2C75%2C0.18&t=6EdjLAfq1DvFAplt-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=169%3A610&page-id=0%3A1",
      github: "https://github.com/shashinirathnayake2111-afk/ForgeX-Fitness-Website.git",
      live: "https://forge-x-fitness-website.vercel.app/"
    },
    caseStudy: {
      problem: "Needed a website to manage home workouts with coaches, diet plans, and programs. Users required notifications and reminders for workouts, live gym traffic monitoring to choose less crowded times, and a progress tracking system.",
      solution: "Developed a fully responsive fitness website featuring workout management, coach-guided programs, real-time gym traffic monitoring, push notifications, and a comprehensive progress tracking dashboard.",
      challenges: "Integrating real-time gym traffic data and ensuring smooth state management across the dashboard without causing performance bottlenecks.",
      techStack: ["React", "Tailwind CSS", "Node.js", "Figma", "Prototyping"]
    }
  },
  {
    id: 2,
    title: "Sahaya.lk",
    category: "UI/UX",
    type: "mobile",
    tag: "Mobile App",
    image: SahayaImg,
    summary: "Emergency safety application for women and vulnerable groups featuring one-tap SOS and live GPS sharing.",
    links: {
      figma: "https://www.figma.com/proto/Lmjj8NYAtiheZRg9SwmolG/Sahaya.lk?node-id=60-129&p=f&viewport=886%2C99%2C0.21&t=fUGS9LUvvaQxlXwZ-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=63%3A145&page-id=0%3A1"
    },
    caseStudy: {
      problem: "Women and vulnerable individuals lacked a reliable emergency safety app that could instantly alert the nearest police station or family members with their GPS location during a dangerous situation.",
      solution: "Designed a fully scalable mobile app featuring a one-tap SOS button, real-time GPS location sharing, a 30-second audio recording feature, and additional personal safety tools.",
      challenges: "Creating an interface that is extremely intuitive and accessible under high-stress situations while minimizing accidental triggers.",
      techStack: ["Figma", "Prototyping", "Wireframing", "User Research"]
    }
  },
  {
    id: 3,
    title: "Bean Cafe",
    category: "UI/UX",
    type: "mobile",
    tag: "UI/UX Design",
    image: SahayaImg,
    summary: "Sustainable shopping app with verified eco-friendly brands and personal carbon footprint tracking.",
    links: {},
    caseStudy: {
      problem: "Consumers struggle to find authentic eco-friendly products and verify the sustainability claims of different brands while shopping online.",
      solution: "Designed a mobile application that verifies eco-friendly brands, simplifies sustainable shopping, and provides a clear carbon footprint tracker for users.",
      challenges: "Visualizing complex carbon footprint data in a way that is easy for everyday consumers to understand at a glance.",
      techStack: ["Figma", "Prototyping", "UI/UX", "Design System"]
    }
  },
  {
    id: 4,
    title: "Travel Planner",
    category: "Full Stack",
    type: "web",
    tag: "Web App",
    image: ForgeImg,
    summary: "Collaborative trip planning dashboard to manage shared itineraries, split expenses, and bookings.",
    links: {},
    caseStudy: {
      problem: "Planning a trip with multiple people often becomes chaotic, with itineraries, budgets, and bookings scattered across different apps and messages.",
      solution: "Created a collaborative travel planner that helps groups organize itineraries, split expenses, and manage bookings in one centralized, real-time platform.",
      challenges: "Handling real-time collaborative editing for itineraries and ensuring expense calculations were always accurate across different currencies.",
      techStack: ["React", "CSS", "Figma", "JavaScript"]
    }
  },
  {
    id: 5,
    title: "Smart Home UI",
    category: "UI/UX",
    type: "web",
    tag: "UI/UX Design",
    image: LomieesImg,
    summary: "Unified smart home management interface integrating multiple IoT devices into an intuitive control hub.",
    links: {},
    caseStudy: {
      problem: "Smart home owners have to navigate between too many disparate apps to control their various devices, leading to a fragmented user experience.",
      solution: "Designed a unified, customizable dashboard that integrates all smart home devices into a single, intuitive interface with quick-action widgets.",
      challenges: "Designing scalable widgets that accommodate a wide variety of device types (lights, thermostats, locks) within a consistent design language.",
      techStack: ["Figma", "Wireframing", "Prototyping", "Design System"]
    }
  },
  {
    id: 6,
    title: "Lomiees Store",
    category: "Full Stack",
    type: "web",
    tag: "E-Commerce",
    image: LomieesImg,
    summary: "Modern clothing e-commerce store with smooth catalog browsing, cart flows, and branded checkout.",
    links: {
      figma: "https://www.figma.com/proto/RFj22fyDJfxZtQMBsDJWMU/Lomiees-Clouthing?node-id=2-2&p=f&viewport=501%2C92%2C0.11&t=WLN2iOpby0reg7zw-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2%3A2&page-id=0%3A1",
      github: "https://github.com/shashinirathnayake2111-afk/Lomiees-Website",
      live: "https://lomiees-website.vercel.app/"
    },
    caseStudy: {
      problem: "Lomiees required a modern e-commerce platform to sell clothing online. The platform needed to be user-friendly, visually appealing, and easy to manage.",
      solution: "Developed a fully responsive e-commerce website with product browsing, cart management, and a seamless checkout experience tailored to the Lomiees brand identity.",
      challenges: "Optimizing product image loading times and creating a fluid, distraction-free checkout flow to maximize conversion rates.",
      techStack: ["React", "Tailwind CSS", "Node.js", "Figma"]
    }
  },
  {
    id: 7,
    title: "Recover.lk",
    category: "UI/UX",
    type: "web",
    tag: "Healthcare UX",
    image: RecoverImg,
    summary: "Accessibility-first web app for migraine patients featuring doctor channeling and cognitive-safe dark UI.",
    links: {
      figma: "https://www.figma.com/proto/ai3v7JTZ7ZkN2V4lNasmEo/Recover.lk?page-id=0%3A1&node-id=63-163&p=f&viewport=522%2C154%2C0.12&t=A8iyX7QuN1ZMuSAR-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=63%3A163"
    },
    caseStudy: {
      problem: "Migraine patients struggled to manage their daily tasks and office work during episodes, as most digital tools were not designed with their visual and cognitive sensitivity in mind.",
      solution: "Built a web application with doctor channeling, symptom tracking, activity recording, a dark/light mode switcher, and a range of accessibility-focused features specifically designed for migraine patients.",
      challenges: "Balancing high contrast ratios for readability while avoiding visual triggers like bright whites and sharp animations that could induce migraines.",
      techStack: ["Research", "Figma", "Wireframe", "Prototyping"]
    }
  },
  {
    id: 8,
    title: "Finance Tracker UX",
    category: "UI/UX",
    type: "mobile",
    tag: "FinTech UX",
    image: FinanceImg,
    summary: "Mobile-first budget manager turning complex personal expenses into clear, digestible visual insights.",
    links: { figma: "#" },
    caseStudy: {
      problem: "Personal finance apps often overwhelm users with excessive data and complex interfaces, making it difficult to understand their actual spending at a glance.",
      solution: "Designed an intuitive, mobile-first experience that focuses on daily budget remaining, clean spending visualizations, and effortless expense categorization.",
      challenges: "Simplifying complex financial data into digestible, bite-sized charts without losing crucial accounting details.",
      techStack: ["Figma", "Prototyping", "Wireframing", "Mobile UI"]
    }
  }
];

const FILTERS = [
  { key: 'all', label: 'All Works' },
  { key: 'UI/UX', label: 'UI / UX' },
  { key: 'Full Stack', label: 'Full Stack' },
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

/* ── Full Case Study Modal ── */
const CaseStudyModal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        data-lenis-prevent="true"
      >
        <motion.div
          className="modal-content laser-border-wrapper"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="modal-inner">
            <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>

            <div className="modal-header-left">
              <div className="modal-eyebrow">
                <span className="modal-eyebrow-line" />
                <span className="modal-eyebrow-text">{project.category.toUpperCase()}</span>
              </div>
              <h1 className="modal-hero-title">{project.title}</h1>
            </div>

            <div className="modal-story-section">
              <div className="story-full-row">
                <div className="story-label">THE STORY & THE PROBLEM</div>
                <div className="story-content"><p>{project.caseStudy.problem}</p></div>
              </div>

              <div className="story-split-row">
                <div className="story-split-left">
                  <div className="modal-hero-image-wrap">
                    <img src={project.image} alt={project.title} className={`modal-hero-image ${project.type}`} />
                  </div>
                </div>
                <div className="story-split-right">
                  <div className="story-label">THE SOLUTION</div>
                  <div className="story-content"><p>{project.caseStudy.solution}</p></div>
                </div>
              </div>

              <div className="story-row">
                <div className="story-label">KEY CHALLENGES</div>
                <div className="story-content"><p>{project.caseStudy.challenges}</p></div>
              </div>

              <div className="story-row">
                <div className="story-label">TECH STACK</div>
                <div className="story-content">
                  <div className="tech-stack-tags">
                    {project.caseStudy.techStack.map(t => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="story-row">
                <div className="story-label">LINKS & ACCESS</div>
                <div className="story-content modal-actions-inline">
                  {project.links.github && <a href={project.links.github} target="_blank" rel="noreferrer" className="btn-modal-link">GitHub Repo ↗</a>}
                  {project.links.live && <a href={project.links.live} target="_blank" rel="noreferrer" className="btn-modal-link">Live Site ↗</a>}
                  {project.links.figma && <a href={project.links.figma} target="_blank" rel="noreferrer" className="btn-modal-link">Figma Prototype ↗</a>}
                </div>
              </div>
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

  const filtered = projectData.filter(p =>
    filter === 'all' ? true : p.category === filter
  );

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
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`filter-btn ${filter === f.key ? 'active' : ''}`}
              onClick={() => handleFilter(f.key)}
            >
              {f.label}
              <span>({f.key === 'all' ? projectData.length : projectData.filter(p => p.category === f.key).length})</span>
            </button>
          ))}
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


