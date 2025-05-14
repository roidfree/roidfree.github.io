import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaMobile } from 'react-icons/fa';
import './about.css';

const About = () => {
  const skills = [
    { name: 'Frontend Development', icon: <FaCode />, description: 'Building responsive and interactive user interfaces with React, Vue, and modern CSS.' },
    { name: 'Backend Development', icon: <FaServer />, description: 'Creating robust server-side applications with Node.js, Express, and various databases.' },
    { name: 'Mobile Development', icon: <FaMobile />, description: 'Developing cross-platform mobile applications using React Native and Flutter.' },
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
          <div className="about-text">
            <h2>About Me</h2>
            <p>
              Hello! I'm [Your Name], a passionate software developer with a love for creating beautiful and functional web applications.
              With over [X] years of experience in the industry, I've had the opportunity to work on a variety of projects,
              from small business websites to large-scale enterprise applications.
            </p>
            <p>
              My journey in web development started [X] years ago when I built my first website. Since then, I've been
              constantly learning and expanding my skills to stay up-to-date with the latest technologies and best practices.
            </p>
            <p>
              When I'm not coding, you can find me [your hobbies/interests], [another interest], or [one more interest].
              I'm always open to new opportunities and interesting projects, so feel free to get in touch!
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