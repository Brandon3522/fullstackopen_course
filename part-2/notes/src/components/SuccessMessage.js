import React from 'react';
import './successMessage.css';

const SuccessMessage = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="successMessage">{message}</div>;
};

export default SuccessMessage;
