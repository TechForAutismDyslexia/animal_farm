// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './Modal.css';

// const Modal = ({ isOpen, onClose }) => {
//   useEffect(() => {
//     if (isOpen) {
//       const text = "There will be images of two or more animals. Place the animals next to each other according to the sentences given. Click the Understood button below to start playing.";
//       readOutLoud(text);
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button className="close-button" onClick={onClose}>X</button>
//         <h2>Instructions:</h2>
//         <p>There will be images of two or more animals.</p>
//         <p>Place the animals next to each other according to the sentences given.</p>
//         <p>Click the "Understood" button below to start playing.</p>
//         <Link to="/Page1" className="understood-button" onClick={onClose}>Understood</Link>
//       </div>
//     </div>
//   );
// };

// const readOutLoud = (text) => {
//   const speech = new SpeechSynthesisUtterance();
//   speech.text = text;
//   speech.volume = 1; // Volume: 0 to 1
//   speech.rate = 0.7;   // Rate: 0.1 to 10
//   speech.pitch = 1;  // Pitch: 0 to 2
//   window.speechSynthesis.speak(speech);
// };

// export default Modal;


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

  // Cleanup function to stop speech synthesis when modal is closed
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
        <Link to="/Page1" className="understood-button" onClick={onClose}>Understood</Link>
      </div>
    </div>
  );
};

const readOutLoud = (text) => {
  const speech = new SpeechSynthesisUtterance();
  speech.text = text;
  speech.volume = 1; // Volume: 0 to 1
  speech.rate = 0.7; // Rate: 0.1 to 10
  speech.pitch = 1; // Pitch: 0 to 2
  window.speechSynthesis.speak(speech);
};

export default Modal;
