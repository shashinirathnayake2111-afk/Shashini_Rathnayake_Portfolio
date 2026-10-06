import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/ProjectsSection.css';
import SahayaImg from '../../assets/projects/sahaya.jpg';
import LomieesImg from '../../assets/projects/lomiees.jpg';
import ForgeImg from '../../assets/projects/forge.jpg';
import RecoverImg from '../../assets/projects/recover.jpg';
import FinanceImg from '../../assets/projects/finance_tracker.jpg';

const projectData = [
  {
    id: 1,
    title: "ForgeX Fitness Website",
    category: "UI/UX & Full Stack Development",
    image: ForgeImg,
    links: { figma: "https://www.figma.com/proto/48n3ngMXfR4CIYS1YkrCfh/Untitled?node-id=39-48&p=f&viewport=381%2C75%2C0.18&t=6EdjLAfq1DvFAplt-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=169%3A610&page-id=0%3A1", github: "https://github.com/shashinirathnayake2111-afk/ForgeX-Fitness-Website.git", live: "https://forge-x-fitness-website.vercel.app/" },
    caseStudy: {
      problem: "Needed a website to manage home workouts with coaches, diet plans, and programs. Users required notifications and reminders for workouts, live gym traffic monitoring to choose less crowded times, and a progress tracking system.",
      solution: "Developed a fully responsive fitness website featuring workout management, coach-guided programs, real-time gym traffic monitoring, push notifications, and a comprehensive progress tracking dashboard.",
      techStack: ["Figma", "Prototyping", "React", "Tailwind CSS", "Node.js"]
    }
  },
  {
    id: 2,
    title: "Sahaya.lk",
    category: "UI/UX Design",
    image: SahayaImg,
    links: { figma: "https://www.figma.com/proto/Lmjj8NYAtiheZRg9SwmolG/Sahaya.lk?node-id=60-129&p=f&viewport=886%2C99%2C0.21&t=fUGS9LUvvaQxlXwZ-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=63%3A145&page-id=0%3A1" },
    caseStudy: {
      problem: "Women and vulnerable individuals lacked a reliable emergency safety app that could instantly alert the nearest police station or family members with their GPS location during a dangerous situation.",
      solution: "Designed a fully scalable mobile app featuring a one-tap SOS button, real-time GPS location sharing, a 30-second audio recording feature, and additional personal safety tools.",
      techStack: ["Figma", "Prototyping", "Wireframing"]
    }
  },
  {
    id: 3,
    title: "Eco Store App",
    category: "Mobile App Design",
    image: SahayaImg,
    links: { },
    caseStudy: {
      problem: "Consumers struggle to find authentic eco-friendly products and verify the sustainability claims of different brands while shopping online.",
      solution: "Designed a mobile application that verifies eco-friendly brands, simplifies sustainable shopping, and provides a clear carbon footprint tracker for users.",
      techStack: ["Figma", "Prototyping", "UI/UX"]
    }
  },
  {
    id: 4,
    title: "Travel Planner",
    category: "UI/UX & Frontend",
    image: ForgeImg,
    links: { },
    caseStudy: {
      problem: "Planning a trip with multiple people often becomes chaotic, with itineraries, budgets, and bookings scattered across different apps and messages.",
      solution: "Created a collaborative travel planner that helps groups organize itineraries, split expenses, and manage bookings in one centralized, real-time platform.",
      techStack: ["React", "Figma", "CSS"]
    }
  },
  {
    id: 5,
    title: "Smart Home Dashboard",
    category: "Web App Design",
    image: LomieesImg,
    links: { },
    caseStudy: {
      problem: "Smart home owners have to navigate between too many disparate apps to control their various devices, leading to a fragmented user experience.",
      solution: "Designed a unified, customizable dashboard that integrates all smart home devices into a single, intuitive interface with quick-action widgets.",
      techStack: ["Figma", "Wireframing", "Prototyping"]
    }
  },
  {
    id: 6,
    title: "Lomiees Clothing Store",
    category: "UI/UX & Full Stack Development",
    image: LomieesImg,
    links: { figma: "https://www.figma.com/proto/RFj22fyDJfxZtQMBsDJWMU/Lomiees-Clouthing?node-id=2-2&p=f&viewport=501%2C92%2C0.11&t=WLN2iOpby0reg7zw-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2%3A2&page-id=0%3A1", github: "https://github.com/shashinirathnayake2111-afk/Lomiees-Website", live: "https://lomiees-website.vercel.app/" },
    caseStudy: {
      problem: "Lomiees required a modern e-commerce platform to sell clothing online. The platform needed to be user-friendly, visually appealing, and easy to manage.",
      solution: "Developed a fully responsive e-commerce website with product browsing, cart management, and a seamless checkout experience tailored to the Lomiees brand identity.",
      techStack: ["Figma", "Prototyping", "React", "Tailwind CSS", "Node.js"]
    }
  },
  {
    id: 7,
    title: "Recover.lk",
    category: "UI/UX Design",
    image: RecoverImg,
    links: { figma: "https://www.figma.com/proto/ai3v7JTZ7ZkN2V4lNasmEo/Recover.lk?page-id=0%3A1&node-id=63-163&p=f&viewport=522%2C154%2C0.12&t=A8iyX7QuN1ZMuSAR-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=63%3A163" },
    caseStudy: {
      problem: "Migraine patients struggled to manage their daily tasks and office work during episodes, as most digital tools were not designed with their visual and cognitive sensitivity in mind.",
      solution: "Built a web application with doctor channeling, symptom tracking, activity recording, a dark/light mode switcher, and a range of accessibility-focused features specifically designed for migraine patients.",
      techStack: ["Research", "Wireframe", "Figma", "Prototyping"]
    }
  },
  {
    id: 8,
    title: "Finance Tracker UX",
    category: "UI/UX Design",
    image: FinanceImg,
    links: { figma: "#" },
    caseStudy: {
      problem: "Personal finance apps often overwhelm users with excessive data and complex interfaces, making it difficult to understand their actual spending at a glance.",
      solution: "Designed an intuitive, mobile-first experience that focuses on daily budget remaining, clean spending visualizations, and effortless expense categorization.",
      techStack: ["Figma", "Prototyping", "Wireframing"]
    }
  }
];

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
      >
        <motion.div
          className="modal-content laser-border-wrapper"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="laser-border"></div>
          <div className="modal-inner">
            <button className="modal-close" onClick={onClose}>x</button>
            <div className="modal-header">
              <span className="modal-category">{project.category}</span>
              <h3 className="modal-title">{project.title}</h3>
            </div>
            <div className="modal-body">
              <div className="case-study-section">
                <h4>The Problem</h4>
                <p>{project.caseStudy.problem}</p>
              </div>
              <div className="case-study-section">
                <h4>The Solution</h4>
                <p>{project.caseStudy.solution}</p>
              </div>
              <div className="case-study-section">
                <h4>Tech Stack and Skills</h4>
                <div className="tech-stack-tags">
                  {project.caseStudy.techStack.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-actions">
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noreferrer" className="btn-modal-link">GitHub</a>
              )}
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noreferrer" className="btn-modal-link">Live Site</a>
              )}
              {project.links.figma && (
                <a href={project.links.figma} target="_blank" rel="noreferrer" className="btn-modal-link">Figma</a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const wrapperRef = useRef(null);

  const isDragging = useRef(false);
  const didDrag = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const momentumId = useRef(null);

  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorDragging, setCursorDragging] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  const runMomentum = useCallback(() => {
    if (!wrapperRef.current) return;
    velocity.current *= 0.92;
    wrapperRef.current.scrollLeft += velocity.current;
    updateProgress();
    if (Math.abs(velocity.current) > 0.5) {
      momentumId.current = requestAnimationFrame(runMomentum);
    }
  }, [updateProgress]);

  const stopDrag = useCallback(() => {
    isDragging.current = false;
    setCursorDragging(false);
    if (Math.abs(velocity.current) > 1) {
      momentumId.current = requestAnimationFrame(runMomentum);
    }
  }, [runMomentum]);

  const handleMouseEnter = () => setCursorVisible(true);
  const handleMouseLeave = () => {
    setCursorVisible(false);
    if (isDragging.current) stopDrag();
  };

  const handleMouseMove = (e) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (rect) {
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    if (!isDragging.current) return;
    e.preventDefault();
    const now = performance.now();
    const dt = now - lastTime.current;
    const x = e.pageX;
    const walk = x - startX.current;
    if (Math.abs(walk) > 3) didDrag.current = true;
    if (dt > 0) {
      velocity.current = (lastX.current - x) / dt * 12;
    }
    lastX.current = x;
    lastTime.current = now;
    wrapperRef.current.scrollLeft = scrollLeftStart.current - walk;
    updateProgress();
  };

  const handleMouseDown = (e) => {
    if (momentumId.current) cancelAnimationFrame(momentumId.current);
    isDragging.current = true;
    didDrag.current = false;
    startX.current = e.pageX;
    scrollLeftStart.current = wrapperRef.current.scrollLeft;
    lastX.current = e.pageX;
    lastTime.current = performance.now();
    velocity.current = 0;
    setCursorDragging(true);
  };

  const handleMouseUp = () => stopDrag();

  const handleCardClick = (project) => {
    if (didDrag.current) return;
    setSelectedProject(project);
  };

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateProgress, { passive: true });
    return () => el.removeEventListener('scroll', updateProgress);
  }, [updateProgress]);

  useEffect(() => () => {
    if (momentumId.current) cancelAnimationFrame(momentumId.current);
  }, []);

  const renderCard = (project, i) => (
    <motion.div
      key={project.id}
      className={"bento-item cinematic-card-" + (i + 1)}
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => handleCardClick(project)}
    >
      <div className="bento-item-bg" style={{ backgroundImage: "url(" + project.image + ")" }}></div>
      <div className="bento-item-overlay"></div>
      <div className="bento-item-content">
        <span className="project-category">{project.category}</span>
        <h3 className="project-title">{project.title}</h3>
      </div>
      <div className="bento-item-hover-actions">
        <span className="view-btn">View Case Study <span className="arrow">↗</span></span>
      </div>
    </motion.div>
  );

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">SELECTED WORKS</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="drag-hint">
            <span className="drag-hint-icon">⟵</span>
            Drag to explore
            <span className="drag-hint-icon">⟶</span>
          </p>
        </motion.div>

        <div className="carousel-outer">
          <div
            className="projects-carousel-wrapper"
            ref={wrapperRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <div className="projects-drag-row">
              <div className="bento-grid">
                {projectData.map((project, i) => renderCard(project, i))}
              </div>
            </div>

            <motion.div
              className="drag-cursor"
              animate={{
                opacity: cursorVisible ? 1 : 0,
                scale: cursorDragging ? 0.85 : 1,
                x: cursorPos.x - 44,
                y: cursorPos.y - 44,
              }}
              transition={{
                opacity: { duration: 0.2 },
                scale: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                x: { duration: 0 },
                y: { duration: 0 },
              }}
            >
              <span className="drag-cursor-label">{cursorDragging ? 'HOLD' : 'DRAG'}</span>
            </motion.div>
          </div>
        </div>
      </div>

      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
