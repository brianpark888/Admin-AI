import React from 'react';

const FinishSubmission = ({ onRetry }) => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center sm:p-24'>
      <div className="relative bg-white shadow-sm p-7 rounded-lg z-10 w-full max-w-7xl p-20 h-auto">
        <div className="text-center p-5 border-b-2">
          <h1 className="text-xl font-bold">Submission Success!</h1>
          <p className="text-gray-600">Your response has been recorded.</p>
        </div>
      </div>
    </div>
  );
};

export default FinishSubmission;
