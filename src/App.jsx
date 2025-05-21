import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, Navigate, Outlet, Link, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import Header from './components/00_Header/header';
import Hero from './components/01_Hero/Hero';
import About from './components/02_About/about';
import Projects from './components/04_Projects/Projects';
import Contact from './components/05_Contact/Contact';
import Footer from './components/06_Footer/footer';
import NeurotechUnpluggedPage from './pages/NeurotechUnpluggedPage';
import ANAProj from './pages/ANA-Proj';

// Store the current location in a ref to prevent infinite re-renders
const useLocationRef = () => {
  const location = useLocation();
  const locationRef = useRef(location);
  
  useEffect(() => {
    locationRef.current = location;
  }, [location]);
  
  return locationRef;
};

// Projects layout component to handle nested routes - simplified to just pass through content
const ProjectsLayout = () => {
  return <Outlet />;
};

// Dynamic project page component that loads the appropriate project based on the route parameter
const ProjectPage = () => {
  const { projectId } = useParams();
  
  // Map of project IDs to their respective components
  const projectComponents = {
    'ana-proj': ANAProj,
    // Add more projects here as they are created
    // 'project-name': ProjectComponent,
  };
  
  const ProjectComponent = projectComponents[projectId];
  
  if (!ProjectComponent) {
    // If project doesn't exist, redirect to projects page
    return <Navigate to="/projects" replace />;
  }
  
  return <ProjectComponent />;
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

  // Function to scroll to a section by ID
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Components to handle redirection to specific sections
  const ProjectsRedirect = () => {
    const hasScrolled = useRef(false);
    
    useEffect(() => {
      // Only scroll if this is the first render
      if (!hasScrolled.current) {
        // Small timeout to ensure rendering is complete
        setTimeout(() => {
          scrollToSection('projects');
          hasScrolled.current = true;
        }, 100);
      }
    }, []);
    
    return <Home />;
  };
  
  const AboutRedirect = () => {
    const hasScrolled = useRef(false);
    
    useEffect(() => {
      // Only scroll if this is the first render
      if (!hasScrolled.current) {
        // Small timeout to ensure rendering is complete
        setTimeout(() => {
          scrollToSection('about');
          hasScrolled.current = true;
        }, 100);
      }
    }, []);
    
    return <Home />;
  };
  
  const ContactRedirect = () => {
    const hasScrolled = useRef(false);
    
    useEffect(() => {
      // Only scroll if this is the first render
      if (!hasScrolled.current) {
        // Small timeout to ensure rendering is complete
        setTimeout(() => {
          scrollToSection('contact');
          hasScrolled.current = true;
        }, 100);
      }
    }, []);
    
    return <Home />;
  };

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
            
            {/* Section redirects */}
            <Route path="/about" element={<AboutRedirect />} />
            <Route path="/projects" element={<ProjectsRedirect />} />
            <Route path="/contact" element={<ContactRedirect />} />
            
            {/* Dynamic project routes - handles both singular and plural forms */}
            <Route path="/projects/:projectId" element={<ProjectPage />} />
            <Route path="/project/:projectId" element={<ProjectPage />} />
            
            <Route path="/" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>
      {location.pathname !== '/neurotech-unplugged' && <Footer />}
    </div>
  );
}

export default App;
