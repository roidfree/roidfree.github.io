// src/components/00_Header/Header.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // If we're on the home page, scroll to the section
    if (window.location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on a different page, navigate to home with hash
      window.location.href = `/#${sectionId}`;
    }
  };
  
  // Check if current page is home
  const isHomePage = window.location.pathname === '/';

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav>
        <div className="logo">Dameer Ahmed</div>
        
        {/* Mobile menu button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {/* Navigation links */}
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            {isHomePage ? (
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
            ) : (
              <Link to="/#about" onClick={() => setIsMenuOpen(false)}>About</Link>
            )}
          </li>
          <li>
            {isHomePage ? (
              <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')}>Projects</a>
            ) : (
              <Link to="/#projects" onClick={() => setIsMenuOpen(false)}>Projects</Link>
            )}
          </li>
          <li>
            <Link 
              to="/neurotech-unplugged" 
              className={window.location.pathname === '/neurotech-unplugged' ? 'active' : ''}
              onClick={(e) => {
                setIsMenuOpen(false);
                // Scroll to top when navigating to the Neurotech Unplugged page
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Neurotech Unplugged
            </Link>
          </li>
          <li>
            {isHomePage ? (
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
            ) : (
              <Link to="/#contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
