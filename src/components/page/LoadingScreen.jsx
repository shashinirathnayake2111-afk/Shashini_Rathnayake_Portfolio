import { useState, useEffect } from 'react';
import '../styles/LoadingScreen.css';

const MIN_DURATION = 1500;

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      setProgress((prev) => {
        const elapsed = Date.now() - startTime;

        if (elapsed >= MIN_DURATION) {
          clearInterval(interval);
          setTimeout(() => setIsHidden(true), 300);
          setTimeout(() => onComplete(), 1100);
          return 100;
        }

        // Cap growth so progress can't reach 100 before MIN_DURATION elapses
        const timeCap = Math.floor((elapsed / MIN_DURATION) * 99);
        const jump = Math.floor(Math.random() * 10) + 3;
        return Math.min(prev + jump, timeCap, 99);
      });
    }, 90);

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
          {/* screen outline */}
          <rect
            className="draw-el screen-rect"
            x="40" y="14" width="160" height="104" rx="8"
            fill="none" stroke="#e9dfc7" strokeWidth="3"
            style={{ '--len': 560, animationDelay: '0.05s' }}
          />
          {/* code lines, drawn one after another */}
          <line className="draw-el" x1="56" y1="37" x2="126" y2="37" stroke="#e9dfc7" strokeWidth="5" strokeLinecap="round" style={{ '--len': 70, animationDelay: '0.4s' }} />
          <line className="draw-el" x1="56" y1="51" x2="156" y2="51" stroke="#f5efe0" strokeWidth="5" strokeLinecap="round" opacity="0.75" style={{ '--len': 100, animationDelay: '0.47s' }} />
          <line className="draw-el" x1="56" y1="65" x2="111" y2="65" stroke="#e9dfc7" strokeWidth="5" strokeLinecap="round" opacity="0.85" style={{ '--len': 55, animationDelay: '0.53s' }} />
          <line className="draw-el" x1="56" y1="79" x2="141" y2="79" stroke="#f5efe0" strokeWidth="5" strokeLinecap="round" opacity="0.6" style={{ '--len': 85, animationDelay: '0.6s' }} />
          <line className="draw-el" x1="56" y1="93" x2="96" y2="93" stroke="#e9dfc7" strokeWidth="5" strokeLinecap="round" opacity="0.75" style={{ '--len': 40, animationDelay: '0.67s' }} />
          {/* base outline */}
          <path
            className="draw-el base-path"
            d="M20 132 L220 132 L204 158 L36 158 Z"
            fill="none" stroke="#e9dfc7" strokeWidth="3" strokeLinejoin="round"
            style={{ '--len': 430, animationDelay: '0.76s' }}
          />
          {/* trackpad outline */}
          <rect
            className="draw-el"
            x="104" y="140" width="32" height="10" rx="3"
            fill="none" stroke="#e9dfc7" strokeWidth="1.5" opacity="0.5"
            style={{ '--len': 84, animationDelay: '1.02s' }}
          />
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