import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate, Outlet, Link, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import Header from './components/00_Header/header';
import Hero from './components/01_Hero/Hero';
import About from './components/02_About/about';
import Contact from './components/05_Contact/Contact';
import Footer from './components/06_Footer/footer';
import NeurotechUnpluggedPage from './pages/NeurotechUnpluggedPage';
import ANAProj from './pages/ANA-Proj';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy load the Projects component
const Projects = lazy(() => import('./components/04_Projects/Projects'));

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
    // Handle navigation and scrolling
    const handleNavigation = () => {
      // Check if we need to scroll to projects (coming from another page)
      const shouldScrollToProjects = sessionStorage.getItem('scrollToProjects');
      
      if (shouldScrollToProjects) {
        sessionStorage.removeItem('scrollToProjects');
        
        // Small delay to ensure the Projects component is mounted
        const timer = setTimeout(() => {
          const projectsElement = document.getElementById('projects');
          if (projectsElement) {
            projectsElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 500);
        
        return () => clearTimeout(timer);
      }
      
      // Handle hash-based navigation
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Initial check
    handleNavigation();
    
    // Add event listener for hash changes
    window.addEventListener('hashchange', handleNavigation);
    
    return () => {
      window.removeEventListener('hashchange', handleNavigation);
    };
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
      <Suspense 
        fallback={
          <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LoadingSpinner size="large" message="Loading projects..." />
          </div>
        }
      >
        <Projects id="projects" />
      </Suspense>
      {/* <Contact id="contact" /> */}
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
            <Route path="/ana-proj" element={<ANAProj />} />
            
            <Route path="/" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>
      {location.pathname !== '/neurotech-unplugged' && <Footer />}
    </div>
  );
}

export default App;
