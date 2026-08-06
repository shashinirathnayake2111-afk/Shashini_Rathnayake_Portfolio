import React from 'react';
import './Navbar.css';

const Navbar = ({ isLoaded }) => {
  return (
    <nav className={`navbar-container ${isLoaded ? 'nav-enter' : ''}`}>
      <a href="#" className="nav-logo">
        Shashini Rathnayake<span className="nav-dot">.</span>
      </a>
      
      <ul className="nav-links">
        <li><a href="#about" className="nav-link">About</a></li>
        <li><a href="#skills" className="nav-link">Skills</a></li>
        <li><a href="#experience" className="nav-link">Experience</a></li>
        <li><a href="#projects" className="nav-link">Projects</a></li>
      </ul>

      <button className="nav-cta">Let's talk</button>
    </nav>
  );
};

export default Navbar;
