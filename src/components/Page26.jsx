import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import soundImg from '../images/sound.webp';
import horseImg from '../images/horse2.webp';
import gooseImg from '../images/goose.webp';
import pigImg from '../images/pig.webp';
import { throwConfetti, onMouseDown, onTouchStart, readOutLoud, TrialCountDisplay, TimerDisplay } from '../utils/utils';
import useCommon from '../hooks/useCommon';

function Page26() {
  const navigate = useNavigate();
  const message = 'The goose stood between the pig and the horse.';
  const { getElapsedTime, trialCount, setTrialCount, pixiContainerRef, dragItemRef, offsetRef } = useCommon(message);

  const handleResize = () => {
    const goose = document.getElementById('goose');
    const horse = document.getElementById('horse');
    const pig = document.getElementById('pig');
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    goose.style.width = `${200 * scale}px`;
    horse.style.width = `${600 * scale}px`;
    pig.style.width = `${500 * scale}px`;
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
      const horse = document.getElementById('horse');
      const pig = document.getElementById('pig');
      const gooseRect = goose.getBoundingClientRect();
      const horseRect = horse.getBoundingClientRect();
      const pigRect = pig.getBoundingClientRect();
      const gooseLeft = gooseRect.left;
      const gooseRight = gooseRect.right;
      const pigLeft = pigRect.left;
      const pigRight = pigRect.right;
      const horseLeft = horseRect.left;
      const horseRight = horseRect.right;
      const gooseWidth = gooseRect.width;
      const xThreshold = gooseWidth * 0.4; 
  
      if (
        (gooseLeft >= pigRight - xThreshold && gooseRight <= horseLeft + xThreshold) ||
        (gooseLeft <= pigLeft + xThreshold && gooseRight >= horseRight - xThreshold)
      ) {
        throwConfetti();
        localStorage.setItem('Page26TrialCount', trialCount.toString());
        setTimeout(() => {
          navigate('/last2');
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
        id="horse"
        src={horseImg}
        alt="Horse"
        style={{
          position: 'absolute',
          left: '70%',
          top: '400%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'horse', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'horse', dragItemRef, offsetRef, checkSuccess)}
      />
      <img
        id="goose"
        src={gooseImg}
        alt="goose"
        style={{
          position: 'absolute',
          left: '30%',
          top: '400%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'goose', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'goose', dragItemRef, offsetRef, checkSuccess)}
      />
      <img
        id="pig"
        src={pigImg}
        alt="pig"
        style={{
          position: 'absolute',
          left: '50%',
          top: '400%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'pig', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'pig', dragItemRef, offsetRef, checkSuccess)}
      />
      <TrialCountDisplay trialCount={trialCount} />
      <TimerDisplay getElapsedTime={getElapsedTime} />
    </div>
  );
}

export default Page26;
