import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import horseImg from '../images/horse2.webp';
import cowImg from '../images/cow.webp';
import soundImg from '../images/sound.webp';

import { throwConfetti, onMouseDown, onTouchStart, readOutLoud, TrialCountDisplay, TimerDisplay } from '../utils/utils';
import useCommon from '../hooks/useCommon';
import { TimerContext } from '../components/TimerContext';

function Page21() {
  const navigate = useNavigate();
  const message = 'The cow is standing beside the horse.';
  const { trialCount, setTrialCount, pixiContainerRef, dragItemRef, offsetRef } = useCommon(message);

  const { startTimer, getElapsedTime } = useContext(TimerContext);
  useEffect(() => {
    startTimer();
  }, [startTimer]);
  const handleResize = () => {
      const cow = document.getElementById('cow');
      const horse = document.getElementById('horse');
      const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      cow.style.width = `${420 * scale}px`;
      horse.style.width = `${500 * scale}px`;
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
          const horse = document.getElementById('horse');
          const cowRect = cow.getBoundingClientRect();
          const horseRect = horse.getBoundingClientRect();
      
          // Horizontal overlap condition
          const cowBesideHorse = cowRect.right >= horseRect.left && cowRect.left <= horseRect.right;
      
          // Bottom alignment condition with a threshold of 10px
          const bottomAlignmentThreshold = 30;
          const cowBottomAlignedWithHorse = Math.abs(cowRect.bottom - horseRect.bottom) <= bottomAlignmentThreshold;
      
          // If both conditions are met, it's a success
          if (cowBesideHorse && cowBottomAlignedWithHorse) {
        throwConfetti();
        localStorage.setItem('Page21TrialCount', trialCount.toString());
        setTimeout(() => {
          navigate('/page22');
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
        className="images"
        id="horse"
        src={horseImg}
        alt="Horse"
        style={{
          position: 'absolute',
          left: '80%',
          top: '600%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '30% !important',
        }}
        onMouseDown={(e) => onMouseDown(e, 'horse', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'horse', dragItemRef, offsetRef, checkSuccess)}
      />
      <img
        className="images"
        id="cow"
        src={cowImg}
        alt="Pig"
        style={{
          position: 'absolute',
          left: '20%',
          top: '600%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'cow', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'cow', dragItemRef, offsetRef, checkSuccess)}
      />
      <TrialCountDisplay trialCount={trialCount} />
      <TimerDisplay getElapsedTime={getElapsedTime} />
    </div>
  );
}

export default Page21;
