import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const location = useLocation();
  const [startTime, setStartTime] = useState(() => {
    const storedTime = localStorage.getItem('startTime');
    return storedTime ? parseInt(storedTime, 10) : null;
  });
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const startTimer = useCallback(() => {
    const now = Date.now();
    setStartTime(now);
    localStorage.setItem('startTime', now.toString());
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
      const storedElapsedTime = localStorage.getItem('elapsedTime');
      if (storedElapsedTime) {
        setElapsedTime(parseInt(storedElapsedTime, 10));
      }
    }
    return () => clearInterval(interval);
  }, [startTime, getElapsedTime]);

  useEffect(() => {
    if (location.pathname === '/page1' && !startTime) {
      startTimer();
    } else if (location.pathname === '/last') {
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
