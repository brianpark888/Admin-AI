import React from 'react';

const Button = ({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-[#8302E1]  font-bold text-white rounded-md px-4 py-2 hover:bg-[#6B00B6]`}
        >
            {children}
        </button>
    );
};

export default Button;
