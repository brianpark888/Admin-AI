"use client";


import Navbar from '@/Components/NavigationBar';
import { useState, useEffect } from 'react';
import FormList from '@/Components/FormList';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'; // check if logged in

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/Login');
        } else if (status === "authenticated") {
            setLoading(false); // Set loading to false once authenticated
        }
    }, [status, router]); // if not logged in, go to login page

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loader"></div>
            </div>
        );
    } // loading...

    return (
        <>
            <style>
                {`
                    .loader {
                        width: 120px;
                        height: 20px;
                        border-radius: 20px;
                        background: linear-gradient(#8302E1 0 0) 0/0% no-repeat lightblue;
                        animation: l2 2s infinite steps(10);
                    }

                    @keyframes l2 {
                        100% { background-size: 110%; }
                    }
                `}
            </style>
            <Navbar />
            <FormList></FormList>
            {/* <a href="#" class="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-[#A93AFF] hover:ring-sky-500">
                <div class="flex items-center space-x-3">
                    <svg class="h-6 w-6 stroke-sky-500 group-hover:stroke-white" fill="none" viewBox="0 0 24 24"></svg>
                    <h3 class="text-slate-900 group-hover:text-white text-sm font-semibold">New project</h3>
                </div>
                <p class="text-slate-500 group-hover:text-white text-sm">Create a new project from a variety of starting templates.</p>
            </a> */}
        </>
    );
}

