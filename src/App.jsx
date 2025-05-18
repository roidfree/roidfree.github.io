import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import Header from './components/00_Header/Header';
import Hero from './components/01_Hero/Hero';
import About from './components/02_About/About';
import Projects from './components/04_Projects/Projects';
import Contact from './components/05_Contact/Contact';
import Footer from './components/06_Footer/Footer';
import NeurotechUnpluggedPage from './pages/NeurotechUnpluggedPage';

// Store the current location in a ref to prevent infinite re-renders
const useLocationRef = () => {
  const location = useLocation();
  const locationRef = useRef(location);
  
  useEffect(() => {
    locationRef.current = location;
  }, [location]);
  
  return locationRef;
};

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      {location.pathname !== '/neurotech-unplugged' && <Header isScrolled={isScrolled} />}
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/neurotech-unplugged" element={<NeurotechUnpluggedPage />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>
      {location.pathname !== '/neurotech-unplugged' && <Footer />}
    </div>
  );
}

export default App;
