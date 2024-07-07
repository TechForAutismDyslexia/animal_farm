import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import soundImg from '../images/sound.webp';
import sheepImg from '../images/sheep.webp';
import horseImg from '../images/horse2.webp';
import cowImg from '../images/cow.webp';
import { throwConfetti, onMouseDown, onTouchStart, readOutLoud, TrialCountDisplay, TimerDisplay } from '../utils/utils';
import useCommon from '../hooks/useCommon';

function Page25() {
  const navigate = useNavigate();
  const message = 'The horse is standing in front of the cow and looking at the sheep who is beside him.';
  const { getElapsedTime, trialCount, setTrialCount, pixiContainerRef, dragItemRef, offsetRef } = useCommon(message);

  const handleResize = () => {
    const cow = document.getElementById('cow');
    const horse = document.getElementById('horse');
    const sheep = document.getElementById('sheep');
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    cow.style.width = `${400 * scale}px`;
    horse.style.width = `${550 * scale}px`;
    sheep.style.width = `${300 * scale}px`;
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
        const horse = document.getElementById('horse');
        const cow = document.getElementById('cow');
        const sheep = document.getElementById('sheep');
    
        const horseRect = horse.getBoundingClientRect();
        const cowRect = cow.getBoundingClientRect();
        const sheepRect = sheep.getBoundingClientRect();
    
        // Conditions to check if cow and horse are to the right of sheep
        const cowandhorseRightOfSheep = (cowRect.left >= sheepRect.right) && (horseRect.left >= sheepRect.right);
        const horseLeftOfCow = horseRect.right <= cowRect.left;
        // Condition to check if the bottom heights of cow and horse are within 20px range and horse is to the right of cow
        const horseAboveCow = horse.x <= (cow.x-20);
        // If all conditions are met, it's a success
        if ((cowandhorseRightOfSheep && !horseLeftOfCow &&!horseAboveCow)) {
        throwConfetti();
        localStorage.setItem('Page25TrialCount', trialCount.toString());
        setTimeout(() => {
          navigate('/page26');
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
        id="cow"
        src={cowImg}
        alt="cow"
        style={{
          position: 'absolute',
          left: '80%',
          top: '400%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'cow', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'cow', dragItemRef, offsetRef, checkSuccess)}
      />
      <img
        className="images"
        id="horse"
        src={horseImg}
        alt="Horse"
        style={{
          position: 'absolute',
          left: '20%',
          top: '300%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '30% !important',
        }}
        onMouseDown={(e) => onMouseDown(e, 'horse', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'horse', dragItemRef, offsetRef, checkSuccess)}
      />
      
       <img
        className="images"
        id="sheep"
        src={sheepImg}
        alt="sheep"
        style={{
          position: 'absolute',
          left: '50%',
          top: '400%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'sheep', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'sheep', dragItemRef, offsetRef, checkSuccess)}
        
      /> 
     
      <TrialCountDisplay trialCount={trialCount} />
      <TimerDisplay getElapsedTime={getElapsedTime} />
    </div>
  );
}

export default Page25;
