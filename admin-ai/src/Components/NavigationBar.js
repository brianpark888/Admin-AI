"use client"
import React from 'react';
import Button from './Button';
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
    const { data: session } = useSession();

    const handleLogin = () => {
        signIn();
    };

    const handleLogout = () => {
        signOut();
    };

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
                        background-image: linear-gradient(to right, #27005D, #9D76C1);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        font-weight: bold;
                        padding: 8px 15px;
                    }

                    .button {
                        padding: 23px 15px;
                        font-size: 18px;
                    }

                    .nav-right {
                        margin-left: auto;
                        display: flex;
                        align-items: center;
                    }

                    .greeting {
                        margin-right: 15px;
                        font-size: 18px;
                        font-weight: 500;
                    }
                `}
            </style>
            <nav className="navbar">
                <div className="flex items-center">
                    <div className="nav-brand">Admin-AI</div>
                </div>
                <div className="nav-right">
                    {session && (
                        <div className="greeting">
                            Signed in as {session.user.name}
                        </div>
                    )}
                    {session ? (
                        <Button onClick={handleLogout} className="button">Logout</Button>
                    ) : (
                        <Button onClick={handleLogin} className="button">Login</Button>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;


