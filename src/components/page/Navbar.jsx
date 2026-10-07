import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isLoaded, onContactClick, isInHero }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPill, setShowPill] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pillShownRef = React.useRef(false);
  const scrollTimeoutRef = React.useRef(null);
  const lastScrollYRef = React.useRef(0);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!isInHero) {
        const isScrollingUp = currentScrollY < lastScrollYRef.current - 15;

        if (isScrollingUp) {
          setShowPill(true);
          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => setShowPill(false), 2000);
        }
      }

      if (Math.abs(currentScrollY - lastScrollYRef.current) > 15) {
        lastScrollYRef.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInHero]);

  useEffect(() => {
    if (!isInHero && !pillShownRef.current) {
      pillShownRef.current = true;
      setShowPill(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setShowPill(false), 2000);
    }
    if (isInHero) {
      pillShownRef.current = false;
      setShowPill(false);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    }
  }, [isInHero]);
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
      <nav className={`navbar-container ${isLoaded ? 'nav-enter' : ''} ${!isInHero ? 'nav-scrolled' : ''} ${(!isInHero && !showPill) ? 'nav-fully-hidden' : ''}`}>

        <div className={`nav-full ${!isInHero ? 'nav-hidden' : ''}`}>
          <Link to="/" className="nav-logo">
            Shashini Rathnayake<span className="nav-dot">.</span>
          </Link>

          <ul className="nav-links">
            <li>
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li>
              <Link to="/skills" className="nav-link">Skills</Link>
            </li>
            <li>
              <a href="#experience" className="nav-link" onClick={(e) => handleScrollToSection(e, 'experience')}>Experience</a>
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
            <button className="nav-cta" onClick={onContactClick}>Let's talk</button>
          </div>
        </div>

        {/* Scrolled Pill Content */}
        <div
          className={`nav-pill ${!showPill ? 'nav-pill-hidden' : ''}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="status-dot"></div>
          <span className="status-text">AVAILABLE FOR WORK</span>
        </div>
      </nav>

      {/* Floating Hamburger Menu for Scrolled State */}
      <button
        className={`scrolled-hamburger ${(!isInHero && !isMenuOpen) ? 'visible' : ''}`}
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open Menu"
      >
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
            <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
            <li><Link to="/skills" onClick={() => setIsMenuOpen(false)}>Skills</Link></li>
            <li><a href="#experience" onClick={(e) => handleScrollToSection(e, 'experience')}>Experience</a></li>
            <li><a href="#projects" onClick={(e) => handleScrollToSection(e, 'projects')}>Projects</a></li>
          </ul>
        </div>

        <div className="overlay-bottom">
          <button className="overlay-cta" onClick={() => { setIsMenuOpen(false); onContactClick(); }}>Let's talk</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;