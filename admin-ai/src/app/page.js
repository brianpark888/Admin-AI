"use client";
import React, { useState }  from 'react';
import Button from '@/Components/Button';
import Navbar from '@/Components/NavigationBar';
import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlus, faFileAlt, } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  
  function scrollDown() {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0, 
      behavior: 'smooth',
    });
  }

  
  
  const handleClick = () => {
    if (session) {
      router.push('/Home'); // 이미 로그인된 경우 Home 페이지로 이동
    } else {
      router.push('/Login'); // 로그인되지 않은 경우 로그인 페이지로 이동
    }
  };

  return (
    <>
    <div>
    <div class="absolute top-0 right-0 m-5">
    <div class="bg-gray-200 shadow-md rounded-lg">
        <ul class="flex space-x-4 p-4">
            <li><a href="#" onClick={scrollDown} class="text-gray-700 hover:text-[#8e7bed]">About</a></li>
            <li><a href="Login" class="text-gray-700 hover:text-[#8e7bed]">Login</a></li>
        </ul>
    </div>
</div>
      <section id="home" class="">
        <div class="h-screen flex p-20 justify-center items-center bg-white">
          <div class=" lg:mb-0 lg:w-1/2 ">
            <h1 class=" max-w-xl text-[2.9rem] leading-none text-gray-900 font-extrabold font-sans text-center lg:text-5xl lg:text-left lg:leading-tight mb-5">
              Welcome to Admin-AI
            </h1>
            <p class="max-w-xl text-center text-gray-500 lg:text-left lg:max-w-md ">
            Our product uses AI to reduce the time for administrators to process forms sent in by submitter by ensuring proper formating and faster response processing.  
            </p>
            <div class="flex justify-center mt-14 lg:justify-start">
              <button type="button" onClick={handleClick} class="text-white bg-[#8e7bed] font-medium rounded-lg px-5 py-4 text-center hover:bg-[#8e7bed]/75 hover:drop-shadow-md transition duration-300 ease-in-out">
                Create Form  <FontAwesomeIcon icon={faPlus} />
              </button>
              <button onClick={scrollDown} type="button" class="ml-4 text-gray-900 bg-gray-200 font-medium rounded-lg px-5 py-4 text-center hover:bg-gray-200/75 hover:drop-shadow-md transition duration-300 ease-in-out">
                Learn More <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
          <div class="w-1/2">
            <img class="mt-auto" className='rounded-2xl w-full' src="https://www.coursesonline.co.uk/wp-content/uploads/Subject-Business-Administration.jpeg?height=485&dpr=2" alt="hero-img"></img>
          </div>
        </div>
      </section>
      <section id="Video">
        <div className='h-screen bg-white flex flex-row-2'>
          <div className=' w-2/5 bg-white content-center'>
            <img src="/file_image.png" alt="File Icon" />
          </div>
          <div className=' w-3/5 bg-white content-center'>
            <h1 className="text-center text-[#8e7bed] font-bold text-3xl my-10 font-extrabold font-sans">We Understand Your Pain</h1>
            <div className=' h-auto content-center'>
              <div className='mx-40'>
              <p className="text-md my-2"><span className='text-xl font-bold'>Challenges of Manual Administration.</span> Administrators waste lots of time each day on routine data management tasks, diverting their focus from more strategic activities. This repetitive process significantly reduces productivity.</p>
              <p className="my-2"><span className='text-lg font-bold'>Countless Hours Spent on Manual Processing.</span> Envision days filled with mundane tasks such as following up on incorrect entries, and manually inputting data. This leads to increased frustration, exhaustion, and potential errors in data management.</p>
              <p className="my-2"><span className='text-lg font-bold'>Introducing AI-Powered Administrative Tools.</span> Transform your administrative tasks with our AI-powered system, similar to advanced form automation tools. This platform automates the validation and collection of data right at submission, liberating administrators from the grind of repetitive tasks. By focusing only on exceptions or anomalies, administrators can dramatically reduce the time spent on these tasks, often to just a fraction of what it was.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      

      {/* <section>
      <div className='flex flex-row justify-around my-10'>
          <div class="flex justify-center items-center">
            
              <div class="rounded-full  w-80 h-80 flex flex-col justify-center items-center bg-white text-[#8e7bed] shadow transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg">
                  
              <div class="text-lg font-bold">Save Time</div>
                  <div className='my-5'>Number of Hours Saved</div>
                  <div class="text-xl font-bold">12</div>
              </div>
          </div>
          <div class="flex justify-center items-center">
              <div class="rounded-full  w-80 h-80 flex flex-col justify-center items-center bg-[#8e7bed] text-white shadow transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg">
                  
                  <div class="text-lg font-bold">Save Time</div>
                  <div className='my-5'>Number of Hours Saved</div>
                  <div class="text-xl font-bold">12</div>
                  
              </div>
          </div>
          <div class="flex justify-center items-center">
              <div class="rounded-full  w-80 h-80 flex flex-col justify-center items-center bg-[#8e7bed] text-white shadow transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg">
                  <div class="text-lg font-bold">Minimize Errors</div>
                  <div className='my-5'>AI Model Accuracy</div>
                  <div class="text-xl font-bold">92%</div>
            </div>
          </div>
        </div>
      </section> */}
        
        <div class="flex-grow"></div>
    <footer class="bg-black w-full p-4 text-white text-center">
        © 2024 Admin-AI. All Rights Reserved.
    </footer>
    </div>
  </>
  );
}
