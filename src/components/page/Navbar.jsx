import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isLoaded, onContactClick, isInHero }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

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

    const doScroll = () => {
      const el = document.getElementById(id);
      if (!el) return;
      // Compute absolute page Y so it works regardless of fixed/sticky ancestors
      const rect = el.getBoundingClientRect();
      const absoluteY = rect.top + window.pageYOffset + 20;
      if (window.lenis) {
        window.lenis.scrollTo(absoluteY, { duration: 1.4 });
      } else {
        window.scrollTo({ top: absoluteY, behavior: 'smooth' });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      // Wait for the new route to render then scroll
      setTimeout(doScroll, 300);
    } else {
      doScroll();
    }
  };

  return (
    <>
      <nav className={`navbar-container ${isLoaded ? 'nav-enter' : ''} ${!isInHero ? 'nav-scrolled' : ''}`}>

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

        {/* Scrolled Pill — always visible when outside hero */}
        <div className={`nav-pill ${isInHero ? 'nav-pill-hidden' : ''}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="status-dot"></div>
          <span className="status-text">AVAILABLE FOR WORK</span>
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

      {/* Backdrop */}
      <div
        className={`nav-overlay-backdrop ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Left Slide-in Drawer Menu */}
      <div className={`nav-overlay-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="menu-close-btn" onClick={() => setIsMenuOpen(false)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="overlay-content">
          <Link to="/" className="overlay-logo" onClick={handleLogoClick}>
            Shashini<span className="nav-dot">.</span>
          </Link>
          <ul className="overlay-links">
            <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>About</Link></li>
            <li><Link to="/skills" className={location.pathname === '/skills' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Skills</Link></li>
            <li><Link to="/experience" className={location.pathname === '/experience' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Experience</Link></li>
            <li><a href="#projects" onClick={(e) => handleScrollToSection(e, 'projects')}>Projects</a></li>
          </ul>
        </div>

        <div className="overlay-bottom">
          <a
            href="/resume.pdf"
            download="Shashini_Rathnayake_CV.pdf"
            className="overlay-cv-btn"
            onClick={() => setIsMenuOpen(false)}
          >
            <span>Download CV</span>
            <span className="overlay-btn-arrow">↓</span>
          </a>
          <button className="overlay-cta" onClick={() => { setIsMenuOpen(false); onContactClick(); }}>
            <span>Let's talk</span>
            <span className="overlay-btn-arrow">↗</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;