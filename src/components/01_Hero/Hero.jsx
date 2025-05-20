import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaThreads } from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import profilePhoto from '@images/profile photo.jpg';

const Hero = () => {
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/roidfree', title: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/dameerahmed', title: 'LinkedIn' },
    { icon: <FaInstagram />, url: 'https://instagram.com/dameerahmed', title: 'Instagram' },
    { icon: <FaThreads />, url: 'https://threads.net/@dameerahmed', title: 'Threads' },
    { icon: <HiOutlineMail />, url: 'mailto:dameer.ahmed@imperial.ac.uk', title: 'Email' },
  ];

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    
    // If we're on the home page, scroll to the section
    if (window.location.pathname === '/' || window.location.pathname === '') {
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
  const isHomePage = window.location.pathname === '/' || window.location.pathname === '';

  return (
    <section className="hero" id="home">
      <div className="container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Hi, I'm <span className="highlight">Dameer Ahmed</span></h1>
          <h2 className="hero-subtitle">
            <TypeAnimation
              sequence={[
                'Bioengineer', 1500,
                'Neurotechnologist', 1500,
                'Humanist', 1500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h2>
          <p className="hero-description">
            Biomedical Technology student at Imperial College London, specializing in neurotechnology and brain-computer interfaces.
            Bridging the gap between intention and action through engineering, neuroscience, and human-centered design.
          </p>
          <div className="hero-cta">
            {isHomePage ? (
              <a href="#contact" className="btn mr-4" onClick={(e) => scrollToSection(e, 'contact')}>
                Get In Touch
              </a>
            ) : (
              <Link to="/contact" className="btn mr-4">
                Get In Touch
              </Link>
            )}
            
            {isHomePage ? (
              <a href="#projects" className="btn btn-outline" onClick={(e) => scrollToSection(e, 'projects')}>
                View My Work
              </a>
            ) : (
              <Link to="/projects" className="btn btn-outline">
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
  );
};

export default Hero;