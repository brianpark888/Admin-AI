import React, {useState, useEffect} from 'react';
import Button from './Button';
import RoundedBox from './CreateForm';
import {db} from '@/firebase';
import {collection, query, doc, getDocs, addDoc, updateDoc, deleteDoc, orderBy, where,} from 'firebase/firestore';
const formsCollection = collection(db, 'forms');
function FormList(){
    const [form, setForm]= useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getForms  = async () => {
        try {
            const q = query(formsCollection, orderBy('submissionTime', 'desc'));
            const results = await getDocs(q);
            const newForms = [];
            results.docs.forEach((doc) => {
                newForms.push({ name: doc.data().name, description: doc.data().description});
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
                <div className='bg-slate-200 p-4 rounded-lg z-10 w-full max-w-5xl p-20'>
                    <div className="w-full flex justify-between">
                        <h1 className="font-bold text-2xl inline-block">Forms</h1>
                        <Button onClick={openModal}>+</Button>
                    </div>
                    {isModalOpen && (
                        <RoundedBox
                        formType="create"  // Or "show", depending on the scenario
                        onClose={closeModal}
                        />
                    )}
                    

                    <ul>
                        {form.map((item, id) => (
                            <li key={id} className="text-center my-4 bg-slate-100 my-2 rounded-lg hover:scale-105 cursor-pointer">
                                <div className='p-4 w-full flex justify-between'>
                                    <span className="font-bold">📄 {item.name}</span>
                                    <div class="flex items-center space-x-5">
                                        <span className="inline-block">{item.description}</span>
                                        <div class="flex flex-col justify-around h-6 w-6">
                                            <div class="h-1 w-full bg-black"></div>
                                            <div class="h-1 w-full bg-black"></div>
                                            <div class="h-1 w-full bg-black"></div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
    );
}
export default FormList