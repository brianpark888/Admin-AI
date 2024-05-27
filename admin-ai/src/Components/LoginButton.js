import React from 'react';

// This will be a client component since it needs to handle user interaction
function InteractiveButton(label) {
  const handleClick = () => {
    window.location.href = '/Login';
  };

  return (
    <button onClick={handleClick} className='bg-black py-4 px-3 font-bold border-2-[#8302E1] rounded-lg'>
      {label}
    </button>
  );
}

export default InteractiveButton;
