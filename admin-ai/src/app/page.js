"use client";
import React, { useState }  from 'react';
import Button from '@/Components/Button';
import Navbar from '@/Components/NavigationBar';
import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (session) {
      router.push('/Home'); // 이미 로그인된 경우 Home 페이지로 이동
    } else {
      signIn(); // 로그인되지 않은 경우 로그인 페이지로 이동
    }
  };

  return (
    <>
      <style>
        {`
          .full-width-section {
            background: linear-gradient(45deg, #D391FA, #9967CE, #8302E1, #BA9Cf6, #CFB7FF, #ABC0F9, #190087);
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
          <button onClick={handleClick} className='bg-black py-3 px-4 font-semibold border-2-[#8302E1] rounded-lg hover:bg-slate-500'>Get Started</button>
        </div>
      </div>
    </>
  );
}
