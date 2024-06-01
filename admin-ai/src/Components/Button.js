import React from 'react';

const Button = ({ children, onClick, icon }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-[#581c87]  font-weight:580 text-white rounded-3xl px-4 py-2 shadow-md hover:bg-[#27005D] flex items-center`}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
