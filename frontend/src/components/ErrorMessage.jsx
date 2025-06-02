import React from 'react';
import '../styles/ErrorMessage.css';

const ErrorMessage = ({ showVideo, onClose }) => {
  return (
    showVideo && (
      <div className="error-video-container">
        <div className="error-video-box">
          <video className="error-video" autoPlay muted>
            <source src="/assets/incorrect.mp4" type="video/mp4" />
          </video>
          <button className="close-button" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    )
  );
};

export default ErrorMessage;