"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import DataTable from "@/Components/DataTable";
import Navbar from "@/Components/NavigationBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faComment } from "@fortawesome/free-solid-svg-icons";
import ChatBotBox from "@/Components/ChatBotBox"; // Import ChatBotBox
import Button from "@/Components/Button";

export default function Home() {
  const router = useRouter();
  const [formId, setFormId] = useState('');
  const [formData, setFormData] = useState({ formName: '', field: '' });
  const [showChatBot, setShowChatBot] = useState(false); // State to toggle ChatBot

  useEffect(() => {
    const retrieveDoc = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code');
      if (code) {
        const formRef = doc(db, 'forms', code);
        const docSnap = await getDoc(formRef);
        if (docSnap.exists()) {
          setFormData({
            formName: docSnap.data().name,
            description: docSnap.data().description,
            field: docSnap.data().field,
            prompt: docSnap.data().prompt,
            creationTime: docSnap.data().submissionTime,
          });
          setFormId(code);
        } else {
          console.log("No such document!");
        }
      }
    };
    retrieveDoc();
  }, []);

  const handleHomeClick = () => {
    router.push('/Home');
  };

  const handleToggleChatBot = () => {
    setShowChatBot(!showChatBot); // Toggle ChatBot visibility
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className={`bg-white shadow-md rounded-lg max-w-screen-xl w-full p-20 transition-all duration-300`}>
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-left">{formData.formName}</h1>
            <div className="flex items-center">
              <button
                onClick={handleHomeClick}
                className="home-button relative top-[-7px]"
                aria-label="Home"
              >
                <FontAwesomeIcon icon={faHome} size="xl" />
              </button>
            </div>
          </div>
          <div>
            <p className="font-md text-lg mt-1 mb-4">{formData.creationTime}</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="mb-4"><span className="font-bold">Description: </span>{formData.description}</p>
              <p className="mb-4"><span className="font-bold">Question: </span>{formData.field}</p>
            </div>
            <Button onClick={handleToggleChatBot} className="flex items-center">
              {showChatBot ? "Close ChatBot" : "Chat with Bot"}
              <FontAwesomeIcon icon={faComment} size="lg" className='ml-2' />
            </Button>
          </div>
          <hr className="solid mb-8"></hr>
          <div className="flex">
            <div className={`w-full ${showChatBot ? 'w-3/4' : ''}`}>
              <h3 className="text-xl font-bold mb-2">User Response</h3>
              <span className="text-sm mb-2">A collection of submitter information</span>
              <div className="w-full mt-5">
                {formId && <DataTable formId={formId} />}
              </div>
            </div>
            {showChatBot && (
              <div className="fixed top-20 right-10 w-1/4 ml-4">
                <ChatBotBox
                  formId={formId}
                  formQuestion={formData.field}
                  onClose={handleToggleChatBot}
                  onDeleteHistory={() => console.log('Chat history deleted')}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
