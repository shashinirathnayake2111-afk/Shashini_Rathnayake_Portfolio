import React, { useEffect } from 'react';
import { Mail, Phone } from 'lucide-react';
import '../styles/ContactDrawer.css';

const ContactDrawer = ({ isOpen, onClose }) => {
  // Add escape key listener to close drawer
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <>
      <div 
        className={`drawer-backdrop ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        className={`contact-drawer ${isOpen ? 'open' : ''}`}
        data-lenis-prevent="true"
      >
        <div className="drawer-header">
          <h2 className="drawer-title">Let's Talk.</h2>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="drawer-content">
          <p className="drawer-subtitle">
            I'm currently available for freelance work and full-time opportunities.
          </p>
          
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" placeholder="John Doe" />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" placeholder="john@example.com" />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" placeholder="Tell me about your project..."></textarea>
            </div>
            
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
          
          <div className="drawer-footer">
            <a href="mailto:shashinirathnayake2111@gmail.com" className="contact-icon-btn" title="Email Me">
              <Mail size={20} />
              <span className="contact-text">shashinirathnayake2111@gmail.com</span>
            </a>
            <a href="tel:+94742949504" className="contact-icon-btn" title="Call Me">
              <Phone size={20} />
              <span className="contact-text">074 2949504</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDrawer;
