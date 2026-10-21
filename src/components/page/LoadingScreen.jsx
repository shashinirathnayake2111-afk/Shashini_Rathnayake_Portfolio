import React, { useState, useEffect } from 'react';
import '../styles/LoadingScreen.css';
import profileImg from '../../assets/profile.png';
import bgImg from '../../assets/bg.jpg';

const TOTAL_DURATION = 2800;

const LoadingScreen = ({ onReveal, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Preload hero images and ensure font readiness
    const img1 = new Image();
    img1.src = profileImg;
    const img2 = new Image();
    img2.src = bgImg;

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.catch(() => {});
    }

    const startTime = performance.now();
    let animId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / TOTAL_DURATION, 1);

      const eased = t < 0.65
        ? (t / 0.65) * 0.78
        : 0.78 + Math.pow((t - 0.65) / 0.35, 1.2) * 0.22;

      const current = Math.min(Math.round(eased * 100), 100);
      setProgress(current);

      if (t < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        setIsComplete(true);
        // Start curtain lift reveal and trigger Home entrance simultaneously
        setTimeout(() => {
          setIsExiting(true);
          if (typeof onReveal === 'function') onReveal();
        }, 300);

        // Remove loading overlay once curtain has fully lifted out of view
        setTimeout(() => {
          if (typeof onComplete === 'function') onComplete();
        }, 1250);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [onReveal, onComplete]);

  const getStatusText = (val) => {
    if (val < 25) return "INITIALIZING CREATIVE SYSTEM";
    if (val < 58) return "COMPILING FULL STACK ARCHITECTURE";
    if (val < 90) return "CRAFTING UI / UX EXPERIENCES";
    return "SYSTEM READY // WELCOME";
  };

  return (
    <div className={`loading-container ${isExiting ? 'curtain-lift' : ''} ${isComplete ? 'is-complete' : ''}`}>
      {/* ── Radiant Curtain Edge Beam ── */}
      <div className="lc-curtain-beam" aria-hidden="true" />
      {/* ── Ambient Background Glows ── */}
      <div className="lc-glow-mesh" aria-hidden="true" />
      <div className="lc-center-glow" aria-hidden="true" />

      {/* ── Awwwards Corner Labels ── */}
      <div className="lc-corner lc-top-left">
        <div className="lc-status-pill">
          <span className="lc-corner-sub">PORTFOLIO</span>
        </div>
      </div>

      <div className="lc-corner lc-top-right">
        <div className="lc-monogram-box">
          <span className="lc-initials">SR</span>
        </div>
      </div>

      <div className="lc-corner lc-bottom-left">
        <span className="lc-year">2026</span>
      </div>

      {/* ── Main Centerpiece ── */}
      <div className="lc-main-stage">
        <div className="loading-laptop-wrap">
          <div className="laptop-ambient-light" />
          <svg
            viewBox="0 0 240 170"
            className="loading-laptop-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="screenBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1a1612" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0d0a08" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="codeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4a373" />
                <stop offset="100%" stopColor="#e9dfc7" />
              </linearGradient>
            </defs>

            {/* Screen inner glow panel */}
            <rect
              x="42" y="16" width="156" height="100" rx="6"
              fill="url(#screenBgGrad)"
            />

            {/* Screen outer border */}
            <rect
              className="draw-el screen-rect"
              x="40" y="14" width="160" height="104" rx="8"
              fill="none" stroke="#e9dfc7" strokeWidth="2.8"
              style={{ '--len': 560, animationDelay: '0.08s' }}
            />

            {/* Top camera dot */}
            <circle cx="120" cy="20" r="1.5" fill="#e9dfc7" opacity="0.6" />

            {/* Code lines drawn sequentially */}
            <line className="draw-el" x1="56" y1="38" x2="130" y2="38" stroke="url(#codeGrad)" strokeWidth="4.5" strokeLinecap="round" style={{ '--len': 75, animationDelay: '0.45s' }} />
            <line className="draw-el" x1="56" y1="52" x2="160" y2="52" stroke="#f5efe0" strokeWidth="4.5" strokeLinecap="round" opacity="0.75" style={{ '--len': 105, animationDelay: '0.62s' }} />
            <line className="draw-el" x1="56" y1="66" x2="114" y2="66" stroke="url(#codeGrad)" strokeWidth="4.5" strokeLinecap="round" opacity="0.88" style={{ '--len': 60, animationDelay: '0.8s' }} />
            <line className="draw-el" x1="56" y1="80" x2="146" y2="80" stroke="#f5efe0" strokeWidth="4.5" strokeLinecap="round" opacity="0.65" style={{ '--len': 90, animationDelay: '0.98s' }} />
            <line className="draw-el" x1="56" y1="94" x2="100" y2="94" stroke="url(#codeGrad)" strokeWidth="4.5" strokeLinecap="round" opacity="0.8" style={{ '--len': 45, animationDelay: '1.16s' }} />

            {/* Blinking code terminal cursor */}
            <rect
              className="code-cursor-pulse"
              x="106" y="91" width="6" height="7" rx="1"
              fill="#e9dfc7"
            />

            {/* Laptop base outline */}
            <path
              className="draw-el base-path"
              d="M20 132 L220 132 L204 158 L36 158 Z"
              fill="none" stroke="#e9dfc7" strokeWidth="2.8" strokeLinejoin="round"
              style={{ '--len': 430, animationDelay: '1.25s' }}
            />

            {/* Trackpad outline */}
            <rect
              className="draw-el"
              x="104" y="140" width="32" height="10" rx="3"
              fill="none" stroke="#e9dfc7" strokeWidth="1.5" opacity="0.6"
              style={{ '--len': 84, animationDelay: '1.45s' }}
            />
          </svg>
        </div>

        {/* Name and Designation */}
        <div className="lc-brand-title">SHASHINI RATHNAYAKE</div>
        <div className="loading-text">{getStatusText(progress)}</div>

        {/* Progress Bar with glowing follower */}
        <div className="loading-bar-wrapper">
          <div className="loading-bar" style={{ width: `${progress}%` }}>
            <div className="loading-bar-flare" />
          </div>
        </div>

        {/* Percentage Counter */}
        <div className="loading-percentage">
          <span className="lc-pct-num">{String(progress).padStart(3, '0')}</span>
          <span className="lc-pct-sym">%</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;