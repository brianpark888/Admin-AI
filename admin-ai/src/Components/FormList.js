import React, {useState, useEffect} from 'react';
import Button from './Button';
import CreateForm from './CreateForm';
import {db} from '@/firebase';
import {collection, query, doc, getDocs, addDoc, updateDoc, deleteDoc, orderBy, where,} from 'firebase/firestore';
import { Link } from 'next/link';
import Toast from './Toast'; // Added for toast notification
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'; // Added for trash icon 

const formsCollection = collection(db, 'forms');
const submitFormWebsiteDomain = "http://localhost:3000/SubmitForm/"
const reviewFormWebsiteDomain = "http://localhost:3000/ReviewForm/"
function FormList(){
    const [form, setForm]= useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuToggle, setMenuToggle] = useState(false);
    const [selectedForm, setSelectedForm] = useState(null);
    const [expandedFormId, setExpandedFormId] = useState(null);
    const [checkedFormId, setCheckedFormId] = useState(null); // Added for checkbox interaction
    const [showToast, setShowToast]= useState(false); 

    const getForms  = async () => {
        try {
            const q = query(formsCollection, orderBy('submissionTime', 'desc'));
            const results = await getDocs(q);
            const newForms = [];
            results.docs.forEach((doc) => {
                newForms.push({id:doc.id, name: doc.data().name, description: doc.data().description, submissionTime: doc.data().submissionTime, responses: doc.data().responses || 0}); //added 'responses' field
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
          getForms(); // recall data
        } catch (error) {
          console.error('Failed to delete form:', error);
        }
      }; //added delete form function

      return (
        <div className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
            <div className='relative w-full max-w-7xl'>
                <div className='bg-[#8302E1] h-2.5 rounded-t-lg w-full absolute top-0 left-0'></div>
                <div className='bg-white shadow-sm p-7 rounded-lg z-10 w-full h-auto'>
                <div className="w-full flex justify-between mb-4 items-center"> 
                        <h1 className="font-bold text-2xl inline-block">Forms</h1>
                        <div className="flex gap-4"> {/* Adjusted button gap */}
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
                                    <input type="checkbox" className="form-checkbox" />
                                </th>
                                <th scope="col" className="w-4/12 px-6 py-3 text-left text-sm font-medium text-slate-500 uppercase tracking-wider"> {/* Adjusted column width */}
                                    Form Name
                                </th>
                                <th scope="col" className="w-4/12 px-6 py-3 text-left text-sm font-medium text-slate-500 uppercase tracking-wider"> {/* Adjusted column width */}
                                    Number of Responses
                                </th>
                                <th scope="col" className="w-4/12 px-4 py-3 text-left text-sm font-medium text-slate-500 uppercase tracking-wider"> {/* Adjusted column width */}
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
                                        <td className="w-4/12 px-6 py-4 whitespace-nowrap"> {/* Adjusted column width */}
                                            <div className="text-left text-sm font-medium text-gray-900">{item.name}</div>
                                        </td>
                                        <td className="w-4/12 px-6 py-4 whitespace-nowrap"> {/* Adjusted column width */}
                                            <div className="text-left text-sm text-gray-900">{item.responses}</div>
                                        </td>
                                        <td className="w-3/12 px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => toggleExpand(item.id)}
                                            className="flex flex-col text-gray-500 items-center justify-center space-y-1 px-2"
                                            >
                                            <FontAwesomeIcon icon={faBars} size="xl" />
                                            </button> 
                                        </td>
                                    </tr>
                                    {expandedFormId === item.id && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4">
                                            <div className="bg-gray-100 shadow-inner p-4 rounded-lg">
                                            <div className="block mb-4">
                                                <div className="font-semibold mb-2">Description:</div>
                                                <div>- {item.description}</div>
                                            </div>

                                            <div className="flex">
                                                <button 
                                                onClick={() => {navigator.clipboard.writeText(`${submitFormWebsiteDomain}?code=${item.id}`)
                                                                setShowToast(true)}}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 w-1/2 inline-block mx-2"
                                                >
                                                Copy Invite Link
                                                </button>
                                                {showToast && <Toast message="Invite Link Copied" isVisible={true} />}

                                                <button 
                                                onClick={() => window.location.href = `${reviewFormWebsiteDomain}?code=${item.id}`}
                                                className="px-4 py-2 bg-green-500 text-white rounded-3xl hover:bg-green-600 w-1/2 inline-block"
                                                >
                                                Go to Submissions
                                                </button>
                                            </div>
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