"use client";
import React, { useState } from 'react';
import Button from "./Button";

const DisplayForm = (formName, formQuestion) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [field, setField] = useState('');

    
  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleSubmit = (event) => {
  };

  return (
    <div className="p-4 fixed inset-y-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center border-2 border-black rounded-lg w-1/3 h-1/2 my-20">
      <form onSubmit={handleSubmit}>
        <h1 className='font-bold text-center'>{formName}</h1>
        <div className='grid grid-cols-2 gap-4 my-5'>
            <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-semibold">Name</label>
            <input
                type="text"
                value={name}
                onChange={(event) => handleChange(event, setName)}
                className="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            </div>

            <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-semibold">E-mail</label>
            <input
                type="email"
                value={email}
                onChange={(event) => handleChange(event, setEmail)}
                className="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-semibold">{formQuestion}</label>
          <input
            type="text"
            value={field}
            onChange={(event) => handleChange(event, setField)}
            className="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <Button>Submit</Button>
      </form>
    </div>
);
}
export default DisplayForm;
