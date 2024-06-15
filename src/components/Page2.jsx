import React, { useContext, useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './style.css';
import { TimerContext } from '../components/TimerContext';

function Page2() {
  const { getElapsedTime } = useContext(TimerContext);
  const [successAchieved, setSuccessAchieved] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [trialCount, setTrialCount] = useState(0);
  const pixiContainerRef = useRef(null);
  const dragItemRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const showSuccessMessage = () => {
    setMessageVisible(true);
    
    
      showButtons();
    
  };

  const showButtons = () => {
    const buttonContainer = document.createElement('div');
    buttonContainer.style.position = 'absolute';
    buttonContainer.style.left = '50%';
    buttonContainer.style.bottom = '10%';
    buttonContainer.style.transform = 'translateX(-50%)';
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '20px';

    const buttonPrev = document.createElement('button');
    buttonPrev.innerText = 'Replay';
    buttonPrev.style.cursor = 'pointer';
    buttonPrev.style.padding = '10px 20px';
    buttonPrev.style.fontSize = '1.5rem';
    buttonPrev.addEventListener('click', onButtonPrevClick);

    const buttonNext = document.createElement('button');
    buttonNext.innerText = 'Next';
    buttonNext.style.cursor = 'pointer';
    buttonNext.style.padding = '10px 20px';
    buttonNext.style.fontSize = '1.5rem';
    buttonNext.addEventListener('click', onButtonNextClick);

    buttonContainer.appendChild(buttonPrev);
    buttonContainer.appendChild(buttonNext);
    
    document.body.appendChild(buttonContainer);
  };

  const throwConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const onButtonNextClick = () => {
    window.location.href = '/page3';
  };

  const onButtonPrevClick = () => {
    window.location.reload();
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
      const sheep = document.getElementById('sheep');
      const dog = document.getElementById('dog');
      const sheepRect = sheep.getBoundingClientRect();
      const dogRect = dog.getBoundingClientRect();
  
      
      const verticalAlignmentThreshold = 10; 
  
      
      const dogInFrontOfSheep = dogRect.bottom <= sheepRect.top + verticalAlignmentThreshold || dogRect.top >= sheepRect.top;
  
      
      const xThreshold = 0.1 * window.innerWidth; 
      const alignedHorizontally = Math.abs(dogRect.left - sheepRect.left) <= xThreshold;
  
      if (dogInFrontOfSheep && alignedHorizontally) {
        setSuccessAchieved(true);
        showSuccessMessage();
        throwConfetti();
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
      const dog = document.getElementById('dog');
      const sheep = document.getElementById('sheep');
      const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      dog.style.width = `${280 * scale}px`;
      sheep.style.width = `${500 * scale}px`;
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
    
    
  
    readOutLoud('The dog sat in front of the sheep.');
  
    window.addEventListener('resize', handleResize);
    handleResize();
    
  
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('dragstart', preventScroll);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, );
  
  

  return (
    <div ref={pixiContainerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <span
     style={{
          position: 'fixed',
          top: '15px',
          left: '15px',
     }} 
     onClick={() => readOutLoud("The dog sat in front of the sheep.")}>

      <img src="/images/sound.webp" alt="sound" width={'50px'}/>
     </span>
      <p className="text">
        The dog sat in front of the sheep.
      </p>

      <img
        id="sheep"
        src="/images/sheep2.webp"
        alt="sheep"
        style={{
          position: 'absolute',
          left: '70%',
          top: '600%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'sheep')}
        onTouchStart={(e) => onTouchStart(e, 'sheep')}
      />
      <img
        id="dog"
        src="/images/dog.webp"
        alt="dog"
        style={{
          position: 'absolute',
          left: '30%',
          top: '600%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'dog')}
        onTouchStart={(e) => onTouchStart(e, 'dog')}
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

export default Page2;
