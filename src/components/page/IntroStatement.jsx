import React from 'react';
import { motion } from 'framer-motion';
import '../styles/IntroStatement.css';

const textContent = [
  { text: "I believe the best", highlight: false },
  { text: "digital experiences", highlight: true },
  { text: "are born when", highlight: false },
  { text: "beautiful design", highlight: true },
  { text: "meets", highlight: false },
  { text: "flawless code", highlight: true },
  { text: "and I'm here to build exactly that.", highlight: false }
];

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const wordVariant = {
  hidden: { opacity: 0, y: 35, rotateX: -40, scale: 0.9, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  }
};

const IntroStatement = () => {
  return (
    <section className="intro-statement-section" id="intro">

      {/* Left Vertical Anchor */}
      <motion.div
        className="intro-anchor-left"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <div className="intro-anchor-line top"></div>
        <span className="intro-anchor-text">WHO I AM</span>
        <div className="intro-anchor-line bottom"></div>
      </motion.div>

      {/* Floating 3D Visual Background */}
      <div className="intro-floating-visual">
        <img src="/abstract-orb.jpg" alt="Premium 3D Abstract Visual" />
      </div>

      {/* Main Animated Highlight Text */}
      <div className="intro-content">
        <motion.h2
          className="intro-highlight"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {textContent.map((chunk, chunkIndex) => {
            const words = chunk.text.split(" ");
            return words.map((word, wordIndex) => (
              <motion.span
                key={`${chunkIndex}-${wordIndex}`}
                variants={wordVariant}
                className={chunk.highlight ? "highlighted-word" : "normal-word"}
                style={{ marginRight: chunk.highlight ? '6px' : '0.25em', marginBottom: '8px' }}
              >
                {chunk.highlight && (
                  <>
                    <i className="dp" style={{'--sz':'4px','--c':'#f2ead9','--x':'12%','--y':'45%','--dx':'7px','--dy':'-6px','--dl':'0s',   '--dr':'2.8s'}} />
                    <i className="dp" style={{'--sz':'3px','--c':'#e8d5b5','--x':'30%','--y':'65%','--dx':'-5px','--dy':'7px', '--dl':'0.6s', '--dr':'3.3s'}} />
                    <i className="dp" style={{'--sz':'3px','--c':'#d4af37','--x':'62%','--y':'28%','--dx':'6px','--dy':'5px', '--dl':'1.1s', '--dr':'2.6s'}} />
                    <i className="dp" style={{'--sz':'2.5px','--c':'#fdf6e2','--x':'80%','--y':'62%','--dx':'-6px','--dy':'-5px','--dl':'1.6s','--dr':'3.6s'}} />
                    <i className="dp" style={{'--sz':'2px','--c':'#e2c99b','--x':'50%','--y':'52%','--dx':'4px','--dy':'-8px','--dl':'0.9s','--dr':'3.1s'}} />
                    <i className="dp" style={{'--sz':'2px','--c':'#f2ead9','--x':'42%','--y':'20%','--dx':'-3px','--dy':'6px', '--dl':'2s',  '--dr':'2.4s'}} />
                  </>
                )}
                {word}
              </motion.span>
            ));
          })}
        </motion.h2>
      </div>
    </section>
  );
};

export default IntroStatement;