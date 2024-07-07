import { useEffect, useRef, useState, useContext } from 'react';
import { TimerContext } from '../components/TimerContext';
import { preventScroll, handleOrientationChange, readOutLoud } from '../utils/utils';

const useCommon = (message) => {
  const { getElapsedTime } = useContext(TimerContext);
  const [successAchieved, setSuccessAchieved] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [trialCount, setTrialCount] = useState(0);
  const pixiContainerRef = useRef(null);
  const dragItemRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.addEventListener('dragstart', preventScroll, { passive: false });
    window.addEventListener('orientationchange', handleOrientationChange);

    readOutLoud(message);


    return () => {
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('dragstart', preventScroll);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [message]);

  return {
    getElapsedTime,
    successAchieved,
    setSuccessAchieved,
    messageVisible,
    setMessageVisible,
    trialCount,
    setTrialCount,
    pixiContainerRef,
    dragItemRef,
    offsetRef,
  };
};

export default useCommon;
