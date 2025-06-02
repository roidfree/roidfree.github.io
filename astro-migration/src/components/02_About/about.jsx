import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaVideo, FaLightbulb } from 'react-icons/fa';
import './about.css';
const About = () => {
  const skills = [
    { 
      name: 'Neurotechnology', 
      icon: <FaBrain />, 
      description: 'Researching and developing brain-computer interfaces (BCIs) and EEG-based wearables for health monitoring and cognitive enhancement.' 
    },
    { 
      name: 'Videography & Storytelling', 
      icon: <FaVideo />, 
      description: 'Creating compelling visual narratives that communicate complex ideas and inspire meaningful action.' 
    },
    { 
      name: 'Behavioural Science', 
      icon: <FaLightbulb />, 
      description: 'Applying insights from psychology and neuroscience to bridge the gap between intention and action in everyday life.' 
    },
  ];

  return (
    <section className="about" id="about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="about-content"
        >
          <motion.div 
            className="about-image-container"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src="/astro-migration/favicon.png" alt="Neurotechnology" className="about-image" />
          </motion.div>
          <div className="about-text">
            <h2>About Me</h2>
            <p>
              Hello! I'm Dameer Ahmed, a Biomedical Technology student at Imperial College London, specialising in neurotechnology 
              and brain-computer interfaces (BCIs). As a Sanofi Scholar and founder of Imperial's Neurotechnology Society, 
              I combine engineering precision, neuroscience insights, and human-centred design in my research and projects.
            </p>
            <p>
              My technical work spans from developing EEG brain-health wearables to creating automated laboratory systems. 
              I'm passionate about building technology that enhances human potential and improves quality of life through 
              direct brain-computer interaction.
            </p>
            <p>
              Beyond my academic pursuits, I'm deeply interested in videography, storytelling, and applying behavioural science 
              to help people lead more fulfilling lives. I focus specifically on bridging the gap between intention and action—helping 
              people translate their goals into consistent behaviours through insights from psychology and neuroscience.
            </p>
          </div>
          
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="skill-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="skill-icon">{skill.icon}</div>
                <h3>{skill.name}</h3>
                <p>{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;