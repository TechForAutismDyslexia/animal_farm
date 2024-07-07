import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const location = useLocation();
  const [startTime, setStartTime] = useState(() => {
    // Get the startTime from localStorage or set to null if not found
    const storedTime = localStorage.getItem('startTime');
    return storedTime ? parseInt(storedTime, 10) : null;
  });
  const [elapsedTime, setElapsedTime] = useState(() => {
    // Get the elapsedTime from localStorage or set to 0 if not found
    const storedElapsedTime = localStorage.getItem('elapsedTime');
    return storedElapsedTime ? parseInt(storedElapsedTime, 10) : 0;
  });
  const [intervalId, setIntervalId] = useState(null);

  const startTimer = useCallback(() => {
    const now = Date.now();
    setStartTime(now);
    localStorage.setItem('startTime', now.toString());
    // Reset the elapsed time
    setElapsedTime(0);
    localStorage.setItem('elapsedTime', '0');
  }, []);

  const getElapsedTime = useCallback(() => {
    if (startTime) {
      const now = Date.now();
      return Math.floor((now - startTime) / 1000);
    }
    return elapsedTime;
  }, [startTime, elapsedTime]);

  const stopTimer = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    const finalElapsedTime = getElapsedTime();
    setElapsedTime(finalElapsedTime);
    localStorage.setItem('elapsedTime', finalElapsedTime.toString());
    setStartTime(null);
    localStorage.removeItem('startTime');
  }, [intervalId, getElapsedTime]);

  useEffect(() => {
    let interval;
    if (startTime) {
      interval = setInterval(() => {
        setElapsedTime(getElapsedTime());
      }, 1000);
      setIntervalId(interval);
    } else {
      // If no startTime, check localStorage for elapsedTime
      const storedElapsedTime = localStorage.getItem('elapsedTime');
      if (storedElapsedTime) {
        setElapsedTime(parseInt(storedElapsedTime, 10));
      }
    }

    return () => clearInterval(interval);
  }, [startTime, getElapsedTime]);

  useEffect(() => {
    if ((location.pathname === '/page1' || location.pathname === '/page21') && !startTime) {
      startTimer();
    } else if (location.pathname === '/last' || location.pathname === '/last2') {
      stopTimer();
    }
  }, [location.pathname, startTimer, stopTimer, startTime]);

  return (
    <TimerContext.Provider value={{ startTimer, getElapsedTime, stopTimer, elapsedTime }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
