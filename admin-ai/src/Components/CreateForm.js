"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Button from "./Button";
import Toast from './Toast';
import {db} from '@/firebase';
import {collection, query, doc, getDocs, addDoc, updateDoc, deleteDoc, orderBy, where,} from 'firebase/firestore';
const formsCollection = collection(db, 'forms');
const CreateForm = ({ onClose }) => {
  const router = useRouter();
  const [field, setField] = useState('');
  const [prompt, setPrompt] = useState(''); // set state variables
  const [showToast, setShowToast] = useState(false); // set state variable

  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!field || !prompt) {
      alert('모든 필드를 입력해야 합니다.');
      return;
    }
    

  
    const docRef = await addDoc(formsCollection, {
      field: field,
      prompt: prompt,
      submissionTime: new Date().toISOString(),
    });

       
    setShowToast(true); // Set toast visibility first

    setTimeout(() => {
      onClose(); // Delay closing the modal to allow the toast to show
    }, 400); // Adjust delay as necessary for UX
    setField("");
    setPrompt("");

};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <button
          onClick={onClose}
          className="absolute top-1 right-4 text-gray-500 hover:text-gray-700"
          style={{ fontSize: '1.7rem' }}
        >
          &times;
        </button>
        <div className="p-4">
          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700 font-semibold">Field</label>
              <input
                type="text"
                value={field}
                onChange={(event) => handleChange(event, setField)}
                className="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700 font-semibold">Prompt</label>
              <textarea
                value={prompt}
                onChange={(event) => handleChange(event, setPrompt)}
                className="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={4}
              />
            </div>

            <Button>Generate New Form</Button>
          </form>
          {showToast && <Toast message="Form created successfully!" isVisible={true} />}
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
