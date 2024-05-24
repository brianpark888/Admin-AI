"use client";
import React, { useState, useEffect } from 'react';
import ShowForm from '@/Components/ShowForm';
import Navbar from '@/Components/NavigationBar';
import { db } from '@/firebase';
import { collection, query, getDocs, where } from 'firebase/firestore';

export default function Home() {

  // useEffect(() => {
  //   const retrieveDoc = async () => {
  //     const queryParams = new URLSearchParams(window.location.search);
  //     const code = queryParams.get('v'); 
  //     if (code) {
  //       const formsCollection = collection(db, 'forms');
  //       const q = query(formsCollection, where('code', '==', code));
  //       const results = await getDocs(q);
  //       if (!results.empty) {
  //         const docData = results.docs[0].data();
  //         setFormData({
  //           formName: docData.Name,
  //           field: docData.field,
  //         });
  //       }
  //     }
  //   };

  //   retrieveDoc();
  // }, []); // Empty dependency array means this effect runs only once after the initial render

  return (
    <div>
      <Navbar />
      {/* <p>Name: {formData.formName}</p>
      <p>Field: {formData.field}</p> */}
      {/* <ShowForm formName={formData.formName} formQuestion = {formData.field} /> */}
    </div>
  );
}
