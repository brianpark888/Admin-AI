"use client";
import Navbar from '@/Components/NavigationBar';
import { useState, useEffect } from 'react';
import FormList from '@/Components/FormList';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'; // check if logged in

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/Login');
        }
    }, [status, router]); // if not logged in, go to login page

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-3xl text-[#8302E1] font-semibold">Loading...</div>
            </div>
        );
    } // loading...


    return (
        <>
            <Navbar />
            <FormList></FormList>
        </>
    );
}
