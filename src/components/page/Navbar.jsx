import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isLoaded, onContactClick, isInHero }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPillVisible, setIsPillVisible] = useState(true);
  const hideTimerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const isHoveredRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const INACTIVITY_DELAY = 2000;

  useEffect(() => {
    if (isInHero) {
      setIsPillVisible(true);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
      return;
    }

    const startHideTimer = () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
      hideTimerRef.current = setTimeout(() => {
        if (!isHoveredRef.current) {
          setIsPillVisible(false);
        }
      }, INACTIVITY_DELAY);
    };

    const handleUserActivity = () => {
      setIsPillVisible(true);
      startHideTimer();
    };

    // Start 2s timer upon entering scrolled state
    startHideTimer();

    const handleMouseMove = (e) => {
      const dx = Math.abs(e.clientX - lastMousePosRef.current.x);
      const dy = Math.abs(e.clientY - lastMousePosRef.current.y);
      if (dx > 2 || dy > 2) {
        lastMousePosRef.current = { x: e.clientX, y: e.clientY };
        handleUserActivity();
      }
    };

    const handleTouch = () => {
      handleUserActivity();
    };

    const handleWheelOrScroll = () => {
      handleUserActivity();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('wheel', handleWheelOrScroll, { passive: true });
    window.addEventListener('scroll', handleWheelOrScroll, { passive: true });

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('wheel', handleWheelOrScroll);
      window.removeEventListener('scroll', handleWheelOrScroll);
    };
  }, [isInHero]);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Lock body scroll and handle Escape key when full-screen menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  const handleLogoClick = (e) => {
    if (e) e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: false, duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 120);
    } else {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: false, duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleScrollToSection = (e, id) => {
    if (e) e.preventDefault();
    setIsMenuOpen(false);

    const performScroll = () => {
      let attempts = 0;
      const checkAndScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          requestAnimationFrame(() => {
            if (window.lenis) {
              window.lenis.scrollTo(el, { offset: 5, duration: 1.2, immediate: false });
            } else {
              const rect = el.getBoundingClientRect();
              const absoluteY = rect.top + window.pageYOffset + 5;
              window.scrollTo({ top: absoluteY, behavior: 'smooth' });
            }
          });
        } else if (attempts < 40) {
          attempts++;
          setTimeout(checkAndScroll, 50);
        }
      };

      checkAndScroll();
    };

    if (location.pathname !== '/') {
      navigate('/#projects', { state: { scrollTo: id } });
      setTimeout(performScroll, 60);
    } else {
      performScroll();
    }
  };

  return (
    <>
      <nav
        className={`navbar-container ${isLoaded ? 'nav-enter' : ''} ${!isInHero ? 'nav-scrolled' : ''} ${(!isInHero && !isPillVisible) ? 'nav-fully-hidden' : ''}`}
        onMouseEnter={() => {
          isHoveredRef.current = true;
          setIsPillVisible(true);
          if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          if (!isInHero) {
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
            hideTimerRef.current = setTimeout(() => {
              if (!isHoveredRef.current) setIsPillVisible(false);
            }, INACTIVITY_DELAY);
          }
        }}
      >

        <div className={`nav-full ${!isInHero ? 'nav-hidden' : ''}`}>
          <Link to="/" className="nav-logo" onClick={handleLogoClick}>
            Shashini Rathnayake<span className="nav-dot">.</span>
          </Link>

          <ul className="nav-links">
            <li>
              <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
            </li>
            <li>
              <Link to="/skills" className={`nav-link ${location.pathname === '/skills' ? 'active' : ''}`}>Skills</Link>
            </li>
            <li>
              <Link to="/experience" className={`nav-link ${location.pathname === '/experience' ? 'active' : ''}`}>Experience</Link>
            </li>
            <li>
              <a href="#projects" className="nav-link" onClick={(e) => handleScrollToSection(e, 'projects')}>Projects</a>
            </li>
          </ul>

          <div className="nav-actions">
            <button
              className={`theme-toggle-btn moon-toggle ${isDarkMode ? 'is-dark' : 'is-light'}`}
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <span className="moon-toggle-inner">
                {/* Moon disc + shadow = crescent */}
                <span className="moon-disc" />
                <span className="moon-shadow" />
                {/* Stars — visible in dark mode */}
                <span className="moon-star ms-1" />
                <span className="moon-star ms-2" />
                <span className="moon-star ms-3" />
              </span>
            </button>
            <button className="nav-cta desktop-only-cta" onClick={onContactClick}>Let's talk</button>
            <button
              className="mobile-hamburger-btn"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Navigation Menu"
            >
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
            </button>
          </div>
        </div>

        {/* Scrolled Pill — visible when outside hero, hides after inactivity */}
        <div
          className={`nav-pill ${(isInHero || !isPillVisible) ? 'nav-pill-hidden' : ''}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Back to top"
        >
          <div className="status-dot-wrap">
            <span className="status-dot" />
            <span className="status-dot-pulse" />
          </div>
          <span className="status-text">AVAILABLE FOR WORK</span>
          <span className="pill-arrow" aria-hidden="true">↑</span>
        </div>
      </nav>

      {/* Floating Hamburger Menu for Scrolled State */}
      <button className={`scrolled-hamburger ${(!isInHero && !isMenuOpen) ? 'visible' : ''}`}
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open Menu">
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </button>

      {/* Full-Screen Awwwards Overlay Menu */}
      <div
        className={`nav-fullscreen-overlay ${isMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        {/* Ambient Gold Glow & Background Depth */}
        <div className="overlay-ambient-glow" />
        <div className="overlay-mesh-lines" />

        <div className="overlay-inner-wrapper">
          {/* Header Bar */}
          <div className="overlay-header">
            <Link to="/" className="overlay-header-logo" onClick={handleLogoClick}>
              <span className="logo-text">Shashini Rathnayake</span>
              <span className="nav-dot">.</span>
            </Link>

            <button
              className="menu-close-btn"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close Navigation Menu"
            >
              <span className="close-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
            </button>
          </div>

          {/* Main Layout: Navigation + Secondary Information */}
          <div className="overlay-body">
            <div className="overlay-nav-section">
              <span className="overlay-subheading">// NAVIGATION</span>
              <ul className="overlay-menu-links">
                <li className="overlay-menu-item">
                  <Link
                    to="/about"
                    className={`overlay-link ${location.pathname === '/about' ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="link-number">01.</span>
                    <span className="link-text">About</span>
                    <span className="link-hover-arrow">→</span>
                  </Link>
                </li>
                <li className="overlay-menu-item">
                  <Link
                    to="/skills"
                    className={`overlay-link ${location.pathname === '/skills' ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="link-number">02.</span>
                    <span className="link-text">Skills</span>
                    <span className="link-hover-arrow">→</span>
                  </Link>
                </li>
                <li className="overlay-menu-item">
                  <Link
                    to="/experience"
                    className={`overlay-link ${location.pathname === '/experience' ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="link-number">03.</span>
                    <span className="link-text">Experience</span>
                    <span className="link-hover-arrow">→</span>
                  </Link>
                </li>
                <li className="overlay-menu-item">
                  <a
                    href="#projects"
                    className="overlay-link"
                    onClick={(e) => handleScrollToSection(e, 'projects')}
                  >
                    <span className="link-number">04.</span>
                    <span className="link-text">Projects</span>
                    <span className="link-hover-arrow">→</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Right / Secondary Info column for luxury depth */}
            <div className="overlay-details-section">
              <div className="overlay-detail-card">
                <span className="detail-tag">// STATUS</span>
                <div className="detail-status">
                  <span className="status-gold-dot" />
                  <span>Available for Full-time Roles &amp; Freelance</span>
                </div>
              </div>

              <div className="overlay-detail-card">
                <span className="detail-tag">// LOCATION</span>
                <p className="detail-text">Colombo, Sri Lanka <span className="detail-meta">(UTC+5:30)</span></p>
              </div>

              <div className="overlay-detail-card">
                <span className="detail-tag">// DIRECT INQUIRY</span>
                <a href="mailto:shashinirathnayake2111@gmail.com" className="detail-email">
                  shashinirathnayake2111@gmail.com
                </a>
              </div>

              <div className="overlay-detail-card">
                <span className="detail-tag">// SOCIAL ARCHIVE</span>
                <div className="overlay-social-links">
                  <a href="https://linkedin.com/in/shashini-rathnayake" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                  <a href="https://github.com/shashini-rathnayake" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                  <a href="https://www.behance.net/shashinimalsha" target="_blank" rel="noopener noreferrer">Behance ↗</a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Action CTAs & Luxury Signature */}
          <div className="overlay-footer">
            <div className="overlay-action-buttons">
              <a
                href="/resume.pdf"
                download="Shashini_Rathnayake_CV.pdf"
                className="overlay-cv-btn"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Download CV</span>
                <span className="overlay-btn-arrow">↓</span>
              </a>
              <button
                className="overlay-cta"
                onClick={() => { setIsMenuOpen(false); onContactClick(); }}
              >
                <span>Let's talk</span>
                <span className="overlay-btn-arrow">↗</span>
              </button>
            </div>

            <div className="overlay-footer-note">
              <span>© {new Date().getFullYear()} SHASHINI RATHNAYAKE • ALL RIGHTS RESERVED</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;