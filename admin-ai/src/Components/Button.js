import React from 'react';

const Button = ({ children, onClick, icon }) => {
    return (
        <button
            onClick={onClick}
            className={`text-white bg-[#A93AFF] font-medium rounded-lg px-4 py-3 text-center hover:bg-[#A93AFF] hover:drop-shadow-md transition duration-300 ease-in-out`}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
