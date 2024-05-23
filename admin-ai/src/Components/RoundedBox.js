import React from 'react';
import CreateForm from './CreateForm';

const RoundedBox = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <button
          onClick={onClose}
          className="absolute top-1 right-4 text-gray-500 hover:text-gray-700"
          style={{ fontSize: '1.7rem' }}
        >
          &times;
        </button>
        <CreateForm />
      </div>
    </div>
  );
};

export default RoundedBox;
