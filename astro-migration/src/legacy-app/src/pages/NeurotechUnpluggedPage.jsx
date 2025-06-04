import React from 'react';
import { useLocation } from 'react-router-dom';
import InstitutionalHeader from '../components/07_NeurotechUnplugged/InstitutionalHeader';
import Footer from '../components/06_Footer/footer';

// Import subcomponents
import Speakers from '../components/07_NeurotechUnplugged/Speakers/SpeakerProfiles';
import Calendar from '../components/07_NeurotechUnplugged/Calendar/EventCalendar';
import SignUp from '../components/07_NeurotechUnplugged/SignUp/SignUpForm';
import Questions from '../components/07_NeurotechUnplugged/Questions/QuestionPortal';
import Feedback from '../components/07_NeurotechUnplugged/Feedback/FeedbackForm';
import Archive from '../components/07_NeurotechUnplugged/Archive/EventArchive';

const NeurotechUnpluggedPage = () => {
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
    <div className="neurotech-page">
      <InstitutionalHeader isScrolled={isScrolled} />
      <main>
        {/* Hero Section */}
        <section id="hero">
          <div className="container">
            <h1>Neurotech Unplugged</h1>
            <p>Exploring the future of neurotechnology</p>
          </div>
        </section>

        {/* Main Content */}
        <Speakers />
        <Calendar />
        <SignUp />
        <Questions />
        <Feedback />
        <Archive />
      </main>
      <Footer />
    </div>
  );
};

export default NeurotechUnpluggedPage;
