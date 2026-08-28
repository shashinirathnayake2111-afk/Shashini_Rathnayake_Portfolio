import React from 'react';
import { motion } from 'framer-motion';
import '../styles/IntroStatement.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: 'easeOut', delay },
});

const IntroStatement = () => {
  return (
    <section className="intro-statement-section" id="intro">

      <div className="intro-bg-text" aria-hidden="true">DESIGN&nbsp;&nbsp;CODE</div>
      <div className="intro-split">

        <motion.div className="intro-left" {...fadeUp(0)}>
          <span className="intro-eyebrow">WHO I AM</span>
          <p className="intro-paragraph">
            Bridging the gap between design and engineering from crafting
            intuitive UI/UX prototypes to building scalable full-stack web
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

    </section>
  );
};

export default IntroStatement;
