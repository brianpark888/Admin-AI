"use client";
import { Form } from 'react-router-dom';
import { SessionProvider } from "next-auth/react";

import Button from '../Components/Button'; // Ensure the path is correct based on your project structure
import Navbar from '../Components/NavigationBar'; 
import FormList from '../Components/FormList';
import InputComponent from '@/Components/InputComponent';



export default function Home() {
  // Function to handle button click
  const handleClick = () => {
    alert('Handling admin tasks!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <h1>Admin AI</h1>g.
      <p>Admin AI is a tool that helps you manage your admin tasks.</p>
      <Button />
      <FormList />
      <InputComponent />
      

    </div>
  );
}
