"use client";
import DataTable from "@/Components/DataTable";
import Navbar from "@/Components/NavigationBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import ChatBot from "@/Components/ChatBot";

import React, { useState, useEffect } from 'react';
import { db } from '@/firebase';
import {doc, getDoc} from 'firebase/firestore'

export default function Home() {
        const router = useRouter();
        const [formId, setFormId] = useState(''); // State to hold the formIds
        const [formData, setFormData] = useState({ formName: '', field: '' });

        useEffect(() => {
                const retrieveDoc = async () => {
                  const queryParams = new URLSearchParams(window.location.search);
                  const code = queryParams.get('code'); // Directly fetch and use the variable `code`
                  if (code) {
                    const formRef = doc(db, 'forms', code);
                    const docSnap = await getDoc(formRef);
                    if (docSnap.exists()) {
                      setFormData({
                        formName: docSnap.data().name,
                        field: docSnap.data().field,
                      });
                      setFormId(code); // Set formId after data has been confirmed to exist
                    } else {
                      console.log("No such document!");
                    }
                  }
                };
                retrieveDoc();
            }, []); // Removed the comment to keep things concise

            const handleHomeClick = () => {
              router.push('/Home');
          }; // Go to Home button
            

          return (
            <>
                <Navbar />
                <div className="flex justify-center items-center min-h-screen p-4">
                    <div className="bg-white shadow-md rounded-lg max-w-screen-xl w-full p-20">
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
                          <p className="font-md text-lg mt-1 mb-4">2024.5.28</p>
                        </div>
                        <p className="mb-4"><span className="font-bold">Description: </span>{formData.field}</p>
                        <hr className="solid mb-8"></hr>
                        <div className="flex">
                          <div className="w-1/2 pr-2"> 
                              <h3 className="text-xl font-bold mb-2">User Response</h3>
                                <span className="text-sm mb-2">A collection of submitter information</span> 
                              <div className="max-w-[800px] mx-auto sm:mt-6"> 
                                {formId && <DataTable formId={formId} />}
                              </div>
                          </div>
                          <div className="w-1/2 pl-2"> 
                              <h3 className="text-xl font-bold mb-2">Chat</h3>
                              <span className="text-sm mb-2">Use the Chatbot to look for desired answers</span> 
                              <div className="mt-1"> 
                                  <ChatBot />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </>
      );   
}