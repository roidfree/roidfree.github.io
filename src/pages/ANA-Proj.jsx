import React from 'react';
import { useLocation } from 'react-router-dom';

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
      {location.pathname !== '/ana-proj' && <Header isScrolled={isScrolled} />}
      <main>
        {/* Main Content */}
      </main>
      {location.pathname !== '/ana-proj' && <Footer />}
    </div>
  );
};

export default ANAProj;