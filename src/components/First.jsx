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
    <div 
      className="First" 
      
    >
      <div className="title-container">
        <h1 className="title">Animal Farm</h1>
      </div>
      <button onClick={handleOpenModal}>Start Playing</button>
      <Modal isOpen={modalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default First;
