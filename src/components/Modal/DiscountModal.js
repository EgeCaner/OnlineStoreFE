import React, { useState } from 'react';
import './styles.scss';

const Modal2 = ({ hideModal, toggleModal2, children }) => {
  if (hideModal) return null;

  return [
    <div className="modalOverlay" onClick={() => toggleModal2()} />,
    <div className="modalWrap">
      <div className="modal">
        {children}
      </div>
    </div>
  ];
}

export default Modal2;