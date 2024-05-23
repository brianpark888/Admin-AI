"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Button from "./Button";
import Toast from './Toast';

const CreateForm = () => {
  const router = useRouter();
  const [field, setField] = useState('');
  const [prompt, setPrompt] = useState(''); // set state variables
  const [showToast, setShowToast] = useState(false); // set state variable

  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!field || !prompt) {
      alert('모든 필드를 입력해야 합니다.');
      return;
    }

    const formData = {
      field,
      prompt,
    };
    setShowToast(true);

    // // 새로운 form 생성 및 Submission 페이지로 이동
    // router.push({
    //   pathname: '/submission',
    //   query: formData,
    // });
  };

  return (
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
      {showToast && <Toast message="Form created successfully!" isVisible={true} onClose={() => setShowToast(false)} />}
    </div>
  );
};

export default CreateForm;
