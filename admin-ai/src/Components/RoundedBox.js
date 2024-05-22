import React from 'react';
import ListItem from './ListItem';

const RoundedBox = ({ formData, onClose }) => {
  // Optional chaining to handle undefined formData
  // const name = formData?.name;
  // const email = formData?.email;
  // const field = formData?.field;
  // const prompt = formData?.prompt;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <button
          onClick={onClose}
          className="absolute top-1 right-4 text-gray-500 hover:text-gray-700" 
          style={{ fontSize: '1.7rem' }} // Adjusted font size for a bigger button
        >
          &times;
        </button>

        <ListItem />
      </div>
    </div>
  );
};

export default RoundedBox;
