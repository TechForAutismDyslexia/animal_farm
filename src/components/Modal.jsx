import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Modal.css';

const Modal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const text = "There will be images of two or more animals. Place the animals next to each other according to the sentences given. Click the Understood button below to start playing.";
      readOutLoud(text);
    }
  }, [isOpen]);

  
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Instructions:</h2>
        <p>There will be images of two or more animals.</p>
        <p>Place the animals next to each other according to the sentences given.</p>
        <p>Click the "Understood" button below to start playing.</p>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>

        <a href="https://joywithlearning.com/games" className="understood-button" onClick={onClose}>Go to Home</a>
        <Link to="/Page1" className="understood-button" onClick={onClose}>Understood</Link>
        </div>
        
      </div>
    </div>
  );
};

const readOutLoud = (text) => {
  
  const speech = new SpeechSynthesisUtterance();
  speech.text = text;
  speech.volume = 1; 
  speech.rate = 0.9; 
  speech.pitch = 1.3; 

  
  const setVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const rishiVoice = voices.find(voice => voice.name === 'Rishi' && voice.lang === 'en-IN');
    if (rishiVoice) {
      speech.voice = rishiVoice;
    } else {
      console.warn('Rishi voice not found');
    }
    window.speechSynthesis.speak(speech);
  };

  if (window.speechSynthesis.getVoices().length) {
    
    setVoice();
  } else {
    
    window.speechSynthesis.onvoiceschanged = setVoice;
  }
};

export default Modal;
