import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/ProjectsSection.css';
import codeImg from '../../assets/projects/sahaya.png';

const projectData = [
  {
    id: 1,
    title: "ForgeX Fitness Website",
    category: "Full Stack Development",
    image: codeImg,
    gridClass: "bento-small",
    links: { github: "https://github.com/shashinirathnayake2111-afk/ForgeX-Fitness-Website.git", live: "https://forge-x-fitness-website.vercel.app/" },
    caseStudy: {
      problem: "Needed a website that manage home workout with coaches, diet plans and programs with the guidence using the wesite and coaches. Also needed to user will get the notifications and reminders for the workouts, live gym traffic to make sure they are going to the gym when it is not much crowd and track their progress etc.",
      solution: "Developed a fully responsive fitness website with all the features mentioned above.",
      techStack: ["Figma", "Prototyping", "React", "Tailwind CSS", "Node.js", ""]
    }
  },
  {
    id: 2,
    title: "Task Management App",
    category: "UI/UX & Frontend",
    image: codeImg,
    gridClass: "bento-small",
    links: { figma: "#", github: "#" },
    caseStudy: {
      problem: "Existing tools were too complex for small freelance teams.",
      solution: "Designed a minimalist interface focusing on core task completion and real-time collaboration.",
      techStack: ["Figma", "React", "Firebase"]
    }
  },
  {
    id: 1,
    title: "Sahaya.lk",
    category: "UI/UX Design",
    image: codeImg,
    gridClass: "bento-small",
    links: { Figma: "https://www.figma.com/proto/Lmjj8NYAtiheZRg9SwmolG/Sahaya.lk?node-id=60-129&p=f&viewport=886%2C99%2C0.21&t=fUGS9LUvvaQxlXwZ-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=63%3A145&page-id=0%3A1" },
    caseStudy: {
      problem: "I needed a mobile app for all the females and other when they are in a danger, alert nearest police station or family memeber notify by sending GPS location with a alert system and 30 second audio record",
      solution: "Developed a fully scalable mobile app with SOS button feature, GPS location and 30 second audio record feature and other safety features.",
      techStack: ["Figma", "Prototyping", "Wireframing"]
    }
  },
  {
    id: 4,
    title: "Real-Estate Finder",
    category: "Full Stack",
    image: codeImg,
    gridClass: "bento-wide",
    links: { github: "#", live: "#" },
    caseStudy: {
      problem: "Finding apartments with specific pet-friendly filters was difficult.",
      solution: "Built a specialized search engine for pet-friendly rentals with map integrations.",
      techStack: ["React", "Express", "MongoDB", "Google Maps API"]
    }
  },
  {
    id: 5,
    title: "Finance Tracker UX",
    category: "UI/UX Design",
    image: codeImg,
    gridClass: "bento-small",
    links: { figma: "#" },
    caseStudy: {
      problem: "Personal finance apps often overwhelm users with too much data.",
      solution: "Designed an intuitive mobile-first experience focusing on daily budget remaining.",
      techStack: ["Figma", "Prototyping", "Wireframing"]
    }
  },
  {
    id: 6,
    title: "Social Media API",
    category: "Backend",
    image: codeImg,
    gridClass: "bento-small",
    links: { github: "#" },
    caseStudy: {
      problem: "Needed a scalable backend for a new niche social network.",
      solution: "Engineered a robust REST API with JWT authentication and optimized graph queries.",
      techStack: ["Node.js", "Express", "MySQL", "Redis"]
    }
  },
  {
    id: 7,
    title: "Portfolio Template",
    category: "Frontend",
    image: codeImg,
    gridClass: "bento-small",
    links: { github: "#", live: "#" },
    caseStudy: {
      problem: "Developers struggle to create unique, cinematic portfolios.",
      solution: "Built an open-source, easily customizable Awwwards-style portfolio template.",
      techStack: ["React", "Framer Motion", "Vanilla CSS"]
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
            <button className="modal-close" onClick={onClose}>✕</button>
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
                <h4>Tech Stack & Skills</h4>
                <div className="tech-stack-tags">
                  {project.caseStudy.techStack.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-actions">
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noreferrer" className="btn-modal-link">GitHub ↗</a>
              )}
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noreferrer" className="btn-modal-link">Live Site ↗</a>
              )}
              {project.links.figma && (
                <a href={project.links.figma} target="_blank" rel="noreferrer" className="btn-modal-link">Figma ↗</a>
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
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - wrapperRef.current.offsetLeft;
    scrollLeft.current = wrapperRef.current.scrollLeft;
    wrapperRef.current.style.cursor = 'grabbing';
  };
  const handleMouseLeave = () => {
    isDragging.current = false;
    if (wrapperRef.current) wrapperRef.current.style.cursor = 'grab';
  };
  const handleMouseUp = () => {
    isDragging.current = false;
    if (wrapperRef.current) wrapperRef.current.style.cursor = 'grab';
  };
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - wrapperRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    wrapperRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const bentoProjects = projectData.slice(0, 4);
  const overflowProjects = projectData.slice(4);

  const renderCard = (project, i, delay = 0) => (
    <motion.div
      key={project.id}
      className={`bento-item ${project.gridClass}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay }}
      onClick={() => setSelectedProject(project)}
    >
      <div className="bento-item-bg" style={{ backgroundImage: `url(${project.image})` }}></div>
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
        </motion.div>

        <div
          className="projects-carousel-wrapper"
          ref={wrapperRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="projects-drag-row">
            {/* Fixed bento block: first 4 cards */}
            <div className="bento-grid">
              {bentoProjects.map((project, i) => renderCard(project, i, i * 0.08))}
            </div>

            {/* Overflow cards: stack in pairs of 2 vertically, extending to the right */}
            {overflowProjects.length > 0 && (
              <div className="overflow-cards">
                {overflowProjects.map((project, i) => renderCard(project, i, 0.3 + i * 0.08))}
              </div>
            )}
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
