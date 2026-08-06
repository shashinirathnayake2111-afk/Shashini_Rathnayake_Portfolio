import { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsHidden(true), 500);
          setTimeout(() => onComplete(), 1300);
          return 100;
        }
        const jump = Math.floor(Math.random() * 15) + 1;
        return Math.min(prev + jump, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`loading-container ${isHidden ? 'hidden' : ''}`}>
      <div className="loading-text">LOADING</div>
      <div className="loading-bar-wrapper">
        <div className="loading-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="loading-percentage">{progress}%</div>
    </div>
  );
};

export default LoadingScreen;
