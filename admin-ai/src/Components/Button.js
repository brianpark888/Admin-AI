import React from 'react';

const Button = ({ children, onClick, icon }) => {
    return (
        <button
            onClick={onClick}
            className={`text-white bg-[#8e7bed] font-medium rounded-lg px-4 py-3 text-center hover:bg-[#A93AFF]/70 hover:drop-shadow-md transition duration-300 ease-in-out`}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
