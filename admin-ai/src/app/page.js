import React from 'react';
import Button from '../Components/Button';
import Navbar from '../Components/NavigationBar';

export default function Home() {
  return (
    <>
      <style>
        {`
          .full-width-section {
            background: linear-gradient(45deg, #6003FF, #6003FF, #F900B9, #FF0074, #FF7343, #FFBE39, #F9F871);
            margin: 0;
            padding: 110px 0;
            color: white;
            text-align: center;
            animation: moveBackground 15s infinite alternate;
            background-size: 400% 400%;
          }

          @keyframes moveBackground {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
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
          <Button>Get Started</Button>
        </div>
      </div>
    </>
  );
}
