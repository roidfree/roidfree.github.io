import React from 'react';
import Timer from '../components/timer/timer'; // Adjust path as needed
import './ANA-Proj.css'; // Import the CSS file

const ANAProj = () => (
  <div className="ana-proj">
    <div className="ana-content">
      <div className="ana-header">
        <h1 className="ana-title">ANA - Advanced Neural Adhesive</h1>
        <p className="ana-subtitle">Student led-project trying to create skin-wearable technology for brain health</p>
      </div>
      
      <div className="ana-timer-section">
        <Timer targetDate={new Date('2025-05-26T00:00:00')} /> 
      </div>
      
      <div className="ana-footer">
        <h2 className="ana-coming-soon">Update coming soon</h2>
      </div>
    </div>
  </div>
);

export default ANAProj;