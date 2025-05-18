import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ duration = 60 * 60 }) => { // Default 1 hour in seconds
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) {
          clearInterval(intervalId);
          setIsRunning(false);
          return 0;
        }
        return prevTime - 0.1;
      });
    }, 100); // Update every 100ms for smooth hundredths display

    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Calculate time parts
  const minutes = Math.floor(timeLeft / 60);
  const seconds = Math.floor(timeLeft % 60);
  const hundredths = Math.floor((timeLeft % 1) * 100);

  // Format time parts
  const minutesTens = Math.floor(minutes / 10);
  const minutesOnes = minutes % 10;
  const secondsTens = Math.floor(seconds / 10);
  const secondsOnes = seconds % 10;
  const hundredthsTens = Math.floor(hundredths / 10);
  const hundredthsOnes = hundredths % 10;

  // Function to generate digit wrappers with animation offset based on current value
  const renderDigitWrapper = (value, max) => {
    const digits = [];
    
    // Current digit
    digits.push(<span key="current" className="digit">{value}</span>);
    
    // Future digits (will animate upward)
    for (let i = -max; i <= 0; i++) {
      if (i !== 0) {
        const digit = (-i) % (max + 1);
        digits.push(<span key={i} className="digit">{digit}</span>);
      }
    }
    
    return <div className="digit-wrapper" style={{ transform: `translateY(-${value * 180}px)` }}>{digits}</div>;
  };

  return (
    <div className="timer-wrapper">
      <div className="time-part-wrapper">
        <div className="time-part minutes tens">
          {renderDigitWrapper(minutesTens, 5)}
        </div>
        <div className="time-part minutes ones">
          {renderDigitWrapper(minutesOnes, 9)}
        </div>
      </div>

      <div className="time-part-wrapper">
        <div className="time-part seconds tens">
          {renderDigitWrapper(secondsTens, 5)}
        </div>
        <div className="time-part seconds ones">
          {renderDigitWrapper(secondsOnes, 9)}
        </div>
      </div>

      <div className="time-part-wrapper">
        <div className="time-part hundredths tens">
          {renderDigitWrapper(hundredthsTens, 9)}
        </div>
        <div className="time-part hundredths ones">
          {renderDigitWrapper(hundredthsOnes, 9)}
        </div>
      </div>

      <div className="timer-controls">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pause' : 'Resume'}
        </button>
        <button onClick={() => { setTimeLeft(duration); setIsRunning(true); }}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;