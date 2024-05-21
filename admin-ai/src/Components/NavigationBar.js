import React from 'react';
import Button from './button'; // Adjust the import path as necessary

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="text-lg font-semibold">
                My Navbar
            </div>
            <Button className="bg-blue-500 hover:bg-blue-700">
                Button
            </Button>
        </nav>
    );
};

export default Navbar;
