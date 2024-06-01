"use client";
import React, { useState }  from 'react';
import Button from '@/Components/Button';
import Navbar from '@/Components/NavigationBar';

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleClick = () => {
    window.location.href = '/Login';
  };

  return (
    <>
      <style>
        {`
          .full-width-section {
            background: linear-gradient(45deg, #A269B9, #9669BD, #5868D4, #8728E1, #7A20E1, #7021ff, #5306E0);
            margin: 0;
            padding: 110px 0;
            color: white;
            text-align: center;
            animation: moveBackground 10s infinite alternate;
            background-size: 400% 400%;
          }

        `}
      </style>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center full-width-section">
        <div className="w-2/3 flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Admin AI</h1>
          <p className="text-lg text-center mb-8">
            Our product uses AI to reduce the time for administrators to process forms sent in by submitters. It ensures that people enter text along a specific format by checking through a chatbot. It also allows admins to process responses quicker.
          </p>
          <button onClick={handleClick} className='bg-black py-3 px-4 font-bold border-2-[#8302E1] rounded-lg hover:bg-slate-500'>Get Started</button>
        </div>
      </div>
    </>
  );
}
