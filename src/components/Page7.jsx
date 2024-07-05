import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import soundImg from '../images/sound.webp';
import boltImg from '../images/bolt.webp';
import goatImg from '../images/goat.webp';
import { throwConfetti, onMouseDown, onTouchStart, readOutLoud, TrialCountDisplay, TimerDisplay } from '../utils/utils';
import useCommon from '../hooks/useCommon';

function Page8() {
  const navigate = useNavigate();
  const message = 'The dog sat next to the goat.';
  const { getElapsedTime, trialCount, setTrialCount, pixiContainerRef, dragItemRef, offsetRef } = useCommon(message);

  const handleResize = () => {
          const dog = document.getElementById('dog');
          const goat = document.getElementById('goat');
          const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
          dog.style.width = `${250 * scale}px`;
          goat.style.width = `${550 * scale}px`;
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
          const dog = document.getElementById('dog');
          const goat = document.getElementById('goat');
          const dogRect = dog.getBoundingClientRect();
          const goatRect = goat.getBoundingClientRect();
          
          
          const dogLeft = dogRect.left;
          const goatLeft = goatRect.left;
          const goatRight = goatRect.right;
          
          
          const goatWidth = goatRect.width;
          const xThreshold = goatWidth * 0.3; 
      
          
          if (dogLeft >= goatLeft - xThreshold && dogLeft <= goatRight - goatWidth + xThreshold &&
              dogRect.top >= goatRect.top && dogRect.bottom <= goatRect.bottom) {
        throwConfetti();
        localStorage.setItem('Page8TrialCount', trialCount.toString());
        setTimeout(() => {
          navigate('/last');
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
        id="dog"
        src={boltImg}
        alt="dog"
        className="image-style"
        style={{
          position: 'absolute',
          left: '20%',
          top: '600%', 
          transform: 'translate(-50%, -50%)',
          
        }}
        onMouseDown={(e) => onMouseDown(e, 'dog', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'dog', dragItemRef, offsetRef, checkSuccess)}
      />
      <img
        id="goat"
        src={goatImg}
        alt="goat"
        className="image-style"
        style={{
          position: 'absolute',
          left: '90%',
          top: '600%', 
          transform: 'translate(-50%, -50%)',
          
        }}
        onMouseDown={(e) => onMouseDown(e, 'goat', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'goat', dragItemRef, offsetRef, checkSuccess)}
      />
      
      <TrialCountDisplay trialCount={trialCount} />
      <TimerDisplay getElapsedTime={getElapsedTime} />
    </div>
  );
}

export default Page8;
