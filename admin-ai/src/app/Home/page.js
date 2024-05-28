"use client";
import Navbar from '@/Components/NavigationBar';
import { useState } from 'react';
import Button from '@/Components/Button';
import CreateForm from '@/Components/CreateForm';
import FormList from '@/Components/FormList';

export default function Home() {
    const [items, setItems] = useState([
        { name: "Form1", description: 2.50 },
        { name: "Form2", description: 2.00 },
        { name: "Form3", description: 1.50 },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };






    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center">
                <Button>Logout</Button>
            </div>
            <FormList></FormList>
        </>
    );
}
