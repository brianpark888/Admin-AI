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
      <Navbar />
      <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#A93AFF_80%)]">
        <div className="min-h-screen flex flex-col items-center justify-center text-black">
            <div className="w-2/3 flex flex-col items-center">
              <h1 className="text-4xl font-bold mb-4"><span>Welcome</span> to Admin AI</h1>
              <p className="text-lg text-center mb-8">
                Our product uses AI to reduce the time for administrators to process forms sent in by submitters. It ensures that people enter text along a specific format by checking through a chatbot. It also allows admins to process responses quicker.
              </p>
              <Button onClick={handleClick}>Get Started</Button>
            </div>
          </div>
      </div>
    </>
  );
}
