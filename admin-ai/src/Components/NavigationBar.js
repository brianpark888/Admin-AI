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
            <nav className= "justify-around flex p-8 bg-[#A93AFF] ">
                <div className="flex items-center">
                    <div className="text-white font-extrabold font-sans font-bold text-3xl">Admin-AI <FontAwesomeIcon icon={faFile} /></div>
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
                        <FontAwesomeIcon onClick={handleLogout} className="greeting mx-5 font-bold text-3xl hover:cursor-pointer" icon={faSignOutAlt} />
                        
                        // <button className='bg-transparent text-white py-2 px-5 rounded border-2 border-white'>Logout</button>
                    ) : (
                        <FontAwesomeIcon onClick={handleLogin} className="greeting mx-5 font-bold text-3xl hover:cursor-pointer" icon={faSignInAlt} />
                    )}
                </div>
            </nav>
            <div class="wave"></div>
        </>
    );
};

export default Navbar;


