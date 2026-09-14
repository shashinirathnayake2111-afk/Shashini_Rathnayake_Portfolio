import React, { useEffect, useState } from 'react';
import { Mail, Phone, CheckCircle, Send, AlertCircle, Copy, Check } from 'lucide-react';
import '../styles/ContactDrawer.css';

const ContactDrawer = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Reset state when drawer is opened
  useEffect(() => {
    if (isOpen && status === 'success') {
      setStatus('idle');
      setFormData({ name: '', email: '', message: '' });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('shashinirathnayake2111@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all the fields.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      // Using Formspree API endpoint (or configurable endpoint)
      const response = await fetch('https://formspree.io/f/mqaeedpl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        // Fallback to mailto if endpoint fails
        window.location.href = `mailto:shashinirathnayake2111@gmail.com?subject=Contact from ${encodeURIComponent(
          formData.name
        )}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.email)}`;
        setStatus('success');
      }
    } catch {
      // Fallback for offline / network issues
      window.location.href = `mailto:shashinirathnayake2111@gmail.com?subject=Contact from ${encodeURIComponent(
        formData.name
      )}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.email)}`;
      setStatus('success');
    }
  };

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
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="drawer-content">
          <p className="drawer-subtitle">
            I'm currently available for freelance work and full-time opportunities. Send me a message and I'll get back to you promptly!
          </p>

          {status === 'success' ? (
            <div className="contact-success-card">
              <CheckCircle className="success-icon" size={48} />
              <h3 className="success-title">Message Sent!</h3>
              <p className="success-desc">
                Thank you for reaching out, <span className="highlight-cream">{formData.name || 'friend'}</span>. I have received your message and will respond as soon as possible.
              </p>
              <button
                type="button"
                className="reset-form-btn"
                onClick={() => {
                  setStatus('idle');
                  setFormData({ name: '', email: '', message: '' });
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="form-error-banner">
                  <AlertCircle size={18} />
                  <span>{errorMessage || 'Something went wrong. Please try again.'}</span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, idea, or role..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className={`submit-btn ${status === 'submitting' ? 'loading' : ''}`}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <span className="btn-loading-state">
                    <span className="spinner" />
                    Sending Message...
                  </span>
                ) : (
                  <span className="btn-normal-state">
                    Send Message <Send size={15} style={{ marginLeft: 8 }} />
                  </span>
                )}
              </button>
            </form>
          )}

          <div className="drawer-footer">
            <button
              onClick={handleCopyEmail}
              className="contact-icon-btn"
              title="Copy Email"
            >
              {copiedEmail ? <Check size={18} color="#f2ead9" /> : <Mail size={18} />}
              <span className="contact-text">
                {copiedEmail ? 'Email Copied!' : 'shashinirathnayake2111@gmail.com'}
              </span>
            </button>
            <a href="tel:+94742949504" className="contact-icon-btn" title="Call Me">
              <Phone size={18} />
              <span className="contact-text">+94 74 294 9504</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDrawer;
