import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Header from './components/00_Header/Header';
import Hero from './components/01_Hero/Hero';
import About from './components/02_About/About';
import Skills from './components/03_Skills/Skills';
import Projects from './components/04_Projects/Projects';
import Contact from './components/05_Contact/Contact';
import Footer from './components/06_Footer/Footer';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="app">
        <Header isScrolled={isScrolled} />
        <main>
          <Hero id="home" />
          <About id="about" />
          {/* <Skills id="skills" /> */}
          <Projects id="projects" />
          <Contact id="contact" />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
