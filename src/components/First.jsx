// First.jsx
import React, { useState } from 'react';
import Modal from './Modal';
import './First.css';


const First = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (

      <div className="First">
        <h1>Barnyard Game</h1>
        <button onClick={handleOpenModal}>Start Playing</button>
        <Modal isOpen={modalOpen} onClose={handleCloseModal} />
        
      </div>
  
  );
}

export default First;
