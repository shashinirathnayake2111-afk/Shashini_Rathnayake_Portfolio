import React from 'react';
import { motion } from 'framer-motion';
import '../styles/SkillsMarquee.css';

const SKILLS = [
  "REACT", "NODE.JS", "NEXT.JS", "TAILWIND CSS", "HTML", "CSS", "JAVASCRIPT", "FRAMER MOTION", "PYTHON", "FLASK", "MYSQL", "SUPABASE", "FIGMA", "UI/UX DESIGN"
];

const SkillsMarquee = () => {
  return (
    <section className="skills-marquee-section">
      <div className="marquee-wrapper">
        <div className="marquee-inner">
          <div className="marquee-content">
            {SKILLS.map((skill, i) => (
              <span key={`skill-1-${i}`} className="marquee-item">
                <span className="marquee-dot"></span>
                {skill}
              </span>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {SKILLS.map((skill, i) => (
              <span key={`skill-2-${i}`} className="marquee-item">
                <span className="marquee-dot"></span>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsMarquee;
