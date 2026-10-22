import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
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
    if (href.startsWith('/')) {
      return <Link to={href} className="bento-card-link">{cardInner}</Link>;
    }
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
          animate(1, 'exp', 1000, 100);
          animate(7, 'projects', 1600, 250);
          animate(5, 'certs', 1800, 400);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const techStack = [
    'React.js', 'Next.js', 'Python', 'Flask', 'Node.js',
    'MySQL', 'SQLite', 'Figma', 'TailwindCSS',
  ];

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

        {/* Eyebrow */}
        <motion.div
          className="about-eyebrow"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="about-eyebrow-line" />
          <span className="about-eyebrow-text">ABOUT ME &amp; BACKGROUND</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          className="about-main-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          BRIDGING DESIGN &amp; <span className="title-accent-gold">ROBUST CODE</span>
        </motion.h2>

        {/* Bio */}
        <div className="about-bio-block">
          <StaggeredText
            className="about-bio"
            text="Full-Stack Developer & UI/UX Designer based in Colombo, Sri Lanka — I craft end-to-end digital products from pixel-perfect Figma prototypes to production-grade backends. My work sits at the intersection of clean code and intentional design."
            delay={0.3}
          />
          <StaggeredText
            className="about-bio about-bio-secondary"
            text="Curious by nature, driven by impact. I thrive on learning new frameworks, experimenting with AI tooling, and solving real-world problems that make a difference."
            delay={0.55}
          />
        </div>

        {/* Quote */}
        <motion.div
          className="about-quote-box"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ x: 3 }}
        >
          <p className="about-quote-text">
            &ldquo;Most of what I build starts from a real problem I&apos;ve noticed.{' '}
            <span className="highlight-text">I&apos;d rather ship something useful than something that just looks good in a screenshot.</span>&rdquo;
          </p>
        </motion.div>

        {/* Tech Stack Pills */}
        <motion.div
          className="about-tech-stack"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="tech-stack-label">TECH STACK</span>
          <div className="tech-pills-row">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                className="tech-pill"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 + i * 0.055, duration: 0.35 }}
                whileHover={{ y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <div className="about-actions">
          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            href={resumePDF}
            download="Shashini_Rathnayake_CV.pdf"
            className="btn-primary"
          >
            <span>Download CV</span>
            <span className="btn-icon">↓</span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            href="/#projects"
            className="btn-secondary"
          >
            <span>View Projects</span>
            <span className="btn-arrow">↗</span>
          </motion.a>
        </div>

      </div>

      {/* ── Right Column ── */}
      <div className="about-right-col">
        <PencilArtReveal />

        {/* Stat Cards */}
        <div className="about-bento-stats">
          <BentoCard3D num={counts.exp} unit="+" label="Experience" sub="Hands-on Industry" delay={0.9} href="/experience" />
          <BentoCard3D num={counts.projects} unit="+" label="Projects" sub="Full Stack & UI/UX" highlight delay={1.05} href="/#projects" />
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

  const watermarkY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const panelY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0.3]);
  const bgGlowY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

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