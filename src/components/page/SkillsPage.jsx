import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Smartphone } from 'lucide-react';
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
      { name: "Supabase", devicon: "devicon-supabase-plain colored" },
    ]
  },
  {
    category: "Creative & UI",
    number: "03",
    items: [
      { name: "Figma", devicon: "devicon-figma-plain colored" },
      { name: "Wireframing", icon: <PenTool size={48} strokeWidth={1.5} /> },
      { name: "Prototyping", icon: <Smartphone size={48} strokeWidth={1.5} /> },
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
        <motion.div
          className="cinematic-skills-hero"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="cinematic-eyebrow">THE ARSENAL</div>
          <h1 className="cinematic-hero-title">
            TECHNICAL <span className="cinematic-hero-accent">CAPABILITIES</span>
          </h1>
        </motion.div>

        {/* Cinematic Sections Stack */}
        <div className="cinematic-sections-stack">
          {skillsData.map((section) => (
            <div className="cinematic-section-row" key={section.category}>

              <div className="cinematic-section-left">
                <motion.div
                  className="cinematic-section-title-wrap"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="cinematic-section-title">
                    {section.category}
                  </h2>
                </motion.div>
              </div>

              <div className="cinematic-section-right">
                <div className="cinematic-skills-grid">
                  {section.items.map((skill, index) => (
                    <SkillCard skill={skill} index={index} key={skill.name} />
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      <Footer onContactClick={onContactClick} />
    </div>
  );
};

export default SkillsPage;
