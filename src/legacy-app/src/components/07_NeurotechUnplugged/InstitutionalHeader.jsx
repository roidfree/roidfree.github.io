import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
          <li><Link to="/neurotech-unplugged#speakers" onClick={() => setIsMenuOpen(false)}>Speakers</Link></li>
          <li><Link to="/neurotech-unplugged#calendar" onClick={() => setIsMenuOpen(false)}>Calendar</Link></li>
          <li><Link to="/neurotech-unplugged#signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link></li>
          <li><Link to="/neurotech-unplugged#questions" onClick={() => setIsMenuOpen(false)}>Questions</Link></li>
          <li><Link to="/neurotech-unplugged#feedback" onClick={() => setIsMenuOpen(false)}>Feedback</Link></li>
          <li><Link to="/neurotech-unplugged#archive" onClick={() => setIsMenuOpen(false)}>Archive</Link></li>
        </ul>

        <div className="cta-button">
          <Link to="/neurotech-unplugged#signup" className="button primary">
            Register Now
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default InstitutionalHeader;
