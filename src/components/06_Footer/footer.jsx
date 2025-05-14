import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa';
import { Link } from 'react-scroll';
import './footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: <FaTwitter />, url: 'https://twitter.com/yourusername', label: 'Twitter' },
    { icon: <FaEnvelope />, url: 'mailto:your.email@example.com', label: 'Email' },
  ];

  const footerLinks = [
    { title: 'Quick Links', links: [
      { name: 'Home', to: 'home' },
      { name: 'About', to: 'about' },
      { name: 'Skills', to: 'skills' },
      { name: 'Projects', to: 'projects' },
      { name: 'Contact', to: 'contact' },
    ]},
    { title: 'Resources', links: [
      { name: 'Blog', url: '#' },
      { name: 'GitHub', url: 'https://github.com/yourusername' },
      { name: 'Resume', url: '#' },
    ]},
    { title: 'Legal', links: [
      { name: 'Privacy Policy', url: '#' },
      { name: 'Terms of Service', url: '#' },
    ]},
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-about">
            <h3>Your Name</h3>
            <p>
              A passionate developer creating beautiful and functional web applications 
              with modern technologies and best practices.
            </p>
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links">
            {footerLinks.map((section, index) => (
              <div key={index} className="footer-links-section">
                <h4>{section.title}</h4>
                <ul>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.to ? (
                        <Link 
                          to={link.to} 
                          smooth={true} 
                          duration={500} 
                          className="footer-link"
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <a 
                          href={link.url} 
                          className="footer-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {currentYear} Your Name. All rights reserved.
            <span className="footer-heart"> Made with <FaHeart /> by You</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;