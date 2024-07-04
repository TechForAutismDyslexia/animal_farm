import React, { useContext, useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './style.css';
import { TimerContext } from '../components/TimerContext';
import sheepImg from '../images/sheep.webp';
import horseImg from '../images/horse2.webp';
import cowImg from '../images/cow.webp';
import soundImg from '../images/sound.webp';

function Page25() {
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
        setSuccessAchieved(true);
        showSuccessMessage();
        throwConfetti();
        localStorage.setItem('Page25TrialCount', trialCount.toString());
        setTimeout(() => {
          window.location.href = '/games/animal_farm/page26';
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
      const cow = document.getElementById('cow');
      const horse = document.getElementById('horse');
      const sheep = document.getElementById('sheep');
      const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      cow.style.width = `${400 * scale}px`;
      horse.style.width = `${550 * scale}px`;
      sheep.style.width = `${300 * scale}px`;
      
    };

    const preventScroll = (event) => {
      event.preventDefault();
    };

    const handleOrientationChange = () => {
      if (!window.matchMedia("(orientation: portrait)").matches) {
        alert("Please use landscape mode for better experience!");
      }
    };

    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.addEventListener('dragstart', preventScroll, { passive: false });
    window.addEventListener('orientationchange', handleOrientationChange);

    
    readOutLoud('The horse is standing in front of the cow and looking at the sheep who is beside him.');

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
        onClick={() => readOutLoud("The horse is standing in front of the cow and looking at the sheep who is beside him.")}
      >
        <img src={soundImg} alt="sound" width={'50px'} />
      </span>
      <p className="text">
        The horse is standing in front of the cow and looking at the sheep who is beside him.
      </p>
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
        onMouseDown={(e) => onMouseDown(e, 'cow')}
        onTouchStart={(e) => onTouchStart(e, 'cow')}
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
        onMouseDown={(e) => onMouseDown(e, 'horse')}
        onTouchStart={(e) => onTouchStart(e, 'horse')}
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
        onMouseDown={(e) => onMouseDown(e, 'sheep')}
        onTouchStart={(e) => onTouchStart(e, 'sheep')}
        
      />
      
     
      {messageVisible && (
        <p
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
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

export default Page25;
