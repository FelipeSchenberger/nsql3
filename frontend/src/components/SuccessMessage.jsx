import React from 'react';
import '../styles/SuccessMessage.css';

const SuccessMessage = ({ showVideo, onClose }) => {
  return (
    showVideo && (
      <div className="success-video-container">
        <div className="success-video-box">
          <video className="success-video" autoPlay muted>
            <source src="/assets/success.mp4" type="video/mp4" />
          </video>
          <button className="close-button" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    )
  );
};


export default SuccessMessage;