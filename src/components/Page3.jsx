import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import soundImg from '../images/sound.webp';
import cowImg from '../images/cow.webp';
import goatImg from '../images/goat.webp';
import { throwConfetti, onMouseDown, onTouchStart, readOutLoud, TrialCountDisplay, TimerDisplay } from '../utils/utils';
import useCommon from '../hooks/useCommon';

function Page3() {
  const navigate = useNavigate();
  const message = 'The cow stood behind the goat.';
  const { getElapsedTime, trialCount, setTrialCount, pixiContainerRef, dragItemRef, offsetRef} = useCommon(message);

  const handleResize = () => {
          const cow = document.getElementById('cow');
          const goat = document.getElementById('goat');
          const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
          cow.style.width = `${450 * scale}px`;
          goat.style.width = `${350 * scale}px`;
        };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const checkSuccess = () => {
        if (dragItemRef.current) {
          const cow = document.getElementById('cow');
          const goat = document.getElementById('goat');
          const cowRect = cow.getBoundingClientRect();
          const goatRect = goat.getBoundingClientRect();
          
          // Distance thresholds
          const xThreshold = 0.1 * window.innerWidth;
          const yThreshold = 0.1 * window.innerHeight;
          
          // Horizontal and vertical distances
          const distanceX = Math.abs(cowRect.left - goatRect.left);
          const distanceY = Math.abs(cowRect.top - goatRect.top);
          
          // Check if both distance thresholds are satisfied and overlap conditions
          if (
            distanceX <= xThreshold &&
            distanceY <= yThreshold &&
            (cowRect.bottom >= goatRect.top || cowRect.top <= goatRect.bottom)
          ) {
            
            throwConfetti();
            localStorage.setItem('Page3TrialCount', trialCount.toString());
            setTimeout(() => {
              navigate('/page4');
            }, 2000);
          } else {
            setTrialCount(trialCount + 1);
          }
          
          dragItemRef.current = null;
        }
      };

  return (
    <div ref={pixiContainerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <span
        style={{
          position: 'fixed',
          top: '15px',
          left: '15px',
        }}
        onClick={() => readOutLoud(message)}
      >
        <img src={soundImg} alt="sound" width={'50px'} />
      </span>
      <p className="text">{message}</p>

      <img
        id="cow"
        src={cowImg} 
        alt="cow"
        style={{
          position: 'absolute',
          left: '30%',
          top: '600%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'cow', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'cow', dragItemRef, offsetRef, checkSuccess)}
      />
      <img
        id="goat"
        src={goatImg}  
        alt="goat"
        style={{
          position: 'absolute',
          left: '70%',
          top: '600%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'goat', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'goat', dragItemRef, offsetRef, checkSuccess)}
      />
      <TrialCountDisplay trialCount={trialCount} />
      <TimerDisplay getElapsedTime={getElapsedTime} />
    </div>
  );
}

export default Page3;
