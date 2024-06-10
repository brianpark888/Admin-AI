import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase';

import Button from "./Button";
import Toast from './Toast';
import FinishSubmission from './FinishSubmission';

const ShowForm = ({ formId, formName, formQuestion, formPrompt }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [field, setField] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !field) {
      alert('모든 필드를 입력해야 합니다.'); // All fields must be filled.
      return;
    }

    setIsLoading(true); // Start loading

    let booleanResult;
    try {
      const response = await fetch("/api/submit-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: `Here is the response '${field}'. If the response follows the format return '1' else return '0'. Do not provide any other response.`,
          systemInstruction: `For this Question: ${formQuestion}. Ensure that the answer follows the format: ${formPrompt}`
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const unprocessedResult = await response.json();
      booleanResult = unprocessedResult.parts[0]; // Ensure trimming any extra spaces
      setResult(booleanResult);

    } catch (e) {
      console.error("Error fetching chat response: ", e);
      setIsLoading(false); // Stop loading on error
      return;
    }

    if (booleanResult === '1') { // Compare correctly
      try {
        const submissionsRef = collection(db, "forms", formId, "submissions");

        await addDoc(submissionsRef, {
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
    } else {
      console.error("The response does not follow the format. Please try again.");
      alert("The response does not follow the format. Please try again.");
    }

    setIsLoading(false); // Stop loading after submission
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-between sm:p-20 bg-white'>
      {isVisible && (
        <div className="border-2 shadow-lg prelative bg-white p-7 rounded-2xl z-10 w-2/5 h-auto">
          <div className="text-center p-5 border-b-2">
            <h1 className="text-2xl font-bold my-3 text-[#8e7bed]">{formName}</h1>
            <p className="text-gray-600"></p>
            <p>Fill out the entire form</p>
          </div>
    
          <form className="p-5" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 font-bold">Name</label>
              <input type="text" id="name" className="w-full my-2 p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring focus:ring-[#8e7bed]" value={name} onChange={(e) => handleChange(e, setName)} />
              
              <label htmlFor="email" className="block mb-2 font-bold">Email</label>
              <input type="email" id="email" className="w-full  my-2 p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring focus:ring-[#8e7bed]" value={email} onChange={(e) => handleChange(e, setEmail)} />
              
            </div>
            <div className="mb-5">
              <label htmlFor="field" className="block mb-2 font-bold">{formQuestion}</label>
              <textarea 
                  id="field" 
                  className="w-full p-10 my-2 bg-gray-100 rounded-lg focus:outline-none focus:ring focus:ring-[#8e7bed] align-top min-h-[40px]" 
                  value={field} 
                  onChange={(e) => handleChange(e, setField)} 
              />
            </div>
            <div className='flex justify-center'>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </form>
        </div>
      )}
      {showToast && <FinishSubmission />}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="loader"></div> {/* Replace with your spinner component */}
        </div>
      )}
    </div>
  );
};

export default ShowForm;
