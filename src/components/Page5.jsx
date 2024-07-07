import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import calfImg from '../images/calf.webp';
import chickenImg from '../images/chicken.webp';
import soundImg from '../images/sound.webp';

import { throwConfetti, onMouseDown, onTouchStart, readOutLoud, TrialCountDisplay, TimerDisplay } from '../utils/utils';
import useCommon from '../hooks/useCommon';

function Page5() {
  const navigate = useNavigate();
  const message = 'The chicken stood ahead of the calf.';
  const { getElapsedTime, trialCount, setTrialCount, pixiContainerRef, dragItemRef, offsetRef } = useCommon(message);

  const handleResize = () => {
          const chicken = document.getElementById('chicken');
          const calf = document.getElementById('calf');
          const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
          chicken.style.width = `${250 * scale}px`;
          calf.style.width = `${450 * scale}px`;
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
      const chicken = document.getElementById('chicken');
      const calf = document.getElementById('calf');
      const chickenRect = chicken.getBoundingClientRect();
      const calfRect = calf.getBoundingClientRect();
      
      
      const chickenLeft = chickenRect.left;
      const chickenRight = chickenRect.right;
      const chickenBottom = chickenRect.bottom;
      
      const calfLeft = calfRect.left;
      const calfRight = calfRect.right;
      const calfTop = calfRect.top;
      const calfBottom = calfRect.bottom;
  
      
      const isAhead = (chickenLeft >= calfLeft && chickenRight <= calfRight) &&
                      (chickenBottom <= calfTop); 
  
      
      const overlapsWithCalf = (chickenLeft < calfRight && chickenRight > calfLeft) &&
                                (chickenBottom >= calfBottom); 
  
      
      if (isAhead || overlapsWithCalf) {
        throwConfetti();
        localStorage.setItem('Page5TrialCount', trialCount.toString());
        setTimeout(() => {
          navigate('/page6');
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
        id="calf"
        src={calfImg}
        alt="calf"
        style={{
          position: 'absolute',
          left: '70%',
          top: '600%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'calf',dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'calf',dragItemRef, offsetRef, checkSuccess)}
      />
      <img
        id="chicken"
        src={chickenImg}
        alt="chicken"
        style={{
          position: 'absolute',
          left: '30%',
          top: '600%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'chicken',dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'chicken',dragItemRef, offsetRef, checkSuccess)}
      />
      
      <TrialCountDisplay trialCount={trialCount} />
      <TimerDisplay getElapsedTime={getElapsedTime} />
    </div>
  );
}

export default Page5;
