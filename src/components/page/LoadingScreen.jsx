import { useState, useEffect } from 'react';
import '../styles/LoadingScreen.css';

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
      <div className="loading-laptop-wrap">
        <svg
          viewBox="0 0 240 170"
          className="loading-laptop-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* screen */}
          <rect x="40" y="14" width="160" height="104" rx="8" fill="#0d0b08" stroke="#e9dfc7" strokeWidth="3" />
          {/* code lines inside screen */}
          <rect x="56" y="34" width="70" height="6" rx="3" fill="#e9dfc7" opacity="0.9" />
          <rect x="56" y="48" width="100" height="6" rx="3" fill="#f5efe0" opacity="0.6" />
          <rect x="56" y="62" width="55" height="6" rx="3" fill="#e9dfc7" opacity="0.75" />
          <rect x="56" y="76" width="85" height="6" rx="3" fill="#f5efe0" opacity="0.5" />
          <rect x="56" y="90" width="40" height="6" rx="3" fill="#e9dfc7" opacity="0.65" />
          {/* base */}
          <path d="M20 132 L220 132 L204 158 L36 158 Z" fill="#12100b" stroke="#e9dfc7" strokeWidth="3" strokeLinejoin="round" />
          {/* trackpad */}
          <rect x="104" y="140" width="32" height="10" rx="3" fill="none" stroke="#e9dfc7" strokeWidth="1.5" opacity="0.5" />
        </svg>
      </div>
      <div className="loading-text">LOADING</div>
      <div className="loading-bar-wrapper">
        <div className="loading-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="loading-percentage">{progress}%</div>
    </div>
  );
};

export default LoadingScreen;