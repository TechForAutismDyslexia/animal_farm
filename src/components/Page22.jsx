import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import soundImg from '../images/sound.webp';
import dogImg from '../images/dog.webp';
import cowImg from '../images/cow.webp';
import { throwConfetti, onMouseDown, onTouchStart, readOutLoud, TrialCountDisplay, TimerDisplay } from '../utils/utils';
import useCommon from '../hooks/useCommon';

function Page22() {
  const navigate = useNavigate();
  const message = 'The dog stopped in front of the cow.';
  const { getElapsedTime, trialCount, setTrialCount, pixiContainerRef, dragItemRef, offsetRef } = useCommon(message);

  const handleResize = () => {
    const dog = document.getElementById('dog');
    const cow = document.getElementById('cow');
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    dog.style.width = `${280 * scale}px`;
    cow.style.width = `${500 * scale}px`;
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
        const dog = document.getElementById('dog');
        const sheepRect = cow.getBoundingClientRect();
        const dogRect = dog.getBoundingClientRect();
    
        
        const verticalAlignmentThreshold = 10; 
    
        
        const dogInFrontOfSheep = dogRect.bottom <= sheepRect.top + verticalAlignmentThreshold || dogRect.top >= sheepRect.top;
    
        
        const xThreshold = 0.1 * window.innerWidth; 
        const alignedHorizontally = Math.abs(dogRect.left - sheepRect.left) <= xThreshold;
    
        if (dogInFrontOfSheep && alignedHorizontally) {
        throwConfetti();
        localStorage.setItem('Page22TrialCount', trialCount.toString());
        setTimeout(() => {
          navigate('/page23');
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
          left: '70%',
          top: '600%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'cow', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'cow', dragItemRef, offsetRef, checkSuccess)}
      />
      <img
        id="dog"
        src={dogImg}
        alt="dog"
        style={{
          position: 'absolute',
          left: '30%',
          top: '600%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'dog', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'dog', dragItemRef, offsetRef, checkSuccess)}
      />
      <TrialCountDisplay trialCount={trialCount} />
      <TimerDisplay getElapsedTime={getElapsedTime} />
    </div>
  );
}

export default Page22;
