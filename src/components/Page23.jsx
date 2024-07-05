import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import soundImg from '../images/sound.webp';
import sheepImg from '../images/sheep.webp';
import pigImg from '../images/pig.webp';
import hayImg from '../images/hay.webp';
import { throwConfetti, onMouseDown, onTouchStart, readOutLoud, TrialCountDisplay, TimerDisplay } from '../utils/utils';
import useCommon from '../hooks/useCommon';

function Page23() {
  const navigate = useNavigate();
  const message = 'The sheep is waiting for his breakfast behind the pig.';
  const { getElapsedTime, trialCount, setTrialCount, pixiContainerRef, dragItemRef, offsetRef } = useCommon(message);

  const handleResize = () => {
    const sheep = document.getElementById('sheep');
      const pig = document.getElementById('pig');
      const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      sheep.style.width = `${350 * scale}px`;
      pig.style.width = `${450 * scale}px`;
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
        const pig = document.getElementById('pig');
        const sheep = document.getElementById('sheep');
    
        const pigRect = pig.getBoundingClientRect();
        const sheepRect = sheep.getBoundingClientRect();
    
        // Distance thresholds
        const xThreshold = 0.1 * window.innerWidth;
        const yThreshold = 0.1 * window.innerHeight;
    
        // Horizontal and vertical distances
        const distanceX = Math.abs(sheepRect.left - pigRect.left);
        const distanceY = Math.abs(sheepRect.top - pigRect.top)
        
        if (
          distanceX <= xThreshold &&
          distanceY <= yThreshold &&
          (sheepRect.bottom >= pigRect.top - 100 || sheepRect.top <= pigRect.bottom)
        ) {
        throwConfetti();
        localStorage.setItem('Page23TrialCount', trialCount.toString());
        setTimeout(() => {
          navigate('/page24');
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
        id="sheep"
        src={sheepImg}
        alt="sheep"
        style={{
          position: 'absolute',
          left: '30%',
          top: '600%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'sheep', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'sheep', dragItemRef, offsetRef, checkSuccess)}
      />
      <img
        id="pig"
        src={pigImg}
        alt="pig"
        style={{
          position: 'absolute',
          left: '70%',
          top: '600%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'pig', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'pig', dragItemRef, offsetRef, checkSuccess)}
      />
      <img
        id="hay"
        src={hayImg}
        alt="hay"
        style={{
          position: 'absolute',
          left: '90%',
          top: '400%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '10%',
        }}
        
      />
      <TrialCountDisplay trialCount={trialCount} />
      <TimerDisplay getElapsedTime={getElapsedTime} />
    </div>
  );
}

export default Page23;
