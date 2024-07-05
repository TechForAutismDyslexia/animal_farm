import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import soundImg from '../images/sound.webp';
import cowImg from '../images/cow.webp';
import dogImg from '../images/sleep_dog.webp';
import horseImg from '../images/horse2.webp';
import { throwConfetti, onMouseDown, onTouchStart, readOutLoud, TrialCountDisplay, TimerDisplay } from '../utils/utils';
import useCommon from '../hooks/useCommon';

function Page24() {
  const navigate = useNavigate();
  const message = ' The dog is sleeping between the horse and the cow.';
  const { getElapsedTime, trialCount, setTrialCount, pixiContainerRef, dragItemRef, offsetRef } = useCommon(message);

  const handleResize = () => {
    const dog = document.getElementById('dog');
    const horse = document.getElementById('horse');
    const cow = document.getElementById('cow');
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    dog.style.width = `${500 * scale}px`;
    horse.style.width = `${500 * scale}px`;
    cow.style.width = `${450 * scale}px`
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
        const horse = document.getElementById('horse');
        const cow = document.getElementById('cow');
        const dogRect = dog.getBoundingClientRect();
        const horseRect = horse.getBoundingClientRect();
        const cowRect = cow.getBoundingClientRect();
        const dogLeft = dogRect.left;
        const dogRight = dogRect.right;
        const cowLeft = cowRect.left;
        const cowRight = cowRect.right;
        const horseLeft = horseRect.left;
        const horseRight = horseRect.right;
        const dogWidth = dogRect.width;
        const xThreshold = dogWidth * 0.4; // Reduced the threshold to 30% of the dog's width
    
        if (
          (dogLeft >= cowRight - xThreshold && dogRight <= horseLeft + xThreshold) ||
          (dogLeft <= cowLeft + xThreshold && dogRight >= horseRight - xThreshold)
        ) {

        throwConfetti();
        localStorage.setItem('Page24TrialCount', trialCount.toString());
        setTimeout(() => {
          navigate('/page25');
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
        className="images"
        id="horse"
        src={horseImg}
        alt="Horse"
        style={{
          position: 'absolute',
          left: '80%',
          top: '600%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '30% !important',
        }}
        onMouseDown={(e) => onMouseDown(e, 'horse', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'horse', dragItemRef, offsetRef, checkSuccess)}
      />
      <img
        className="images"
        id="dog"
        src={dogImg}
        alt="dog"
        style={{
          position: 'absolute',
          left: '20%',
          top: '800%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'dog', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'dog', dragItemRef, offsetRef, checkSuccess)}
      />
      <img
        className="images"
        id="cow"
        src={cowImg}
        alt="cow"
        style={{
          position: 'absolute',
          left: '50%',
          top: '600%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '15%',
        }}
        onMouseDown={(e) => onMouseDown(e, 'cow', dragItemRef, offsetRef, checkSuccess)}
        onTouchStart={(e) => onTouchStart(e, 'cow', dragItemRef, offsetRef, checkSuccess)}
      />
     

      <TrialCountDisplay trialCount={trialCount} />
      <TimerDisplay getElapsedTime={getElapsedTime} />
    </div>
  );
}

export default Page24;
