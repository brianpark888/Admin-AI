import React from 'react';
import Button from './Button'; // Adjust the import path as necessary

const Navbar = () => {
    return (
        <nav className="bg-black text-white p-6 flex justify-between items-center">
            <div className="text-lg font-semibold">
                Admin-AI
            </div>
            <Button>LogIn</Button>
        </nav>
    );
};

export default Navbar;
