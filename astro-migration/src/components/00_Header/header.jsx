// src/components/00_Header/Header.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav>
        <a href="/" className="logo" onClick={(e) => {
          e.preventDefault();
          setIsMenuOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>Dameer Ahmed</a>

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
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
          </li>
          <li>
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')}>Projects</a>
          </li>
          <li>
            <a href="/ana-proj" onClick={() => setIsMenuOpen(false)}>ANA</a>
          </li>
          {/* Uncomment if needed */}
          {/* <li>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
