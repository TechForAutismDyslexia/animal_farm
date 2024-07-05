import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import soundImg from '../images/sound.webp';
import pigImg from '../images/pig.webp';
import lambImg from '../images/lamb.webp';
import { throwConfetti, onMouseDown, onTouchStart, readOutLoud, TrialCountDisplay, TimerDisplay } from '../utils/utils';
import useCommon from '../hooks/useCommon';

function Page4() {
  const navigate = useNavigate();
  const message = 'The pig stood to one side of the lamb.';
  const { getElapsedTime, trialCount, setTrialCount, pixiContainerRef, dragItemRef, offsetRef } = useCommon(message);

  const handleResize = () => {
          const pig = document.getElementById('pig');
          const lamb = document.getElementById('lamb');
          const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
          pig.style.width = `${400 * scale}px`;
          lamb.style.width = `${400 * scale}px`;
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
        const lamb = document.getElementById('lamb');
        const pig = document.getElementById('pig');
        const lambRect = lamb.getBoundingClientRect();
        const pigRect = pig.getBoundingClientRect();
    
        
        const proximityRange = 150; 
    
        
        const verticalAlignmentThreshold = 50; 
    
        
        const isWithinVerticalLimits = pigRect.top >= lambRect.top - verticalAlignmentThreshold &&
                                      pigRect.bottom <= lambRect.bottom + verticalAlignmentThreshold;
    
        
        const pigCloseToLeftSide = pigRect.right >= lambRect.left && pigRect.right - lambRect.left <= proximityRange;
            
                  
        const pigCloseToRightSide = pigRect.left <= lambRect.right && lambRect.right - pigRect.left <= proximityRange;
              
            
        if ((pigCloseToLeftSide || pigCloseToRightSide) && isWithinVerticalLimits) {
        throwConfetti();
        localStorage.setItem('Page4TrialCount', trialCount.toString());
        setTimeout(() => {
          navigate('/page5');
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
        id="pig"
        src={pigImg}  
        alt="Pig"
        style={{
          position: 'absolute',
          left: '30%',
          top: '450%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'pig', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'pig', dragItemRef, offsetRef, checkSuccess)}
      />
      <img
        id="lamb"
        src={lambImg}
        alt="lamb"
        style={{
          position: 'absolute',
          left: '70%',
          top: '450%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'lamb', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'lamb', dragItemRef, offsetRef, checkSuccess)}
      />
      <TrialCountDisplay trialCount={trialCount} />
      <TimerDisplay getElapsedTime={getElapsedTime} />
    </div>
  );
}

export default Page4;
