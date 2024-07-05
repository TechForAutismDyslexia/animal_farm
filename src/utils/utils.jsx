import React from 'react';
import confetti from 'canvas-confetti';

export const throwConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
};

export const preventScroll = (event) => {
  event.preventDefault();
};

export const handleOrientationChange = () => {
  if (!window.matchMedia("(orientation: portrait)").matches) {
    alert("Please use landscape mode for better experience!");
  }
};
  
  // Trial count display component
  export const TrialCountDisplay = ({ trialCount }) => (
    <div
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
  );
  
  // Timer display component
  export const TimerDisplay = ({ getElapsedTime }) => (
    <div
      style={{
        position: 'fixed',
        top: '0',
        right: '0',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#000',
        padding: '10px',
        zIndex: '999',
      }}
    >
      Timer: {getElapsedTime()} s
    </div>
  );

 export const readOutLoud = (text) => {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        return; 
      }
      const rishiVoice = window.speechSynthesis.getVoices().find(voice => voice.name === 'Rishi' && voice.lang === 'en-IN');
      
      const speech = new SpeechSynthesisUtterance(text);
      speech.voice = rishiVoice;
      speech.rate = 0.7; 
      speech.rate = 0.9;
      speech.pitch = 1.3;
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, your browser does not support text to speech!');
    }
  };

// Updated drag and drop functions for smoother dragging

export const onMouseDown = (event, id, dragItemRef, offsetRef, checkSuccess) => {
  if (event.button !== 0) return; // Only handle left mouse button

  dragItemRef.current = document.getElementById(id);
  const rect = dragItemRef.current.getBoundingClientRect();
  offsetRef.current = {
    x: event.clientX - (rect.left + rect.width / 2), // Center the drag start point
    y: event.clientY - (rect.top + rect.height / 2),
  };

  const moveHandler = (e) => onMouseMove(e, dragItemRef, offsetRef);
  const upHandler = () => onMouseUp(checkSuccess, dragItemRef);

  document.addEventListener('mousemove', moveHandler);
  document.addEventListener('mouseup', upHandler);

  dragItemRef.current._moveHandler = moveHandler;
  dragItemRef.current._upHandler = upHandler;
};

export const onTouchStart = (event, id, dragItemRef, offsetRef, checkSuccess) => {
  if (event.touches.length !== 1) return; // Only handle single touch

  dragItemRef.current = document.getElementById(id);
  const rect = dragItemRef.current.getBoundingClientRect();
  offsetRef.current = {
    x: event.touches[0].clientX - (rect.left + rect.width / 2), // Center the drag start point
    y: event.touches[0].clientY - (rect.top + rect.height / 2),
  };

  const moveHandler = (e) => onTouchMove(e, dragItemRef, offsetRef);
  const endHandler = () => onTouchEnd(checkSuccess, dragItemRef);

  document.addEventListener('touchmove', moveHandler);
  document.addEventListener('touchend', endHandler);

  dragItemRef.current._moveHandler = moveHandler;
  dragItemRef.current._endHandler = endHandler;
};

export const onMouseMove = (event, dragItemRef, offsetRef) => {
  if (dragItemRef.current) {
    const newPositionX = event.clientX - offsetRef.current.x;
    const newPositionY = event.clientY - offsetRef.current.y;
    dragItemRef.current.style.left = `${newPositionX}px`;
    dragItemRef.current.style.top = `${newPositionY}px`;
  }
};

export const onTouchMove = (event, dragItemRef, offsetRef) => {
  if (dragItemRef.current) {
    const newPositionX = event.touches[0].clientX - offsetRef.current.x;
    const newPositionY = event.touches[0].clientY - offsetRef.current.y;
    dragItemRef.current.style.left = `${newPositionX}px`;
    dragItemRef.current.style.top = `${newPositionY}px`;
  }
};

export const onMouseUp = (checkSuccess, dragItemRef) => {
  document.removeEventListener('mousemove', dragItemRef.current?._moveHandler);
  document.removeEventListener('mouseup', dragItemRef.current?._upHandler);
  checkSuccess();
};

export const onTouchEnd = (checkSuccess, dragItemRef) => {
  document.removeEventListener('touchmove', dragItemRef.current?._moveHandler);
  document.removeEventListener('touchend', dragItemRef.current?._endHandler);
  checkSuccess();
};


