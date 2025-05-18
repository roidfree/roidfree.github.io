import React from 'react';
import { useLocation } from 'react-router-dom';
import './ANA-Proj.css';
import Timer from '../components/timer/timer'; // Import the Timer component

const ANAProj = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="ana-proj">
      {/* <Header isScrolled={isScrolled} /> */}
      <main>
        <section className="countdown-section">
          <div className="container">
            <h1>Project Countdown</h1>
            <p>Time remaining until launch:</p>
            <Timer duration={3600} /> {/* 1 hour countdown */}
          </div>
        </section>
        {/* Add more sections as needed */}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

// Header component (assuming it's defined in the original file)
const Header = ({ isScrolled }) => (
  <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
    <div className="container">
      <h2>ANA Project</h2>
      <nav>
        <ul>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#countdown">Countdown</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
);

// Footer component (assuming it's defined in the original file)
const Footer = () => (
  <footer>
    <div className="container">
      <p>&copy; {new Date().getFullYear()} ANA Project</p>
    </div>
  </footer>
);

export default ANAProj;