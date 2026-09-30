import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import '../styles/AboutSection.css';
import resumePDF from '../../assets/resume.pdf';
import pencilArt from '../../assets/pencilart.png';

const BentoCard3D = ({ num, unit, label, sub, highlight, delay, href }) => {
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

  const cardInner = (
    <motion.div
      ref={cardRef}
      className={`bento-stat-card ${highlight ? 'highlight-card' : ''} ${href ? 'bento-clickable' : ''}`}
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
        {href && <div className="bento-nav-hint">View ↗</div>}
      </div>
      <div className="bento-corner-accent" />
    </motion.div>
  );

  if (href) {
    return <a href={href} className="bento-card-link">{cardInner}</a>;
  }
  return cardInner;
};

/* ── Pencil Art with draw-in reveal ── */
const PencilArtReveal = () => {
  const imgRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!imgRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={imgRef}
      className="pencilart-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={revealed ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Aura glow behind image */}
      <div className="pencilart-aura" />

      {/* The image — clip-path draw wipe from bottom */}
      <div className={`pencilart-clip-wrap ${revealed ? 'draw-in' : ''}`}>
        <img
          src={pencilArt}
          alt="Pencil Art Portrait"
          className="pencilart-img"
        />
      </div>

      {/* Subtle cream frame line */}
      <div className="pencilart-frame" />

      {/* Label under image */}
      <motion.div
        className="pencilart-label"
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <span className="pencilart-line" />
        <span className="pencilart-label-text">SHASHINI RATHNAYAKE</span>
        <span className="pencilart-line" />
      </motion.div>
    </motion.div>
  );
};

/* ── Staggered Text Reveal ── */
const StaggeredText = ({ text, className, delay = 0 }) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.015, delayChildren: delay },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.p
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.28em' }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants} style={{ display: 'inline-block' }}>
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

/* ── Cinematic Title ── */
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

/* ── About Panel ── */
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
      {/* ── Left Column ── */}
      <div className="about-left-col">

        {/* Eyebrow label */}
        <motion.div
          className="about-eyebrow"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="about-eyebrow-line" />
          <span className="about-eyebrow-text">ABOUT</span>
        </motion.div>

        <CinematicTitle text="I build the whole thing — the interface and what runs behind it." />

        <div className="about-bio-block">
          <StaggeredText
            className="about-bio"
            text="I'm a full stack developer and UI/UX designer, blending aesthetics with robust engineering. I enjoy taking projects from a rough sketch in Figma to building the scalable backend architecture that powers it, delivering solutions people can actually rely on."
            delay={0.6}
          />
          <StaggeredText
            className="about-bio about-bio-secondary"
            text="I genuinely love learning new things — whether it's diving into a new framework, experimenting with AI tooling, or figuring out how something works under the hood. That curiosity is what keeps my work evolving."
            delay={1.0}
          />

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

      {/* ── Right Column ── */}
      <div className="about-right-col">

        {/* Pencil Art — above the cards */}
        <PencilArtReveal />

        {/* Stat Cards */}
        <div className="about-bento-stats">
          <BentoCard3D num={counts.exp} unit="M" label="Months Experience" sub="Hands-on Experience" delay={0.9} href="#experience" />
          <BentoCard3D num={counts.projects} unit="+" label="Projects Built" sub="Full Stack & UI/UX" highlight delay={1.05} href="/#projects" />
          <BentoCard3D num={counts.certs} unit="+" label="Certificates" sub="IBM & Others" delay={1.2} href="/about#education" />
        </div>
      </div>
    </motion.div>
  );
};

const AboutSection = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const panelY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const bgGlowY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section className="about-section" id="about" ref={sectionRef}>

      <motion.div className="about-ambient-glow" style={{ y: bgGlowY }} aria-hidden="true" />

      <motion.div
        className="about-watermark"
        style={{ y: watermarkY, opacity: 0.028 }}
        aria-hidden="true"
      >
        ABOUT
      </motion.div>

      <motion.div className="aww-layout" style={{ opacity: panelOpacity, y: panelY }}>
        <div className="panel-area">
          <AboutPanel />
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;