import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, FaNodeJs, FaJs, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub, 
  FaNpm, FaFigma, FaSass, FaDocker, FaAws 
} from 'react-icons/fa';
import { SiTypescript, SiRedux, SiGraphql, SiMongodb, SiPostgresql, SiJest, SiWebpack, SiBabel } from 'react-icons/si';

const Skills = () => {
  const skills = [
    { name: 'React', icon: <FaReact />, level: 90 },
    { name: 'JavaScript', icon: <FaJs />, level: 90 },
    { name: 'TypeScript', icon: <SiTypescript />, level: 80 },
    { name: 'Node.js', icon: <FaNodeJs />, level: 85 },
    { name: 'HTML5', icon: <FaHtml5 />, level: 95 },
    { name: 'CSS3', icon: <FaCss3Alt />, level: 90 },
    { name: 'Sass', icon: <FaSass />, level: 85 },
    { name: 'Redux', icon: <SiRedux />, level: 80 },
    { name: 'GraphQL', icon: <SiGraphql />, level: 75 },
    { name: 'MongoDB', icon: <SiMongodb />, level: 80 },
    { name: 'PostgreSQL', icon: <SiPostgresql />, level: 75 },
    { name: 'Git', icon: <FaGitAlt />, level: 85 },
    { name: 'GitHub', icon: <FaGithub />, level: 85 },
    { name: 'Docker', icon: <FaDocker />, level: 70 },
    { name: 'AWS', icon: <FaAws />, level: 65 },
    { name: 'Jest', icon: <SiJest />, level: 75 },
    { name: 'Webpack', icon: <SiWebpack />, level: 70 },
    { name: 'Babel', icon: <SiBabel />, level: 70 },
    { name: 'npm', icon: <FaNpm />, level: 85 },
    { name: 'Figma', icon: <FaFigma />, level: 75 },
  ];

  // Group skills into categories
  const frontendSkills = skills.slice(0, 8);
  const backendSkills = skills.slice(8, 14);
  const toolsSkills = skills.slice(14);

  const SkillCategory = ({ title, skills }) => (
    <motion.div 
      className="skill-category"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="skill-category-title">{title}</h3>
      <div className="skills-container">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <div className="skill-header">
              <span className="skill-icon">{skill.icon}</span>
              <span className="skill-name">{skill.name}</span>
              <span className="skill-percent">{skill.level}%</span>
            </div>
            <div className="skill-bar">
              <motion.div 
                className="skill-progress"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.05 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <section className="skills" id="skills">
      <div className="container">
        <motion.div 
          className="skills-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>My Skills</h2>
          <p className="skills-intro">
            Here are the technologies and tools I work with. I'm always learning and expanding my skill set to stay up-to-date with the latest trends and best practices in web development.
          </p>
          
          <div className="skills-categories">
            <SkillCategory title="Frontend" skills={frontendSkills} />
            <SkillCategory title="Backend & Databases" skills={backendSkills} />
            <SkillCategory title="Tools & Platforms" skills={toolsSkills} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
