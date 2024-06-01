"use client";
import Navbar from '@/Components/NavigationBar';
import React, { useEffect } from 'react';
import { useSession, signIn, signOut, SessionProvider } from "next-auth/react"; //Use sessionprovider for login control
import { useRouter } from 'next/navigation';

function LoginPage() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            // Redirect to Home page if the user is signed in
            router.push('/Home');
        }
    }, [session, router]);

    return (
        <SessionProvider>
            <Navbar />
            <div className="flex justify-center items-start min-h-screen mt-20">
                <div className="relative bg-white rounded-lg shadow-lg text-center text-lg font-normal w-96 p-10">
                    {session ? (
                        <>
                            <div>Signed in as {session.user.name}</div>
                            <div 
                                onClick={() => signOut()} 
                                className="mt-4 p-4 border bg-yellow-300 border-gray-300 rounded cursor-pointer hover:bg-gray-100"
                            >
                                Sign out
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="m-4 text-lg font-normal">Please Log in to use Admin-AI</div>
                            <div 
                                onClick={() => signIn()} 
                                className="mt-4 cursor-pointer img-button"
                            >
                                <img src="/kakao_login.png" alt="Sign in" className="mx-auto w-80 h-15" />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </SessionProvider>
    );
}

export default LoginPage;
