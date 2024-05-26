import React, {useState, useEffect} from 'react';
import Button from './Button';
import CreateForm from './CreateForm';
import {db} from '@/firebase';
import {collection, query, doc, getDocs, addDoc, updateDoc, deleteDoc, orderBy, where,} from 'firebase/firestore';
const formsCollection = collection(db, 'forms');
const websiteDomain = "http://localhost:3000/SubmitForm/"
function FormList(){
    const [form, setForm]= useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuToggle, setMenuToggle] = useState(false);

    const getForms  = async () => {
        try {
            const q = query(formsCollection, orderBy('submissionTime', 'desc'));
            const results = await getDocs(q);
            const newForms = [];
            results.docs.forEach((doc) => {
                newForms.push({name: doc.data().name, description: doc.data().description, submissionTime: doc.data().submissionTime, code:doc.data().code});
            });
            setForm(newForms);
        } catch (error) {
            console.error("Failed to fetch forms: ", error);
        }
    };
    useEffect(() => {
        getForms();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return(
        <div className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
            <div className='relative'>
                <div className='bg-[#8302E1] h-2.5 rounded-t-lg w-full absolute top-0 left-0'></div>
                <div className='bg-white shadow-sm p-7 rounded-lg z-10 w-full max-w-7xl p-20 h-auto'>
                    <div className="w-full flex justify-between">
                        <h1 className="font-bold text-2xl inline-block">Forms</h1>
                        <Button onClick={openModal}>+</Button>
                    </div>
                    {isModalOpen && (
                        <CreateForm
                        formType="create"  // Or "show", depending on the scenario
                        onClose={closeModal}
                        />
                    )}
                    

                    <ul>
                        {form.map((item, id) => (
                            <li key={id} className="text-center my-4 bg-slate-100 shadow-md my-2 rounded-lg hover:scale-105 cursor-pointer max-w-full">
                                <div className='p-4 w-full flex justify-between'>
                                    <div class="flex items-center space-x-5">
                                        <span className="font-bold">📄 {item.name}</span>
                                        <span className="inline-block">
                                            {item.description.length > 20 ? item.description.slice(0, 20) + '...' : item.description}
                                        </span>
                                    </div>
                                    <div class="flex items-center space-x-5">
                                    <span className="inline-block">
                                        {new Date(item.submissionTime).toLocaleDateString('en-US', {
                                            weekday: 'long', // "Monday"
                                            year: 'numeric', // "2024"
                                            month: 'long', // "May"
                                            day: 'numeric' // "24"
                                        })} {new Date(item.submissionTime).toLocaleTimeString('en-US', {
                                            hour: '2-digit', // "06"
                                            minute: '2-digit', // "11"
                                            second: '2-digit', // "22"
                                            hour12: true // "AM" or "PM"
                                        })}
                                        </span>
                                        <div class="flex flex-col justify-around h-6 w-6" onClick={() => setMenuToggle(!menuToggle)}>
                                            <div class="h-1 w-full bg-black"></div>
                                            <div class="h-1 w-full bg-black"></div>
                                            <div class="h-1 w-full bg-black"></div>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                {menuToggle && (
                                            <div className="bg-white text-left mx-5 p-10">
                                            <span className="block">Form Description: {item.description}</span>
                                            <span className="block">Invite Link: {websiteDomain}?code={item.code}</span>
                                            </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
    );
}
export default FormList