"use client"
import React from 'react';
import Button from './Button';
import { useSession, signIn, signOut } from "next-auth/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faSignInAlt, faSignOut, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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
            <nav className= "justify-around flex p-8 bg-white border-b-8 border-[#8e7bed]">
                <div className="flex items-center">

                    <a href="/">
                        <img src="/LogoAdminAI.svg" alt="Admin-AI Logo" className="h-10 w-auto" />
                    </a>

                </div>
                <div className="flex justify-center items-center text-white">
                    {session && (
                        // <div className="greeting mx-5 font-bold">
                        //     {session.user.name}
                        // </div>
                        <div></div>
                    )}
                    {session ? (
                        // <Button onClick={handleLogout} className="button">Logout</Button>
                        <button 
                            onClick={handleLogout} 
                            className="flex items-center text-xl text-[#8e7bed] hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-[#FFC749]"
                        >
                            <span className="mr-2">Logout</span>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </button>
                    ) : (
                        <button 
                            onClick={handleLogin} 
                            className="flex items-center text-xl text-[#8e7bed] hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-[#FFC749]"
                        >
                            <span className="mr-2">Login</span>
                            <FontAwesomeIcon icon={faSignInAlt} />
                        </button>
                    )}
                </div>
            </nav>
            <div class="wave"></div>
        </>
    );
};

export default Navbar;


