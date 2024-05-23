import React from 'react';

const Button = ({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-[#6003FF] text-white rounded-md px-4 py-2 hover:bg-blue-600`}
        >
            {children}
        </button>
    );
};

export default Button;
