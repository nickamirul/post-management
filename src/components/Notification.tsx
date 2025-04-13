import React from 'react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  return (
    <div 
      className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 ease-in-out animate-fade-in"
      role="alert"
      aria-live="polite"
    >
      <div className="flex justify-between items-center min-w-[300px]">
        <span className="font-medium">{message}</span>
        <button 
          onClick={onClose} 
          className="ml-4 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-full p-1"
          aria-label="Close notification"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;