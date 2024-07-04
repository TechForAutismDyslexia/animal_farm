import React, { useContext, useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './style.css';
import { TimerContext } from '../components/TimerContext';
import dogImg from '../images/sleep_dog.webp';
import horseImg from '../images/horse2.webp';
import pigImg from '../images/pig.webp';
import soundImg from '../images/sound.webp';

function Page26() {
  const {  getElapsedTime } = useContext(TimerContext); 
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
      const dog = document.getElementById('dog');
      const horse = document.getElementById('horse');
      const pig = document.getElementById('pig');
  
      if (!dog || !horse || !pig) {
        console.error("One or more elements not found");
        return;
      }
  
      const dogRect = dog.getBoundingClientRect();
      const horseRect = horse.getBoundingClientRect();
      const pigRect = pig.getBoundingClientRect();
  
      // Condition to check if the dog and pig are both to the left of the horse
      const dogAndPigLeftOfHorse = dogRect.right <= horseRect.left && pigRect.right <= horseRect.left;
  
      // Condition to check the relative positions of dog and pig
      const dogToRightOrLeftOfPig = (dogRect.left >= pigRect.right - 30 && dogRect.left <= pigRect.right + 30) ||
                                    (dogRect.right >= pigRect.left - 30 && dogRect.right <= pigRect.left + 30);
  
      // Condition to check the bottom heights of dog and pig
      const bottomHeightInRange = (Math.abs(dogRect.bottom - pigRect.bottom) <= 50) ||
                                  (dogRect.right > pigRect.left && dogRect.left < pigRect.right && Math.abs(dogRect.bottom - pigRect.bottom) <= 100);
  
      // If all conditions are met, it's a success
      if ((dogAndPigLeftOfHorse &&  bottomHeightInRange) || (dogAndPigLeftOfHorse &&dogToRightOrLeftOfPig && bottomHeightInRange)) {
        setSuccessAchieved(true);
        showSuccessMessage();
        throwConfetti();
        localStorage.setItem('Page26TrialCount', trialCount.toString());
        setTimeout(() => {
          window.location.href = '/games/animal_farm/last2';
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
      const dog = document.getElementById('dog');
      const horse = document.getElementById('horse');
      const pig = document.getElementById('pig');
      const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      dog.style.width = `${500 * scale}px`;
      horse.style.width = `${600 * scale}px`;
      pig.style.width = `${500 * scale}px`;
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
    
    
  
    readOutLoud('The dog is sleeping next to the pig and behind the horse.');
  
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
     onClick={() => readOutLoud("The dog is sleeping next to the pig and behind the horse.")}>

      <img src={soundImg} alt="sound" width={'50px'}/>
     </span>
      <p className='text'>
        The dog is sleeping next to the pig and behind the horse.
      </p>

      <img
        id="horse"
        src={horseImg}
        alt="Horse"
        style={{
          position: 'absolute',
          left: '20%',
          top: '500%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'horse')}
        onTouchStart={(e) => onTouchStart(e, 'horse')}
      />
    
      <img
        id="pig"
        src={pigImg}
        alt="pig"
        style={{
          position: 'absolute',
          left: '80%',
          top: '600%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'pig')}
        onTouchStart={(e) => onTouchStart(e, 'pig')}
      />
        <img
        id="dog"
        src={dogImg}
        alt="dog"
        style={{
          position: 'absolute',
          left: '50%',
          top: '700%',
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
               top: '0',
               right: '0',
               fontSize: '2rem',
               fontWeight: 'bold',
               color: '#000',
               padding: '10px', 
               zIndex: '999',
                }}>
                Timer: {getElapsedTime()} s
            </div>
    </div>
  );
}

export default Page26;
