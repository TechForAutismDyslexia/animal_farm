import React, { useEffect, useContext, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { TimerContext } from '../components/TimerContext';
import starImg from '../images/star.webp';

const Last = () => {
  const { getElapsedTime } = useContext(TimerContext);
  const elapsedTime = getElapsedTime();
  const navigate = useNavigate();

  
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  
  const gameId = "999";

  
  const getTotalTrials = useCallback(() => {
    let totalTrials = 0;
    for (let i = 1; i <= 7; i++) {
      totalTrials += parseInt(localStorage.getItem(`Page${i}TrialCount`) || '0');
    }
    return totalTrials;
  }, []); 
  const sendGameData = useCallback(async () => {
    try {
      const gameData = {
        gameId,
        tries: getTotalTrials(),
        timer: elapsedTime,
        status: true,
      };

      console.log('Sending game data:', gameData);

      const response = await fetch('https://jwlgamesbackend.vercel.app/api/caretaker/sendgamedata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });

      if (response.ok) {
        console.log('Game data saved successfully');
      } else {
        console.error('Failed to save game data', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [elapsedTime, getTotalTrials]);

  useEffect(() => {
    const throwConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    };

    throwConfetti();
    sendGameData(); 

  }, [sendGameData]); 

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = ''; 
    };
  }, []);

  
  const goToPage21 = () => {
    navigate('/Page21');
  };

  const goToPage1 = () => {
    navigate('/Page1');
  };
  const goTohome = () => {
    window.location.href = "https://joywithlearning.com/games";
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2rem', color: '#000', marginTop: '20px' }}>Completed Level!</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 200px)', 
        }}
      >
        <img
          style={{
            maxWidth: '70%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
          }}
          src={starImg}
          alt="Star"
        />
      </div>
      <div 
        style={{
          position: 'fixed',
          bottom: '0',
          right: '0',
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#000',
          padding: '10px',
          zIndex: '999',
        }}
      >
        Time Taken: {minutes}:{seconds}
      </div>
      <div 
        className="trial"
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
        Total Trials: {getTotalTrials()}
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button
          onClick={goToPage1}
        >
          Replay
        </button>
       
        <button
          onClick={goTohome}
        >
          Go to Home
        </button>
        <button
          onClick={goToPage21}
        >
          Next Level 
        </button>
      </div>
    </div>
  );
};

export default Last;

