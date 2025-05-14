import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/yourusername' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/yourusername' },
    { icon: <FaInstagram />, url: 'https://threads.net/yourusername', title: 'Threads' },
    { icon: <HiOutlineMail />, url: 'mailto:your.email@example.com' },
  ];

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
            I build exceptional digital experiences with modern web technologies.
            Currently focused on creating beautiful, responsive, and user-friendly applications.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn mr-4">
              Get In Touch
            </a>
            <a href="#projects" className="btn btn-outline">
              View My Work
            </a>
          </div>
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Social Link ${index + 1}`}
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
