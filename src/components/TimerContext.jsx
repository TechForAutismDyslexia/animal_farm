// import React, { createContext, useState, useEffect, useCallback } from 'react';
// import { useLocation } from 'react-router-dom';

// export const TimerContext = createContext();

// export const TimerProvider = ({ children }) => {
//   const location = useLocation();
//   const [startTime, setStartTime] = useState(() => {
//     const storedTime = localStorage.getItem('startTime');
//     return storedTime ? parseInt(storedTime, 10) : null;
//   });
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [intervalId, setIntervalId] = useState(null);

//   const startTimer = useCallback(() => {
//     const now = Date.now();
//     setStartTime(now);
//     localStorage.setItem('startTime', now.toString());
//   }, []);

//   const getElapsedTime = useCallback(() => {
//     if (startTime) {
//       const now = Date.now();
//       return Math.floor((now - startTime) / 1000);
//     }
//     return elapsedTime;
//   }, [startTime, elapsedTime]);

//   const stopTimer = useCallback(() => {
//     if (intervalId) {
//       clearInterval(intervalId);
//       setIntervalId(null);
//     }
//     const finalElapsedTime = getElapsedTime();
//     setElapsedTime(finalElapsedTime);
//     localStorage.setItem('elapsedTime', finalElapsedTime.toString());
//     setStartTime(null);
//     localStorage.removeItem('startTime');
//   }, [intervalId, getElapsedTime]);

//   useEffect(() => {
//     let interval;
//     if (startTime) {
//       interval = setInterval(() => {
//         setElapsedTime(getElapsedTime());
//       }, 1000);
//       setIntervalId(interval);
//     } else {
//       const storedElapsedTime = localStorage.getItem('elapsedTime');
//       if (storedElapsedTime) {
//         setElapsedTime(parseInt(storedElapsedTime, 10));
//       }
//     }
//     return () => clearInterval(interval);
//   }, [startTime, getElapsedTime]);

//   useEffect(() => {
//     if (location.pathname === '/page1' && !startTime) {
//       startTimer();
//     } else if (location.pathname === '/last') {
//       stopTimer();
//     }
//   }, [location.pathname, startTimer, stopTimer, startTime]);

//   return (
//     <TimerContext.Provider value={{ startTimer, getElapsedTime, stopTimer, elapsedTime }}>
//       {children}
//     </TimerContext.Provider>
//   );
// };

// export default TimerProvider;




import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const location = useLocation();

  const [startTime1, setStartTime1] = useState(() => {
    const storedTime = localStorage.getItem('startTime1');
    return storedTime ? parseInt(storedTime, 10) : null;
  });
  const [elapsedTime1, setElapsedTime1] = useState(0);
  const [intervalId1, setIntervalId1] = useState(null);

  const [startTime2, setStartTime2] = useState(() => {
    const storedTime = localStorage.getItem('startTime2');
    return storedTime ? parseInt(storedTime, 10) : null;
  });
  const [elapsedTime2, setElapsedTime2] = useState(0);
  const [intervalId2, setIntervalId2] = useState(null);

  const startTimer = useCallback((timer) => {
    const now = Date.now();
    if (timer === 'timer1') {
      setStartTime1(now);
      localStorage.setItem('startTime1', now.toString());
    } else if (timer === 'timer2') {
      setStartTime2(now);
      localStorage.setItem('startTime2', now.toString());
    }
  }, []);

  const getElapsedTime = useCallback((timer) => {
    const now = Date.now();
    if (timer === 'timer1' && startTime1) {
      return Math.floor((now - startTime1) / 1000);
    } else if (timer === 'timer2' && startTime2) {
      return Math.floor((now - startTime2) / 1000);
    }
    return timer === 'timer1' ? elapsedTime1 : elapsedTime2;
  }, [startTime1, startTime2, elapsedTime1, elapsedTime2]);

  const stopTimer = useCallback((timer) => {
    if (timer === 'timer1' && intervalId1) {
      clearInterval(intervalId1);
      setIntervalId1(null);
      const finalElapsedTime = getElapsedTime('timer1');
      setElapsedTime1(finalElapsedTime);
      localStorage.setItem('elapsedTime1', finalElapsedTime.toString());
      setStartTime1(null);
      localStorage.removeItem('startTime1');
    } else if (timer === 'timer2' && intervalId2) {
      clearInterval(intervalId2);
      setIntervalId2(null);
      const finalElapsedTime = getElapsedTime('timer2');
      setElapsedTime2(finalElapsedTime);
      localStorage.setItem('elapsedTime2', finalElapsedTime.toString());
      setStartTime2(null);
      localStorage.removeItem('startTime2');
    }
  }, [intervalId1, intervalId2, getElapsedTime]);

  useEffect(() => {
    let interval1, interval2;
    if (startTime1) {
      interval1 = setInterval(() => {
        setElapsedTime1(getElapsedTime('timer1'));
      }, 1000);
      setIntervalId1(interval1);
    } else {
      const storedElapsedTime1 = localStorage.getItem('elapsedTime1');
      if (storedElapsedTime1) {
        setElapsedTime1(parseInt(storedElapsedTime1, 10));
      }
    }
    if (startTime2) {
      interval2 = setInterval(() => {
        setElapsedTime2(getElapsedTime('timer2'));
      }, 1000);
      setIntervalId2(interval2);
    } else {
      const storedElapsedTime2 = localStorage.getItem('elapsedTime2');
      if (storedElapsedTime2) {
        setElapsedTime2(parseInt(storedElapsedTime2, 10));
      }
    }
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [startTime1, startTime2, getElapsedTime]);

  useEffect(() => {
    if (location.pathname === '/page1' && !startTime1) {
      startTimer('timer1');
    } else if (location.pathname === '/last') {
      stopTimer('timer1');
    } else if (location.pathname === '/page21' && !startTime2) {
      startTimer('timer2');
    } else if (location.pathname === '/last2') {
      stopTimer('timer2');
    }
  }, [location.pathname, startTimer, stopTimer, startTime1, startTime2]);

  return (
    <TimerContext.Provider value={{ startTimer, getElapsedTime, stopTimer, elapsedTime1, elapsedTime2 }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
