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
                        <FontAwesomeIcon onClick={handleLogout} className="greeting mx-5 font-bold text-3xl text-[#8e7bed] hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-[#FFC749]" icon={faSignOutAlt} />
                        
                        // <button className='bg-transparent text-white py-2 px-5 rounded border-2 border-white'>Logout</button>
                    ) : (
                        <FontAwesomeIcon onClick={handleLogin} className="greeting mx-5 font-bold text-3xl text-[#8e7bed] hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-[#FFC749]" icon={faSignInAlt} />
                    )}
                </div>
            </nav>
            <div class="wave"></div>
        </>
    );
};

export default Navbar;


