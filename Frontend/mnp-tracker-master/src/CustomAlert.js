import React from "react";
import "./CustomAlert.css";

const CustomAlert = ({ message, onClose, type = "info" }) => {
  return (
    <div className={`custom-alert-overlay`} onClick={onClose}>
      <div
        className={`custom-alert-box ${type}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="custom-alert-message">{message}</div>
        <button className="custom-alert-close" onClick={onClose} aria-label="Close alert">
          &times;
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
