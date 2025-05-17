import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import Header from './components/00_Header/Header';
import Hero from './components/01_Hero/Hero';
import About from './components/02_About/About';
import Projects from './components/04_Projects/Projects';
import Contact from './components/05_Contact/Contact';
import NeurotechUnplugged from './components/07_NeurotechUnplugged/NeurotechUnplugged';
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

  const location = useLocation();

  useEffect(() => {
    // Handle hash-based navigation
    const handleHashChange = () => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Check for hash on initial load
    if (window.location.hash) {
      // Small timeout to ensure the DOM is ready
      setTimeout(handleHashChange, 100);
    }

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const Home = () => (
    <>
      <Hero id="home" />
      <About id="about" />
      <Projects id="projects" />
      <Contact id="contact" />
    </>
  );

  return (
    <div className="app">
      <Header isScrolled={isScrolled} />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/neurotech-unplugged" element={
              <div className="neurotech-page">
                <NeurotechUnplugged />
              </div>
            } />
            <Route path="/" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
