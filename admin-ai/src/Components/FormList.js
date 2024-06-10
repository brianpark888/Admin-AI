import React, { useState, useEffect } from 'react';
import Button from './Button';
import CreateForm from './CreateForm';
import { db } from '@/firebase';
import { collection, query, doc, getDocs, deleteDoc, orderBy, where } from 'firebase/firestore';
import { Link } from 'next/link';
import Toast from './Toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faFileAlt, faFileClipboard, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const formsCollection = collection(db, 'forms');
const submitFormWebsiteDomain = "https://admin-ai-final.vercel.app/SubmitForm/";
const reviewFormWebsiteDomain = "https://admin-ai-final.vercel.app/ReviewForm/";

function FormList() {
    const [form, setForm] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuToggle, setMenuToggle] = useState(false);
    const [selectedForm, setSelectedForm] = useState(null);
    const [expandedFormId, setExpandedFormId] = useState(null);
    const [checkedFormId, setCheckedFormId] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const router = useRouter();
    const { data } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/Login");
        },
    });

    const getForms = async () => {
        try {
            const q = query(formsCollection, where("username", "==", data.user.name));
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

            // submissionTime 기준으로 정렬
            newForms.sort((a, b) => {
                return new Date(b.submissionTime) - new Date(a.submissionTime);
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

    const deleteForm = async (id) => {
        try {
            await deleteDoc(doc(db, 'forms', id));
            getForms();
        } catch (error) {
            console.error('Failed to delete form:', error);
        }
    };

    const handleDeleteClick = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this form?');
        if (confirmDelete) {
            await deleteForm(id);
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

                /* Tooltip container */
                .tooltip {
                    position: relative;
                    display: inline-block;
                }

                /* Tooltip text */
                .tooltip .tooltiptext {
                    visibility: hidden;
                    width: 120px;
                    background-color: black;
                    color: #fff;
                    text-align: center;
                    padding: 5px 0;
                    border-radius: 6px;
                    position: absolute;
                    z-index: 1;
                    bottom: 125%; /* Place the tooltip above the text */
                    left: 50%;
                    margin-left: -60px;
                    opacity: 50;
                    transition: opacity 0.3s;
                }

                .tooltip .tooltiptext::after {
                    content: "";
                    position: absolute;
                    top: 100%; /* At the bottom of the tooltip */
                    left: 50%;
                    margin-left: -5px;
                    border-width: 5px;
                    border-style: solid;
                    border-color: black transparent transparent transparent;
                }

                .tooltip:hover .tooltiptext {
                    visibility: visible;
                    opacity: 1;
                }
            `}
            </style>
            <div className="flex min-h-screen flex-col items-center justify-between sm:p-24 bg-white">
                <div className='bg-white rounded-4x4 z-10 w-4/5 h-auto border-2 border-gray-100 shadow-lg'>
                    <div className="w-full flex justify-between items-center border-2-black px-12 pt-12 pb-2 bg-[#8e7bed] rounded-sm">
                        <h1 className="font-bold text-2xl inline-block text-white">Your Forms</h1>
                        <div className="flex gap-4">
                            <div className="tooltip">
                                <button
                                    onClick={() => handleDeleteClick(checkedFormId)}
                                    className="bg-transparent text-white border-2 border-transparent hover:border-white rounded-md px-3 py-2"
                                >
                                    <FontAwesomeIcon icon={faTrash} size="lg" />
                                </button>
                                <span className="tooltiptext">Delete</span>
                            </div>
                            <div className="tooltip">
                                <button
                                    onClick={() => openModal(null)}
                                    className="bg-transparent text-white border-2 border-transparent hover:border-white rounded-md px-3 py-2"
                                >
                                    <FontAwesomeIcon icon={faPlus} size="xl" />
                                </button>
                                <span className="tooltiptext">Create New Form</span>
                            </div>
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
                        <thead className="bg-[#d6dce6]">
                            <tr>
                                <th scope="col" className="w-1/12 px-6 py-4">
                                </th>
                                <th scope="col" className="w-4/12 px-6 py-3 text-left text-sm font-medium text-[#273045] uppercase tracking-wider">
                                    Form Name
                                </th>
                                <th scope="col" className="w-3/12 px-6 py-3 text-left text-sm font-medium text-[#273045] uppercase tracking-wider">
                                    Description
                                </th>
                                <th scope="col" className="w-3/12 px-6 py-3 text-left text-sm font-medium text-[#273045] uppercase tracking-wider">
                                    # of Responses
                                </th>
                                <th scope="col" className="w-4/12 px-4 py-3 text-left text-sm font-medium text-[#273045] uppercase tracking-wider">
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {form.map((item, id) => (
                                <React.Fragment key={id}>
                                    <tr className={`${checkedFormId === item.id ? "bg-gray-100" : ""} hover:bg-gray-100`}>
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
                                            <div className="dropdown">
                                                <button
                                                    onClick={() => toggleExpand(item.id)}
                                                    className="flex flex-col text-gray-500 items-center justify-center space-y-1 px-2 text-black"
                                                >
                                                    <FontAwesomeIcon icon={faCaretDown} size="xl" />
                                                </button>
                                                <div className="dropdown-content">
                                                    <a href="#" onClick={() => {
                                                        navigator.clipboard.writeText(`${submitFormWebsiteDomain}?code=${item.id}`)
                                                        setShowToast(true);
                                                    }}><FontAwesomeIcon icon={faFileClipboard} size="l" /> Copy Invite Link </a>

                                                    <a href="#" onClick={() => window.location.href = `${reviewFormWebsiteDomain}?code=${item.id}`}><FontAwesomeIcon icon={faFileAlt} size="l" /> Go to Submissions</a>
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
        </>
    );
}

export default FormList;
