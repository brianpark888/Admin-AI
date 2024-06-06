"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/Components/NavigationBar';
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore'; // Correct import for getDoc
import ShowForm from '@/Components/ShowForm';
import FinishSubmission from '@/Components/FinishSubmission';

export default function Home() {
  const [formData, setFormData] = useState({ formName: '', field: '', formPrompt: '' });
  const [formId, setFormId] = useState(''); // State to hold the formId
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const retrieveDoc = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const formId = queryParams.get('code'); // Assuming 'code' query param is the form ID
      if (formId) {
        setFormId(formId); // Set the formId state
        const formRef = doc(db, 'forms', formId); // Correct reference to a single document
        const docSnap = await getDoc(formRef); // Correct method to get a single document
        if (docSnap.exists()) {
          setFormData({
            formName: docSnap.data().name,
            field: docSnap.data().field,
            formPrompt: docSnap.data().prompt,
          });
          setShowForm(true); // Show the form after loading data
        } else {
          console.log("No such document!");
        }
      }
      await new Promise(r => setTimeout(r, 1500));
      setLoading(false); // Update loading state
    };

    retrieveDoc(); // Call the async function to retrieve data
  }, []); // Dependency array remains empty if we only want to run this effect on component mount

  return (
    <>
    <style>
    {`
.loader {
  width: 120px;
  height: 20px;
  border-radius: 20px;
  background:
   linear-gradient(#8302E1 0 0) 0/0% no-repeat
   lightblue;
  animation: l2 2s infinite steps(10);
}
@keyframes l2 {
    100% {background-size:110%}
}`}
    </style>
      <div>
        {loading ? (
(
  <div className='justify-center flex items-center border-2 border-black h-screen'>
<div class="loader"></div>
  </div>
  
)
        ) : 
        (
          showForm ? (
            <>
            <ShowForm formId={formId} formName={formData.formName} formQuestion={formData.field} formPrompt={formData.formPrompt} />
            <footer class="bg-black w-full p-4 text-white text-center">
                © 2024 Admin-AI. All Rights Reserved.
            </footer>
            </>
          ) : (
            <FinishSubmission />
          )
        )}
      </div>
    </>
  );
}
