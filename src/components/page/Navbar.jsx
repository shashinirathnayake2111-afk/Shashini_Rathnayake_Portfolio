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

  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`navbar-container ${isLoaded ? 'nav-enter' : ''} ${!isInHero ? 'nav-scrolled' : ''}`}>

        <div className={`nav-full ${!isInHero ? 'nav-hidden' : ''}`}>
          <Link to="/" className="nav-logo">
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
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              {isDarkMode ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
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
          <Link to="/" className="overlay-logo" onClick={() => setIsMenuOpen(false)}>
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