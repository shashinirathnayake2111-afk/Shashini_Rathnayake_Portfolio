import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import '../styles/AboutSection.css';
import resumePDF from '../../assets/resume.pdf';

const BentoCard3D = ({ num, unit, label, sub, highlight, delay }) => {
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springConfig = { stiffness: 300, damping: 25 };
  const rotX = useSpring(rotateX, springConfig);
  const rotY = useSpring(rotateY, springConfig);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotateX.set(((y - centerY) / centerY) * -14);
    rotateY.set(((x - centerX) / centerX) * 14);
    glareX.set((x / rect.width) * 100);
    glareY.set((y / rect.height) * 100);
  }, [rotateX, rotateY, glareX, glareY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  }, [rotateX, rotateY, glareX, glareY]);

  return (
    <motion.div
      ref={cardRef}
      className={`bento-stat-card ${highlight ? 'highlight-card' : ''}`}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 800 }}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, type: 'spring', bounce: 0.35 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ z: 30 }}
    >

      <motion.div
        className="bento-glare"
        style={{
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(230,201,168,0.18) 0%, transparent 60%)`,
        }}
      />
      <div className="bento-content" style={{ transform: 'translateZ(20px)' }}>
        <div className="bento-stat-top">
          <span className="bento-stat-num">{num}</span>
          <span className="bento-stat-unit">{unit}</span>
        </div>
        <div className="bento-stat-label">{label}</div>
        <div className="bento-stat-sub">{sub}</div>
      </div>
      <div className="bento-corner-accent" />
    </motion.div>
  );
};

const CinematicTitle = ({ text }) => {
  const words = text.split(' ');
  const strokeWords = ['behind', 'it.'];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.065, delayChildren: 0.15 } },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(12px)', scale: 0.96 },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)', scale: 1,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.h2
      className="about-title"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className={strokeWords.includes(word) ? 'title-stroke' : ''}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
};

const AboutPanel = () => {
  const [counts, setCounts] = useState({ exp: 0, projects: 0, certs: 0 });
  const hasAnimated = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const animate = (target, key, duration, delay = 0) => {
            setTimeout(() => {
              const start = performance.now();
              const frame = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                setCounts((prev) => ({ ...prev, [key]: Math.floor(ease * target) }));
                if (progress < 1) requestAnimationFrame(frame);
              };
              requestAnimationFrame(frame);
            }, delay);
          };
          animate(8, 'exp', 1400, 100);
          animate(7, 'projects', 1600, 250);
          animate(5, 'certs', 1800, 400);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="tab-panel-about cinematic-grid"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
      transition={{ duration: 0.5 }}
    >
      <div className="about-left-col">
        <CinematicTitle text="I build the whole thing — the interface and what runs behind it." />

        <div className="about-bio-block">
          <motion.p
            className="about-bio"
            initial={{ opacity: 0, x: -24, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            I&apos;m <span className="highlight-text">Shashini</span>, a full stack developer and UI/UX designer based in Sri Lanka. I like taking a project from a rough sketch in Figma to something people can actually click through and rely on.
          </motion.p>

          <motion.div
            className="about-quote-box"
            initial={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="about-quote-text">
              &ldquo;Most of what I build starts from a real problem I&apos;ve noticed. <span className="highlight-text">I&apos;d rather ship something useful than something that just looks good in a screenshot.</span>&rdquo;
            </p>
          </motion.div>
        </div>

        <div className="about-actions">
          <motion.a whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} href={resumePDF} download className="btn-primary">
            <span>Download CV</span>
          </motion.a>
          <motion.a whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} href="https://github.com/shashinirathnayake2111-afk" target="_blank" rel="noreferrer" className="btn-secondary">
            <span>GitHub</span><span className="btn-arrow">↗</span>
          </motion.a>
        </div>
      </div>

      <div className="about-right-col">
        <div className="about-bento-stats">
          <BentoCard3D num={counts.exp} unit="M" label="Months Experience" sub="Hands-on Experience" delay={0.9} />
          <BentoCard3D num={counts.projects} unit="+" label="Projects Built" sub="Full Stack & UI/UX" highlight delay={1.05} />
          <BentoCard3D num={counts.certs} unit="+" label="Certificates" sub="IBM & Others" delay={1.2} />
        </div>
      </div>
    </motion.div>
  );
};

const TABS = ['About'];
const PANELS = [AboutPanel];

const GlassTabs = ({ active, setActive }) => (
  <div className="glass-tabs">
    {TABS.map((tab, i) => (
      <button
        key={tab}
        type="button"
        className={`glass-tab ${active === i ? 'active' : ''}`}
        onClick={() => setActive(i)}
      >
        {tab}
      </button>
    ))}
  </div>
);

const AboutSection = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const panelY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const bgGlowY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const PanelComponent = PANELS[active];

  return (
    <section className="about-section" id="about" ref={sectionRef}>

      <motion.div className="about-ambient-glow" style={{ y: bgGlowY }} aria-hidden="true" />

      <motion.div
        className="about-watermark"
        style={{ y: watermarkY, opacity: 0.028 }}
        aria-hidden="true"
      >
        {TABS[active].toUpperCase()}
      </motion.div>

      <motion.div className="aww-layout" style={{ opacity: panelOpacity, y: panelY }}>

        {/* Floating Glass Tabs */}
        <GlassTabs active={active} setActive={setActive} />

        {/* Content Panel */}
        <div className="panel-area">
          <AnimatePresence mode="wait">
            <PanelComponent key={active} />
          </AnimatePresence>
        </div>

      </motion.div>
    </section>
  );
};

export default AboutSection;