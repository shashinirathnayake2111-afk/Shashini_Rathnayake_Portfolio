import React from 'react';
import { motion } from 'framer-motion';
import '../styles/IntroStatement.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: 'easeOut', delay },
});

// Tech Stack List
const techIcons = [
  { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Tailwind CSS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'MySQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Git', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'Figma', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
];

// Continuous animation fill ekata Seamless Infinite Array set 3x duplicate
const marqueeList = [...techIcons, ...techIcons, ...techIcons];

const IntroStatement = () => {
  return (
    <section className="intro-statement-section" id="intro">
      <div className="intro-split">
        <motion.div className="intro-left" {...fadeUp(0)}>
          <span className="intro-eyebrow">WHO I AM</span>
          <p className="intro-paragraph">
            Bridging the gap between design and engineering from crafting
            intuitive UI/UX prototypes to building scalable full stack web
            applications.
          </p>
        </motion.div>

        <motion.div
          className="intro-divider"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        />

        {/* Right — highlight quote */}
        <motion.div className="intro-right" {...fadeUp(0.2)}>
          <p className="intro-highlight">
            I believe the best digital experiences are born when beautiful
            design meets flawless code and I'm here to build exactly that.
          </p>
        </motion.div>
      </div>

      <div className="marquee-wrapper">
        <div className="tech-badge">
          TECH STACK
        </div>

        <div className="marquee-container">
          <div className="marquee-track">
            {marqueeList.map((item, index) => (
              <div key={index} className="tech-icon">
                <img src={item.src} alt={item.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroStatement;