import React, { useState, useEffect, useRef } from 'react';
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
    title: "ForgeX Fitness",
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
    title: "Smart Home UI",
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
    title: "Lomiees Store",
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
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="awwwards-projects-section" id="projects" ref={sectionRef}>
       <div className="awwwards-projects-header">
           <motion.div 
             initial={{ opacity: 0, y: 50 }} 
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           >
             <span className="awwwards-eyebrow">SELECTED WORKS</span>
             <h2>FEATURED <br/><span className="outline-text">PROJECTS</span></h2>
           </motion.div>
       </div>

       <div className="awwwards-projects-list">
         {projectData.map((project, idx) => (
            <motion.div 
              className="awwwards-project-row" 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(project)}
            >
               <div className="awwwards-project-number">
                 0{idx + 1}
               </div>
               
               <div className="awwwards-project-title">
                  {project.title}
               </div>
               
               <div className="awwwards-project-category">
                 {project.category}
               </div>
               
               <div className="awwwards-project-arrow">
                 <span>↗</span>
               </div>
            </motion.div>
         ))}
       </div>

       {/* Floating Image Reveal */}
       <motion.div 
         className="awwwards-floating-image-wrapper"
         animate={{
           x: mousePos.x - 200, // center the image 400x500
           y: mousePos.y - 250,
           opacity: hoveredProject ? 1 : 0,
           scale: hoveredProject ? 1 : 0.8,
           rotate: hoveredProject ? (mousePos.x % 10 - 5) : 0 // subtle rotation based on mouse pos
         }}
         transition={{ type: "spring", stiffness: 150, damping: 25, mass: 0.5 }}
       >
         <AnimatePresence mode="wait">
            {hoveredProject && (
              <motion.img 
                key={hoveredProject.id}
                src={hoveredProject.image}
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="awwwards-floating-image"
              />
            )}
         </AnimatePresence>
       </motion.div>

       {selectedProject && <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
};

export default ProjectsSection;
