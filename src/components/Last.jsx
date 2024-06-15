
import React, { useEffect, useContext } from 'react';
import confetti from 'canvas-confetti';
import { TimerContext } from '../components/TimerContext';

const Last = () => {
  const { getElapsedTime } = useContext(TimerContext);
  const elapsedTime = getElapsedTime();

  // Calculate minutes and seconds
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  useEffect(() => {
    const throwConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    };

    throwConfetti();
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = ''; // Revert back to default on unmount
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ fontSize: '2rem', color: '#000', textAlign: 'center', marginTop: '20px' }}>Completed Level!</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 40px)' }}>
        <img style={{ maxWidth: '70%', maxHeight: '100%', width: 'auto', height: 'auto' }} src="/images/star.webp" alt="Star" />
      </div>
      <div style={{ position: 'absolute', bottom: '20px', fontSize: '1.5rem', color: '#000', backgroundColor: '#fff', padding: '10px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
        Time Taken: {minutes}.{seconds} minutes!
      </div>
    </div>
  );
};

export default Last;
