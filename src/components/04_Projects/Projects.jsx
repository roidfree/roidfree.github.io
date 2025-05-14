import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaPython, FaVuejs, FaLaravel } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiDjango, SiGraphql } from 'react-icons/si';
import './Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce platform with user authentication, product catalog, shopping cart, and payment integration.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux'],
      image: 'https://via.placeholder.com/600x400/3a86ff/ffffff?text=E-commerce',
      github: '#',
      demo: '#',
      category: 'Full Stack'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A task management application with drag-and-drop functionality, task categories, and team collaboration features.',
      tags: ['React', 'TypeScript', 'Firebase', 'Material-UI'],
      image: 'https://via.placeholder.com/600x400/8338ec/ffffff?text=Task+App',
      github: '#',
      demo: '#',
      category: 'Frontend'
    },
    {
      id: 3,
      title: 'RESTful API Service',
      description: 'A scalable RESTful API service with authentication, rate limiting, and comprehensive documentation.',
      tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
      image: 'https://via.placeholder.com/600x400/ff006e/ffffff?text=API+Service',
      github: '#',
      demo: '#',
      category: 'Backend'
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'A personal portfolio website built with React and Framer Motion for smooth animations and transitions.',
      tags: ['React', 'Framer Motion', 'Styled Components', 'Responsive Design'],
      image: 'https://via.placeholder.com/600x400/ffbe0b/ffffff?text=Portfolio',
      github: '#',
      demo: '#',
      category: 'Frontend'
    },
    {
      id: 5,
      title: 'Real-time Chat Application',
      description: 'A real-time chat application with private messaging, group chats, and read receipts.',
      tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      image: 'https://via.placeholder.com/600x400/fb5607/ffffff?text=Chat+App',
      github: '#',
      demo: '#',
      category: 'Full Stack'
    },
    {
      id: 6,
      title: 'Data Visualization Dashboard',
      description: 'An interactive dashboard for data visualization with various chart types and data filtering options.',
      tags: ['React', 'D3.js', 'Redux', 'Material-UI'],
      image: 'https://via.placeholder.com/600x400/8338ec/ffffff?text=Dashboard',
      github: '#',
      demo: '#',
      category: 'Frontend'
    },
  ];

  const categories = ['All', 'Frontend', 'Backend', 'Full Stack'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const getTechIcon = (tech) => {
    switch(tech.toLowerCase()) {
      case 'react':
        return <FaReact className="tech-icon" />;
      case 'node.js':
        return <FaNodeJs className="tech-icon" />;
      case 'typescript':
        return <SiTypescript className="tech-icon" />;
      case 'next.js':
        return <SiNextdotjs className="tech-icon" />;
      case 'python':
        return <FaPython className="tech-icon" />;
      case 'django':
        return <SiDjango className="tech-icon" />;
      case 'vue':
        return <FaVuejs className="tech-icon" />;
      case 'laravel':
        return <FaLaravel className="tech-icon" />;
      case 'graphql':
        return <SiGraphql className="tech-icon" />;
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
            Here are some of my recent projects. Each project was built to solve a specific problem or explore new technologies.
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
