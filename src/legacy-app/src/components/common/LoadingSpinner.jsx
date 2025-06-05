import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', color = 'primary', fullScreen = false, message = 'Loading...' }) => {
  const sizeMap = {
    small: '30px',
    medium: '50px',
    large: '70px',
    xlarge: '100px'
  };

  const spinnerStyle = {
    width: sizeMap[size] || sizeMap.medium,
    height: sizeMap[size] || sizeMap.medium,
    borderColor: `var(--${color}-color, var(--primary-color))`,
    borderTopColor: 'transparent'
  };

  const containerClass = `loading-container ${fullScreen ? 'full-screen' : ''}`;

  return (
    <div className={containerClass}>
      <div className="loading-spinner" style={spinnerStyle}>
        <div className="spinner-inner" />
      </div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
