import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { FaPython, FaReact } from 'react-icons/fa';
import { SiTensorflow, SiArduino, SiRaspberrypi } from 'react-icons/si';
import { TbBrain, TbDeviceWatchStats, TbMicroscope } from 'react-icons/tb';
import LoadingSpinner from '../common/LoadingSpinner';
import './Projects.css';
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const projectsRef = useRef(null);

  // Set up intersection observer to detect when component is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: Unobserve after first intersection
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the component is visible
      }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);

  // Add a small delay before rendering content for smoother transition
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const projects = [
    {
      id: 1,
      title: 'EEG Brain-health Patch',
      description: 'An innovative wearable EEG device for continuous brain health monitoring. Imperial Faculty of Natural Sciences finalist project.',
      tags: ['EEG', 'Machine Learning', 'Hardware', 'Signal Processing'],
      image: '/astro-migration/images/Introducing ANA.webp',
      github: '#',
      demo: '/ana-proj', // internal demo link
      category: 'Neurotechnology',
    },
    {
      id: 2,
      title: 'Hackstarter EEG Prototype',
      description: 'A focus-tracking wearable device using EEG signals and machine learning algorithms to optimize cognitive performance.',
      tags: ['EEG', 'TensorFlow', 'Python', 'Embedded Systems'],
      image: '/astro-migration/images/hackstarter.webp',
      github: 'https://github.com/roidfree/focus-classifier',
      demo: '#',
      category: 'Neurotechnology'
    },
    {
      id: 3,
      title: 'Automated Cell Culture System',
      description: 'A robotic system for automating laboratory cell culture processes, increasing efficiency and reducing human error.',
      tags: ['Robotics', 'Python', 'Arduino', 'Lab Automation'],
      image: '/astro-migration/images/Cellsys 2.webp',
      github: 'https://github.com/roidfree/Automated-Cell-Culture',
      demo: 'https://www.youtube.com/watch?v=CP_furnj_WU',
      category: 'Research'
    },
    {
      id: 4,
      title: '3D Robotic Arm',
      description: 'A 3D printed robotic arm inspired by surgical robots',
      tags: ['CAD', 'Electronics', 'Robotics', 'C++', 'Arduino'],
      image: 'https://img.youtube.com/vi/EB8IfXXxCYQ/hqdefault.jpg',
      github: 'https://github.com/roidfree/3D-printed-robotic-arm',
      demo: 'https://www.youtube.com/watch?v=EB8IfXXxCYQ',
      category: 'Neurotechnology'
    },
    {
      id: 5,
      title: 'Intention-Action Gap Analysis Tool',
      description: 'A research tool that analyzes behavioral patterns to identify gaps between stated intentions and actual actions.',
      tags: ['Data Analysis', 'Psychology', 'Python', 'Visualization'],
      image: '/astro-migration/images/coming-soon.webp',
      github: '#',
      demo: '#',
      category: 'Behavioral Science'
    },
    {
      id: 6,
      title: 'Imperial Neurotechnology Society',
      description: 'Founded and led the Imperial Neurotechnology Society, a student-run organization dedicated to promoting neurotechnology education and research at Imperial College London. First and largest in UK.',
      tags: ['Neurotechnology', 'Educational', 'Interactive', 'Neuroscience'],
      image: '/astro-migration/images/teaching.webp',
      github: '#',
      demo: 'https://iclneurotech.co.uk',
      category: 'Education'
    },
  ];

  const categories = ['All', 'Neurotechnology', 'Research', 'Behavioral Science', 'Education'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const getTechIcon = (tech) => {
    switch(tech.toLowerCase()) {
      case 'react':
        return <FaReact className="tech-icon" />;
      case 'python':
        return <FaPython className="tech-icon" />;
      case 'tensorflow':
        return <SiTensorflow className="tech-icon" />;
      case 'arduino':
        return <SiArduino className="tech-icon" />;
      case 'raspberry pi':
        return <SiRaspberrypi className="tech-icon" />;
      case 'eeg':
        return <TbBrain className="tech-icon" />;
      case 'wearable':
        return <TbDeviceWatchStats className="tech-icon" />;
      case 'lab automation':
        return <TbMicroscope className="tech-icon" />;
      default:
        return null;
    }
  };

  // Show loading spinner if not visible yet
  if (!showContent) {
    return (
      <section className="projects" id="projects" ref={projectsRef}>
        <div className="container">
          <LoadingSpinner 
            size="large" 
            message="Loading projects..." 
            fullScreen={false}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="projects" id="projects" ref={projectsRef}>
      <div className="container">
        <motion.div
          className="projects-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>My Projects</h2>
          <p className="projects-intro">
            Here are some of my key projects in neurotechnology, research, and behavioral science. Each project represents my commitment to enhancing human potential through technology and understanding.
          </p>

          <div className="project-filters">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-links">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="GitHub Repository"
                      >
                        <FiGithub />
                      </a>
                    )}
                    {project.demo && (
                      project.demo.startsWith('/') ? (
                        <a 
                          href={project.demo}
                          aria-label="View Project"
                          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                          <FiExternalLink />
                        </a>
                      ) : (
                        <a 
                          href={project.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label="Live Demo"
                        >
                          <FiExternalLink />
                        </a>
                      )
                    )}
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="tech-tag">
                        {getTechIcon(tag)}
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
