import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import './style.css';
import soundImg from '../images/sound.webp';
import horseImg from '../images/horse2.webp';
import pigImg from '../images/pig.webp';
import {  throwConfetti, onMouseDown, onTouchStart, readOutLoud, TrialCountDisplay, TimerDisplay} from '../utils/utils';
import useCommon from '../hooks/useCommon';
import { TimerContext } from '../components/TimerContext';

function Page1() {
  const navigate = useNavigate();
  const message = "The pig stood beside the horse.";
  const {trialCount, setTrialCount, pixiContainerRef, dragItemRef, offsetRef } = useCommon(message);
  

  const { startTimer, getElapsedTime } = useContext(TimerContext);
  useEffect(() => {
    startTimer();
  }, [startTimer]);

  const checkSuccess = () => {
    if (dragItemRef.current) {
      const pig = document.getElementById('pig');
      const horse = document.getElementById('horse');
      const pigRect = pig.getBoundingClientRect();
      const horseRect = horse.getBoundingClientRect();

      const pigBesideHorse = pigRect.right >= horseRect.left && pigRect.left <= horseRect.right;
      const bottomAlignmentThreshold = 30;
      const pigBottomAlignedWithHorse = Math.abs(pigRect.bottom - horseRect.bottom) <= bottomAlignmentThreshold;

      if (pigBesideHorse && pigBottomAlignedWithHorse) {
        throwConfetti();
        localStorage.setItem('Page1TrialCount', trialCount.toString());
        setTimeout(() => {
          navigate('/page2');
        }, 2000);
      } else {
        setTrialCount(trialCount + 1);
      }

      dragItemRef.current = null;
    }
  };

  const handleResize = () => {
    const pig = document.getElementById('pig');
    const horse = document.getElementById('horse');
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    pig.style.width = `${350 * scale}px`;
    horse.style.width = `${450 * scale}px`;
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={pixiContainerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <span style={{ position: 'fixed', top: '15px', left: '15px' }} onClick={() => readOutLoud(message)}>
        <img src={soundImg} alt="sound" width={'50px'} />
      </span>
      <p className="text">
        {message}
      </p>
      <img
        className="images"
        id="horse"
        src={horseImg}
        alt="Horse"
        style={{ position: 'absolute', left: '80%', top: '600%', transform: 'translate(-50%, -50%)', cursor: 'pointer', width: '30% !important' }}
        onMouseDown={(e) => onMouseDown(e, 'horse', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'horse', dragItemRef, offsetRef, checkSuccess)}
      />
      <img
        className="images"
        id="pig"
        src={pigImg}
        alt="Pig"
        style={{ position: 'absolute', left: '20%', top: '600%', transform: 'translate(-50%, -50%)', cursor: 'pointer', width: '15%' }}
        onMouseDown={(e) => onMouseDown(e, 'pig', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'pig', dragItemRef, offsetRef,checkSuccess)}
      />
      <TrialCountDisplay trialCount={trialCount} />
      <TimerDisplay getElapsedTime={getElapsedTime} />
    </div>
  );
}

export default Page1;
