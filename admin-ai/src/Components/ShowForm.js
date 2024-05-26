"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Button from "./Button";
import { addDoc,collection } from 'firebase/firestore';
import { db } from '@/firebase';

import Toast from './Toast';

const formsCollection = collection(db, 'forms');
const ShowForm=({formName, formQuestion}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [field, setField] = useState('');
  const [showToast, setShowToast] = useState(false); // set state variable

  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !field) {
      alert('모든 필드를 입력해야 합니다.');
      return;
    }

    const docRef = await addDoc(formsCollection, {
      name:name,
      email:email,
      field:field,
    });
    setShowToast(true); // Set toast visibility first
    setEmail("");
    setName("");
    setField("");

  };

    return (
      <div className='flex min-h-screen flex-col items-center justify-between sm:p-24'>
        <div className="relative bg-white shadow-sm p-7 rounded-lg z-10 w-full max-w-7xl p-20 h-auto">
          <div className="text-center p-5 border-b-2">
            <h1 className="text-xl font-bold">{formName}</h1>
            <p className="text-gray-600"></p>
          </div>
          <form className="p-5" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 font-bold">Name</label>
              <input type="text" id="name" className="w-full my-4 p-2 border border-gray-300 rounded" value={name} onChange={(e) => handleChange(e, setName)} />
              
              <label htmlFor="email" className="block mb-2 font-bold">Email</label>
              <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded" value={email} onChange={(e) => handleChange(e, setEmail)} />
              
            </div>
            <div className="mb-5">
              <label htmlFor="field" className="block mb-2 font-bold">{formQuestion}</label>
              <input type="text" id="field" className="w-full p-2 border border-gray-300 rounded" value={field} onChange={(e) => handleChange(e, setField)} />
            </div>
            <Button onClick={handleSubmit}>Submit</Button>
            {/* <button type="submit" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700">Submit</button> */}
          </form>
          {showToast && <Toast message="Form created successfully!" isVisible={true} />}
        </div>
      </div>
    );
  
};

export default ShowForm;
