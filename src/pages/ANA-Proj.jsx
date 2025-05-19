import React from 'react';
import Timer from '../components/timer/timer'; // Adjust path as needed
import './ANA-Proj.css'; // Import the CSS file

const ANAProj = () => (
  <div className="ana-proj">
    <main>
      {/* <h1>ANA - Advanced Neural Adhesive</h1> */}
      <Timer targetDate={new Date('2025-05-21T00:00:00')} />
      {/* <h2> Coming soon... </h2> */}
    </main>
  </div>
);

export default ANAProj;