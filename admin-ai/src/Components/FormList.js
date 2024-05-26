import React, {useState, useEffect} from 'react';
import Button from './Button';
import RoundedBox from './CreateForm';
import {db} from '@/firebase';
import {collection, query, doc, getDocs, addDoc, updateDoc, deleteDoc, orderBy, where,} from 'firebase/firestore';

const formsCollection = collection(db, 'forms');
const websiteDomain = "http://localhost:3000/SubmitForm/"

function FormList(){
    const [form, setForm]= useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuToggle, setMenuToggle] = useState(false);
    const [selectedForm, setSelectedForm] = useState(null);
    const [expandedFormId, setExpandedFormId] = useState(null);
    const [checkedFormId, setCheckedFormId] = useState(null); // Added for checkbox interaction

    const getForms  = async () => {
        try {
            const q = query(formsCollection, orderBy('submissionTime', 'desc'));
            const results = await getDocs(q);
            const newForms = [];
            results.docs.forEach((doc) => {
                newForms.push({name: doc.data().name, description: doc.data().description, submissionTime: doc.data().submissionTime, code:doc.data().code,  responses: doc.data().responses || 0}); //added 'responses' field
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

    const toggleCheck = (id) => {
        setCheckedFormId(checkedFormId === id ? null : id);
    };

    const toggleExpand = (id) => {
        setExpandedFormId(expandedFormId === id ? null : id);
    }; 

    return (
        <div className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
            <div className='relative w-full max-w-7xl'>
                <div className='bg-[#8302E1] h-2.5 rounded-t-lg w-full absolute top-0 left-0'></div>
                <div className='bg-white shadow-sm p-7 rounded-lg z-10 w-full h-auto'>
                    <div className="w-full flex justify-between mb-4">
                        <h1 className="font-bold text-2xl inline-block">Forms</h1>
                        <Button onClick={() => openModal(null)}>+</Button>
                    </div>
                    {isModalOpen && (
                        <RoundedBox
                            formType={selectedForm ? "show" : "create"}
                            onClose={closeModal}
                            formData={selectedForm}
                        />
                    )}
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="w-1/12 px-6 py-4">
                                    <input type="checkbox" className="form-checkbox" />
                                </th>
                                <th scope="col" className="w-3/12 px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    File Name
                                </th>
                                <th scope="col" className="w-3/12 px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Number of Responses
                                </th>
                                <th scope="col" className="w-3/12 px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Last Opened
                                </th>
                                <th scope="col" className="w-2/12 px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Details
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {form.map((item, id) => (
                                <>
                                    <tr key={id} className={checkedFormId === item.id ? "bg-gray-100" : ""}>
                                        <td className="w-1/12 px-11 py-4">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox"
                                                checked={checkedFormId === item.id}
                                                onChange={() => toggleCheck(item.id)}
                                            />
                                        </td>
                                        <td className="w-3/12 px-6 py-4 whitespace-nowrap">
                                            <div className="text-left text-sm font-medium text-gray-900">{item.name}</div>
                                        </td>
                                        <td className="w-3/12 px-6 py-4 whitespace-nowrap">
                                            <div className="text-left text-sm text-gray-900">{item.responses}</div>
                                        </td>
                                        <td className="w-3/12 px-6 py-4 whitespace-nowrap">
                                            <div className="text-left text-sm text-gray-900">
                                                {new Date(item.submissionTime).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })} {new Date(item.submissionTime).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true
                                                })}
                                            </div>
                                        </td>
                                        <td className="w-2/12 px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                className="flex flex-col items-center justify-center space-y-1"
                                                onClick={() => toggleExpand(item.id)}
                                            >
                                                <div className="h-0.5 w-6 bg-slate-400"></div>
                                                <div className="h-0.5 w-6 bg-slate-400"></div>
                                                <div className="h-0.5 w-6 bg-slate-400"></div>
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedFormId === item.id && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4">
                                                <div className="bg-gray-100 shadow-inner p-4 rounded-lg">
                                                    <span className="block"><span className="font-semibold">Form Description:</span> {item.description}</span>
                                                    <span className="block"><span className="font-semibold">Invite Link:</span> {websiteDomain}?v={item.code}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default FormList;