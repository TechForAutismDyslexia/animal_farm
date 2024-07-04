import React, { useContext, useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './style.css';
import { TimerContext } from '../components/TimerContext';
import sheepImg from '../images/sheep.webp';
import pigImg from '../images/pig.webp';
import hayImg from '../images/hay.webp';
import soundImg from '../images/sound.webp';

function Page23() {
  const { getElapsedTime } = useContext(TimerContext); 
  const [successAchieved, setSuccessAchieved] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [trialCount, setTrialCount] = useState(0);
  const pixiContainerRef = useRef(null);
  const dragItemRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const showSuccessMessage = () => {
    setMessageVisible(true);

  };


  const throwConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };


  const onMouseDown = (event, id) => {
    if (successAchieved) return;
    dragItemRef.current = document.getElementById(id);
    const rect = dragItemRef.current.getBoundingClientRect();
    offsetRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onTouchStart = (event, id) => {
    if (successAchieved) return;
    dragItemRef.current = document.getElementById(id);
    const rect = dragItemRef.current.getBoundingClientRect();
    offsetRef.current = {
      x: event.touches[0].clientX - rect.left,
      y: event.touches[0].clientY - rect.top,
    };
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  };

  const onMouseMove = (event) => {
    if (dragItemRef.current) {
      const newPositionX = event.clientX - offsetRef.current.x;
      const newPositionY = event.clientY - offsetRef.current.y;
      dragItemRef.current.style.left = `${newPositionX}px`;
      dragItemRef.current.style.top = `${newPositionY}px`;
    }
  };

  const onTouchMove = (event) => {
    if (dragItemRef.current) {
      const newPositionX = event.touches[0].clientX - offsetRef.current.x;
      const newPositionY = event.touches[0].clientY - offsetRef.current.y;
      dragItemRef.current.style.left = `${newPositionX}px`;
      dragItemRef.current.style.top = `${newPositionY}px`;
    }
  };

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    checkSuccess();
  };

  const onTouchEnd = () => {
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
    checkSuccess();
  };

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
      const distanceY = Math.abs(sheepRect.top - pigRect.top);
  
      // Check if both distance thresholds are satisfied and overlap conditions
      // Adjusted condition to allow sheep bottom up to 20px above pig's top
      if (
        distanceX <= xThreshold &&
        distanceY <= yThreshold &&
        (sheepRect.bottom >= pigRect.top - 100 || sheepRect.top <= pigRect.bottom)
      ) {
        setSuccessAchieved(true);
        showSuccessMessage();
        throwConfetti();
        localStorage.setItem('Page23TrialCount', trialCount.toString());
        setTimeout(() => {
          window.location.href = '/games/animal_farm/page24';
        }, 2000);
      } else {
        setTrialCount(trialCount + 1);
      }
  
      dragItemRef.current = null;
    }
  };
  

  const readOutLoud = (text) => {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        return; 
      }
      const speech = new SpeechSynthesisUtterance(text);
      speech.rate = 0.7; 
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, your browser does not support text to speech!');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const sheep = document.getElementById('sheep');
      const pig = document.getElementById('pig');
      const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      sheep.style.width = `${350 * scale}px`;
      pig.style.width = `${450 * scale}px`;
    };
  
    const preventScroll = (event) => {
      event.preventDefault();
    };
  
    const handleOrientationChange = () => {
      if (!window.matchMedia("(orientation: landscape)").matches) {
        alert("Please use landscape mode for better experience!");
      }
    };
  
    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.addEventListener('dragstart', preventScroll, { passive: false });
    window.addEventListener('orientationchange', handleOrientationChange);
    
    
  
    readOutLoud('The sheep is waiting for his breakfast behind the pig.');
  
    window.addEventListener('resize', handleResize);
    handleResize();
    
  
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('dragstart', preventScroll);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);
  
  

  return (
    <div ref={pixiContainerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <span
     style={{
          position: 'fixed',
          top: '15px',
          left: '15px',
     }} 
     onClick={() => readOutLoud("The sheep is waiting for his breakfast behind the pig.")}>

      <img src={soundImg} alt="sound" width={'50px'}/>
     </span>
      <p className='text'>
        The sheep is waiting for his breakfast behind the pig.
      </p>

      
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
        onMouseDown={(e) => onMouseDown(e, 'sheep')}
        onTouchStart={(e) => onTouchStart(e, 'sheep')}
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
        onMouseDown={(e) => onMouseDown(e, 'pig')}
        onTouchStart={(e) => onTouchStart(e, 'pig')}
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
      {messageVisible && (
        <p
          style={{
            position: 'absolute',
            left: '50%',
            top: '100%',
            transform: 'translate(-50%, -50%)',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#c74f54',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          Success!
        </p>
      )}
      <div className='trial'
        style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#000',
          padding: '10px', 
          zIndex: '999',
        }}
      >
        Trials: {trialCount}
      </div>
      <div style={{
               position: 'fixed', 
               top: 10, 
               right: 10, 
               fontSize: '2rem',
          

                }}>
                Timer: {getElapsedTime()} s
            </div>
    </div>
  );
}

export default Page23;