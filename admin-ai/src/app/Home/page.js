"use client";
import Navbar from '@/Components/NavigationBar';
import { useState } from 'react';
import Button from '@/Components/Button';
import RoundedBox from '@/Components/RoundedBox';
import CreateForm from '@/Components/CreateForm';

export default function Home() {
    const [items, setItems] = useState([
        { name: "Form1", price: 2.50 },
        { name: "Form2", price: 2.00 },
        { name: "Form3", price: 1.50 },
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
            <div className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
                <div className='bg-slate-200 p-4 rounded-lg z-10 w-full max-w-5xl p-20'>
                    <div className="w-full flex justify-between">
                        <h1 className="font-bold text-2xl inline-block">Forms</h1>
                        <Button onClick={openModal}>+</Button>
                    </div>
                    {isModalOpen && (
                        <RoundedBox
                        formType="create"  // Or "show", depending on the scenario
                        onClose={closeModal}
                        />
                    )}
                    

                    <ul>
                        {items.map((item, id) => (
                            <li key={id} className="text-center my-4 bg-slate-100 my-2 rounded-lg hover:scale-105 cursor-pointer">
                                <div className='p-4 w-full flex justify-between'>
                                    <span className="font-bold">📄 {item.name}</span>
                                    <span>${item.price.toFixed(2)}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
