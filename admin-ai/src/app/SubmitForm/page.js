"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/Components/NavigationBar';
import { db } from '@/firebase';
import { collection, query, getDocs, where } from 'firebase/firestore';
import ShowForm from '@/Components/ShowForm';


const formsCollection = collection(db, 'forms');

export default function Home() {
  const [code, setCode]= useState('');
  const [formData, setFormData]= useState({formName: '', field: ''});


  useEffect(() => {
    const retrieveDoc = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const codeFromURL = queryParams.get('code');
      if (codeFromURL) {
        setCode(codeFromURL); // Set the code state
        const formsCollection = collection(db, 'forms');
        const q = query(formsCollection, where('code', '==', codeFromURL));
        const results = await getDocs(q);
        if (!results.empty) {
          const docData = results.docs[0].data();
          setFormData({
            formName: docData.Name,
            field: docData.field,
          });
        }
      }
    };


    retrieveDoc();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return (
  <>
    <div>
      <p>{code}</p>
      <p>{formData.formName}</p>
      <ShowForm formName="Form1" formQuestion={formData.field} />
    </div>
  </>
  );
}
