import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import soundImg from '../images/sound.webp';
import chickenImg from '../images/chicken.webp';
import gooseImg from '../images/goose.webp';
import { throwConfetti, onMouseDown, onTouchStart, readOutLoud, TrialCountDisplay, TimerDisplay } from '../utils/utils';
import useCommon from '../hooks/useCommon';

function Page6() {
  const navigate = useNavigate();
  const message = 'The goose stood behind the chicken.';
  const { getElapsedTime, trialCount, setTrialCount, pixiContainerRef, dragItemRef, offsetRef } = useCommon(message);

  const handleResize = () => {
          const goose = document.getElementById('goose');
          const chicken = document.getElementById('chicken');
          const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
          goose.style.width = `${250 * scale}px`;
          chicken.style.width = `${350 * scale}px`;
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
      const goose = document.getElementById('goose');
      const chicken = document.getElementById('chicken');
      const gooseRect = goose.getBoundingClientRect();
      const chickenRect = chicken.getBoundingClientRect();
      const distanceX = Math.abs(gooseRect.left - chickenRect.left);
      const distanceY = Math.abs(gooseRect.top - chickenRect.top);
      const xThreshold = 0.1 * window.innerWidth;
      const yThreshold = 0.1 * window.innerHeight;

      if (distanceX <= xThreshold && distanceY <= yThreshold) {
        throwConfetti();
        localStorage.setItem('Page6TrialCount', trialCount.toString());
        setTimeout(() => {
          navigate('/page7');
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
        id="goose"
        src={gooseImg}
        alt="goose"
        style={{
          position: 'absolute',
          left: '20%',
          top: '600%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'goose', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'goose', dragItemRef, offsetRef, checkSuccess)}
      />
      <img
        id="chicken"
        src={chickenImg}
        alt="chicken"
        style={{
          position: 'absolute',
          left: '80%',
          top: '600%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'chicken', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'chicken', dragItemRef, offsetRef, checkSuccess)}
      />

      <TrialCountDisplay trialCount={trialCount} />
      <TimerDisplay getElapsedTime={getElapsedTime} />
    </div>
  );
}

export default Page6;
