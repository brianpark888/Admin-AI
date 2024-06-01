"use client";
import Navbar from '@/Components/NavigationBar';
import { useState } from 'react';
import Button from '@/Components/Button';
import CreateForm from '@/Components/CreateForm';
import FormList from '@/Components/FormList';

export default function Home() {
    const [items, setItems] = useState([]);
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
            <FormList></FormList>
        </>
    );
}
