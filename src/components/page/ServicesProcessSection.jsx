import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Palette,
  Code2,
  Layers,
  MessageSquare,
  Search,
  PenTool,
  Terminal,
  GitBranch,
  Rocket,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react';
import '../styles/ServicesProcessSection.css';

/* ── Services ── */
const services = [
  {
    id: '01',
    icon: Palette,
    title: 'UI/UX Design',
    desc: 'Human-centred interfaces that feel intuitive, look stunning, and pass WCAG accessibility.',
    tools: ['Figma', 'FigJam', 'WCAG 2.1', 'Mobile Design', 'Web Design'],
  },
  {
    id: '02',
    icon: Code2,
    title: 'Web Development',
    desc: 'Performant, pixel-perfect web apps built with modern stacks and clean component architecture.',
    tools: ['React', 'Next.js', 'Flask', 'Tailwind'],
  },
  {
    id: '03',
    icon: Layers,
    title: 'Design Systems',
    desc: 'Unified token-based design languages that bridge Figma and code for rapid team execution.',
    tools: ['Tokens', 'Components', 'Dark / Light'],
  },
];

/* ── Process Steps ── */
const steps = [
  {
    key: 'req',
    icon: MessageSquare,
    label: 'Requirement',
  },
  {
    key: 'research',
    icon: Search,
    label: 'Research',
  },
  {
    key: 'design',
    icon: PenTool,
    label: 'Design',
  },
  {
    key: 'build',
    icon: Terminal,
    label: 'Build',
  },
  {
    key: 'cicd',
    icon: GitBranch,
    label: 'CI/CD & Git',
  },
  {
    key: 'deploy',
    icon: Rocket,
    label: 'Deploy',
  },
];

export default function ServicesProcessSection({ onContactClick }) {
  const [active, setActive] = useState(0);
  const processRef = useRef(null);
  const inView = useInView(processRef, { once: true, margin: '-80px' });

  return (
    <section className="sps-section" id="services">

      <div className="sps-glow sps-glow-l" aria-hidden="true" />
      <div className="sps-glow sps-glow-r" aria-hidden="true" />

      <div className="sps-inner">

        <div className="sps-block">
          <motion.div
            className="sps-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="sps-line" />
            WHAT I DO
            <span className="sps-line" />
          </motion.div>

          <motion.h2
            className="sps-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            SERVICES I <span className="sps-gold">DELIVER</span>
          </motion.h2>

          <div className="svc-grid">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.id}
                  className="svc-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="svc-top">
                    <div className="svc-icon-box">
                      <Icon size={22} />
                    </div>
                    <span className="svc-num">{svc.id}</span>
                  </div>
                  <h3 className="svc-title">{svc.title}</h3>
                  <p className="svc-desc">{svc.desc}</p>
                  <div className="svc-pills">
                    {svc.tools.map(t => (
                      <span key={t} className="svc-pill">{t}</span>
                    ))}
                  </div>
                  <button className="svc-btn" onClick={onContactClick}>
                    Discuss project <ArrowUpRight size={14} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="sps-block" ref={processRef}>
          <motion.div
            className="sps-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="sps-line" />
            HOW I WORK
            <span className="sps-line" />
          </motion.div>

          <motion.h2
            className="sps-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            FROM IDEA TO <span className="sps-gold">LIVE</span>
          </motion.h2>

          {/* ── Step Nodes + Connecting Arrows ── */}
          <div className="proc-track">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = active === idx;
              const isDone = idx < active;
              return (
                <React.Fragment key={step.key}>
                  {/* Node */}
                  <motion.button
                    className={`proc-node ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}
                    onClick={() => setActive(idx)}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.45, delay: idx * 0.09 + 0.1 }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    aria-label={step.label}
                  >
                    <div className="proc-icon-ring">
                      <Icon size={30} />
                    </div>
                    <span className="proc-label">{step.label}</span>
                    {isActive && (
                      <motion.div
                        className="proc-active-halo"
                        layoutId="procHalo"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      />
                    )}
                  </motion.button>

                  {/* Arrow connector (not after last) */}
                  {idx < steps.length - 1 && (
                    <motion.div
                      className={`proc-arrow ${idx < active ? 'arrow-lit' : ''}`}
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                      transition={{ duration: 0.35, delay: idx * 0.09 + 0.28 }}
                    >
                      <span className="proc-arrow-line" />
                      <ArrowRight size={14} className="proc-arrow-head" />
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
