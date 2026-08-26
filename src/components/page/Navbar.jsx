import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isLoaded, onContactClick }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
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
    <nav className={`navbar-container ${isLoaded ? 'nav-enter' : ''}`}>
      <Link to="/" className="nav-logo">
        Shashini Rathnayake<span className="nav-dot">.</span>
      </Link>
      
      <ul className="nav-links">
        <li>
          <Link to="/about" className="nav-link">About</Link>
        </li>
        <li>
          <a href="#skills" className="nav-link" onClick={(e) => handleScrollToSection(e, 'skills')}>Skills</a>
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
    </nav>
  );
};

export default Navbar;