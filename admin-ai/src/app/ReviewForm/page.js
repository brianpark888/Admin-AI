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
                <div className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
                    <div className="relative w-full max-w-5xl">
                        <div className="bg-white shadow-md rounded-lg z-10 w-full max-w-7xl p-20">
                            <div className="flex justify-between items-center mb-6">
                                <button
                                    onClick={handleHomeClick}
                                    className="home-button"
                                    aria-label="Home"
                                >
                                    <FontAwesomeIcon icon={faHome} size="xl" />
                                </button>
                                <h1 className="text-2xl font-bold text-center text-decoration-line: underline">{formData.formName}</h1>
                                <div className="flex items-center">
                                    <p className="font-md">2024.5.28</p> 
                                </div>
                            </div>
                            <p><span className="font-bold">Description: </span>{formData.field}</p>
                            <hr className="solid"></hr>
                            <br></br>
                            <h3 className="text-xl font-bold mb-4">User Response</h3>
                            {formId && <DataTable formId={formId} />}
                            <br></br>
                            <hr className="solid"></hr>
                            <h3 className="text-xl font-bold mb-4">Chat</h3>
                            <ChatBot />
                        </div>
                    </div>
                </div>
            </>
        );
    }
