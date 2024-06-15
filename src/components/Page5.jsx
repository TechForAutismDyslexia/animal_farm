import React, { useContext, useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './style.css';
import { TimerContext } from '../components/TimerContext';

function Page5() {
  const {  getElapsedTime } = useContext(TimerContext); 
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
    window.location.href = '/page6';
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
      const chicken = document.getElementById('chicken');
      const calf = document.getElementById('calf');
      const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      chicken.style.width = `${250 * scale}px`;
      calf.style.width = `${450 * scale}px`;
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
    
    
  
    readOutLoud('The chicken stood ahead the calf.');
  
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
     onClick={() => readOutLoud("The chicken stood ahead of the calf.")}>

      <img src="/images/sound.webp" alt="sound" width={'50px'}/>
     </span>
      <p className='text'>
        The chicken stood ahead of the calf.
      </p>

      <img
        id="calf"
        src="/images/calf.webp"
        alt="calf"
        style={{
          position: 'absolute',
          left: '70%',
          top: '600%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'calf')}
        onTouchStart={(e) => onTouchStart(e, 'calf')}
      />
      <img
        id="chicken"
        src="/images/chicken.webp"
        alt="chicken"
        style={{
          position: 'absolute',
          left: '30%',
          top: '600%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'chicken')}
        onTouchStart={(e) => onTouchStart(e, 'chicken')}
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

export default Page5;