import React, { useState } from 'react';
import Timer from '../components/timer/timer'; 
import './ANA-Proj.css'; 
import NotionCardContainer from '../components/notion/NotionCardContainer';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import SubscribeForm from '../components/common/SubscribeForm';
import ModalForm from '../components/common/ModalForm'; // import the new component

const ANAProj = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="ana-proj">
      <div className="ana-content">
        <div className="ana-header">
          <h1 className="ana-title">ANA - Advanced Neural Adhesive</h1>
          <p className="ana-subtitle">Student led-project trying to create skin-wearable technology for brain health</p>
        </div>
        
        {/* <div className="ana-timer-section">
          <Timer targetDate={new Date('2025-05-29T18:00:00')} />
        </div>
        <div className="ana-coming-soon-wrapper">
          <h2 className="ana-coming-soon">Updates <span>coming soon</span></h2>
        </div> */}
        <div className="ana-subscribe-section">
          <h2 className="ana-subscribe-title">Stay Updated</h2>
          <p className="ana-subscribe-desc">Join our mailing list for the latest ANA updates and releases.</p>
          <SubscribeForm />
        </div>

        <div className="section-divider"></div>

        <div className="ana-posts-section">
          <h2 className="ana-posts-title">Latest Posts</h2>
          <p className="ana-posts-desc">Check out our latest updates and insights on the ANA project.</p>
          {<NotionCardContainer />}
        </div>
        <div className="ana-footer">
          {/* <Button onClick={() => setModalOpen(true)} className="ana-loop-btn">Stay in the Loop</Button> */}
        </div>
        
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <h2 style={{ marginBottom: '1rem' }}>Stay in the Loop</h2>
          <ModalForm onClose={() => setModalOpen(false)} />
        </Modal>
      </div>
    </div>
  );
};

export default ANAProj;