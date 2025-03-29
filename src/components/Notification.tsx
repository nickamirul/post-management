import React from 'react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  return (
    <div 
      className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-md"
      role="alert"
      aria-live="polite"
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button 
          onClick={onClose} 
          className="ml-4 text-white"
          aria-label="Close notification"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;