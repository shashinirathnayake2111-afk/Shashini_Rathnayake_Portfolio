import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Smartphone, Layout, ClipboardList, Layers } from 'lucide-react';
import '../styles/SkillsPage.css';
import Footer from './Footer';

const skillsData = [
  {
    category: "Frontend Development",
    number: "01",
    items: [
      { name: "HTML", devicon: "devicon-html5-plain colored" },
      { name: "CSS", devicon: "devicon-css3-plain colored" },
      { name: "JavaScript", devicon: "devicon-javascript-plain colored" },
      { name: "React", devicon: "devicon-react-original colored" },
      { name: "Next.js", devicon: "devicon-nextjs-plain colored" },
      { name: "Tailwind", devicon: "devicon-tailwindcss-original colored" },
    ]
  },
  {
    category: "Backend & Database",
    number: "02",
    items: [
      { name: "Python", devicon: "devicon-python-plain colored" },
      { name: "Flask", devicon: "devicon-flask-original colored" },
      { name: "Django", devicon: "devicon-django-plain colored" },
      { name: "MySQL", devicon: "devicon-mysql-plain colored" },
      { name: "SQLite", devicon: "devicon-sqlite-plain colored" },
      { name: "Supabase", devicon: "devicon-supabase-plain colored" },
    ]
  },
  {
    category: "Creative & UI",
    number: "03",
    items: [
      { name: "Figma", devicon: "devicon-figma-plain colored" },
      { name: "Canva", devicon: "devicon-canva-original colored" },
      { name: "Wireframing", icon: <PenTool size={26} strokeWidth={1.8} /> },
      { name: "Prototyping", icon: <Smartphone size={26} strokeWidth={1.8} /> },
      { name: "Mockups", icon: <Layout size={26} strokeWidth={1.8} /> },
      { name: "Req. Gathering", icon: <ClipboardList size={26} strokeWidth={1.8} /> },
      { name: "Google Stitch", icon: <Layers size={26} strokeWidth={1.8} /> },
    ]
  }
];

const SkillCard = ({ skill, index }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="cinematic-skill-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="cinematic-skill-glow"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.08) 0%, transparent 60%)`
        }}
      />
      <div className="cinematic-skill-content">
        <div className="cinematic-skill-icon">
          {skill.devicon ? (
            <i className={skill.devicon}></i>
          ) : (
            skill.icon
          )}
        </div>
        <div className="cinematic-skill-name">{skill.name}</div>
      </div>
    </motion.div>
  );
};

const SkillsPage = ({ onContactClick }) => {
  return (
    <div className="cinematic-skills-wrapper">
      <div className="cinematic-bg-orb orb-1"></div>
      <div className="cinematic-bg-orb orb-2"></div>
      <div className="cinematic-noise-overlay"></div>

      <div className="cinematic-skills-container">

        {/* Cinematic Header */}
        {/* Hero Section matching Projects & Experience */}
        <motion.div
          className="skills-hero-header"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="skills-eyebrow">
            <span className="skills-eyebrow-line" />
            <span className="skills-eyebrow-text">TECHNICAL ARSENAL</span>
          </div>
          <h1 className="skills-main-title">
            CORE SKILLS &amp; <span className="title-accent-gold">CAPABILITIES</span>
          </h1>
          <p className="skills-subtitle">
            A comprehensive, industry-tested tech stack spanning high-performance frontend interfaces, resilient backend architectures, and human-centered UI/UX prototypes.
          </p>
        </motion.div>

        {/* Modern 3-Column Category Grid - All categories side-by-side without endless scrolling */}
        <div className="skills-categories-grid">
          {skillsData.map((section, sIdx) => (
            <motion.div
              className="skills-category-card"
              key={section.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: sIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="skills-category-header">
                <span className="skills-category-num">{section.number}</span>
                <h2 className="skills-category-title">{section.category}</h2>
              </div>
              <div className="skills-category-divider" />

              <div className="skills-badges-grid">
                {section.items.map((skill, index) => (
                  <SkillCard skill={skill} index={index} key={skill.name} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer onContactClick={onContactClick} />
    </div>
  );
};

export default SkillsPage;
