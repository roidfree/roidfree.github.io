import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { FaPython, FaReact } from 'react-icons/fa';
import { SiTensorflow, SiArduino, SiRaspberrypi } from 'react-icons/si';
import { TbBrain, TbDeviceWatchStats, TbMicroscope } from 'react-icons/tb';
import './Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    {
      id: 1,
      title: 'EEG Brain-health Patch',
      description: 'An innovative wearable EEG device for continuous brain health monitoring. Imperial Faculty of Natural Sciences finalist project.',
      tags: ['EEG', 'Machine Learning', 'Hardware', 'Signal Processing'],
      image: 'https://via.placeholder.com/600x400/3a86ff/ffffff?text=EEG+Brain-health+Patch',
      github: '#',
      demo: '#',
      category: 'Neurotechnology'
    },
    {
      id: 2,
      title: 'Hackstarter EEG Prototype',
      description: 'A focus-tracking wearable device using EEG signals and machine learning algorithms to optimize cognitive performance.',
      tags: ['EEG', 'TensorFlow', 'Python', 'Embedded Systems'],
      image: 'https://via.placeholder.com/600x400/8338ec/ffffff?text=Hackstarter+EEG',
      github: '#',
      demo: '#',
      category: 'Neurotechnology'
    },
    {
      id: 3,
      title: 'Automated Cell Culture System',
      description: 'A robotic system for automating laboratory cell culture processes, increasing efficiency and reducing human error.',
      tags: ['Robotics', 'Python', 'Arduino', 'Lab Automation'],
      image: 'https://via.placeholder.com/600x400/ff006e/ffffff?text=Cell+Culture+System',
      github: '#',
      demo: '#',
      category: 'Research'
    },
    {
      id: 4,
      title: 'Neurofeedback Training Platform',
      description: 'An interactive platform that provides real-time feedback on brain activity to help users improve focus and cognitive performance.',
      tags: ['React', 'Python', 'EEG', 'Real-time Processing'],
      image: 'https://via.placeholder.com/600x400/ffbe0b/ffffff?text=Neurofeedback+Platform',
      github: '#',
      demo: '#',
      category: 'Neurotechnology'
    },
    {
      id: 5,
      title: 'Intention-Action Gap Analysis Tool',
      description: 'A research tool that analyzes behavioral patterns to identify gaps between stated intentions and actual actions.',
      tags: ['Data Analysis', 'Psychology', 'Python', 'Visualization'],
      image: 'https://via.placeholder.com/600x400/fb5607/ffffff?text=Intention-Action+Tool',
      github: '#',
      demo: '#',
      category: 'Behavioral Science'
    },
    {
      id: 6,
      title: 'Neurotech Educational Platform',
      description: 'An interactive educational platform for the Imperial Neurotechnology Society to introduce students to BCI concepts and applications.',
      tags: ['React', 'Educational', 'Interactive', 'Neuroscience'],
      image: 'https://via.placeholder.com/600x400/8338ec/ffffff?text=Educational+Platform',
      github: '#',
      demo: '#',
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

  return (
    <section className="projects" id="projects">
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
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Live Demo"
                      >
                        <FiExternalLink />
                      </a>
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
