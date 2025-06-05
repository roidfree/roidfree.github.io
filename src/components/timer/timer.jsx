import React, { useState, useEffect } from 'react';
import './timer.css';

const Timer = ({ targetDate = new Date('2025-05-30T00:00:00') }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = Math.floor((targetDate - now) / 1000); // Seconds
    return Math.max(0, difference);
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  // Calculate time units
  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;

  if (timeLeft <= 0) {
    return <div className="timer-wrapper">Countdown Complete!</div>;
  }

  return (
    <div className="timer-wrapper" role="timer" aria-live="polite">
      <span className="sr-only">
        {`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`}
      </span>
      <div className="timer-container">
        <div className="timer-unit">
          <div className="timer-value">{days.toString().padStart(2, '0')}</div>
          <div className="timer-label">DAYS</div>
        </div>
        <div className="timer-separator">:</div>
        <div className="timer-unit">
          <div className="timer-value">{hours.toString().padStart(2, '0')}</div>
          <div className="timer-label">HOURS</div>
        </div>
        <div className="timer-separator">:</div>
        <div className="timer-unit">
          <div className="timer-value">{minutes.toString().padStart(2, '0')}</div>
          <div className="timer-label">MINUTES</div>
        </div>
        <div className="timer-separator">:</div>
        <div className="timer-unit">
          <div className="timer-value">{seconds.toString().padStart(2, '0')}</div>
          <div className="timer-label">SECONDS</div>
        </div>
      </div>
    </div>
  );
};

export default Timer;