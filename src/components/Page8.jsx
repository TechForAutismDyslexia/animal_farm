import React, { useContext, useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './style.css';
import { TimerContext } from '../components/TimerContext';

function Page8() {
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
    window.location.href = '/last';
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
      const dog = document.getElementById('dog');
      const goat = document.getElementById('goat');
      const dogRect = dog.getBoundingClientRect();
      const goatRect = goat.getBoundingClientRect();
      
      
      const dogLeft = dogRect.left;
      const dogRight = dogRect.right;
      const goatLeft = goatRect.left;
      const goatRight = goatRect.right;
      
      
      const goatWidth = goatRect.width;
      const xThreshold = goatWidth * 0.3; 
  
      
      if (dogLeft >= goatLeft - xThreshold && dogLeft <= goatRight - goatWidth + xThreshold &&
          dogRect.top >= goatRect.top && dogRect.bottom <= goatRect.bottom) {
        setSuccessAchieved(true);
        showSuccessMessage();
        throwConfetti();
      } else if (dogRight >= goatLeft + goatWidth - xThreshold && dogRight <= goatRight + xThreshold &&
                 dogRect.top >= goatRect.top && dogRect.bottom <= goatRect.bottom) {
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
      const goat = document.getElementById('goat');
      const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      dog.style.width = `${250 * scale}px`;
      goat.style.width = `${550 * scale}px`;
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
    
    readOutLoud('The dog sat next to the goat.');
  
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
     onClick={() => readOutLoud("The dog sat next to the goat.")}>

      <img src="/images/sound.webp" alt="sound" width={'50px'}/>
     </span>


        <p className='text'>
          The dog sat next to the goat.
        </p>
        

<img
        id="dog"
        src="/images/bolt.webp"
        alt="dog"
        className="image-style"
        style={{
          position: 'absolute',
          left: '20%',
          top: '600%', 
          transform: 'translate(-50%, -50%)',
          
        }}
        onMouseDown={(e) => onMouseDown(e, 'dog')}
        onTouchStart={(e) => onTouchStart(e, 'dog')}
      />
      <img
        id="goat"
        src="/images/goat.webp"
        alt="goat"
        className="image-style"
        style={{
          position: 'absolute',
          left: '90%',
          top: '600%', 
          transform: 'translate(-50%, -50%)',
          
        }}
        onMouseDown={(e) => onMouseDown(e, 'goat')}
        onTouchStart={(e) => onTouchStart(e, 'goat')}
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

export default Page8;
