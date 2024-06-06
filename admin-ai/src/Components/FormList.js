import React, { useState, useEffect } from 'react';
import Button from './Button';
import CreateForm from './CreateForm';
import { db } from '@/firebase';
import { collection, query, doc, getDocs, addDoc, updateDoc, deleteDoc, orderBy, where } from 'firebase/firestore';
import { Link } from 'next/link';
import Toast from './Toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const formsCollection = collection(db, 'forms');
const submitFormWebsiteDomain = "http://localhost:3000/SubmitForm/";
const reviewFormWebsiteDomain = "http://localhost:3000/ReviewForm/";


function FormList() {
    const [form, setForm] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuToggle, setMenuToggle] = useState(false);
    const [selectedForm, setSelectedForm] = useState(null);
    const [expandedFormId, setExpandedFormId] = useState(null);
    const [checkedFormId, setCheckedFormId] = useState(null);
    const [showToast, setShowToast] = useState(false);

    const getForms = async () => {
        try {
            const q = query(formsCollection, orderBy('submissionTime', 'desc'));
            const results = await getDocs(q);
            const newForms = [];

            for (const formDoc of results.docs) {
                const formData = formDoc.data();
                const submissionsCollection = collection(db, 'forms', formDoc.id, 'submissions');
                const submissionsSnapshot = await getDocs(submissionsCollection);
                const submissionsCount = submissionsSnapshot.size;

                newForms.push({
                    id: formDoc.id,
                    name: formData.name,
                    description: formData.description,
                    submissionTime: formData.submissionTime,
                    submissionsCount: submissionsCount,
                });
            }
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

    const deleteForm = async (id) => {
        try {
            await deleteDoc(doc(db, 'forms', id));
            getForms();
        } catch (error) {
            console.error('Failed to delete form:', error);
        }
    };

    return (
        <>
        <style>
            {`
                .dropdown {
                    position: relative;
                    display: inline-block;
                }
                
                /* Dropdown Content (Hidden by Default) */
                .dropdown-content {
                    display: none;
                    position: absolute;
                    min-width: 160px;
                    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                    z-index: 1;
                }
                
                /* Links inside the dropdown */
                .dropdown-content a {
                    color: black;
                    padding: 12px 16px;
                    text-decoration: none;
                    display: block;
                }
                
                .dropdown-content a:hover {background-color: #ddd;}
                
                .dropdown:hover .dropdown-content {display: block;}
                
                .dropdown:hover .dropbtn {background-color: #3e8e41;}
            `}
        </style>
        <div className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
            <div className='relative w-full max-w-7xl'>
                <div className='bg-[#8302E1] h-2.5 rounded-t-lg w-full absolute top-0 left-0'></div>
                <div className='bg-white shadow-sm p-7 rounded-lg z-10 w-full h-auto'>
                    <div className="w-full flex justify-between mb-4 items-center">
                        <h1 className="font-bold text-2xl inline-block">Forms</h1>
                        <div className="flex gap-4">
                            <button
                                onClick={() => deleteForm(checkedFormId)}
                                className="bg-transparent text-gray-500 hover:bg-gray-100 rounded-md px-3 py-2"
                            >
                                <FontAwesomeIcon icon={faTrash} size="lg" />
                            </button>
                            <button
                                onClick={() => openModal(null)}
                                className="bg-transparent text-[#8302E1] hover:bg-gray-100 rounded-md px-3 py-2"
                            >
                                <FontAwesomeIcon icon={faPlus} size="xl" />
                            </button>
                        </div>
                    </div>
                    {isModalOpen && (
                        <CreateForm
                            formType={selectedForm ? "show" : "create"}
                            onClose={closeModal}
                            formData={selectedForm}
                        />
                    )}
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="w-1/12 px-6 py-4">
                                </th>
                                <th scope="col" className="w-4/12 px-6 py-3 text-left text-sm font-medium text-slate-500 uppercase tracking-wider">
                                    Form Name
                                </th>
                                <th scope="col" className="w-3/12 px-6 py-3 text-left text-sm font-medium text-slate-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th scope="col" className="w-3/12 px-6 py-3 text-left text-sm font-medium text-slate-500 uppercase tracking-wider">
                                    Response
                                </th>
                                <th scope="col" className="w-4/12 px-4 py-3 text-left text-sm font-medium text-slate-500 uppercase tracking-wider">
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            
                            {form.map((item, id) => (
                                <React.Fragment key={id}>
                                    <tr className={`${checkedFormId === item.id ? "bg-gray-100" : ""} hover:bg-gray-50`}>
                                        <td className="w-1/12 px-11 py-4">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox"
                                                checked={checkedFormId === item.id}
                                                onChange={() => toggleCheck(item.id)}
                                            />
                                        </td>
                                        <td className="w-2/12 px-6 py-4 whitespace-nowrap">
                                            <div className="text-left text-sm font-medium text-gray-900">{item.name}</div>
                                        </td>
                                        <td className="w-4/12 px-6 py-4">
                                            <div className="text-left text-sm text-gray-900 ">{item.description}</div>
                                        </td>
                                        <td className="w-2/12 px-6 py-4 whitespace-nowrap">
                                            <div className="text-left text-sm text-gray-900">{item.submissionsCount}</div>
                                        </td>
                                        <td className="w-4/12 px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div class="dropdown">
                                                <button
                                                    onClick={() => toggleExpand(item.id)}
                                                    className="flex flex-col text-gray-500 items-center justify-center space-y-1 px-2"
                                                >
                                                    <FontAwesomeIcon icon={faBars} size="xl" />
                                                </button>
                                                <div className="dropdown-content bg-gray-100 hover:bg-gray-50">
                                                    <a href="#" onClick={() => {
                                                                        navigator.clipboard.writeText(`${submitFormWebsiteDomain}?code=${item.id}`)
                                                                        setShowToast(true);
                                                                    }}>Copy Invite Link</a>
                                                    <a href="#" onClick={() => window.location.href = `${reviewFormWebsiteDomain}?code=${item.id}`}>Go to Submissions</a>
                                                </div>
                                        </div>
                                        </td>
                                    </tr>
                                    {showToast && <Toast message="Invite Link Copied" isVisible={true} />}
                                    
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    );
}

export default FormList;
