"use client";
import Navbar from '@/Components/NavigationBar';
import { useState, useEffect } from 'react';
import Button from '@/Components/Button';
import CreateForm from '@/Components/CreateForm';
import FormList from '@/Components/FormList';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'; // check if logged in

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/Login');
        }
    }, [status, router]); // if not logged in, go to login page

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-3xl text-[#581c87] font-semibold">Loading...</div>
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
