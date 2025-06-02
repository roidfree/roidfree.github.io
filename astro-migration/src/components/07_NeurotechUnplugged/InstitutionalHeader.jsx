import React, { useState, useEffect } from 'react';
import './institutional-header.css';

const InstitutionalHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`institutional-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="container">
        <div className="logo">
          <h1>Neurotech Unplugged</h1>
          <span className="subtitle">Exploring the Future of Neurotechnology</span>
        </div>

        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <a 
              href="/neurotech-unplugged#speakers" 
              onClick={() => setIsMenuOpen(false)}
            >
              Speakers
            </a>
          </li>
          <li>
            <a 
              href="/neurotech-unplugged#calendar" 
              onClick={() => setIsMenuOpen(false)}
            >
              Calendar
            </a>
          </li>
          <li>
            <a 
              href="/neurotech-unplugged#signup" 
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </a>
          </li>
          <li>
            <a 
              href="/neurotech-unplugged#questions" 
              onClick={() => setIsMenuOpen(false)}
            >
              Questions
            </a>
          </li>
          <li>
            <a 
              href="/neurotech-unplugged#feedback" 
              onClick={() => setIsMenuOpen(false)}
            >
              Feedback
            </a>
          </li>
          <li>
            <a 
              href="/neurotech-unplugged#archive" 
              onClick={() => setIsMenuOpen(false)}
            >
              Archive
            </a>
          </li>
        </ul>

        <div className="cta-button">
          <a href="/neurotech-unplugged#signup" className="button primary">
            Register Now
          </a>
        </div>
      </nav>
    </header>
  );
};

export default InstitutionalHeader;
