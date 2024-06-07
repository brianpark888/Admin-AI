import React, { useState, useEffect } from 'react';

const Toast = ({ message, isVisible }) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000); // Toast will disappear after 5000 milliseconds (5 seconds)
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    visible && (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-[#FFC749] text-white py-2 px-4 rounded-md shadow">
          {message}
        </div>
      </div>
    )
  );
};

export default Toast;
