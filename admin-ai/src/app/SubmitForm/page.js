"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/Components/NavigationBar';
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore'; // Correct import for getDoc
import ShowForm from '@/Components/ShowForm';

export default function Home() {
  const [formData, setFormData] = useState({ formName: '', field: '' });
  const [formId, setFormId] = useState(''); // State to hold the formId

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
          });
        } else {
          console.log("No such document!");
        }
      }
    };

    retrieveDoc();
  }, []); // Dependency array remains empty if we only want to run this effect on component mount

  return (
    <>
      <Navbar />
      <div>
        <p>{formData.formName}</p>
        <ShowForm formId={formId} formName={formData.formName} formQuestion={formData.field} />
      </div>
    </>
  );
}
