import React from 'react';

const Button = ({ children, onClick, icon }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-[#8302E1]  m-1 cursor-pointer overflow-hidden font-semibold font-weight:580 text-white rounded-3xl px-4 py-3 shadow-md hover:bg-[#A93AFF] flex items-center`}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
