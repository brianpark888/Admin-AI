"use client";
import Navbar from '@/Components/NavigationBar';
import React, { useState } from 'react';
import Button from '@/Components/Button';
import {useRouter} from "next/navigation";
import {useSession, signIn, signOut} from "next-auth/react";

function LoginPage() {
    const router = useRouter();
    const {data:session} = useSession();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
    };

    return (
        <>
        <Navbar />
        <div className='m-10 p-20 rounded-lg border-2-black'>
            <div>
                <h2 style={{ color: '#CE5FFF', textAlign: 'center', fontWeight: 'bold', fontSize: '20px'}}>Login</h2>
                <form onSubmit={handleSubmit} style={{ border: '1px solid black', padding: '10px' }}>
                    <div>
                        <label htmlFor="username" style={{ fontWeight: 'bold' }}>Username:</label>
                        <input className='w-full p-2 border border-gray-300 rounded'
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                            style={{ border: '1px solid gray', borderRadius: '5px', padding: '5px' }}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" style={{ fontWeight: 'bold' }}>Password:</label>
                        <input className='w-full p-2 border border-gray-300 rounded'
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            style={{ border: '1px solid gray', borderRadius: '5px', padding: '5px' }}
                        />
                    </div>
                    <Button className="py-2">Login</Button>
                    <div className="grid m-auto text-center">
            <div className="m-4">If not signed in</div>
            <Button 
            onClick={() => signIn()}
            >
                Sign in
            </Button>
            </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default LoginPage;