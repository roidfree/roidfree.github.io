import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaThreads, FaYoutube } from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import profilePhoto from '@images/profile photo.jpg';
import './Hero.css';

const descriptors = [
  'Bioengineer',
  'Neurotechnologist',
  'Neuro-interface Engineer',
  'Human-Centered Designer ',
];

const Hero = () => {
  const [showSticky, setShowSticky] = useState(false);
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/roidfree', title: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/dameerahmed', title: 'LinkedIn' },
    { icon: <FaInstagram />, url: 'https://instagram.com/realdameer', title: 'Instagram' },
    { icon: <FaYoutube />, url: 'https://youtube.com/@realdameer', title: 'Threads' },
    { icon: <FaThreads />, url: 'https://threads.net/@realdameer', title: 'Threads' },
    { icon: <HiOutlineMail />, url: 'mailto:dameer.ahmed@imperial.ac.uk', title: 'Email' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    if (window.location.pathname === '/' || window.location.pathname === '') {
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          element.setAttribute('tabindex', '-1');
          element.focus();
          setTimeout(() => element.removeAttribute('tabindex'), 1000);
        }, 100);
      }
    } else {
      sessionStorage.setItem('scrollToProjects', 'true');
      window.location.href = '/';
    }
  };

  const isHomePage = window.location.pathname === '/' || window.location.pathname === '';

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-gradient-overlay" />
        <div className="container">
          <motion.div
            className="hero-content glass-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Dameer Ahmed</span>
            </h1>
            <h2 className="hero-subtitle">
              <TypeAnimation
                sequence={descriptors.flatMap(d => [d, 1800])}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="typewriter"
              />
            </h2>
            <p className="hero-description">
              Biomedical Technology student at Imperial College London, specialising in neurotechnology and brain-computer interfaces.
              Bridging the gap between intention and action through engineering, neuroscience, and human-centred design.
            </p>
            <div className="hero-cta">
              {isHomePage ? (
                <a href="#projects" className="btn btn-solid" onClick={(e) => scrollToSection(e, 'projects')}>
                  View My Work
                </a>
              ) : (
                <Link to="/projects" className="btn btn-solid">
                  View My Work
                </Link>
              )}
            </div>
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.title}
                  className="social-link"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;