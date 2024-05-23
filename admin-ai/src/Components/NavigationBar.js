import React from 'react';
import Button from './Button';

const Navbar = () => {
    return (
        <>
            <style>
                {`
                    .navbar {
                        background-color: #ffffff;
                        box-shadow: 0 3px 5px rgba(0,0,0,0.1);
                        padding: 6px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .nav-brand {
                        font-size: 30px;
                        background: linear-gradient(45deg, #6003FF, #FF0074);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        font-weight: bold;
                        padding: 8px 15px;
                    }

                    .button {
                        padding: 23px 15px;
                        font-size: 18px;
                    }
                `}
            </style>
            <nav className="navbar">
                <div className="nav-brand">Admin-AI</div>
                <Button className="button">Login</Button>
            </nav>
        </>
    );
};

export default Navbar;
