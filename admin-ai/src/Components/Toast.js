import React, { useEffect } from 'react';

const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Toast will disappear after 3000 milliseconds (3 seconds)
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    isVisible && (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-[#4895ef] text-white py-2 px-4 rounded-md shadow">
          {message}
        </div>
      </div>
    )
  );
};

export default Toast;
