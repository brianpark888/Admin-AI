import React, { useState } from 'react';
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '@/firebase';

import Button from "./Button";
import Toast from './Toast';
import FinishSubmission from './FinishSubmission';

const ShowForm = ({ formId, formName, formQuestion, formPrompt}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [field, setField] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [result, setResult] = useState(''); // Add a new state to hold the result of the submission [1

  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !field) {
      alert('모든 필드를 입력해야 합니다.'); // All fields must be filled.
      return;
    }

    try{
    const response = await fetch("/api/submit-check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: field,
        systemInstruction: "You are an AI that ensures that a response follows a certain format for a certain question. Question:"+ formQuestion + "Format:" + formPrompt + "If the response follows the format return '1' else return '0'."
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const unprocessedResult = await response.json();
    const booleanResult = unprocessedResult.parts[0];
    setResult(booleanResult);

    if (!result) {
      return;
    }

    }catch (e) {
      console.error("Error fetching chat response: ", e);
    } finally {
    }
    

    if (result == 1){
      try {
      
        // Reference to the 'submissions' subcollection under the specific form document
        const submissionsRef = collection(db, "forms", formId, "submissions");
  
        // Add a new submission document to the 'submissions' subcollection
        const submissionRef = await addDoc(submissionsRef, {
          name: name,
          email: email,
          answer: field,
          submittedAt: new Date().toISOString()
        });
  
        setShowToast(true);
        setIsVisible(false);
        setEmail("");
        setName("");
        setField("");
      } catch (error) {
        console.error("Error submitting form: ", error);
        alert('Failed to submit the form.');
      }
    }else{
      console.error("The response does not follow the format. Please try again.")
      alert("The response does not follow the format. Please try again.")
    }
    
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-between sm:p-20 bg-white'>
      {isVisible && <div className="border-2 shadow-lg prelative bg-white p-7 rounded-2xl z-10 w-2/5 h-auto">
        <div className="text-center p-5 border-b-2">
          <h1 className="text-2xl font-bold my-3 text-[#A93AFF]">{formName}</h1>
          <p className="text-gray-600"></p>
          <p>Fill out the entire form</p>
        </div>
  
        <form className="p-5" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 font-bold">Name</label>
            <input type="text" id="name" className="w-full my-2 p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring focus:ring-[#A93AFF]" value={name} onChange={(e) => handleChange(e, setName)} />
            
            <label htmlFor="email" className="block mb-2 font-bold">Email</label>
            <input type="email" id="email" className="w-full  my-2 p-2  bg-gray-100 rounded-lg focus:outline-none focus:ring focus:ring-[#A93AFF]" value={email} onChange={(e) => handleChange(e, setEmail)} />
            
          </div>
          <div className="mb-5">
            <label htmlFor="field" className="block mb-2 font-bold">{formQuestion}</label>
            <textarea 
                id="field" 
                className="w-full p-10 my-2 bg-gray-100 rounded-lg focus:outline-none focus:ring focus:ring-[#A93AFF] align-top min-h-[40px]" 
                value={field} 
                onChange={(e) => handleChange(e, setField)} 
            />
          </div>
          <div className='flex justify-center justify-center '>
          <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </form>
      </div>}
      {showToast && <FinishSubmission />}
      
      
    </div>
  );
};

export default ShowForm;
